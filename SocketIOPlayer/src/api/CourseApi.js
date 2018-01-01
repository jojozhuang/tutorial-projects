import path from 'path';
import Index from '../model/Index';
import WBData from '../model/WBData';
import fileApi from './FileApi';

const ssIndexFile = path.join(__dirname, '../../204304/ScreenShot/High/package.pak');
const unzippedSsIndexFile = path.join(__dirname, '../../204304/ScreenShot/High/unzippedindex.pak');
const ssImageDataFile = path.join(__dirname, '../../204304/ScreenShot/High/1.pak');
const wbImageIndexFile = path.join(__dirname, '../../204304/WB/1/VectorImage/package.pak');
const unzippedWbImageIndexFile = path.join(__dirname, '../../204304/WB/1/VectorImage/unzippedindex.pak');
const wbImageDataFile = path.join(__dirname, '../../204304/WB/1/VectorImage/1.pak');
const wbSequenceIndexFile = path.join(__dirname, '../../204304/WB/1/VectorSequence/package.pak');
const unzippedWbSequenceIndexFile = path.join(__dirname, '../../204304/WB/1/VectorSequence/unzippedindex.pak');
const wbSequenceDataFile = path.join(__dirname, '../../204304/WB/1/VectorSequence/1.pak');

class CourseApi {
  static getScreenshotData (second) {
    let buffer = fileApi.getIndexFile(ssIndexFile, unzippedSsIndexFile);
    let indexList = fileApi.getIndexArray(buffer);
    let hashmap = [];
    for (let i = 0; i < indexList.length; i++)
    {
      if(!hashmap[indexList[i].timestamp]) {
        hashmap[indexList[i].timestamp] = i;
      }
    }

    let imageIndex = fileApi.getImageIndex(hashmap, indexList, second);
    return fileApi.getImageData(ssImageDataFile, imageIndex);
  }

  static getWhiteBoardData (second) {
    // get lines
    let lines = this.getWBImageData(second);
    // get events
    let events = this.getWBSequenceData(second);
    // combine them to whiteboard data
    let res = new WBData(second, lines, events);

    return JSON.stringify(res);
  }
  
  static getWBImageData(second) {
    let buffer = fileApi.getIndexFile(wbImageIndexFile, unzippedWbImageIndexFile);
    let indexList = fileApi.getIndexArray(buffer);
    let hashmap = [];
    for (let i = 0; i < indexList.length; i++)
    {
      if(!hashmap[indexList[i].timestamp]) {
        hashmap[indexList[i].timestamp] = i;
      }
    }
  
    let wbImageIndex = fileApi.getWBIndex(indexList);
    return fileApi.getWBImageData(wbImageDataFile, wbImageIndex, indexList, second);
  }
  
  static getWBSequenceData(second) {
    let buffer = fileApi.getIndexFile(wbSequenceIndexFile, unzippedWbSequenceIndexFile);
    let indexList = fileApi.getIndexArray(buffer);
    let hashmap = [];
    for (let i = 0; i < indexList.length; i++)
    {
      if(!hashmap[indexList[i].timestamp]) {
        hashmap[indexList[i].timestamp] = i;
      }
    }

    let wbSequenceIndex = fileApi.getWBIndex(indexList);
    return fileApi.getWBSequenceData(wbSequenceDataFile, wbSequenceIndex, indexList, second);  
  }
}

export default CourseApi;

