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
        return this.fullName; 
    }

    set fullName(value) {
        // Two or more words
        if (/\w+\s+\w+/.test(value)) {
            return this._fullName = value; 
        }
        // Test
        return this._fullName = `${value} (sem sobrenome)`
    }

    /**
     * @param {string} value
    */
    set mail(value) {
        return this._mail = value; 
    }
    
    get mail() {
        return this._mail; 
    }
}