let LWW_Element_Set = require('./main');


// Test wheter the lookup function works
(() => {
    let addSet = new Map([ ['test1', {time: 1}], ['test2', {time: 2}]]);
    let testSet = new LWW_Element_Set({addSet});
    // We add test1 and tes2 to the set
    // test1 and test2 should be present
    // test3 should not be present
    console.assert(testSet.lookup({data: 'test1'}), 'Expected True: test1 should be present');
    console.assert(testSet.lookup({data: 'test2'}), 'Expected True: test2 should be present');
    console.assert(!testSet.lookup({data: 'test3'}), 'Expected False: test3 should not be present');
})();

// Test whether add to set works
(() =>{
    let testSet = new LWW_Element_Set;

    testSet.add({data: 'test1'}, 1);
    testSet.add({data: 'test3'}, 3);

    console.assert(testSet.lookup({data: 'test1'}), 'Expected True: test1 should be present');
    console.assert(!testSet.lookup({data: 'test2'}), 'Expected False: test2 should not be present');
    console.assert(testSet.lookup({data: 'test3'}), 'Expected True: test3 should be present');
}) ();

// Test whether combined add/remove works
(() => {
    let testSet = new LWW_Element_Set();
    
    testSet.remove( {data: 'test1'}, 2 );
    console.assert( !testSet._removeSet.has('test1'), 'Expected false: test1 should not be present.');
    console.assert( !testSet.lookup({ data: 'test1'}), 'Expected false: test1 should not be present. It has not been added to _removeSet not _addSet');

    testSet.add( {data: 'test1'}, 3);
    console.assert(testSet.lookup({data: 'test1'}), 'Expected True: test1 should be present');

    testSet.remove( {data: 'test1'}, 2);
    console.assert(testSet._removeSet.has('test1'), 'Expected True: test1 should be present in the removeSet');
    console.assert(testSet.lookup({data: 'test1'}), 'Expected True: test1 should be present');

    testSet.remove( {data: 'test1'}, 4);
    console.assert(testSet._removeSet.get('test1').time === 4, 'Expected True: test1 should be present');
    console.assert(!testSet.lookup({data: 'test1'}), 'Expected False: test1 should has been removed');

    testSet.add( {data: 'test1'}, 5);
    console.assert(testSet.lookup({data: 'test1'}), 'Expected True: test1 was removed and re-added');

})();

// Test whether merging works as expected
(() => {
    let firstTestSet = new LWW_Element_Set({
        addSet: new Map( [['test1', {elem: {data: 'test1'}, time: 3}], ['test2', {elem: {data: 'test2'}, time: 3}]] ),
        removeSet: new Map( [['test1', {elem: {data: 'test1'}, time: 4}], ['test2', {elem: {data: 'test2'}, time: 5}]] )
    });

    let secondTestSet = new LWW_Element_Set({
        addSet: new Map( [['test1', {elem: {data: 'test1'}, time: 2}], ['test2', {elem: {data: 'test2'}, time: 4}]] ),
        removeSet: new Map( [['test1', {elem: {data: 'test1'}, time: 4}], ['test2', {elem: {data: 'test2'}, time: 6}], ['test3', {time: 7}]] )
    });

    console.assert( !firstTestSet.compare(secondTestSet), 'False expected. The two sets are not identical');
    firstTestSet.merge(secondTestSet);
    console.assert(secondTestSet.compare(firstTestSet), 'True Expected.  firstTestSet should be newer and not identical to the second one');
})();