export class Answers {
  _answers;
  static _currentStep;
  static STEP_LOCAL_STORAGE = "stepCurrentQuiz";
  static totalQuestions = 0;

  constructor(answers, currentStep) {
    this._answers = answers ?? [];
    this._currentStep = currentStep ?? 0;
  }

  get answers() {
    return this._answers;
  }

  /**
   * @param {Object} value
   */
  set addAnswer(value) {
    if (value) {
      return this._answers.push(value);
    }
  }

  get currentStep() {
    return this._currentStep;
  }

  /**
   * @param {number} stepCurrent
   */
  set save(stepCurrent) {
    this._currentStep = stepCurrent;
    localStorage.setItem(Answers.STEP_LOCAL_STORAGE, stepCurrent);
  }

  get getTotalQuestions() {
    return this.totalQuestions;
  }

  /**
   * @param {number} value
   */
  set addTotalQuestions(value) {
    return (this.totalQuestions = value);
  }

  reset() {
    this._answers = [];
    this._currentStep = 0;
    this.totalQuestions = 0;
    localStorage.removeItem(Answers.STEP_LOCAL_STORAGE);
  }
}
