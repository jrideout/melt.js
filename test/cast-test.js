require('../melt');
var vows = require('vows'),
  assert = require('assert'),
  suite = vows.describe('Base chart');

var spend = [
  {"Name":"Mr A","Spent":40,"Year":"2011"},
  {"Name":"Mr B","Spent":10,"Year":"2011"},
  {"Name":"Mr C","Spent":40,"Year":"2011"},
  {"Name":"Mr A","Spent":70,"Year":"2011"},
  {"Name":"Mr A","Spent":30,"Year":"2012"},
  {"Name":"Mr B","Spent":20,"Year":"2012"},
  {"Name":"Mr B","Spent":20,"Year":"2012"},
  {"Name":"Mr C","Spent":40,"Year":"2012"},
  {"Name":"Mr B","Spent":50,"Year":"2013"},
  {"Name":"Mr C","Spent":30,"Year":"2013"},
  {"Name":"Mr A","Spent":70,"Year":"2013"}];

suite.addBatch({
  'Given the spend data set': {
    topic: function() {
      return spend;
    },
    'When cast is called with sum of Spent for Name': {
      'Then we get back totals of spend': function(data) {
        var iron = cast(data,["Name"],cast.sum,"Spent");
        assert.deepEqual(iron,[
             { Name: 'Mr A', Spent: 210 },
             { Name: 'Mr B', Spent: 100 },
             { Name: 'Mr C', Spent: 110 }
        ]);
      }
    }
  }
});
suite.export(module);
