[![Build Status](https://travis-ci.org/jrideout/melt.js.png?branch=master)](https://travis-ci.org/jrideout/melt.js)

Melt.js
=======

Javascript library inspired by the [R reshape](https://github.com/hadley/reshape) package by Hadley Wickham.

Melt provides two functions `melt` and `cast`. How do they work? 

First, they presume you have your data in the form of a list of objects. That looks like this:

```js
var data = [
  {key1: 1, key2: 2},
  {key1: 2, key2: 3},
  {key1: 3, key2: 5},
];
```

But if you need the keys to be represented as a value, then melt can come to the rescue. Let's take a look at some examples:

Examples
------------

Melt: [jsfiddle](http://jsfiddle.net/mf4Jd/)

Cast: [jsfiddle](http://jsfiddle.net/b5apx/)

API
----

**melt(data, keep, varName, valName, noAddId)**

  * `data` _list of objects_ - data to melt
  * `keep` _array of strings_ - names of object keys to keep
  * `varName` _string_ - name of the key to use in the molten objects for the former keys (those not in keep)
  * `varName` _string_ - name of the key to use in the molten objects for the former values

**cast(data, keep, fun, funArgs ...)**

  * `data` _list of objects_ - data to cast
  * `keep` _array of strings_ - names of object keys to keep (the "GROUP BY" keys)
  * `fun` _function_ - a function used to aggregate values accross grouped objects
  * `funArgs` _mixed_ - arguments to passed to `fun`
  
**cast.sum(name, cols)** - convience function to summarize data with cast

  * `name` _string_ name of resulting object key with sum results
  * `cols` _string or array_ - names of keys to totaled in the sum. Key values should respond to `+`.

**cast.sum(name)** - convience function to sum data with cast

  * `name` _string_ - special case of `cast.sum(name, cols)` name is treated as both `name` and `cols`.

**cast.count(name)** - convience function to count data with cast

  * `name` _string_ - name of resulting object key with which to count objects with common `keep` values

License
-------
Apache 2
