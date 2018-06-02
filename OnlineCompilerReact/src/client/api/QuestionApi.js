import HttpHelper from './HttpHelper';

class QuestionApi {
  static requestHeaders() {
    return { 'Content-Type': 'application/json' };
  }

  static getTask(lang) {
    return HttpHelper.fetch(`/api/task/${lang}`, 'GET', this.requestHeaders(), null);
  }
}

export default QuestionApi;
