import HttpHelper from './HttpHelper';

class QuestionApi {
  static requestHeaders() {
    return { 'Content-Type': 'application/json' };
  }

  static getQuestion(id) {
    return HttpHelper.fetch(`/api/questions/${id}`, 'GET', this.requestHeaders(), null);
  }
}

export default QuestionApi;
