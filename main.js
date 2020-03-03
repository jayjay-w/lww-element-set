class LWW_Element_Set {
    constructor() {
        this._setA = new Map();
        this._setR = new Map();
    }

    add(data, time) {
        const oldA = this._setA.get(data);
        if (checkIfThisIsTheLastEntry(oldA, time)) {
            this._setA.set(data, time);
        }
    }

    remove(data, time) {
        const oldR = this._setR.get(data);
        if (checkIfThisIsTheLastEntry(oldR, time)) {
            this._setR.set(data, time);
        }
    }
}

function checkIfThisIsTheLastEntry(oldTime, newTime) {
    return !oldTime || oldTime < newTime;
}

module.exports = LWW_Element_Set;