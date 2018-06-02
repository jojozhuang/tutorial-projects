import HttpHelper from './HttpHelper';

class CompilerApi {
  static requestHeaders() {
    return { 'Content-Type': 'application/json' };
  }

  static run(answer) {
    return HttpHelper.fetch(
      'http://localhost:3000/api/run/',
      'POST',
      this.requestHeaders(),
      JSON.stringify(answer),
    );
  }
}

export default CompilerApi;
