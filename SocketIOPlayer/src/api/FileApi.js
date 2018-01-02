import fs from 'fs';
import zlib from 'zlib';
import Index from '../model/Index';
import ScreenImage from '../model/ScreenImage';
import WBLine from '../model/WBLine';
import WBEvent from '../model/WBEvent';
const MAX_ROW_NO = 8;
const MAX_COL_NO = 8;

class FileApi {
  static getIndexFile(originalFile, unzippedFile) {
    // unzip the index file if it doesn't exist
    if (!fs.existsSync(unzippedFile)) {
      this.unzipIndexFile(originalFile, unzippedFile);
    }
    // read the unzipped file to buffer
    return fs.readFileSync(unzippedFile);
  }

  static unzipIndexFile(originalFile, unzippedFile) {
    let buffer = fs.readFileSync(originalFile);
    let inflate = zlib.inflateSync(buffer);
    fs.writeFileSync(unzippedFile, inflate);
  }

  static getIndexArray (buffer){
    let arr = [];
    let ix = 0;
    let pos = 0;
    while (pos < buffer.length) {
      arr[ix] = new Index(buffer.readUInt16LE(pos), buffer.readInt8(pos+2), buffer.readInt32LE(pos+3), buffer.readUInt32LE(pos+7));
      ix++;
      pos = pos + 11;
    }
  
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].offset == -1 && j > 0) {
        arr[j].offset = arr[j - 1].offset;
        arr[j].length = arr[j - 1].length;
      }
    }
    // sort by timestamp and grid
    arr.sort((a, b) => {
      let compare = a.timestamp - b.timestamp;
      if (compare == 0) {
        compare = a.grid - b.grid;
      }
      return compare;
    });

    return arr;
  }

  static getSSIndex (hm, indexarr, second) {
    let foundset = [];
    for(let i = 0; i < MAX_ROW_NO * MAX_COL_NO; i++) {
      foundset[i] = false;
    }
    let res = [];
    let index = 0;
    let firstItem = 0;
    let firstSecond = second;
    for (; firstSecond >= 0; firstSecond--) {
      if(hm[firstSecond]) {
          firstItem = hm[firstSecond];
          break;
      }
    }
  
    while (firstItem < indexarr.length && indexarr[firstItem].timestamp == firstSecond) {
        firstItem++;
    }
  
    if (firstItem > 0) {
        for (let i = firstItem - 1; i >= 0; i--) {
          let row = indexarr[i].grid >> 4;
          let col = indexarr[i].grid & 0xf;
          let value = row * MAX_ROW_NO + col;
  
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
    return res;
  }

  static getSSData(imagedatafile, imageindex) {
    let res = [];
    let index = 0;
    let fd = fs.openSync(imagedatafile, 'r');
    let i = 0;
    for (i = 0; i < imageindex.length; i++) {
      let imageobj = imageindex[i];
      let row = imageobj.grid >> 4;
      let col = imageobj.grid & 0xf;
  
      let offset = imageindex[i].offset;
      let length = imageindex[i].length;
      let buffer = new Buffer(length);
      fs.readSync(fd, buffer, 0, length, offset);
      // image in base64 format
      let image = "data:image/png;base64," + buffer.toString('base64');
      res[index]= new ScreenImage(row, col, image);
      index++;
    }

    return JSON.stringify(res);
  }
  
  static getWBIndex(indexarr) {
    let res = [];
    for (let i = 0; i < indexarr.length; i++) {
      if(!res[indexarr[i].timestamp]) {
          res[indexarr[i].timestamp] = i;
      }
    }
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
        res[ix] = new WBLine(buffer.readUInt16LE(pos), buffer.readUInt16LE(pos+2), buffer.readUInt16LE(pos+4), buffer.readUInt16LE(pos+6),buffer.readInt16LE(pos+8), buffer.readUInt16LE(pos+10));
        ix++;
        pos = pos + 12;
      }
    }

    return res;
  }
  
  static getWBSequenceData(wbSequenceDataFile, wbSequenceIndex, indexList, second) {
    let res = [];
    let indexsequence;
    let minutes = Math.floor(second / 60);
  
    if (wbSequenceIndex[minutes]) {
      indexsequence = indexList[wbSequenceIndex[minutes]];
    }

    if (indexsequence && indexsequence.length>0) {
      let fd = fs.openSync(wbSequenceDataFile, 'r');
      let length = indexsequence.length;
      let buffer = new Buffer(length);
      fs.readSync(fd, buffer, 0, length, indexsequence.offset);
  
      let ix = 0;
      let pos = 0;
      while (pos < buffer.length) {
        res[ix] = new WBEvent(buffer.readUInt16LE(pos), buffer.readUInt16LE(pos+2), buffer.readInt16LE(pos+4), buffer.readInt16LE(pos+6));
        ix++;
        pos = pos + 8;
      }
    }

    return res;
  }
}

export default FileApi;