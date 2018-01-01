import fs from 'fs';
import zlib from 'zlib';
import Index from '../model/Index';
import ScreenImage from '../model/ScreenImage';
import WBLine from '../model/WBLine';
import WBEvent from '../model/WBEvent';
const MAX_ROW_NO = 8;
const MAX_COL_NO = 8;

class FileApi {
  static unzipIndexFile(originalfile, unzippedfile) {
    let readstream = fs.createReadStream(originalfile);
    return readstream
        .pipe(zlib.createInflate())
        .pipe(fs.createWriteStream(unzippedfile));
  }

  static getIndexFile(unzippedfile) {
    let buffer = fs.readFileSync(unzippedfile);
    //console.log(buffer.length);
    return buffer;
  }

  static getImageIndex (ht, indexarr, second) {
    let foundset = [];
    for(let i = 0; i < MAX_ROW_NO * MAX_COL_NO; i++) {
      foundset[i] = false;
    }
    let res = [];
    let index = 0;
    let firstItem = 0;
    let firstSecond = second;
    //console.log(firstSecond);
    //console.log('ht.length:' + ht.length);
    for (; firstSecond >= 0; firstSecond--) {
      if(ht[firstSecond]) {
          firstItem = ht[firstSecond];
          break;
      }
    }
  
    while (firstItem < indexarr.length && indexarr[firstItem].timestamp == firstSecond) {
        firstItem++;
    }
  
    //console.log('firstItem:' + firstItem);
    //firstItem = 1;
    if (firstItem > 0) {
      //console.log(indexarr.length);
        for (let i = firstItem - 1; i >= 0; i--) {
          //console.log(indexarr[i]);
          let row = indexarr[i].grid >> 4;
          let col = indexarr[i].grid & 0xf;
          //console.log(MAX_ROW_NO);
          let value = row * MAX_ROW_NO + col;
          //console.log('value' + value);
  
          if (!foundset[value]) {
              foundset[value] = true;
              res[index]=indexarr[i];
              index++;
          }
          if (res.length == MAX_ROW_NO * MAX_COL_NO) {
              break;
          }
        }
    }
    //console.log('image index length=:' + res.length);
    return res;
  }

  static getImageData(imagedatafile, imageindex, callback) {
    let res = [];
    let index = 0;
    let fd = fs.openSync(imagedatafile, 'r');
    let i = 0;
    for (i = 0; i < imageindex.length; i++) {
      let imageobj = imageindex[i];
      //console.log('grid' + imageobj.grid);
      let row = imageobj.grid >> 4;
      let col = imageobj.grid & 0xf;
  
      let offset = imageindex[i].offset;
      let length = imageindex[i].length;
      let buffer = new Buffer(length);
      fs.readSync(fd, buffer, 0, length, offset);
      let base64 = buffer.toString('base64');
      if (base64===undefined) {
        console.log('base64:' + base64);

      }
      res[index]= new ScreenImage(row, col, base64);
      index++;
    }
    let json = JSON.stringify(res);
    //console.log('json'+json);
    callback(json);
    //use callback, don't write code here.
  }
  
