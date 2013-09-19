require('../melt');
var vows = require('vows'),
  assert = require('assert'),
  suite = vows.describe('Base chart');

var exam = [
  { "Pass": "10", "Fail": "20", "Untested": "40" },
  { "Pass": "20", "Fail": "40", "Untested": "50" },
  { "Pass": "20", "Fail": "40", "Untested": "50", "Extra": "2" },
  { "Pass": "30", "Fail": "50", "Untested": "60"}
];

suite.addBatch({
  'Given the exam data set': {
    topic: function() {
      return exam;
    },
    'When melt is called without args': {
      'Then we get back the only cols variable, value & _id': function(data) {
        assert.deepEqual(melt(data),
          [{ "variable": "Pass", "value": "10", "_id": 0 },
           { "variable": "Fail", "value": "20", "_id": 0 },
           { "variable": "Untested", "value": "40", "_id": 0 },
           { "variable": "Pass", "value": "20", "_id": 1 },
           { "variable": "Fail", "value": "40", "_id": 1 },
           { "variable": "Untested", "value": "50", "_id": 1 },
           { "variable": "Pass", "value": "20", "_id": 2 },
           { "variable": "Fail", "value": "40", "_id": 2 },
           { "variable": "Untested", "value": "50", "_id": 2 },
           { "variable": "Extra", "value": "2", "_id": 2 },
           { "variable": "Pass", "value": "30", "_id": 3 },
           { "variable": "Fail", "value": "50", "_id": 3 },
           { "variable": "Untested", "value": "60", "_id": 3 }]);
      }
    },
    'When melt is called with keep as string': "pending",
    'When melt is called with keep as array with 1 value': "pending",
    'When melt is called with keep as array with >1 value ': "pending",
    'When melt is called with varName set': "pending",
    'When melt is called with valName set': "pending",
    'When melt is called with noAddId true': "pending",
  }
});
suite.export(module);
