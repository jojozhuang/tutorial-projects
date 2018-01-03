import path from 'path';
import WBData from '../model/WBData';
import fileApi from './FileApi';

const ssIndexFile = path.join(__dirname, '../../204304/ScreenShot/High/package.pak');
const unzippedSsIndexFile = path.join(__dirname, '../../204304/ScreenShot/High/unzippedindex.pak');
const ssScreenshotDataFile = path.join(__dirname, '../../204304/ScreenShot/High/1.pak');
const wbImageIndexFile = path.join(__dirname, '../../204304/WB/1/VectorImage/package.pak');
const unzippedWbImageIndexFile = path.join(__dirname, '../../204304/WB/1/VectorImage/unzippedindex.pak');
const wbImageDataFile = path.join(__dirname, '../../204304/WB/1/VectorImage/1.pak');
const wbSequenceIndexFile = path.join(__dirname, '../../204304/WB/1/VectorSequence/package.pak');
const unzippedWbSequenceIndexFile = path.join(__dirname, '../../204304/WB/1/VectorSequence/unzippedindex.pak');
const wbSequenceDataFile = path.join(__dirname, '../../204304/WB/1/VectorSequence/1.pak');

// Screenshot Cache
let ssIndexArray = null;
let ssHashmap = [];
// Whiteboard Cache
let wbImageIndexArray = null;
let wbImageIndex = null;
let wbSequenceIndexArray = null;
let wbSequenceIndex = null;

class CourseApi {
  
  static getScreenshotData (second) {
    if (ssIndexArray===null) {
      let buffer = fileApi.getIndexFile(ssIndexFile, unzippedSsIndexFile);
      ssIndexArray = fileApi.getIndexArray(buffer);
      ssHashmap = [];
      for (let i = 0; i < ssIndexArray.length; i++)
      {
        if(!ssHashmap[ssIndexArray[i].timestamp]) {
          ssHashmap[ssIndexArray[i].timestamp] = i;
        }
      }
    }

    let ssIndex = fileApi.getSSIndex(ssHashmap, ssIndexArray, second);
    return fileApi.getSSData(ssScreenshotDataFile, ssIndex);
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
    if (wbImageIndex===null) {
      let buffer = fileApi.getIndexFile(wbImageIndexFile, unzippedWbImageIndexFile);
      wbImageIndexArray = fileApi.getIndexArray(buffer);
      wbImageIndex = fileApi.getWBIndex(wbImageIndexArray);
    }
    return fileApi.getWBImageData(wbImageDataFile, wbImageIndex, wbImageIndexArray, second);
  }
  
  static getWBSequenceData(second) {
    if (wbSequenceIndex===null) {
      let buffer = fileApi.getIndexFile(wbSequenceIndexFile, unzippedWbSequenceIndexFile);
      wbSequenceIndexArray = fileApi.getIndexArray(buffer);
      wbSequenceIndex = fileApi.getWBIndex(wbSequenceIndexArray);
    }
    return fileApi.getWBSequenceData(wbSequenceDataFile, wbSequenceIndex, wbSequenceIndexArray, second);  
  }
}

export default CourseApi;

