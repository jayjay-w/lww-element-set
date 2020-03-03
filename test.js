let lwwwSet = require('./main');

describe("LWWElementSet", () => {
    it("adds latest data", () => {
        const lwwSet = new lwwwSet();
        lwwSet.add("set1", 1);
        lwwSet.add("set2", 1);
        lwwSet.add("set3", 3);
        const expected = new Map([["set3", 3], ["set1", 1]]);
        excpect(lwwSet._setA).toEqual(expected);
    })
})