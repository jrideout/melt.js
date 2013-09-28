/*!
 *  melt.js
 *  http://git.io/melt
 *  Copyright 2013 Jacob Rideout
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

melt = (function (undefined) {
  'use strict';

  function set(keys) {
    var s = {}, keys = keys || [];
    for (var i = 0; i < keys.length; i++) {
      s[keys[i]] = 1;
    }
    return s;
  }

  function extend(obj, copy) {
    for (var k in copy) {
      obj[k] = copy[k];
    }
    return obj;
  }

  function melt(data, keep, varName, valName, noAddId) {
    var newData = [],
      varName = varName || 'variable',
      valName = valName || 'value',
      keepSet = set(keep);

    data.forEach(function (row, rowId) {
      var save = noAddId ? {} : {_id: rowId},
        vars = [],
        vals = [];
      for (var k in row) {
        if (keepSet[k]) {
          save[k] = row[k];
        } else {
          vars.push(k);
          vals.push(row[k]);
        }
      }
      for (var i = 0; i < vars.length; i++) {
        var newRow = {};
        newRow[varName] = vars[i];
        newRow[valName] = vals[i];
        newData.push(extend(newRow, save));
      }
    });
    return newData;
  }

  function cast(data, keep, fun) {
    var funArgs = Array.prototype.slice.call(arguments, 3),
    keepData = {},
    funStash = {};

    data.forEach(function (row) {
      var newRow = {};
      var aggKey = keep.map(function (key) {
        return newRow[key] = row[key];
      }).join('\0');

      if (!keepData[aggKey])
        keepData[aggKey] = extend({}, newRow);
      var args = funArgs.slice(0);
      args.unshift(row, keepData[aggKey]);
      keepData[aggKey] = fun.apply(funStash, args);
    });

    return Object.keys(keepData).map(function (k) {
      return keepData[k];
    });
  }

  cast.sum = function (row, acc, name, cols) {
    if (!this.sum) {
      var sum = function (row, acc, name, cols) {
        acc[name] = cols.reduce(function (a, k) {
          return a + row[k];
        }, acc[name] || 0);
        return acc;
      };
      this.sum = function (row, acc) {
        if (cols === undefined) cols = name;
        if (typeof (cols) == 'string') cols = [cols];
        return sum(row, acc, name, cols);
      };
    }
    return this.sum(row, acc);
  };

  cast.count = function (row, acc, name) {
    if (!acc[name]) acc[name] = 0;
    acc[name] += 1;
    return acc;
  };

  melt.cast = cast;
  return melt;
})(),
  cast = melt.cast;
