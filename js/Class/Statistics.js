import { Players } from "./Players.js";

export class Statistics {
  _player;
  _result = {
    successful: 0,
    errors: 0,
  };
  static NAME_LOCAL_STORAGE = "statisticsQuiz";
  static bestPlayer = []; //Array pois futuramente podemos trazer os melhores
  static QtyPlayers = 0;
  _questions = [];

  constructor(player, result) {
    if (player instanceof Players) {
      this._player = player;
      this.result = result;
    }
    // Test
    this.incrementQtyPlayer();
  }

  get result() {
    return this._result;
  }

  set result(value) {
    if (typeof value === "object") {
      return (this._result = value);
    }
  }

  get qtyPlayers() {
    const qty = Statistics.NAME_LOCAL_STORAGE?.length;
    return qty;
  }

  get listQuestions() {
    return this._questions;
  }

  /**
   * @param {Array} values
   */
  set addListQuestions(values) {
    if (Array.isArray(values)) {
      return (this._questions = values);
    }
  }

  get lastBestPlayer() {
    const data = this.result();
    const result = data.reduce((prev, current) => {
      return prev?.result?.successful > current?.result?.successful
        ? prev
        : current;
    });

    return result;
  }

  /**
   * @param {boolean} value
   */
  set save(value = true) {
    const response = [
      {
        player: this._player,
        result: this._result,
      },
    ];
    const statisticsQuiz = localStorage.getItem(Statistics.NAME_LOCAL_STORAGE);

    if (statisticsQuiz && typeof statisticsQuiz === "array") {
      return statisticsQuiz.push(response);
    }

    return localStorage.setItem(Statistics.NAME_LOCAL_STORAGE, response);
  }

  incrementQtyPlayer() {
    return (Statistics.QtyPlayers += 1);
  }

  displayTextResult() {
    return `Obrigado pela sua participação, <b>${this._player.fullName}</b>. Confira sua pontuação abaixo:`;
  }

  reset() {
    this._player;
    this._result = {
      successful: 0,
      errors: 0,
    };
    this.bestPlayer = [];
    this.QtyPlayers = 0;
    this._questions = [];
    localStorage.removeItem(Statistics.NAME_LOCAL_STORAGE);
  }
}
