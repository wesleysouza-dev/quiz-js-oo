import { Players } from "./Players";

export class Statistics {
    _player;
    _result = {
        'successful': 0,
        'errors':  0
    };
    static NAME_LOCAL_STORAGE = 'statisticsQuiz';
    static bestPlayer = []; //Array pois futuramente podemos trazer os melhores
    static QtyPlayers = 0;

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
        if (typeof(value) === 'object') {
            return this._result = value;
        }
    }

    get qtyPlayers() {
        const qty = Statistics.NAME_LOCAL_STORAGE?.length;
        return qty;
    }

    get lastBestPlayer() {
        const data = this.result();
        const result = data.reduce((prev, current) => {
            return (prev?.result?.successful > current?.result?.successful) ? prev : current
        });

        return result;
    }

    /**
     * @param {boolean} value
     */
    set save(value = true) {
        const response = [{
            player: this._player,
            result: this._result
        }];
        const statisticsQuiz = localStorage.getItem(Statistics.NAME_LOCAL_STORAGE);

        if (statisticsQuiz && typeof(statisticsQuiz) === 'array') {
            return statisticsQuiz.push(response)
        }

        return localStorage.setItem(Statistics.NAME_LOCAL_STORAGE, response)
    }

    incrementQtyPlayer() {
        return Statistics.QtyPlayers += 1;
    }
}