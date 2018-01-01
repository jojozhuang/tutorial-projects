import path from 'path';
import Index from '../model/Index';
import ScreenImage from '../model/ScreenImage';
import WBData from '../model/WBData';
import fileApi from './FileApi';

const ssIndexFile = path.join(__dirname, '../../204304/ScreenShot/High/package.pak');
const unzippedSsIndexFile = path.join(__dirname, '../../204304/ScreenShot/High/unzippedindex.pak');
const imagedatafile = path.join(__dirname, '../../204304/ScreenShot/High/1.pak');
const wbImageIndexFile = path.join(__dirname, '../../204304/WB/1/VectorImage/package.pak');
const unzippedWbImageIndexFile = path.join(__dirname, '../../204304/WB/1/VectorImage/unzippedindex.pak');
const wbImageDataFile = path.join(__dirname, '../../204304/WB/1/VectorImage/1.pak');
const wbSequenceIndexFile = path.join(__dirname, '../../204304/WB/1/VectorSequence/package.pak');
const unzippedWbSequenceIndexFile = path.join(__dirname, '../../204304/WB/1/VectorSequence/unzippedindex.pak');
const wbSequenceDataFile = path.join(__dirname, '../../204304/WB/1/VectorSequence/1.pak');

class PlayerApi {
  static getImageData (second, callback) {
    //fileApi.unzipIndexFile(ssIndexFile, unzippedSsIndexFile);
    let buffer = fileApi.getIndexFile(unzippedSsIndexFile);
    //console.log(buffer.length);
    //console.log(buffer);
    let indexList = fileApi.getIndexArray(buffer);
    //console.log(indexList.length);
    let count =0;
    let hashmap = [];
    for (let i = 0; i < indexList.length; i++)
    {
      if(!hashmap[indexList[i].timestamp]) {
        count++;
        hashmap[indexList[i].timestamp] = i;
        //console.log('hashmap.length=' + hashmap.length);
        if (count < 10) {
          //console.log(indexList[i].timestamp + '-' + i);
          //console.log(hashmap[indexList[i].timestamp]);
        }
      }
    }

    //console.log('hashmap:' + hashmap)
    //console.log('indexList:' + indexList)
    //console.log('second:' + second)
    let imageIndex = fileApi.getImageIndex(hashmap, indexList, second);
    //console.log('imageIndex:' + imageIndex)
    fileApi.getImageData(imagedatafile, imageIndex, callback);
  }

  static getWhiteBoardData (second, callback) {
    let lines = this.getWBImageData2(second);
    let events = this.getWBSequenceData2(second);
    let res = new WBData(second, lines, events);
    let json = JSON.stringify(res);
    callback(json);
  }
  
  static getWBImageData2(second) {
    //console.log(second);
    //fileApi.unzipIndexFile(wbImageIndexFile, unzippedWbImageIndexFile);
    let buffer = fileApi.getIndexFile(unzippedWbImageIndexFile);
    //console.log(buffer.length);
    //console.log(buffer);
    let indexList = fileApi.getIndexArray(buffer);
    //console.log(indexList.length);
    let count =0;
    let hashmap = [];
    for (let i = 0; i < indexList.length; i++)
    {
      if(!hashmap[indexList[i].timestamp]) {
        count++;
        hashmap[indexList[i].timestamp] = i;
        ///console.log('hashmap.length=' + hashmap.length);
        //if (count < 10) {
        //  console.log(indexList[i].timestamp + '-' + i);
          //console.log(hashmap[indexList[i].timestamp]);
        //}
      }
    }
  
    let wbImageIndex = fileApi.getWBIndex(indexList);
    //console.log('wbImageIndex.length:' + wbImageIndex.length);
  
    let wbimagedata = fileApi.getWBImageData(wbImageDataFile, wbImageIndex, indexList, second);
    //console.log('wbimagedata.length:' + wbimagedata.length);
    return wbimagedata;
  }
  
  static getWBSequenceData2(second) {
    //fileApi.unzipIndexFile(wbSequenceIndexFile, unzippedWbSequenceIndexFile);
    let buffer = fileApi.getIndexFile(unzippedWbSequenceIndexFile);
    //console.log('buffer.length:'+buffer.length);
    //console.log(buffer.length);
    //console.log(buffer);
    let indexList = fileApi.getIndexArray(buffer);
    //console.log(indexList.length);
  
    let wbSequenceIndex = fileApi.getWBIndex(indexList);
    return fileApi.getWBSequenceData(wbSequenceDataFile, wbSequenceIndex, indexList, second);  
  }
}

export default PlayerApi;

