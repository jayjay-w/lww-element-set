class LWW_Element_Set {
    constructor({
        addBias = true,
        addSet = new Map(), // _addSet is the array containing all added elements
        removeSet = new Map() // _removeSet is the array containing all removed elements
    } = {} ) {
        this._addBias = addBias;
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
        if (this.lookup(elem) && ( !this._addSet.get(data).time < time)) {
            this._removeSet.set(data, {elem, time});
        }
    }

    // Merge a new set (T) to this set
    merge ( T) {
        for (let [key, value] of T._addSet) {
            this.add(value.elem, value.time);
        }

       for ( let[ data, {elem, time}] of T._removeSet) {
           if (!this._removeSet.has(data) || this._removeSet.get(data).time) {
               this._removeSet.set(data, {elem, time});
           }
       }

        return this;
    }

    // Compare two sets. 
    // Returns true if they are identical, and false if they are not
    compare ( T ) {
        // If addSets are not equal, return false
        for ( let [key, value] of this._addSet ) {
            if (!T._addSet.has(key) || value.time > T._addSet.get(key).time) {
                return false;
            }
        }
        // If remove sets are not equal, return false
        for ( let [key, value] of this._removeSet ) {
            if (!T._removeSet.has(key) || value.time > T._removeSet.get(key).time) {
                return false;
            }
        }
        // If execution gets here, return true because the sets are identical
        return true;
    };


    // Check whether an element is in the set
    lookup({data}) {
        return this._addSet.has(data) && (
            !this._removeSet.has(data) ?
                true : 
                (
                    this._addBias ?
                    this._addSet.get(data).time >= this._removeSet.get(data).time :
                    this._addSet.get(data).time > this._removeSet.get(data).time
                )
        );
    }
}

module.exports = LWW_Element_Set;