  static getIndexArray (buffer){
    //var reader = new binutils.BinaryReader(buffer);
    //console.log(buffer.length);
    let arr = [];
    let ix = 0;
    let pos = 0;
    while (pos < buffer.length) {
      
      /*
      let buffer = new Buffer([3,0,51, 0,0,0,0,212,0,0,0])
      //var pos = 0;
      console.log(buffer.readUInt16LE(0));
      pos = pos+2;
      console.log(buffer.readInt8(2));
      pos= pos+1;
      console.log(buffer.readInt32LE(3));
      pos = pos+4;
      console.log(buffer.readUInt32LE(7));*/
      let v1 = buffer.readUInt16LE(pos);
      let v2 = buffer.readInt8(pos+2);
      let v3 = buffer.readInt32LE(pos+3);
      let v4 = buffer.readUInt32LE(pos+7);
      let idxobj = new Index(v1, v2, v3, v4);
      //let idxobj = Index(buffer.readUInt16LE(pos), buffer.readInt8(pos+2), buffer.readInt32LE(pos+3), buffer.readUInt32LE(pos+7));
      if (ix < 0) {
        //console.log(idxobj.timestamp);
        //console.log(idxobj.grid);
        //console.log(idxobj.offset);
        //console.log(idxobj.length);
      }
  
      arr[ix] = idxobj;
      ix++;
      pos = pos + 11;
    }
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].offset == -1 && i > 0) {
        //console.log(i);
        arr[i].offset = arr[i - 1].offset;
        arr[i].length = arr[i - 1].length;
      }
    }
    arr.sort((a, b) => {
      let res = a.timestamp - b.timestamp;
      if (res == 0) {
          res = a.grid - b.grid;
      }
      return res;
    });
    //console.log(arr[117].timestamp);
    //console.log(arr[117].grid);
    //console.log(arr[117].offset);
    //console.log(arr[117].length);
    //console.log(arr.length);
    return arr;
  }
  
  static getWBIndex(indexarr) {
    let res = [];
    //console.log(firstSecond);
    //console.log('ht.length:' + ht.length);
    for (let i = 0; i < indexarr.length; i++) {
      if(!res[indexarr[i].timestamp]) {
          res[indexarr[i].timestamp] = i;
      }
    }
    //console.log('image index length=:' + res.length);
    return res;
  }

  static getWBImageData(wbImageDataFile, wbImageIndex, indexList, second) {
    let res = [];
    let indeximage;
    let minutes = Math.floor(second / 60);
    if (wbImageIndex[minutes]) {
      indeximage = indexList[wbImageIndex[minutes]];
    }
    if (indeximage && indeximage.length>0) {
      let fd = fs.openSync(wbImageDataFile, 'r');
      let length = indeximage.length;
      let buffer = new Buffer(length);
      fs.readSync(fd, buffer, 0, length, indeximage.offset);
  
      let ix = 0;
      let pos = 0;
      while (pos < buffer.length) {
        let wbl = new WBLine(buffer.readUInt16LE(pos), buffer.readUInt16LE(pos+2), buffer.readUInt16LE(pos+4), buffer.readUInt16LE(pos+6),buffer.readInt16LE(pos+8), buffer.readUInt16LE(pos+10));
        if (ix < 0) {
          //console.log(wbl.x0);
          //console.log(wbl.y0);
          //console.log(wbl.x1);
          //console.log(wbl.y1);
          //console.log(wbl.color);
          //console.log(wbl.reserved);
        }
  
        res[ix] = wbl;
        ix++;
        pos = pos + 12;
      }
    }
    //console.log('WBImageData.length:' + res.length);
    return res;
  }
  
  static getWBSequenceData(wbSequenceDataFile, wbSequenceIndex, indexList, second) {
    let res = [];
    let indexsequence;
    let minutes = Math.floor(second / 60);
  
    if (wbSequenceIndex[minutes]) {
      indexsequence = indexList[wbSequenceIndex[minutes]];
    }
    //console.log('indexsequence.length:'+ indexsequence.length);
    //console.log('indexsequence.offset:'+ indexsequence.offset);
    if (indexsequence && indexsequence.length>0) {
      let fd = fs.openSync(wbSequenceDataFile, 'r');
      let length = indexsequence.length;
      let buffer = new Buffer(length);
      fs.readSync(fd, buffer, 0, length, indexsequence.offset);
  
      //console.log('buffer.length:'+ buffer.length);
      let ix = 0;
      let pos = 0;
      while (pos < buffer.length) {
        //console.log('pos:'+pos);
        //console.log('buffer.length:'+buffer.length);
        let wbe = new WBEvent(buffer.readUInt16LE(pos), buffer.readUInt16LE(pos+2), buffer.readInt16LE(pos+4), buffer.readInt16LE(pos+6));
        if (ix < 0) {
          //console.log(wbe.timestamp);
          //console.log(wbe.reserved);
          //console.log(wbe.x);
          //console.log(wbe.y);
        }
        res[ix] = wbe;
        ix++;
        pos = pos + 8;
      }
    }
    //console.log('WBSequenceData.length:' + res.length)
    return res;
  }
}

export default FileApi;