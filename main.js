class LWW_Element_Set {
    constructor({
        bias = 1,
        addSet = new Map(), // _addSet is the array containing all added elements
        removeSet = new Map() // _removeSet is the array containing all removed elements
    } = {} ) {
        this.biasToAdd = biasToAdd;
        this._addSet = addSet;
        this._removeSet = removeSet;
    }

    //Add a new entry to the added elements
    add(elem, time = +new Date()) {
        let { data } = elem;
        if (!this._addSet.has(data) || this._addSet.get(data).time < time) {
            this._addSet.set(data, { elem, time });
        }

        return this;
    }

    //Add a new entry to the removed elements
    remove(elem, time = +new Date) {
        let { data } = elem;
        if (this.search(elem) && ( !this._addSet.get(data).time < time)) {
            this._removeSet.set(data, {elem, time});
        }
    }

    // Check whether an element is in the set
    search({data}) {
        return this._addSet.has(data) && (
            !this._removeSet.has(data) ?
                true : 
                (
                    this.biasToAdd ?
                    this._addSet.get(data).time >= this._removeSet.get(data).time :
                    this._addSet.get(data).time > this._removeSet.get(data).time
                )
        );
    }
}

module.exports = LWW_Element_Set;