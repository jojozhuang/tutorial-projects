import HttpHelper from './HttpHelper';

class FileApi {
  static requestHeaders() {
    return {'Content-Type': 'application/json'};
  }

  static uploadFile(file) {
    const formData = new FormData();
    formData.append('file',file);
    return HttpHelper.fetch(`${process.env.API_HOST}/api/upload`, 'POST', null, formData);
  }
}

export default FileApi;