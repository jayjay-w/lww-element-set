let LWW_Element_Set = require('./main');


// Test wheter the search function works
(() => {
    let addSet = new Map([ ['test1', {time: 1}], ['test2', {time: 2}]]);
    let testSet = new LWW_Element_Set({addSet});
    console.log("Testing whether search function works");
    // We add test1 and tes2 to the set
    // test1 and test2 should be present
    // test3 should not be present
    console.assert(testSet.search({data: 'test1'}), 'Expected True: test1 should be present');
    console.assert(testSet.search({data: 'test2'}), 'Expected True: test2 should be present');
    console.assert(!testSet.search({data: 'test3'}), 'Expected False: test3 should not be present');
})();

// Test whether add/remove works
(() => {
    let testSet = new LWW_Element_Set();
    console.log("Testing whether add/remove functions work");

    testSet.remove( {data: 'test1'}, 2 );
    console.assert( !testSet._removeSet.has('test1'), 'Expected false: test1 should not be present.');
    console.assert( !testSet.search({ data: 'test1'}), 'Expected false: test1 should not be present. It has not been added to _removeSet not _addSet');

    testSet.add( {data: 'test1'}, 3);

    testSet.remove( {data: 'test1'}, 2);

    testSet.remove( {data: 'test1'}, 4);

    testSet.add( {data: 'test1'}, 5);

})();