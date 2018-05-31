import HttpHelper from './HttpHelper';

class CompilerApi {
  static requestHeaders() {
    return { 'Content-Type': 'application/json' };
  }

  static submitc(answer) {
    return HttpHelper.fetch(
      'http://localhost:3000/api/runc/',
      'POST',
      this.requestHeaders(),
      JSON.stringify(answer),
    );
  }

  static submitjava(answer) {
    return HttpHelper.fetch(
      'http://localhost:3000/api/runjava/',
      'POST',
      this.requestHeaders(),
      JSON.stringify(answer),
    );
  }
}

export default CompilerApi;
