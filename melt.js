function melt(data, keep, varName, valName, noAddId) {
    var newData = [],
        varName = varName || 'variable',
        valName = valName || 'value',
        keepSet = set(keep);

    function set(keys) {
        var s = {}, keys = keys || [];
        for (var i = 0; i < keys.length; i++) {
            s[keys[i]] = 1;
        }
        return s;
    }

    function extend(obj, copy) {
        for (k in copy) {
            obj[k] = copy[k];
        }
        return obj;
    }

    data.forEach(function(row, i) {
        var save = noAddId ? {} : {_id: i},
            vars = [],
            vals = [];
        for (k in row) {
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
