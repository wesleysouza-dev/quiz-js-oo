import { Statistics } from "./Statistics.js";
import { Answers } from "./Answers.js";
export class Players {
  _fullName;
  _mail;
  profession;
  age;

  constructor(fullName, mail, profession, age) {
    this._fullName = fullName;
    this._mail = mail;
    this.profession = profession;
    this.age = age;
  }

  get fullName() {
    return this._fullName;
  }

  set fullName(value) {
    // Two or more words
    if (/\w+\s+\w+/.test(value)) {
      return (this._fullName = value);
    }
    // Test
    return (this._fullName = `${value} (sem sobrenome)`);
  }

  /**
   * @param {string} value
   */
  set mail(value) {
    return (this._mail = value);
  }

  get getMail() {
    return this._mail;
  }

  resetQuiz(answer, statistic) {
    this._fullName = null;
    this._mail = null;
    this.profession = null;
    this.age = null;

    answer.reset();
    statistic.reset();
  }
}
