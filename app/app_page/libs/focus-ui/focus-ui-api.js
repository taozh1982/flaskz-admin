/*! Focus UI v2.5.3rc5 | http://www.focus-ui.com | 2026-01-22 */
/**
 * @namespace
 */
var z = {};
/**
 * Releases the hold on the z shortcut identifier, so that other scripts can use it.
 *
 * @return {z}reference     - A reference to z, that you can save in a variable, for later use
 *
 * @example
 * var zx = z.noConflict();
 * console.log(zx.util.isString("abc"));
 */
z.noConflict = function () {
};

/**
 * @memberOf z
 * @namespace
 */
z.util = {
    /**
     * @deprecated  please use {@link z.type.isArray}
     */
    isArray: function (value) {
    },
    /**
     * @deprecated  please use {@link z.type.isString}
     */
    isString: function (value) {
    },
    /**
     * @deprecated  please use {@link z.type.isBoolean}
     */
    isBoolean: function (value) {
    },
    /**
     * @deprecated  please use {@link z.type.isObject}
     */
    isObject: function (value) {
    },
    /**
     * @deprecated  please use {@link z.type.isFunction}
     */
    isFunction: function (value) {
    },
    /**
     * @deprecated  please use {@link z.type.isNumber}
     */
    isNumber: function (value) {
    },

    /**
     * Merges one or more arrays to the target array
     *
     * @param {Array}targetArray        - The target array.
     * @param {Array}srcArrays          - The source array(s).
     *
     * @return {Array}targetArray       - The target array.
     *
     * @example
     * z.util.mergeArray([1,2],[3,4]);//[1,2,3,4]
     * z.util.mergeArray([1, 2], [3], [4], [[5, 6]]);//[1, 2, 3, 4, [5, 6]]
     */
    mergeArray: function (targetArray, srcArrays) {
    },
    /**
     * Executes a provided function once for each array element.
     * <b>★The callback function returns false to break the loop. If the loop will not be broken, just uses array.forEach.</b>
     *
     * @param {Array}array          - The array that eachArray is being applied to.
     * @param {Function}callback    - Function to execute for each element,<b>Returns false to break the loop.</b>, taking two arguments:
     *                                  <ul>
     *                                      <li>currentValue</li>   - The value of the current element being processed in the array.
     *                                      <li>index</li>          - The index of the current element being processed in the array.
     *                                  </ul>
     * @param {Object}[thisArg]     - Value to use as this (i.e the reference Object) when executing callback.
     *
     * @return void
     *
     * @example
     * <pre>
     * var array = [1, 2, 3]
     * z.util.eachArray(function (item, index) {
     *    console.log(item);
     * });
     * var has2 = false;
     * z.util.eachArray(function (item, index) {
     *   console.log(item);
     *   if (item === 2) {
     *       has2 = true;
     *       return false;//stop
     *   }
     * });
     * </pre>
     */
    eachArray: function (array, callback, thisArg) {
    },
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     *
     * @param {Array}array          - The array filterArray was called upon.
     * @param {Function}callback    - Function is a predicate, to test each element of the array.
     *                                ★Return <b>true</b> to keep the element, false otherwise. It accepts two arguments:
     *                                  <ul>
     *                                      <li>element</li> - The current element being processed in the array.
     *                                      <li>index</li> - The index of the current element being processed in the array.
     *                                  </ul>
     * @param {Object}[thisArg]     - Value to use as this when executing callback.
     *
     * @return {Array}newArray      - A new array with the elements that pass the test. If no elements pass the test, an empty array[] will be returned.
     *
     * @example
     * <pre>
     * var arr = [10,20,30];
     * var newArr = z.util.filterArray(arr,function (item) {
     *    return item > 10;
     * });
     * console.log(newArr);//[20,30]
     *</pre>
     */
    filterArray: function (array, callback, thisArg) {
    },


    /**
     * Returns the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.
     *
     * @param {Array}array          - The array findArray was called upon.
     * @param {Function}callback    - Function to execute on each value in the array, taking two arguments:
     *                                  <ul>
     *                                      <li>element</li>The current element being processed in the array.
     *                                      <li>index</li>The index of the current element being processed in the array.
     *                                  </ul>
     * @param {Object}[thisArg]     - Value to use as this when executing callback.
     *
     * @return {*}item              - The first element in the array that satisfies the provided testing function(★return true); otherwise, undefined is returned.
     *
     * @example
     * <pre>
     * var arr = [
     *    {name:"a"},
     *    {name:"b"},
     *    {name:"c"}
     * ];
     * var c = z.util.findArray(arr,function (item) {
     *    return item.name === "c"
     * });
     * console.log(c);//{name:"c"}
     *</pre>
     */
    findArray: function (array, callback, thisArg) {
    },
    /**
     *  Removes the first element in the array that satisfies the provided testing function.
     *
     * @param {Array}array          - The array removeArrayItem was called upon.
     * @param {Function}callback    - Function to execute on each value in the array, taking two arguments:
     *                                  <ul>
     *                                      <li>element</li> - The current element being processed in the array.
     *                                      <li>index</li> - The index of the current element being processed in the array.
     *                                  </ul>
     *                                  ★<b>If the callback function returns true, the item will be removed and returned</b>
     * @param {Object}[thisArg]     - Value to use as this when executing callback.
     *
     * @return {*}removedItem       - The first element in the array that satisfies the provided testing function; otherwise, undefined is returned.
     *
     * @example
     * <pre>
     * var arr = [
     *    {name: "a"},
     *    {name: "b"},
     *    {name: "c"}
     * ];
     * var bItem = z.util.removeArrayItem(arr, function (item) {
     *    return item.name === "b";
     * });
     * console.log(bItem);//{name:"b"}
     * console.log(arr);//[{name: "a"},{name: "c"}]
     * </pre>
     */
    removeArrayItem: function (array, callback, thisArg) {
    },
    /**
     * Creates an object composed of keys generated from the results of running each element of array.
     *
     * @param {Array}array                          - The specified array to be converted
     * @param {string|Function}keyOrFunction        - The specified key property or the function to generate the key.
     * @param {Object}[thisArg]                     - Value to use as this when executing key function. If keyOrFunction is not a function, it will be ignored.
     *
     * @return {Object}mapObject                    - The composed aggregate object.
     *
     * @example
     * <pre>
     * var array = [
     *      {name: "a", value: 10},
     *      {name: "b", value: 20},
     *      {name: "c", value: 30}
     * ];
     * var map1 = z.util.toArrayMap(array, "name");
     * console.log(map1);//{a:{"name":"a","value":10},b:{"name":"b","value":20},c:{"name":"c","value":30}}
     * var map2 = z.util.toArrayMap(array, function (item) {
     *      return "_" + item.name;
     * });
     * console.log(map2);//{_a:{"name":"a","value":10},_b:{"name":"b","value":20},_c:{"name":"c","value":30}}
     *
     * </pre>
     */
    toArrayMap: function (array, keyOrFunction, thisArg) {
    },

    /**
     * Merges the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
     * *Properties in the target object will be overwritten by properties in the sources if they have the same key.
     * *Later sources' properties will similarly overwrite earlier ones.
     * *For deep merge, please see {@link z.util.deepMergeObject}.
     *
     * @param {Object}targetObject          - The target object.
     * @param {...Object}sourceObjects      - The source object(s).
     *
     * @return {Object}targetObject         - The target object.
     *
     *
     * @example
     * <pre>
     * console.log(z.util.mergeObject({a: 1, b: 2, c: {x: 100, y: 200}}, {d: 4}, {e: "a"}));
     * {
     *   a: 1,
     *   b: 2,
     *   c: {x: 100, y: 200},
     *   d: 4,
     *   e: "a"
     * }
     *
     * console.log(z.util.mergeObject({a: 1, b: 2, c: {x: 100, y: 200}}, {c: 4}, {e: "a"}));
     * {
     *   a: 1,
     *   b: 2,
     *   c: 4,
     *   e: "a"
     * }
     *
     * console.log(z.util.mergeObject({a: 1, b: 2, c: {x: 100, y: 200}}, {c: {z: 300}}, {e: "a"}));
     * {
     *   a: 1,
     *   b: 2,
     *   c: {z: 300},
     *   e: "a"
     * }
     *</pre>
     */
    mergeObject: function (targetObject, sourceObjects) {
    },
    /**
     * Merges the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
     * The difference between {@link z.util.deepMergeObject} and {@link z.util.mergeObject} is that for the Object type property,
     * <ul>
     *     <li>mergeObject</li>only makes a simple assignment
     *     <li>deepMergeObject</li>creates a new object and assigns to the targetObject
     * </ul>
     *
     * @param {Object}targetObject          - The target object.
     * @param {...Object}sourceObjects      - The source object(s).
     *
     * @return {Object}targetObject         - The target object.
     *
     *
     * @example
     * <pre>
     * console.log(z.util.deepMergeObject({a: 1, b: 2, c: {x: 100, y: 200}}, {d: 4}, {e: "a"}));
     * //same as mergeObject
     * {
     *   a: 1,
     *   b: 2,
     *   c: {x: 100, y: 200},
     *   d: 4,
     *   e: "a"
     * }
     *
     * console.log(z.util.deepMergeObject({a: 1, b: 2, c: {x: 100, y: 200}}, {c: 4}, {e: "a"}));
     * //same as mergeObject
     * {
     *   a: 1,
     *   b: 2,
     *   c: 4,
     *   e: "a"
     * }
     *
     * console.log(z.util.deepMergeObject({a: 1, b: 2, c: {x: 100, y: 200}}, {c: {z: 300}}, {e: "a"}));
     * //Different from mergeObject
     * {
     *   a: 1,
     *   b: 2,
     *   c:{x: 100, y: 200, z: 300},
     *   e: "a"
     * }
     *</pre>
     */
    deepMergeObject: function (targetObject, sourceObjects) {
    },
    /**
     * Executes a provided function once for each object enumerable own property.
     *
     * @param {Object}object        - The object that eachObject is being applied to.
     * @param {Function}callback    - Function to execute for each property, taking two arguments:
     *                                  <ul>
     *                                      <li>key</li>     - The key of the current property being processed in the object.
     *                                      <li>value</li>   - The value of the current property being processed in the object.
     *                                  </ul>
     *                                  *<b>If the callback function returns false, the eachObject will stop</b>
     * @param {Object}[thisArg]     - Value to use as this when executing callback.
     *
     * @return void
     *
     * @example
     * <pre>
     * var obj = {name:"focus-ui",version:0.6};
     * z.util.eachObject(obj,function (key, value) {
     *    console.log(key,value);
     * });
     * </pre>
     */
    eachObject: function (object, callback, thisArg) {
    },
    /**
     *  Creates a new object with all enumerable own properties that pass the test implemented by the provided function.
     *
     * @param {Object}object        - The object that filterObject is being applied to.
     * @param {Function}callback    -  Function is a predicate, to test each enumerable own property of the object. Return true to keep the property, false otherwise. It accepts two arguments:
     *                                  <ul>
     *                                      <li>key</li>     - The key of the current property being processed in the object.
     *                                      <li>value</li>   - The value of the current property being processed in the object.
     *                                  </ul>
     *
     * @param {Object}[thisArg]     - Value to use as this when executing callback.
     *
     * @return {Object}newObject   - A new object with the enumerable own properties that pass the test. If no properties pass the test, an empty object will be returned.
     *
     * @example
     * <pre>
     * var object = {
     *      a: 1,
     *      b: 2,
     *      c: {x: 100, y: 200},
     *      d: "abc",
     *      e: "123"
     *  };
     * var stringObject = z.util.filterObject(object, function (key, value) {
     *    return z.util.isString(value);
     * });
     * console.log(stringObject);//{d:"abc",e:"123"}
     * </pre>
     *
     */
    filterObject: function (object, callback, thisArg) {
    },
    /**
     *  Gets the value at path of object.
     *  <b>Only processing object, array is not processed</b>
     * @param {Object}object            - The object to query
     * @param {string}deepPath          - The path of the property to get
     *
     * @param {string}[pathSeparator]   - Optional. Specifies the character, or the regular expression, to use for splitting the path. default "."
     *
     * @return {*}value                 - The result value.
     *
     * @example
     * <pre>
     * var object = {
     *     c: {
     *         x: 100,
     *         y: 200,
     *         z: {
     *             a: "abc",
     *             b: "xyz"
     *         }
     *     }
     * };
     * var czb = z.util.getObjectDeepValue(object, "c.z.b");//"xyz"
     *</pre>
     */
    getObjectDeepValue: function (object, deepPath, pathSeparator) {
    },
    /**
     *  Sets the value at path of object. If a portion of path doesn't exist, it's created
     *  <b>Only processing object, array is not processed</b>
     *
     * @param {Object}object            - The object to modify
     * @param {string}deepPath          - The path of the property to set.
     * @param {*}value                  - The value to set.
     * @param {string}[pathSeparator]   - Optional. Specifies the character, or the regular expression, to use for splitting the path. default "."
     *
     * @return void
     *
     * @example
     * <pre>
     * var object = {
     *     c: {
     *         x: 100, y: 200, z: { a: "abc",b: "xyz"}
     *     }
     * };
     * z.util.setObjectDeepValue(object, "a", "1");
     * z.util.setObjectDeepValue(object, "b.m", "1000");
     * z.util.setObjectDeepValue(object, "c.z.c", 123);
     * console.log(object)
     * /!*{
     *       a: "1",
     *       b: {m: "1000" },
     *      c: {x: 100, y: 200, z: {a: "abc", b: "xyz", c: 123}}
     *   }*!/
     * </pre>
     */
    setObjectDeepValue: function (object, deepPath, value, pathSeparator) {
    },
    /**
     * Returns an array of a given object's own enumerable property values.
     *
     * @param {Object}object            - The object whose enumerable own property values are to be returned.
     * @return {Array}valueArray        - An array containing the given object's own enumerable property values.
     *
     * @example
     * <pre>
     * var object = {
     *    a: 'a',
     *    b: 1,
     *    c: false
     * };
     * console.log(z.util.getObjectValues(object));//["a", 1, false]
     * </pre>
     *
     */
    getObjectValues: function (object) {
    },
    /**
     * Gets a key-value map object with the deep keys of a given object.
     *
     *
     * @param {Object}object    - The object whose enumerable own property values are to be returned.
     *
     * @return {Object}map      - A key-value map object with the deep keys.
     *
     * @example
     * <pre>
     *  var object = {
     *    k1: {
     *      k2: {
     *          v1: 100,
     *          v2:true
     *      }
     *    }
     * };
     * console.log(z.util.getObjectDeepKVMap(object))
     * //result
     * {
     *   k1.k2.v1: 100
     *   k1.k2.v2: true
     * }
     * </pre>
     */
    getObjectDeepKVMap: function (object) {
    },

    /**
     * Extend the child function class from the parent function class with specified property properties .
     * Generally, use {@link z.util.newClass} to create new class.
     *
     * @param {Function}Child           - The child function class to be extended.
     * @param {Function|Object}Parent          - The specified parent function class.
     * @param {Object}[protoProps]      - The extended prototype properties of the child class.
     *
     * @return void
     *
     * @example
     * <pre>
     * var PropertySheet = function () {
     *     PropertySheet.superClass.constructor.apply(this, arguments);
     * };
     *  z.util.extendClass(PropertySheet, z.widget.TreeGrid, {
     *     setProperties: function (properties) {
     *         this.setData(properties);
     *     },
     *  });
     * </pre>
     *
     * @see {@link z.util.newClass}
     *
     */
    extendClass: function (Child, Parent, protoProps) {
    },
    /**
     * Creates a class object using the specified parent class, prototype properties and default class properties.
     *
     * @param {Function}parentClass     - The parent class of the new class. The default is Object.
     * @param {Function}constructor     - The constructor function of the new class.
     * @param {Object}[protoProps]      - The prototype properties of the new class.
     * @param {Object}[defaultProps]    - the default class properties of the new class.
     *
     * @return {Function}clazz          - The new class.
     *
     * @example
     * <pre>
     * var CanNode = z.util.newClass(z.gv.Node,
     * function(shapes){ //constructor function
     *     this.shape = shapes[0]
     * },
     * {//prototype properties
     *     draw: function (g2d, node) {
     *         //..custom draw
     *     }
     * }, {alpha: 0});
     * </pre>
     */
    newClass: function (parentClass, constructor, protoProps, defaultProps) {
    },

    /**
     * Executes the string expression as code with the specified parameters.
     *
     * @param {string}expr          - The expression to be executed
     * @param {Object}vars          - The specified parameter variables
     * @param {RegExp}[varRegExp]   - The regex to match the variables. If omitted, the regex is /([\[({])(.+?)([\])}])/g
     *
     * @return {*}result            - The execution result
     *
     * @example
     * z.util.exec("{age}>10&&{age}<20", {age: 12});//true
     * z.util.exec("{age}>10&&{age}<20", {age: 2});//false
     */
    exec: function (expr, vars, varRegExp) {
    },

    /**
     * Returns the date string in the specified format.
     *
     * @param {string|number|Date}date  - The date to be formatted. It can be a string, timestamp or Date object.
     * @param {Object}[options]         - Optional, The format options.
     *                                      <table>
     *                                              <tr>
     *                                                  <th>#option#</th>
     *                                                  <th>#description#</th>
     *                                                  <th>#default#</th>
     *                                              </tr>
     *                                              <tr>
     *                                                  <td>date_format</td>
     *                                                  <td>the format of the date string to be formatted, ex)'%Y-%m-%d %H:%M:%S'</td>
     *                                                  <td></td>
     *                                              </tr>
     *                                              <tr>
     *                                                  <td>out_format</td>
     *                                                  <td>the format of the result</td>
     *                                                  <td>%Y-%m-%d %H:%M:%S</td>
     *                                              </tr>
     *                                              <tr>
     *                                                  <td>timezone_offset</td>
     *                                                  <td>timezone offset in minutes</td>
     *                                                  <td>new Date().getTimezoneOffset()</td>
     *                                              </tr>
     *                                          </table>
     *
     * @return {string}result           - the date string in the specified format
     *
     * @example
     * z.util.formatDate("Fri, 06 Jun 2023 10:20:30 GMT"); // "2023-06-06 18:20:30"
     * z.util.formatDate("2023-06-06T10:20:30Z"); // "2023-06-06 18:20:30"
     * z.util.formatDate("2023-06-06T10:20:30+08:00"); // '2023-06-06 10:20:30'
     *
     */
    formatDate: function (date, options) {
    },

    /**
     *  Calls a function after a specified number of milliseconds.
     *
     * @param {Function}callBack        - The function that will be executed
     * @param {number}[delay]           - The number of milliseconds to wait before executing the code. If omitted, the value 20 is used
     * @param {Object}[thisArg]         - Value to use as this when executing callback.
     *
     * @return {string} callLaterID     - A string type value, representing the ID value of the timer that is set.
     *                                     Use this value with the cancelCallLater() method to cancel the timer.
     *
     * @example
     * <pre>
     * z.util.callLater(function () {
     *     console.log("1s later")
     * }, 1000)
     * </pre>
     * @see {@link z.util.cancelCallLater}
     */
    callLater: function (callBack, delay, thisArg) {
    },
    /**
     *
     * Cancels the function set with the callLater() to execute:
     *
     * @param {string|Function}idOrFunction     - The identifier/function you want to cancel callLater.
     *                                             <ul>
     *                                                 <li>IF it is id</li>that should be returned by the corresponding call to callLater().
     *                                                 <li>IF it is function</li>that should be the callBack function
     *                                             </ul>
     *
     * @param {number}[delay]                   - The number of milliseconds to wait before executing the code. If omitted, the value 20 is used
     * @param {Object}[thisArg]                 - Value to use as this when executing callback.
     *
     * @return void
     *
     * @example
     * <pre>
     * //id
     * var id = z.util.callLater(function () {
     *     console.log("never called")
     * }, 1000);
     * z.util.cancelCallLater(id);
     *
     * //function
     * var callBack = function () {
     *     console.log("never called")
     * };
     * z.util.callLater(callBack, 1000);
     * z.util.cancelCallLater(callBack, 1000);
     * </pre>
     *
     * @see {@link z.util.callLater}
     */
    cancelCallLater: function (idOrFunction, delay, thisArg) {
    },
    /**
     * Calls a function with a fixed time delay between each call
     *
     * @param {Function}callBack            - The function that will be executed.
     *                                          <b>If the callback function returns false, the callInterval will stop.</b>
     * @param {number}[intervals]           - The intervals (in milliseconds) on how often to execute the code. If omitted, the value 20 is used.
     * @param {Object}[thisArg]             - Value to use as this when executing callback.
     * @param {boolean}[immediately]        - If true, the callBack function will execute immediately, when call callInterval.
     * @param {boolean}[onlyDomVisible]     - If true, the callBack function will only be executed when the document is visible(document.visibilityState==="visible").
     *
     * @return {string} callIntervalID      - A string type value, representing the ID value of the timer that is set.
     *                                         Use this value with the cancelCallInterval() method to cancel the timer.
     *
     * @example
     * <pre>
     * z.util.callInterval(function () {
     *     console.log("1s")
     * }, 1000);
     *
     * z.util.callInterval(function () {
     *     console.log("Run only once immediately");
     *     return false;//stop interval
     * }, 10000,null,true,true)
     * </pre>
     *
     * @see {@link z.util.cancelCallInterval}
     */
    callInterval: function (callBack, intervals, thisArg, immediately, onlyDomVisible) {
    },
    /**
     * Cancels the function set with the callInterval() to execute:
     *
     * @param {string|Function}idOrFunction     - The identifier/function you want to cancel callInterval.
     *                                             <ul>
     *                                                 <li>IF it is id</li>that should be returned by the corresponding call to callInterval().
     *                                                 <li>IF it is function</li>that should be the callBack function
     *                                             </ul>
     * @param {number}[intervals]               - The intervals (in milliseconds) on how often to execute the code. If omitted, the value 20 is used.
     * @param {Object}[thisArg]                 - Value to use as this when executing callback.
     *
     * @return void
     *
     * @example
     * <pre>
     * //id
     * var id = z.util.callInterval(function () {
     *        console.log("never called")
     *    }, 1000);
     * z.util.cancelCallInterval(id);
     *
     * //function
     * var callBack = function () {
     *        console.log("never called")
     *    };
     * z.util.callInterval(callBack, 1000);
     * z.util.cancelCallInterval(callBack, 1000)
     *</pre>
     * @see {@link z.util.callInterval}
     */
    cancelCallInterval: function (idOrFunction, intervals, thisArg) {
    },
    /**
     * Calls a function before the browser next repaint.
     *
     * @param {Function}callBack        - The function that will be executed
     * @param {Object}[thisArg]         - Value to use as this when executing callback.
     *
     * @return void
     *
     * @example
     * <pre>
     * z.util.callRAFLater(function () {
     *    console.log("callRAFLater")
     * });
     * </pre>
     *
     * @see {@link z.util.callLater}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame|requestAnimationFrame}
     */
    callRAFLater: function (callBack, thisArg) {
    },
    /**
     * Calls a function when browser repaints.
     *
     * @param {Function}callBack            - The function that will be executed.
     *                                          <b>If the callback function returns false, the callInterval will stop.</b>
     * @param {Object}[thisArg]             - Value to use as this when executing callback.
     * @param {boolean}[immediately]        - if true the callBack function will execute immediately, when call callInterval.
     *
     * @return {string} callRAFIntervalID   - A string type value, representing the ID value of the timer that is set.
     *                                         Use this value with the cancelCallRAFInterval() method to cancel the timer.
     *
     * @example
     * <pre>
     * z.util.callRAFInterval(function () {
     *    console.log("callRAFInterval")
     * });
     *
     * var time = 0;
     * z.util.callRAFInterval(function () {
     *     console.log(time++);
     *     return time < 10;//stop interval
     * },  null, true)
     * </pre>
     *
     * @see {@link z.util.callInterval}
     * @see {@link z.util.cancelCallRAFInterval}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame|requestAnimationFrame}
     */
    callRAFInterval: function (callBack, thisArg, immediately) {
    },
    /**
     *  Cancels the function set with the callRAFInterval() to execute:
     *
     * @param {string|Function}idOrFunction     - The identifier/function you want to cancel callRAFInterval.
     *                                             <ul>
     *                                                 <li>IF it is id</li>that should be returned by the corresponding call to callRAFInterval().
     *                                                 <li>IF it is function</li>that should be the callBack function
     *                                             </ul>
     * @param {Object}[thisArg]                 - Value to use as this when executing callback.
     *
     * @return void
     *
     * @example
     * <pre>
     * //id
     * var id = z.util.callRAFInterval(function () {
     *     console.log("callRAFInterval")
     * });
     * z.util.cancelCallRAFInterval(id);
     * //function
     * var callBack = function () {
     *     console.log("callRAFInterval")
     * };
     * z.util.callRAFInterval(callBack);
     * z.util.cancelCallRAFInterval(callBack);
     * </pre>
     *
     * @see {@link z.util.callRAFInterval}
     */
    cancelCallRAFInterval: function (idOrFunction, thisArg) {
    },

    /**
     * Run a animation
     * @param {Function}frameFun        - The animation frame callback function.
     * @param {Object}options           - The animation options.
     *                                      <table>
     *                                              <tr>
     *                                                  <th>#argument#</th>
     *                                                  <th>#description#</th>
     *                                                  <th>#default#</th>
     *                                              </tr>
     *                                              <tr>
     *                                                  <td>duration</td>
     *                                                  <td>The duration defines how long time(milliseconds) an animation should take to complete.
     *                                                      If the animation-duration property is not specified, no animation will occur, because the default value is 0</td>
     *                                                  <td>0</td>
     *                                              </tr>
     *                                              <tr>
     *                                                  <td>delay</td>
     *                                                  <td>The delay property specifies a delay(milliseconds) for the start of an animation</td>
     *                                                  <td>0</td>
     *                                              </tr>
     *                                              <tr>
     *                                                  <td>frame</td>
     *                                                  <td>The specified frame callback function</td>
     *                                                  <td></td>
     *                                              </tr>
     *                                              <tr>
     *                                                  <td>finish</td>
     *                                                  <td>The callback function that will be called when animation ends</td>
     *                                                  <td></td>
     *                                              </tr>
     *                                              <tr>
     *                                                  <td>timing</td>
     *                                                  <td>The timing function property specifies the speed curve of the animation.
     *                                                      The valid values are: ""linear", "ease", "ease-in", "ease-out", "ease-in-out", "cubic-bezier(0.1, 0.7, 1.0, 0.1)".
     *                                                      A function can be specified to custom the timing easing</td>
     *                                                  <td>"linear"</td>
     *                                              </tr>
     *                                              <tr>
     *                                                  <td>direction</td>
     *                                                  <td>The direction property specifies whether the animation runs forwards (normal), backwards (reverse),
     *                                                      switches direction after each iteration (alternate), or runs backwards and switches direction after each iteration (alternate-reverse).</td>
     *                                                  <td>"normal"</td>
     *                                              </tr>
     *                                              <tr>
     *                                                  <td>iteration_count</td>
     *                                                  <td>The iteration_count property specifies the number of times an animation should run.
     *                                                      Sets the Infinite value to make the animation continue for ever
     *                                                  </td>
     *                                                  <td>1</td>
     *                                              </tr>
     *                                          </table>
     * @return {number}animate_id
     *
     * @example
     * <pre>
     * z.util.animate(
     *      {
     *          duration: 6000,
     *          delay: 300,
     *          iteration_count: Infinity,
     *          direction: "alternate",
     *          timing: "linear",
     *          frame: function (process) {
     *              node.set("x", 60 + process * 600)
     *          }
     *      });
     * </pre>
     */
    animate: function (frameFun, options) {
    },

    color: {
        /**
         * Gets the color in rgb format.
         *
         * @param {string}color                 - The color to be converted
         * @param {boolean}[returnObj]          - If true, return the color object
         *
         * @return {string|Object} rgbColor     - The color in rgb format or the color object.
         *
         * @example
         * console.log(z.util.color.toRGB("rgb(0, 191, 255)")) //rgb(0,191,255)
         * console.log(z.util.color.toRGB("rgb(0, 191, 255)" ,true)) //{red: 0, green: 191, blue: 255}
         */
        toRGB: function (color, returnObj) {
        },
        /**
         * Gets the color in rgb format with an alpha channel.
         *
         * @param {string}color                 - The color to be converted
         * @param {boolean}[returnObj]          - If true, return the color object
         *
         * @return {string|Object} rgbaColor    - The color in rgb format or the color object.
         *
         * @example
         * console.log(z.util.color.toRGBA("rgb(0, 191, 255)")) //rgba(0, 191, 255, 1)
         * console.log(z.util.color.toRGBA("rgb(0, 191, 255)" ,true)) //{red: 0, green: 191, blue: 255, alpha: 1}
         */
        toRGBA: function (color, returnObj) {
        },
        /**
         * Gets the color in hsl format.
         *
         * @param {string}color                 - The color to be converted
         * @param {boolean}[returnObj]          - If true, return the color object
         *
         * @return {string|Object} hslColor     - The color in hsl format or the color object.
         *
         * @example
         * console.log(z.util.color.toHSL("rgb(0, 191, 255)")) //hsl(195, 100%, 50%)
         * console.log(z.util.color.toHSL("rgb(0, 191, 255)" ,true)) //{hue: 195, saturation: 100, lightness: 50}
         */
        toHSL: function (color, returnObj) {
        },
        /**
         * Gets the color in hsl format with an alpha channel.
         *
         * @param {string}color                 - The color to be converted
         * @param {boolean}[returnObj]          - If true, return the color object
         *
         * @return {string|Object} hslaColor    - The color in hsl format or the color object.
         *
         * @example
         * console.log(z.util.color.toHSLA("rgb(0, 191, 255)")) //hsla(195, 100%, 50%, 1)
         * console.log(z.util.color.toHSLA("rgb(0, 191, 255)" ,true)) //{hue: 195, saturation: 100, lightness: 50, alpha:1}
         */
        toHSLA: function (color, returnObj) {
        },
        /**
         * Gets the color in hex format.
         *
         * @param {string}color             - The color to be converted
         *
         * @return {string} hexColor        - The color in hex format.
         *
         * @example
         * console.log(z.util.color.toHex("rgb(0, 191, 255)"))  // #00bfff
         */
        toHex: function (color) {
        },
        /**
         * Gets the name by the specified color value.
         *
         * @param {string}color             - The color value to be converted
         *
         * @return {string} colorName       - The color name.
         *
         * @example
         * console.log(z.util.color.toName("rgb(0, 191, 255)")) //DeepSkyBlue
         */
        toName: function (color) {
        },
        /**
         * Increases the lightness of a color.
         *
         * @param {string}color                     - The color to be lighten
         * @param {number}[amount]                  - The lighten amount 0-1. If omitted, value is 0.1(100%)
         * @param {string}[toType]                  - The result type of the color. If omitted, the result type is the type of the color
         * @param {boolean}[returnObj]              - If true, return the color object
         *
         * @return {string|Object} lightenColor    - The lighten color.
         *
         * @example
         * z.util.color.lighten("rgb(0, 191, 255)"); //rgb(51, 204, 255)
         */
        lighten: function (color, amount, toType, returnObj) {
        },
        /**
         * Decreases the lightness of a color.
         *
         * @param {string}color                     - The color to be darken
         * @param {number}[amount]                  - The darken amount 0-1. If omitted, value is 0.1(100%)
         * @param {string}[toType]                  - The result type of the color. If omitted, the result type is the type of the color
         * @param {boolean}[returnObj]              - If true, return the color object
         *
         * @return {string|Object} darkenColor      - The darken color.
         *
         * @example
         * z.util.color.darken("rgb(0, 191, 255)"); //rgb(0, 153, 204)
         */
        darken: function (color, amount, toType, returnObj) {
        },
        /**
         * Gets a random color.
         *
         * @param {string}[toType]              - The specified color format, default is "hex"
         * @param {boolean}[returnObj]          - If true, return the color object
         *
         * @return {string|Object} color        - The random color
         *
         * @example
         *
         * z.util.color.random();//"#b0e0e6"
         * z.util.color.random("rgb");//"rgb(100,120,200)"
         * z.util.color.random("name");//"DarkOliveGreen"
         * z.util.color.random("hsl");//"hsl(90, 100%, 30%)"
         */
        random: function (toType, returnObj) {
        },
        /**
         * Gets the default color list or the specified color by index.
         *
         * @param {number}[index]                   - The specified color index, if omitted, return the default color list.
         *
         * @return {Array|string}defaultColors      - The default color list the specified color by index
         *
         * @example
         * z.util.color.defaults();// ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc", "#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"]
         * z.util.color.defaults(1);// "#91cc75"
         *
         */
        defaults: function (index) {
        },
        /**
         * Mixes two colors together in variable proportion. Opacity is included in the calculations.
         *
         * @version 2.3.1
         *
         * @param {string}color1            - The start color
         * @param {string}color2            - The end color
         * @param {number}[weight]          - Optional, a percentage balance point between the two colors, defaults to 0.5
         * @param {string}[toType]          - The specified color format, default is "hex"
         * @param {boolean}[returnObj]      - If true, return the color object
         *
         * @return {string|Object} color    - The mixed color
         *
         * @example
         *
         * z.util.color.mix("red", "green");//#804000
         * z.util.color.mix("rgba(100,0,0,1.0)", "rgba(0,100,0,0.5)");//#323200
         * z.util.color.mix("rgba(100,0,0,1.0)", "rgba(0,100,0,0.5)", 0.6, "rgba", true);// {"red": 40, "green": 60, "blue": 0, "alpha": 0.7}
         */
        mix: function (color1, color2, weight, toType, returnObj) {
        }
    },
    image: {
        /**
         * Registers an image with the specified name and src. Once registration, you can use it directly by name.
         *
         * @param {string}name              - The name of the image.
         * @param {string|Image}imgSrc      - The source of the image. It can be a url, an img element or an image in base64 format.
         *
         * @return void
         *
         * @example
         * <pre>
         * z.util.image.register("register_url_png", "../_icons/browser/Chrome.png"); //url
         * z.util.image.register("register_img_svg", z.dom.query("#iconImg")); //image element
         * z.util.image.register("register_base64_svg", "data:image/svg+xml;base64,PD94bWwgd..."); //base64 string
         * </pre>
         */
        register: function (name, imgSrc) {
        },
        /**
         * Returns the registered image.
         * If the specified image has been registered and loaded, The image object will be returned.
         * Otherwise, it will be loaded first, and the loadCallBack function will be called after loading.
         *
         * @param {string}name                  - The name of the registered image.  @see {@link z.util.image.register}
         * @param {Function}[loadCallBack]      - The callback function after the image is loaded.
         * @param {Object}[thisArg]             - The Value to use as this (i.e the reference Object) when executing loadCallBack.
         *
         * @return {Image}img                   - The registered image object.
         *
         * @example
         * <pre>
         * var img = z.util.image.get(node.get("avatar"), function () {
         *      view.update();
         *  });
         * if (img) {//...
         *  }
         * </pre>
         *
         */
        get: function (name, loadCallBack, thisArg) {
        },
        /**
         * Clears the registered images.
         *
         * @return void
         *
         * @example
         * z.util.image.clear();
         */
        clear: function () {
        }
    }
};

/**
 * @memberOf z
 * @namespace
 */
z.type = {
    /**
     * Determines whether the passed value is an Array.
     *
     * @param {*}value              - The value to be checked.
     *
     * @return {boolean}value       - true if the value is an Array; otherwise, false.
     *
     * @example
     * z.type.isArray([1,2]);//true
     * z.type.isArray([]);//true
     * z.type.isArray(new Array(1,2));//true
     */
    isArray: function (value) {
    },
    /**
     * Determines whether the passed value is a string.
     *
     * @param {*}value              - The value to be checked.
     *
     * @return {boolean}result      - true if the value is a string; otherwise, false.
     *
     * @example
     * z.type.isString("abc");//true
     * z.type.isString("");//true
     * z.type.isString(new String("abc"));//true
     */
    isString: function (value) {
    },
    /**
     * Determines whether the passed value is a boolean
     *
     * @param {*}value            - The value to be checked.
     *
     * @return {boolean}result    - true if the value is a boolean; otherwise false.
     *
     * @example
     * z.type.isBoolean(true);//true
     * z.type.isBoolean(false);//true
     * z.type.isBoolean(new Boolean(true));//true
     */
    isBoolean: function (value) {
    },
    /**
     * Determines whether the passed value is an Object
     *
     * @param {*}value              - The value to be checked.
     *
     * @return {boolean}result      - true if the value is an Object; otherwise, false.
     *
     * @example
     * z.type.isObject({name:"focus-ui"});//true
     * z.type.isObject({});//true
     * z.type.isObject(Object.create(null));//true
     *
     * z.type.isObject(null) == false;
     * z.type.isObject(undefined) == false;
     */
    isObject: function (value) {
    },
    /**
     * Determines whether the passed value is a Function
     *
     * @param {*}value              - The value to be checked.
     *
     * @return {boolean}result      - true if the value is a Function; otherwise, false.
     *
     * @example
     * z.type.isFunction(function(){});//true
     * z.type.isFunction(Math.abs);//true
     */
    isFunction: function (value) {
    },
    /**
     * Determines whether the passed value is a number
     *
     * @param {*}value              - The value to be checked.
     *
     * @return {boolean}result      - true if the value is a number; otherwise, false.
     *
     * @example
     * z.type.isNumber(0);//true
     * z.type.isNumber(-1);//true
     * z.type.isNumber(new Number(0));//true
     */
    isNumber: function (value) {
    },

    /**
     * Determines whether the passed value is a z.Data instance.
     *
     * @param {*}value              - The value to be checked.
     *
     * @return {boolean}result      - true if the value is a z.Node instance; otherwise, false.
     *
     * @example
     * <pre>
     * z.type.isData(new z.Data()); // true
     *
     * z.type.isData(new z.gv.Node()); // true
     * z.type.isData(new z.gv.Group()); // true
     * z.type.isData(new z.gv.Subview()); // true
     * z.type.isData(new z.gv.Link()); // true
     * </pre>
     */
    isData: function (value) {
    },
    /**
     * Determines whether the passed value is a view component instance.
     *
     * @param {*}value              - The value to be checked.
     *
     * @return {boolean}result      - true if the value is a view component instance; otherwise, false.
     *
     * @example
     * <pre>
     * z.type.isView(new z.gv.GView()); // true
     *
     * z.type.isView(new z.widget.ListView()); // true
     * z.type.isView(new z.widget.Tree()); // true
     * z.type.isView(new z.widget.Grid()); // true
     * z.type.isView(new z.widget.Loader()); // true
     *
     * </pre>
     */
    isView: function (value) {
    },
    /**
     * Determines whether the passed value is a z.Provider instance.
     *
     * @param {*}value              - The value to be checked.
     *
     * @return {boolean}result      - true if the value is a z.Provider instance; otherwise, false.
     *
     * @example
     * <pre>
     * z.type.isProvider(new z.Provider()); // true
     * z.type.isProvider(view.getProvider()); // true
     * </pre>
     */
    isProvider: function (value) {
    },

    /**
     * Determines whether the passed value is a z.gv.Node instance.
     * ★<b>Both z.gv.Group instances and z.gv.Subview instances are node type</b>.
     *
     * @param {*}data               - The value to be checked.
     * @param {boolean}[just]       - If true, return true only if the data is a z.gv.Node instance,
     *                                         return false for z.gv.Group instances and z.gv.Subview instances.
     *
     * @return {boolean}result      - true if the value is a z.gv.Node instance; otherwise, false.
     *
     * @example
     * <pre>
     * z.type.isNode(new z.gv.Node()); // true
     * z.type.isNode(new z.gv.Group()); // true
     * z.type.isNode(new z.gv.Subview()); // true
     *
     * z.type.isNode(new z.gv.Node(), true); // true
     * z.type.isNode(new z.gv.Group(), true); // false
     * z.type.isNode(new z.gv.Subview(), true); // false
     *
     * z.type.isNode(new z.gv.Link()); // false
     * z.type.isNode({}); // false
     * </pre>
     */
    isNode: function (data, just) {
    },
    /**
     * Determines whether the passed value is a z.gv.Link instance.
     * ★<b>z.gv.LinkSubview instance is also link type.</b>.
     *
     * @param {*}data               - The value to be checked.
     * @param {boolean}[just]       - If true, return true only if the data is a z.gv.Link instance,
     *                                         return false for z.gv.LinkSubview instances.
     *
     * @return {boolean}result      - true if the value is a z.gv.Link instance; otherwise, false.
     *
     * @example
     * <pre>
     * z.type.isLink(new z.gv.Link()); // true
     * z.type.isLink(new z.gv.LinkSubview()); // true
     *
     * z.type.isLink(new z.gv.Link(), true); // true
     * z.type.isLink(new z.gv.LinkSubview(), true); // false
     *
     * z.type.isLink(new z.gv.Node()); // false
     * z.type.isLink({}); // false
     * </pre>
     */
    isLink: function (data) {
    },
    /**
     * Determines whether the passed value is a z.gv.Group instance.
     *
     * @param {*}data             - The value to be checked.
     *
     * @return {boolean}result    - true if the value is a z.gv.Group instance; otherwise, false.
     *
     * @example
     * <pre>
     * z.type.isGroup(new z.gv.Group()); // true
     *
     * z.type.isGroup(new z.gv.Node()); // false
     * z.type.isGroup(new z.gv.Link()); // false
     * z.type.isGroup(new z.gv.LinkSubview()); // false
     * </pre>
     */
    isGroup: function (data) {
    },
    /**
     * Determines whether the passed value is a z.gv.Subview instance.
     * ★<b>z.gv.LinkSubview instance is also subview type.</b>.
     *
     * @param {*}data               - The value to be checked.
     *
     * @return {boolean}result      - true if the value is a z.gv.Subview instance; otherwise, false.
     *
     * @example
     * <pre>
     * z.type.isSubview(new z.gv.Subview()); // true
     * z.type.isSubview(new z.gv.LinkSubview()); // true
     *
     * z.type.isSubview(new z.gv.Node()); // false
     * z.type.isSubview(new z.gv.Group()); // false
     * z.type.isSubview(new z.gv.Link()); // false
     * </pre>
     */
    isSubview: function (data) {
    },
    /**
     * Determines whether the passed value is a z.gv.LinkSubview instance.
     *
     * @param {*}data               - The value to be checked.
     *
     * @return {boolean}result      - true if the value is a z.gv.LinkSubview instance; otherwise, false.
     *
     * @example
     * <pre>
     * z.type.LinkSubview(new z.gv.LinkSubview()); // true
     *
     * z.type.LinkSubview(new z.gv.Subview()); // false
     * z.type.LinkSubview(new z.gv.Node()); // false
     * z.type.LinkSubview(new z.gv.Group()); // false
     * z.type.LinkSubview(new z.gv.Link()); // false
     * </pre>
     */
    isLinkSubview: function (data) {
    }
};

/**
 * @memberOf z
 * @namespace
 */
z.dom = {
    /**
     * Queries the first element that matches a specified CSS selector(s) within the document/HTMLElement.
     *
     * @param {string}selectors                     - Specifies one or more CSS selectors to match the element.
     *                                                  These are used to select HTML elements based on their id, classes, types, attributes, values of attributes, etc.
     * @param {string|HTMLElement}[rootElement]     - The root element to query.It can be selectors or an HTMLElement.If omitted, the root element is document.
     *
     * @return Element                              - The first element that matches the specified CSS selector(s).
     *                                                  If no matches are found, null is returned. Throws a SYNTAX_ERR exception if the specified selector(s) is invalid.
     *
     * @example
     * z.dom.query("#id");
     * z.dom.query(".class");
     * z.dom.query("#id","#parentID");
     *
     * @see {@link z.dom.queryAll}
     * @see {@link https://www.w3schools.com/cssref/css_selectors.asp|css_selectors}
     */
    query: function (selectors, rootElement) {
    },
    /**
     *
     * Queries all the elements that match a specified CSS selector(s) within the document/HTMLElement.
     *
     * @param {string}selectors                     - Specifies one or more CSS selectors to match the element.
     *                                                 These are used to select HTML elements based on their id, classes, types, attributes, values of attributes, etc.
     * @param {string|HTMLElement}[rootElement]     - The root element to query.It can be selectors or an HTMLElement.If omitted, the root element is document.
     *
     * @return {Array}elementArray                  - An array,representing all elements in the document that matches the specified CSS selector(s).
     *                                                 The array is static, meaning that changes in the DOM has NO effect in the collection.
     *                                                 Throws a SYNTAX_ERR exception if the selector(s) is invalid
     *
     * @example
     * z.dom.queryAll("a");
     * z.dom.queryAll(".class");
     * z.dom.queryAll("span","div");
     *
     * @see {@link z.dom.query}
     * @see {@link https://www.w3schools.com/cssref/css_selectors.asp|css_selectors}
     */
    queryAll: function (selectors, rootElement) {
    },
    /**
     * Gets the element immediately following the specified element, in the same tree level.
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     *
     * @return {HTMLElement}nextElement         - An HTMLElement node, representing the next sibling of an element, or null if there is no next sibling.
     *
     * @example
     * z.dom.nextElementSibling(z.dom.query("i","button"))
     *
     */
    nextElementSibling: function (element) {
    },
    /**
     * Gets the previous element of the specified element, in the same tree level.
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     *
     * @return {HTMLElement}previousElement     - An HTMLElement node, representing the previous sibling of an element, or null if there is no previous sibling.
     *
     * @example
     * z.dom.previousElementSibling(z.dom.query("i","button"))
     */
    previousElementSibling: function (element) {
    },

    /**
     * Adds one or more class names to an element.
     * If the specified class already exist, the class will not be added.
     *
     * @param {string|HTMLElement}element           - The specified element.It can be selectors or an HTMLElement.
     * @param {...string}cls                        - The specified one or more class names.
     *
     * @return void
     *
     * @example
     * z.dom.addClass("#id", "class1");
     * z.dom.addClass("#id", "class2", "class3");
     * z.dom.addClass("#id", "class4 class5", "class6 class7");
     *
     */
    addClass: function (element, cls) {
    },
    /**
     * Removes one or more class names from an element.
     * Removing a class that does not exist, does NOT throw an error
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     * @param {...string}cls                    - The specified one or more class names.
     *
     * @return void
     *
     * @example
     * z.dom.removeClass("#id", "class1");
     * z.dom.removeClass("#id", "class2", "class3");
     * z.dom.removeClass("#id", "class4 class5", "class6 class7");
     */
    removeClass: function (element, cls) {
    },
    /**
     * Toggles between one or more class names for an element.
     *
     * @param {string|HTMLElement}element           - The specified element.It can be selectors or an HTMLElement.
     * @param {...string}cls                        - The specified one or more class names.
     * @param {boolean}[force]                      - Optional. A boolean value that forces the class to be added or removed, regardless of whether or not it already existed
     *                                                  If the second argument evaluates to true, add specified class value, and if it evaluates to false, remove it.
     *
     * @return void
     *
     * @example
     * <pre>
     * z.dom.toggleClass("#id", "class1");
     * z.dom.toggleClass("#id", "class2", "class3");
     * z.dom.toggleClass("#id", "class4 class5", "class6 class7");
     * z.dom.toggleClass("#id", "class4 class5", "class6 class7",false);//Remove class4 class5 class6 class7
     * z.dom.toggleClass("#id", "class4 class5", "class6 class7",true);//Add class4 class5 class6 class7
     * </pre>
     */
    toggleClass: function (element, cls, force) {
    },
    /**
     * Sets one or more class names to an element.
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     * @param {...string}cls                    - The specified one or more class names.
     *
     * @return void
     *
     * @example
     * z.dom.setClass("#id","class1","class2 class3");
     */
    setClass: function (element, cls) {
    },
    /**
     * Determines whether an element has the specified class name.
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     * @param {string}cls                       - The specified class name.
     *
     * @return {boolean}result                  - true if the element has the specified class name; otherwise, false.
     *
     * @example
     * z.dom.containsClass("#id","class1")
     *
     */
    containsClass: function (element, cls) {
    },

    /**
     * Sets the ★<b>inline</b> style of an element.
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     * @param {string|Object}style              - The style property. If it is Object,the value parameter will be ignored.
     * @param {*}[value]                        - The specified style value.
     *
     * @return void
     *
     * @example
     * <pre>
     * z.dom.setStyle("#id","color","red");
     * z.dom.setStyle("#id",{"color":"red","font-size":"18px","fontWeight":"bold"})
     * <pre>
     */
    setStyle: function (element, style, value) {
    },
    /**
     * Gets the ★actual (computed) CSS property value of the specified element.
     * The computed style is the style actually used in displaying the element, after "stylings" from multiple sources have been applied.
     * Style sources can include: internal style sheets, external style sheets, inherited styles and browser default styles.
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     * @param {string}style                     - The specified style property.
     *
     * @return {*}value                         - The actual (computed) CSS property value.
     *
     * @example
     * z.dom.getStyle("#id","color");
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle|getComputedStyle}
     */
    getStyle: function (element, style) {
    },
    /**
     * Removes the specified ★<b>inline</b> style of an element.
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     * @param {string}style                     - The specified style property.
     *
     * @return void
     *
     * @example
     * z.dom.removeStyle("#id","border");
     */
    removeStyle: function (element, style) {
    },

    /**
     * Sets the value of an attribute on the specified element.
     * If the attribute already exists, the value is updated; otherwise a new attribute is added with the specified name and value.
     *
     * @param {string|HTMLElement}element           - The specified element.It can be selectors or an HTMLElement.
     * @param {string|Object}attributeName          - The specified the name of the attribute whose value is to be set.
     *                                                  If it is Object,the value parameter will be ignored
     * @param {string}[value]                       - The value to assign to the attribute
     *
     * @return void
     *
     * @example
     * z.dom.setAttribute("#id","model","name");
     * z.dom.setAttribute("#id",{"model":"name","disabled":true});
     *
     */
    setAttribute: function (element, attributeName, value) {
    },
    /**
     * Gets the value of a specified attribute on the element.
     * If the given attribute does not exist, the value returned will either be null or "" (the empty string)
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     * @param {string}attributeName             - The name of the attribute whose value you want to get.
     *
     * @return {string} value                   - A string, representing the specified attribute's value.
     *
     * @example
     * z.dom.getAttribute("#id","model");
     */
    getAttribute: function (element, attributeName) {
    },
    /**
     * Gets all the attributes map on the element.
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     *
     * @return {Object} value                   - A Object, representing all the attributes.
     *
     * @example
     * <pre>
     * &lt;input id="nameInput" model="name" rules="required" class="form-control"&gt
     *
     * console.log(z.dom.getAttributes("#nameInput"));
     * {
     *     id:"nameInput" ,
     *     model:"name" ,
     *     rules:"required" ,
     *     class:"form-control" ,
     * }
     * </pre>
     */
    getAttributes: function (element) {
    },
    /**
     * Removes the attribute with the specified name from the element.
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     * @param {string}attributeName             - The name of the attribute whose value you want to remove.
     *
     * @return void
     *
     * @example
     * z.dom.removeAttribute("#id","model")
     *
     */
    removeAttribute: function (element, attributeName) {
    },
    /**
     * Determines whether the specified element has the specified attribute or not.
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     * @param {string}attributeName             - The specified name of the attribute.
     *
     * @return {boolean}result                  - A boolean, returns true if the element has attributes, otherwise false
     *
     * @example
     * z.dom.hasAttribute("#id","model")
     */
    hasAttribute: function (element, attributeName) {
    },

    /**
     * Sets the value of the element.
     * If element is a multiple select,value should be an array of values.
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     * @param value                             - The specified value.
     *
     * @return void
     *
     * @example
     * z.dom.setValue("input", "abc");//value
     * z.dom.setValue("checkbox", true);//checked
     * z.dom.setValue("radio", true);//without name attribute: checked
     * z.dom.setValue("radio", "a");//without name attribute: the value of one of the radio group item
     * z.dom.setValue("select", "2");//value
     * z.dom.setValue("multiple_select", ["1","3"]);//value array
     * z.dom.setValue("textarea", "textarea text");//value
     * z.dom.setValue("img", "../_images/Chrome.png");//src
     * z.dom.setValue("div", "innerHTML");//innerHTML
     */
    setValue: function (element, value) {
    },
    /**
     * Gets the value of the element.
     * If element is a multiple select, returns an array of values.
     * If element is a radio input with name attribute, returns the value of the checked item in the same radio groups
     * If element is a radio input without name attribute, returns the checked value(true/false)
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     *
     * @return {*}value                         - The value of the element.
     *
     * @example
     * z.dom.getValue("input");//value
     * z.dom.getValue("checkbox");//checked
     * z.dom.getValue("radio");//without name attribute: checked
     * z.dom.getValue("radio");//without name attribute: the value of the checked item in the same radio groups
     * z.dom.getValue("select");//value
     * z.dom.getValue("textarea");//value
     * z.dom.getValue("img");//src
     * z.dom.getValue("div");//innerHTML
     */
    getValue: function (element) {
    },

    /**
     * Determines whether tagName of the element is the specified type.
     *
     * @param {string|HTMLElement}element       - The specified element. It can be selectors or an HTMLElement.
     * @param {string}tagName                   - The specified tagName.
     *
     * @return {boolean}result                  - true if the tagName of the element is specified; otherwise false.
     *
     * @example
     * console.log(z.dom.isTagType("#setBtn", "button"));
     * console.log(z.dom.isTagType("#getBtn", "BUTTON"));
     *
     */
    isTagType: function (element, tagName) {
    },
    /**
     * Creates an HTMLElement Node with the specified tagName and class.
     *
     * @param {string}tagNameOrHtml         - A string that specifies the type of element to be created or the specified html string.
     * @param {Object|string}[props]        - Optional. The specified properties(className/attributes/style) of the element. If value is string, it will be the className of the element
     * @param {Array}[childNodes]           - Optional. The child nodes to appended to the element
     *
     * @return {HTMLElement}newElement      - An HTMLElement object, which represents the created HTMLElement node
     *
     * @example
     * z.dom.create("div");
     * z.dom.create("div","class1 class2");
     * z.dom.create("input", {className: "filter", attributes: {type: "checkbox"}, style: {"border-color": "#ccc"}});
     * z.dom.create("<div id='info' content='info' style='background: #eee'>Hello World!!</div>")
     * z.dom.create("<input type='checkbox'>")
     */
    create: function (tagNameOrHtml, props, childNodes) {
    },
    /**
     * Creates a Text Node with the specified content, and appends to the element.
     * @param {string|HTMLElement}element           - The parent element of the text node. It can be selectors or an HTMLElement.
     * @param {string}text                          - The specified text content
     *
     * @return void
     *
     * @example
     * <pre>
     * z.dom.appendTo("#headerDiv","header");
     * </pre>
     *
     */
    appendText: function (element, text) {
    },
    /**
     * Removes the element from it's parentNode.
     *
     * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
     *
     * @return {HTMLElement}removedElement      - The removed element.
     *
     * @example
     * z.dom.remove("#id");
     */
    remove: function (element) {
    },
    /**
     * Remove all child nodes from the specified element.
     *
     * @param {string|HTMLElement}element     - The specified element.It can be selectors or an HTMLElement.
     *
     * @return void
     *
     * @example
     * z.dom.empty("#id")
     */
    empty: function (element) {
    },
    /**
     * Inserts a node before the reference node.
     *
     * @param {string|HTMLElement}newNode               - The node object you want to insert
     * @param {string|HTMLElement}referenceNode         - The reference node.
     *
     * @return {HTMLElement}newNode                     - The Node Object, representing the inserted node
     *
     * @example
     * z.dom.insertBefore(btn0,btn1);//btn0 is before btn1
     */
    insertBefore: function (newNode, referenceNode) {
    },
    /**
     * Inserts a node after the reference node.
     *
     * @param {string|HTMLElement}newNode               - The node object you want to insert
     * @param {string|HTMLElement}referenceNode         - The reference node.
     *
     * @return {HTMLElement}newNode                     - The Node Object, representing the inserted node
     *
     * @example
     * z.dom.insertAfter(btn1,btn0);//btn1 is after btn0
     */
    insertAfter: function (newNode, referenceNode) {
    },
    /**
     * Inserts an element before the first child element of a specified parent node.
     *
     * @param {string|HTMLElement}newNode           - The node object you want to insert.
     * @param {string|HTMLElement}parentNode        - The specified parent node.
     *
     * @return {HTMLElement}newNode                 - The Node Object, representing the inserted node
     *
     * @example
     * z.dom.insertFirst(btn,div);//btn is the first child of the div.
     */
    insertFirst: function (newNode, parentNode) {
    },
    /**
     * Adds a node to the end of the list of children of a specified parent node.
     *
     * @param newNode                       - The node object you want to add.
     * @param parentNode                    - The specified parent node.
     *
     * @return {HTMLElement}newNode         - The Node Object, representing the inserted node
     *
     * @example
     * z.dom.insertFirst(btn,div);//btn is the last child of the div.
     */
    appendChild: function (newNode, parentNode) {
    },

    /**
     * Initializes a select element by the specified options.
     *
     * @param {string|HTMLElement|Array}select        -  The specified select to be initialized. It can be selectors or an HTMLElement
     * @param {Array}selectOptions              - The specified option values
     * @param {Object}[initOption]              - Optional. The initialization option
     *                                              <table>
     *                                                  <tr>
     *                                                      <th>#option#</th>
     *                                                      <th>#description#</th>
     *                                                      <th>#default#</th>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>value_field</td>
     *                                                      <td>The value field of the option</td>
     *                                                      <td>"value"/"id"</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>label_field</td>
     *                                                      <td>The label field of the option</td>
     *                                                      <td>"label"/"name"</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>value</td>
     *                                                      <td>The selected value</td>
     *                                                      <td></td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>append</td>
     *                                                      <td>If true, the options will be appended after existing options</td>
     *                                                      <td>false</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>restore_value</td>
     *                                                      <td>Restores the value after initialization or not</td>
     *                                                      <td>true</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>children_field</td>
     *                                                      <td>The children field used to create the OptionGroup</td>
     *                                                      <td>"children"</td>
     *                                                  </tr>
     *                                              </table>
     *
     *  @return void
     *
     *  @example
     * <pre>
     *  z.dom.initSelectOptions("#actionSelect", [
     *       {name: "All", value: ""},
     *       {name: "Create", value: "create"},
     *       {name: "Delete", value: "delete"},
     *       {name: "Update", value: "update"}]);
     * </pre>
     *
     */
    initSelectOptions: function (select, selectOptions, initOption) {
    }
    /*#focus*/
    /*#geom*/,
    event: {
        /**
         * Specifies the function to run when the page Document Object Model (DOM) is ready for JavaScript code to execute.
         * If DOM is already ready, the function will run immediately.
         * It is same as z.ready
         *
         *
         * @param {Function}listener        - The specified callBack function.
         * @param {Object}[thisArg]         - Value to use as this (i.e the reference Object) when executing listener.
         *
         * @return void
         *
         * @example
         * <pre>
         * z.dom.event.ready(function () {
         *    alert("dom is ready")
         * });
         * z.ready(function(){
         *    alert("dom is ready")
         * });
         * </pre>
         */
        ready: function (listener, thisArg) {
        },

        /**
         * Sets up a function that will be called whenever the specified event is delivered to the target
         *
         * @param {string|HTMLElement}element           - The specified element.It can be selectors or an HTMLElement.
         * @param type                                  - A string representing the event type to listen for. Event Modifiers are support
         *                                                  <table>
         *                                                      <tr>
         *                                                          <th>#modifier#</th>
         *                                                          <th>#description#</th>
         *                                                      </tr>
         *                                                      <tr>
         *                                                          <td>stop</td>
         *                                                          <td>event.stopPropagation() method will be called</td>
         *                                                      </tr>
         *                                                      <tr>
         *                                                          <td>prevent</td>
         *                                                          <td>event.preventDefault() method will be called</td>
         *                                                      </tr>
         *                                                      <tr>
         *                                                          <td>ctrl</td>
         *                                                          <td>the listener will be called only when event.ctrlKey === true</td>
         *                                                      </tr>
         *                                                      <tr>
         *                                                          <td>shift</td>
         *                                                          <td>the listener will be called only when event.shiftKey === true</td>
         *                                                      </tr>
         *                                                      <tr>
         *                                                          <td>alt</td>
         *                                                          <td>the listener will be called only when event.altKey === true</td>
         *                                                      </tr>
         *                                                      <tr>
         *                                                          <td>meta</td>
         *                                                          <td>the listener will be called only when event.metaKey === true</td>
         *                                                      </tr>
         *                                                      <tr>
         *                                                          <td>KeyboardEvent.key</td>
         *                                                          <td>for keyboard event(keyup/keydown/keypress), the listener will be called only when event.key === modifier</td>
         *                                                      </tr>
         *                                                  </table>
         * @param listener                              - The specified function to run when the event occurs.
         * @param {Object}[thisArg]                     - The Value to use as this (i.e the reference Object) when executing listener.
         *
         * @return void
         *
         * @example
         * <pre>
         * z.dom.event.addEventListener("#saveBtn", "click", function (event) {
         *    alert("onclick");
         * });
         *  z.dom.event.on("#saveBtn", "click.stop", function (event) {
         *    //event.stopPropagation() method will be called
         *    alert("onclick");
         * });
         * z.dom.event.on("#saveBtn", "click.ctrl", function (event) {
         *    //the listener will be called only when event.ctrlKey === true
         *    alert("onclick");
         * });
         * z.dom.event.on("#filterInput", "keydown.Escape", function (event) {
         *    //the listener will be called only when event.key === "Escape"
         *    alert("keydown");
         * });
         * z.dom.event.on("#filterInput", "keydown.Enter", function (event) {
         *    //the listener will be called only when event.key === "Enter"
         *    alert("keydown");
         * });
         *
         * </pre>
         */
        addEventListener: function (element, type, listener, thisArg) {
        },
        /**
         * Removes an event handler that has been attached with the {@link z.dom.event.addEventListener} method.
         *
         * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
         * @param type                              - A string representing the event type to listen for.
         * @param listener                          - The specified function to remove.
         * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing listener.
         *
         * @return void
         *
         * @example
         * <pre>
         * var listener = function () {
         *     alert("onclick");
         * };
         * z.dom.event.addEventListener("#saveBtn", "click", listener);//add
         * z.dom.event.removeEventListener("#saveBtn", "click", listener);//remove
         * z.dom.event.off("#saveBtn", "click.ctrl", listener);//remove
         * z.dom.event.off("#filterInput", "keydown.Escape", listener);//remove
         * </pre>
         * @see {@link z.dom.event.removeEventListener}.
         */
        removeEventListener: function (element, type, listener, thisArg) {
        },
        /**
         * This is an alias for {@link z.dom.event.addEventListener}.
         */
        on: function (element, type, listener, thisArg) {
        },
        /**
         * This is an alias for {@link z.dom.event.removeEventListener}.
         */
        off: function (element, type, listener, thisArg) {
        },

        /**
         * Sets up a function that will be called whenever the click event is delivered to the target.
         * This method is a shortcut for z.dom.event.addEventListener(element, "click", listener, thisArg);
         *
         * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
         * @param {Function}listener                - The specified function to run when the click event occurs.
         * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing listener.
         *
         * @return void
         *
         * @example
         * <pre>
         * z.dom.event.onclick("#saveBtn",function () {
         *     alert("click");
         * });
         * </pre>
         *
         * @see {@link z.dom.event.addEventListener}
         */
        onclick: function (element, listener, thisArg) {
        },
        /**
         * Sets up a function that will be called whenever the change event is delivered to the target.
         * This method is a shortcut for z.dom.event.addEventListener(element, "change", listener, thisArg);
         *
         * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
         * @param listener                          - The specified function to run when the change event occurs.
         * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing listener.
         *
         * @return void
         *
         * @example
         * <pre>
         * z.dom.onchange("select",function () {
         *     alert("change");
         * });
         * </pre>
         *
         * @see {@link z.dom.event.addEventListener}
         */
        onchange: function (element, listener, thisArg) {
        },
        /**
         * Sets up a function that will be called whenever the wheel(wheel/mousewheel/MozMousePixelScroll) event is delivered to the target.
         *
         * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
         * @param listener                          - The specified function to run when the wheel event occurs.
         * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing listener.
         *
         * @return void
         *
         * @example
         * <pre>
         * z.dom.onwheel("div",function () {
         *     console.log("wheel");
         * });
         * </pre>
         *
         * @see {@link z.dom.event.addEventListener}
         */
        onwheel: function (element, listener, thisArg) {
        },
        /**
         * Sets up a function that will be called whenever the resize event is delivered to the target.
         *
         * @param {string|HTMLElement}element       - The specified element.It can be selectors or an HTMLElement.
         * @param listener                          - The specified function to run when the resize event occurs.
         * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing listener.
         *
         * @return void
         *
         * @example
         * <pre>
         * z.dom.onresize("div",function () {
         *     alert("resize");
         * });
         *</pre>
         */
        onresize: function (element, listener, thisArg) {
        },
        /**
         * Starting with the event.target itself, traverses parents (heading toward the document root) of the target until it finds a node that matches the provided selector.
         * Will return itself or the matching ancestor. If no such element exists, it returns null.
         *
         * @param {Event}event                      - The delivered event.
         * @param {string}selectors                 - A DOMString containing a selector list.
         *
         * @return {HTMLElement}closestTarget       - The HTMLElement which is the closest ancestor of the selected elements. It may be null.
         *
         * @example
         * <pre>
         * &lt;button  id="btn1" &gt;&lt;i class="fa  fa-sign-in"&gt;&lt;/i&gt; Sign In&lt;/button&gt;
         * z.dom.event.onclick("#btn1", function (evt) {
         *      console.log(evt.target);
         *      console.log(z.dom.event.getTarget(evt, "button"));
         *  });
         * </pre>
         */
        getTarget: function (event, selectors) {
        }
    }
};

/**
 * @memberOf z
 * @namespace
 */
z.bom = {
    /**
     * Sets the cookie value associated with the current document.
     * Adds that key to the cookie, or updates that key's value if it already exists.
     *
     * @param {string}cookieName                - The name of the cookie to create/overwrite
     * @param {*}value                          - The value of the cookie
     * @param {number}[expire_minutes]          - Optional. The expires minutes.If omitted, the key will not expire
     *
     * @return void;
     *
     * @example
     * <pre>
     * z.bom.setCookie("name", "cookie value");
     * z.bom.setCookie("name1", "cookie value", 30);//expire after 30 minutes
     * </pre>
     *
     * @see {@link z.bom.getCookie}
     * @see {@link z.bom.removeCookie}
     */
    setCookie: function (cookieName, value, expire_minutes) {
    },
    /**
     * Gets the cookie value associated with the current document
     *
     * @param {string}cookieName        - The name of the cookie to query
     *
     * @return {string}value            - The value of the cookie
     *
     * @example
     * z.bom.getCookie("name");
     *
     * @see {@link z.bom.setCookie}
     * @see {@link z.bom.removeCookie}
     */
    getCookie: function (cookieName) {
    },
    /**
     * Removes the cookie value associated with the current document
     *
     * @param {string}cookieName            - The name of the cookie to remove
     *
     * @return void
     *
     * @example
     * z.bom.removeCookie("name");
     *
     * @see {@link z.bom.setCookie}
     * @see {@link z.bom.getCookie}
     */
    removeCookie: function (cookieName) {
    },

    /**
     * Saves data to localStorage.
     * Adds that key to the localStorage, or updates that key's value if it already exists.
     *
     * @param {string}key                   - The name of the key you want to create/update.
     * @param {*}value                      - The value you want to give the key you are creating/updating.
     * @param {number}[expire_minutes]      - Optional. The expires minutes.If omitted, the key will not expire
     *
     * @return void
     *
     * @example
     * <pre>
     * z.bom.setLocalStorage("name", "localStorage value");
     * z.bom.setLocalStorage("name1", "localStorage value",30);//expire after 30 minutes
     * </pre>
     *
     * @see {@link z.bom.getLocalStorage}
     * @see {@link z.bom.removeLocalStorage}
     * @see {@link z.bom.clearLocalStorage}
     */
    setLocalStorage: function (key, value, expire_minutes) {
    },
    /**
     * Gets data from localStorage with the specified key.
     *
     * @param {string}key       - The name of the key you want to query.
     *
     * @return {*}value        - The value of the key. If the key does not exist, undefined is returned.
     *
     * @example
     * z.bom.getLocalStorage("name");
     *
     * @see {@link z.bom.setLocalStorage}
     * @see {@link z.bom.removeLocalStorage}
     * @see {@link z.bom.clearLocalStorage}
     */
    getLocalStorage: function (key) {
    },
    /**
     * Removes data from localStorage with the specified key or the specified key filter function.
     *
     * @param {string|Function}key      - The name of the key you want to remove.
     *                                   - If it is a function, it will test each key of the sessionStorage. Return <b>true</b> to remove.
     *
     * @return void
     *
     * @example
     * <pre>
     * z.bom.removeLocalStorage("name");
     * z.bom.removeLocalStorage(function (key) {
     *    return key.startsWith("cache_");
     * })
     * </pre>
     * @see {@link z.bom.setLocalStorage}
     * @see {@link z.bom.getLocalStorage}
     * @see {@link z.bom.clearLocalStorage}
     */
    removeLocalStorage: function (key) {
    },
    /**
     * Clears all keys stored in the localStorage
     *
     * @return void
     *
     * @example
     * z.bom.clearLocalStorage();
     *
     * @see {@link z.bom.setLocalStorage}
     * @see {@link z.bom.getLocalStorage}
     * @see {@link z.bom.removeLocalStorage}
     */
    clearLocalStorage: function () {
    },
    /**
     * Specifies a function to run when the localStorage changes.
     *
     * This won't work on the same page that is making the changes.
     * It is really a way for other pages on the domain using the storage to sync any changes that are made.
     * Pages on other domains can't access the same storage objects.
     *
     * @version 2.2.1
     *
     * @param listener              - The specified function to run when the change event occurs.
     * @param {Object}[thisArg]     - Optional, the value to use as this (i.e the reference Object) when executing listener.
     * @param {string}key           - Optional, The specified key to listen for changes, default None.
     *                                  -If specified, only listen for the specified key value changes.
     *                                  -If not specified, listen for all key value changes
     *
     * @return void
     *
     * @example
     * <pre>
     * z.bom.onstorage(function (evt) {
     *     alert(evt);
     * });
     * </pre>
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event|storage_event}
     */
    onstorage: function (listener, thisArg, key) {
    },

    /**
     * Saves data to sessionStorage.
     * Adds that key to the sessionStorage, or updates that key's value if it already exists.
     *
     * @param {string}key                   - The name of the key you want to create/update.
     * @param {*}value                      - The value you want to give the key you are creating/updating.
     * @param {number}[expire_minutes]      - Optional. The expires minutes.If omitted, the key will not expire
     *
     * @return void
     *
     * @example
     * <pre>
     * z.bom.setSessionStorage("name", "sessionStorage value");
     * z.bom.setSessionStorage("name1", "sessionStorage value",30);//expire after 30 minutes
     * </pre>
     *
     * @see {@link z.bom.getSessionStorage}
     * @see {@link z.bom.removeSessionStorage}
     * @see {@link z.bom.clearSessionStorage}
     */
    setSessionStorage: function (key, value, expire_minutes) {
    },
    /**
     * Gets data from sessionStorage with the specified key.
     *
     * @param {string}key       - The name of the key you want to query.
     *
     * @return {*}value        - The value of the key. If the key does not exist, undefined is returned.
     *
     * @example
     * z.bom.getSessionStorage("name");
     *
     * @see {@link z.bom.setSessionStorage}
     * @see {@link z.bom.removeSessionStorage}
     * @see {@link z.bom.clearSessionStorage}
     */
    getSessionStorage: function (key) {
    },
    /**
     * Removes data from sessionStorage with the specified key or the specified key filter function.
     *
     * @param {string|Function}key      - The name of the key you want to remove.
     *                                 If it is a function, it will test each key of the sessionStorage. Return <b>true</b> to remove.
     *
     *
     * @return void
     *
     * @example
     * <pre>
     * z.bom.removeSessionStorage("name");
     * z.bom.removeSessionStorage(function (key) {
     *   return key.startsWith("cache_");
     * })
     * </pre>
     * @see {@link z.bom.setSessionStorage}
     * @see {@link z.bom.getSessionStorage}
     * @see {@link z.bom.clearSessionStorage}
     */
    removeSessionStorage: function (key) {
    },
    /**
     * Clears all keys stored in the sessionStorage
     *
     * @return void
     *
     * @example
     * z.bom.clearSessionStorage();
     *
     * @see {@link z.bom.setSessionStorage}
     * @see {@link z.bom.getSessionStorage}
     * @see {@link z.bom.removeSessionStorage}
     */
    clearSessionStorage: function () {
    },

    /**
     * @deprecated  please use {@link z.bom.getLocationSearchParam}
     */
    getURLQuery: function (queryKey) {
    },
    /**
     * Gets the search parameter from the window.location.
     * If there are multiple search parameters with the same name, the value of the parameter will be an array.
     *
     * @version 2.3.1
     *
     * @param {string}[param]               - Optional. The specified parameter to query from the search.
     *                                          If omitted,returns an object with all the search parameters.
     *
     * @return {string|Object|Array}value   - The value of the search parameter.
     *                                          If param omitted, returns an object with all the search parameters.
     *
     * @example
     * //location.href: http://www.example.com?a=1&b=2&a=3
     * z.bom.getLocationSearchParam()       // {"a": ["1", "3"], "b": "2"}
     * z.bom.getLocationSearchParam("a")    // ["1", "3"]
     * z.bom.getLocationSearchParam("b")    // 2
     * z.bom.getLocationSearchParam("c")    // undefined
     *
     */
    getLocationSearchParam: function (param) {
    },
    /**
     * Gets the search parameter from the specified url.
     * If there are multiple search parameters with the same name, the value of the parameter will be an array.
     *
     * @version 2.3.1
     *
     * @param {string|URL|Location}url      - The specified url to query.
     * @param {string}[param]               - Optional. The specified parameter to query from the specified url.
     *                                          If omitted,returns an object with all the search parameters.
     *
     * @return {string|Object|Array}value   - The value of the search parameter.
     *                                          If param omitted, returns an object with all the search parameters.
     *
     * @example
     * z.bom.getURLSearchParam("http://www.example.com?a=1&b=2&a=3");       // {"a": ["1", "3"], "b": "2"}
     * z.bom.getURLSearchParam("http://www.example.com?a=1&b=2&a=3", "a");  // ["1", "3"]
     * z.bom.getURLSearchParam("http://www.example.com?a=1&b=2&a=3", "b");  // 2
     * z.bom.getURLSearchParam("http://www.example.com?a=1&b=2&a=3", "c");  // undefined
     *
     * z.bom.getURLSearchParam("/sys/user??a=1&b=2&a=3")                    // {"a": ["1", "3"], "b": "2"}
     * z.bom.getURLSearchParam("/sys/user??a=1&b=2&a=3", "a")               // ["1", "3"]
     * z.bom.getURLSearchParam("/sys/user??a=1&b=2&a=3", "b")               // 2
     *
     */
    getURLSearchParam: function (url, param) {
    },
    /**
     * Appends a specified key/value pair as a new search parameter for the specified url.
     *
     * @version 2.3.1
     *
     * @param {string}url                   - The specified url.
     * @param {string|Object}name           - The name of the parameter to append. If it is Object,the value parameter will be ignored
     * @param {string}[value]               - The value of the parameter to append.
     *
     * @return {string}url                  - The new url with the appended search parameter.
     *
     * @example
     * z.bom.appendURLSearchParam("https://www.example.com", "a", 1);           // 'https://www.example.com?a=1'
     * z.bom.appendURLSearchParam("https://www.example.com?a=1&b=2", "c", 3)    // 'https://www.example.com?a=1&b=2&c=3'
     * z.bom.appendURLSearchParam("https://www.example.com?a=1&b=2", "a", 3)    // 'https://www.example.com?a=1&b=2&a=3'
     * z.bom.appendURLSearchParam("https://www.example.com?a=1", {"b":2,"c":3}) // 'https://www.example.com?a=1&b=2&c=3'
     *
     * z.bom.appendURLSearchParam("/sys/user", "a", 1);           // '/sys/user?a=1'
     * z.bom.appendURLSearchParam("/sys/user?a=1&b=2", "c", 3)    // '/sys/user?a=1&b=2&c=3'
     * z.bom.appendURLSearchParam("/sys/user?a=1&b=2", "a", 3)    // '/sys/user?a=1&b=2&a=3'
     * z.bom.appendURLSearchParam("/sys/user?a=1", {"b":2,"c":3}) // '/sys/user?a=1&b=2&c=3'
     *
     */
    appendURLSearchParam: function (url, name, value) {
    },
    /**
     * Sets the value associated with a given search parameter to the given value.
     * If there were several matching values, this method deletes the others.
     * If the search parameter doesn't exist, this method creates it.
     *
     * @version 2.3.1
     *
     * @param {string}url                   - The specified url.
     * @param {string|Object}name           - The name of the parameter to set. If it is Object,the value parameter will be ignored
     * @param {string}[value]               - The value of the parameter to set.
     *
     * @return {string}url                  - The new url with the set search parameter.
     *
     * @example
     * z.bom.setURLSearchParam("https://www.example.com", "a", 1);              // 'https://www.example.com?a=1'
     * z.bom.setURLSearchParam("https://www.example.com?a=1&b=2", "a", 3)       // 'https://www.example.com?a=3&b=2'
     * z.bom.setURLSearchParam("https://www.example.com?a=1", {"b":2,"c":3})    // 'https://www.example.com?a=1&b=2&c=3'
     *
     * z.bom.setURLSearchParam("/sys/user", "a", 1);            // '/sys/user?a=1'
     * z.bom.setURLSearchParam("/sys/user?a=1&b=2", "a", 3)     // '/sys/user?a=3&b=2'
     * z.bom.setURLSearchParam("/sys/user?a=1", {"b":2,"c":3})  // '/sys/user?a=1&b=2&c=3'
     *
     */
    setURLSearchParam: function (url, name, value) {
    },
    /**
     * Gets the hash from the window.location.
     *
     * @return {string}value    - The hash value.
     *
     * @example
     * z.bom.getLocationHash();
     */
    getLocationHash: function () {
    },
    /**
     * Gets the hash value from the specified url.
     *
     * @param {string|URL|Location}url      - The specified url.
     *
     * @return {string}value                - The hash value.
     *
     * @example
     * z.bom.getURLHash("http://www.example.com#abc");//abc
     */
    getURLHash: function (url) {
    },


    /**
     * The current browser name.
     * Chrome/Edge/IE/Firefox/Opera
     */
    browser: string,
    /**
     * The current browser version(Integer number)
     */
    browserVersion: number
};

/**
 * @memberOf z
 * @namespace
 */
z.ajax = {
    /**
     * Send a GET request to a url
     *
     * @param {string}url           - Required. The URL to send the request to
     * @param {*}[data]             - The specified data, it will be appended to url. The data can be appended to setting too.
     * @param {Object}setting       - The request setting.
     *
     * @see {@link z.ajax.ajax}
     */
    get: function (url, data, setting) {
    },
    /**
     * Send a POST request to a url
     *
     * @param {string}url           - Required. The URL to send the request to
     * @param {*}[data]             - The specified data, it will be sent. The data can be appended to setting too.
     * @param {Object}setting       - The request setting.
     *
     * @see {@link z.ajax.ajax}
     */
    post: function (url, data, setting) {
    },
    /**
     * Sends a request to a url.
     * In addition to passing parameters for every request, some parameters can be set globally, pls see the example.
     *
     * @param {string}method        - Required. The type of request: GET or POST.
     * @param {string}url           - Required. The URL to send the request to.
     * @param {Object}setting       - The request setting.
     *                                  <table>
     *                                      <tr>
     *                                          <th>#parameter#</th>
     *                                          <th>#description#</th>
     *                                          <th>#default#</th>
     *                                      </tr>
     *                                      <tr>
     *                                          <td>data</td>
     *                                          <td>The data to send. IF method is Get, the data will be appended to url</td>
     *                                          <td></td>
     *                                      </tr>
     *                                      <tr>
     *                                          <td>complete</td>
     *                                          <td>A function to be called when the request finishes.</td>
     *                                          <td></td>
     *                                      </tr>
     *                                      <tr>
     *                                          <td>context</td>
     *                                          <td>Value to use as this when executing complete function.</td>
     *                                          <td></td>
     *                                      </tr>
     *                                      <tr>
     *                                          <td>timeout</td>
     *                                          <td>Set a timeout (in milliseconds) for the request.</td>
     *                                          <td>120000</td>
     *                                      </tr>
     *                                      <tr>
     *                                          <td>headers</td>
     *                                          <td>
     *                                              An object of additional header key/value pairs to send along with requests using the XMLHttpRequest transport.
     *                                              <p>The header <b>X-Requested-With:'XMLHttpRequest'</b> and <b>Cache-Control:'no-cache, no-store, must-revalidate'</b> are added  by default.</p>
     *                                              <p>If data is an Object, <b>Content-Type:'application/json; charset=utf-8'</b> is added,
     *                                              otherwise, <b>Content-Type:'application/x-www-form-urlencoded'</b></p>
     *                                              Set the value to <b>false</b> to remove the default value,
     *                                          </td>
     *                                          <td>
     *                                          </td>
     *                                      </tr>
     *                                      <tr>
     *                                          <td>data_type</td>
     *                                          <td>
     *                                              The type of data that you're expecting back from the server.
     *                                              <p>If none is specified, will try to infer it based on the MIME type of the response.</p>
     *                                              <p>"application/json"-->"JSON"</p>
     *                                              <p>IF type is "JSON", returns an Object(JSON.parse).</p>
     *                                          </td>
     *                                          <td></td>
     *                                      </tr>
     *                                      <tr>
     *                                          <td>async</td>
     *                                          <td>true (asynchronous) or false (synchronous), synchronous(async = false) is not recommended.     *                                       </td>
     *                                          <td>true</td>
     *                                      </tr>
     *                                  </table>
     *
     * @return {Promise}promise     - A Promise object
     *
     * @example
     * <pre>
     * //get with parameter
     * z.ajax.get("/get", {name: "focus-ui"}, {
     *     //If Content-Type of the response header is 'application/json', The result will be an Object,
     *     //otherwise, result will be httpRequest.responseText.
     *     complete: function (status, result) {
     *         if (status === 408) {
     *             alert("request timeout");
     *             return;
     *         }
     *         if (status !== 200) {
     *             alert("request failed");
     *             return;
     *         }
     *         console.log(result);
     *     }
     * });
     * //get without parameter
     * z.ajax.get("/get", {
     *     //If Content-Type of the response header is 'application/json', The result will be an Object,
     *     //otherwise, result will be httpRequest.responseText.
     *     complete: function (status, result) {
     *         if (status === 408) {
     *             alert("request timeout");
     *             return;
     *         }
     *         if (status !== 200) {
     *             alert("request failed");
     *             return;
     *         }
     *         console.log(result);
     *     }
     * });
     *
     * //post
     * z.ajax.post("/post", {name: "focus-ui"}, {
     *     complete: function (status, result) {
     *         if (status === 408) {
     *             alert("request timeout");
     *             return;
     *         }
     *         if (status !== 200) {
     *             alert("request failed");
     *             return;
     *         }
     *         console.log(result);
     *     }
     * });
     *
     * //post
     * z.ajax.post("/post",  {
     *     data:{name: "focus-ui"},//Appends data within setting.
     *     complete: function (status, result) {
     *         if (status === 408) {
     *             alert("request timeout");
     *             return;
     *         }
     *         if (status !== 200) {
     *             alert("request failed");
     *             return;
     *         }
     *         console.log(result);
     *     }
     * });
     *
     * //ajax
     * z.ajax.ajax("POST", "/ajax", {name: "focus-ui"}, {
     *     complete: function (status, result) {
     *         if (status === 408) {
     *             alert("request timeout");
     *             return;
     *         }
     *         if (status !== 200) {
     *             alert("request failed");
     *             return;
     *         }
     *         console.log(result);
     *     }
     * });
     *
     * //Promise
     * z.ajax.post("/post", {
     *     data: {name: "focus-ui"},
     *     promise: true    // (Browser compatibility)
     * }).then(function (result) {
     *     alert(result);
     * }).catch(function (errStatus) {
     *     alert(errStatus);
     * });
     *
     * //file upload
     * var files = z.dom.getValue("#fileInput");//file input element.
     * var fd = new FormData();
     * z.util.eachArray(files, function (file, index) {
     *     fd.append("file_" + index, file)
     * });
     * z.ajax.post("/upload", fd, {
     *     headers: {
     *         "Content-Type": false//Removes the default value of the Content-Type.
     *     },
     *     complete: function (status, result) {
     *         if (status === 408) {
     *             alert("request timeout");
     *             return;
     *         }
     *         if (status !== 200) {
     *             alert("request failed");
     *             return;
     *         }
     *         console.log(result);
     *     }
     * });
     *
     * // ajax global settings
     * z.setDefault({
     *    "AJAX_HEADERS.Cache-Control": "no-cache, no-store, must-revalidate",  // set default header
     *    "AJAX_PROMISE": true, // enable ajax promise (Browser compatibility)
     *    "AJAX_BEFORE_SEND": function (httpRequest) {  // append token before send
     *        httpRequest.setRequestHeader("Authorization", z.bom.getLocalStorage("auth-token"));
     *    },
     *    "AJAX_COMPLETE": function (httpRequest) { // login interception
     *        var status = httpRequest.status;
     *        if (status === 200) {
     *            var responseType = httpRequest.responseType;
     *            if (responseType === "" || responseType === "text") {
     *                var result = JSON.parse(httpRequest.responseText);
     *                if (result.status !== z.getDefault("PRO_AJAX_SUCCESS_STATE") && result.status_code === 'uri_unauthorized') {
     *                    var pathname = window.location.pathname;
     *                    if (pathname === "/" || pathname === "/index" || pathname === "index") {
     *                        window.top.location.href = "/login";
     *                    } else {
     *                        z.widget.alert("Pls login!!", "Tips", function (result) {//callback
     *                            window.top.location.href = "/login";
     *                        });
     *                    }
     *                }
     *            }
     *        }
     *    }
     * });
     *
     *
     * </pre>
     */
    ajax: function (method, url, setting) {
    },
    /**
     * Sends a JSONP request to a url.
     * JSONP is a method for sending JSON data without worrying about cross-domain issues.
     * JSONP does not use the XMLHttpRequest object, uses the < script > tag instead.
     *
     * @param {string}url           - Required. The URL to send the request to
     * @param {*}[data]             - The specified data, it will be appended to url. The data can be appended to setting too.
     * @param {Object}setting       - The request setting.
     *                                  <table>
     *                                      <tr>
     *                                          <th>#parameter#</th>
     *                                          <th>#description#</th>
     *                                          <th>#default#</th>
     *                                      </tr>
     *                                      <tr>
     *                                          <td>data</td>
     *                                          <td>The data to send. IF method is Get, the data will be appended to url</td>
     *                                          <td></td>
     *                                      </tr>
     *                                      <tr>
     *                                          <td>complete</td>
     *                                          <td>A function to be called when the request finishes.</td>
     *                                          <td></td>
     *                                      </tr>
     *                                      <tr>
     *                                          <td>context</td>
     *                                          <td>Value to use as this when executing complete function.</td>
     *                                          <td></td>
     *                                      </tr>
     *                                      <tr>
     *                                          <td>timeout</td>
     *                                          <td>Set a timeout (in milliseconds) for the request.</td>
     *                                          <td>120000</td>
     *                                      </tr>
     *                                  </table>
     *
     * @return void
     *
     * @example
     * <pre>
     * z.ajax.jsonp("/jsonp", { name: "focus-ui" }, {
     *     timeout: 6000,
     *     complete: function () {
     *         console.log(arguments);
     *     }
     * });
     * </pre>
     */
    jsonp: function (url, data, setting) {
    }
};

/**
 * @memberOf z
 * @namespace
 */
z.math = {
    /**
     * Converts a degree value into radians.
     *
     * @param {number}angDeg        - The degree value to be converted into radians
     *
     * @return {number}angRad       - The radian value.
     *
     * @example
     * console.log(z.math.toRadians(180));//3.141592653589793
     */
    toRadians: function (angDeg) {
    },
    /**
     * Converts an angle from radians to degrees.
     *
     * @param angRad                - The radian value to be converted into degrees.
     *
     * @return {number}angDeg       - The degree value.
     *
     * @example
     * console.log(z.math.toDegrees(1));//57.29577951308232
     */
    toDegrees: function (angRad) {
    },
    /**
     * Calculates the distance between two points.
     *
     * @param {Object}p1            - The specified point 1
     * @param {Object}p2            - The specified point 2
     *
     * @return {number}distance     - The distance between p1 and p2
     *
     * @example
     * console.log(z.math.calcDistance({x:1,y:1},{x:6,y:6})) //7.0710678118654755
     *
     */
    calcDistance: function (p1, p2) {
    },
    /**
     * Calculates the degree angle between two points relative to the horizontal axis..
     *
     * @param {Object}p1            - The specified point 1
     * @param {Object}p2            - The specified point 2
     *
     * @return {number}angle        - The angle value between two points.
     *
     * @example
     * console.log(z.math.calcAngle({x:1,y:1},{x:3,y:3}));//45
     * console.log(z.math.calcAngle({x:1,y:1},{x:1,y:3}));//90
     */
    calcAngle: function (p1, p2) {
    },
    /**
     * Calculates the point on the circle with the specified angle.
     *
     * @param {Object}center        - The center point of the circle, ex){x:100,y:100}
     * @param {number}radius        - The radius of the circle
     * @param {number}angDeg        - The specified degree angle.
     *
     * @return {Object}point        - The point on the circle.
     *
     * @example
     * console.log(z.math.calcPointOnCircle({x:100,y:100},100,0));//{x: 200, y: 100}
     * console.log(z.math.calcPointOnCircle({x:100,y:100},100,30));//{{x: 186.60254037844388, y: 150}
     * console.log(z.math.calcPointOnCircle({x:100,y:100},100,90));//{x: 100, y: 200}
     */
    calcPointOnCircle: function (center, radius, angDeg) {
    },
    /**
     * Calculates the point on the ellipse with the specified angle.
     *
     * @param {Object}rectangle         - The bounds of the ellipse, ex){x:100,y:100,width:200,height:100}
     * @param {number}angDeg            - The specified degree angle.
     *
     * @return {Object}point            - The point on the ellipse.
     *
     * @example
     * console.log(z.math.calcPointOnEllipse({x: 100, y: 100, width: 200, height: 100}, 0));//{x: 300, y: 150}
     * console.log(z.math.calcPointOnEllipse({x: 100, y: 100, width: 200, height: 100}, 30));//{x: 265.4653670707977, y: 187.79644730092272}
     * console.log(z.math.calcPointOnEllipse({x: 100, y: 100, width: 200, height: 100}, 90));//{x: 200, y: 200}
     *
     */
    calcPointOnEllipse: function (rectangle, angDeg) {
    },
    /**
     * Calculates the rotated point relative to the specified center point with the specified degree angle.
     * @param {Object}center                - The rotation center point.
     * @param {Object}point                 - The specified point to be rotated.
     * @param {number}angDeg                - The specified rotation degree angle.
     *
     * @return {Object}rotatedPoint         - The rotated point.
     *
     * @example
     * console.log(z.math.calcRotatedPoint({x:100,y:100},{x:200,y:100},90));//{x: 100, y: 200}
     *
     */
    calcRotatedPoint: function (center, point, angDeg) {
    },
    /**
     * Calculates the bounds of the specified points.
     *
     * @param {Array}points     - The specified array of points.
     *
     * @return {Object}bounds   - The bounds of the points.
     *
     * @example
     * z.math.calcPointsBounds([{x: 100, y: 100}, {x: 200, y: 200}]);//{x: 100, y: 100, width: 100, height: 100}
     */
    calcPointsBounds: function (points) {
    },

    /**
     * Calculates the length of the path.
     *
     * @param {Array}pathPoints         - The points of the path.
     *
     * @return {number}length           - The length of the path.
     *
     * @example
     * <pre>
     * var points = [
     *  {x: 100, y: 300, seg: "bezier_curve_to"},
     *  {x: 200, y: 100},
     *  {x: 800, y: 300},
     *  {x: 900, y: 100}
     * ]
     * console.log(z.math.calcPathLength(points));//861.1271065729527
     * </pre>
     */
    calcPathLength: function (pathPoints) {
    },
    /**
     * Calculates point on the path with the specified length offset.
     *
     * @param {Array}pathPoints         - The points of the path.
     * @param {number}offsetLength      - The offset length.
     * @param {boolean}[isPercent]      - Optional. Specifies whether the offsetLength is percent value. default false
     *
     * @return {Object}point            - The point on the path.
     *
     * @example
     * <pre>
     * var points = [
     *    {x: 100, y: 300, seg: "bezier_curve_to"},
     *    {x: 200, y: 100},
     *    {x: 800, y: 300},
     *    {x: 900, y: 100}
     * ];
     * console.log(z.math.calcOffsetPointOnPath(points, 100));//{x: 173.6772945428878, y: 235.03939660991998}
     * </pre>
     */
    calcOffsetPointOnPath: function (pathPoints, offsetLength, isPercent) {
    },
    /**
     * Returns a new rectangle with the specified expansion.
     * @param {Object}rectangle         - The rectangle to be grown.
     * @param {number}h                 - The horizontal expansion value
     * @param {number}[v]               - The vertical expansion value, if omitted, v = h.
     *
     * @return {Object}grownRect        - The grown rectangle
     *
     * @example
     * z.math.createGrowRect({x:100,y:100,width:100,height:100},10);//{x: 90, y: 90, width: 120, height: 120}
     *
     */
    createGrowRect: function (rectangle, h, v) {
    }
};

/**
 * @memberOf z
 * @namespace
 */
z.canvas2d = {
    /**
     * Clears the canvas.
     *
     * @param {string|HTMLCanvasElement}cvs   - The specified canvas element.It can be selectors or an CanvasElement.
     *
     * @return void
     *
     * @example
     * z.canvas.clear("#cvs");
     */
    clear: function (cvs) {
    },
    /**
     * Renders the text at the given point(x, y) on the canvas with the specified style.
     * A line break is marked up as "\n".
     *
     * @param {CanvasRenderingContext2D}g2d     - The specified canvas 2d context.
     * @param {string}text                      - The text to be rendered.
     * @param {Object}point                     - The the given point(x, y).
     * @param {Object}direction                 - The direction of the text relative to the point.
     *                                              The valid values are "center","top","bottom","left","right","left_top","left_bottom","right_top","right_bottom".
     *                                              The default value is "center".
     * @param {Object}style                     - The specified style(fillStyle, strokeStyle).
     * @param {Object}[option]                  - The specified config.
     *                                              <table>
     *                                                  <tr>
     *                                                      <th>#parameter#</th>
     *                                                      <th>#description#</th>
     *                                                      <th>#default#</th>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>newline</td>
     *                                                      <td>Newline for multi-line text.</td>
     *                                                      <td>"\n"</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>line_spacing</td>
     *                                                      <td>Line spacing for multi-line text.</td>
     *                                                      <td>2</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>align</td>
     *                                                      <td>The alignment of wrap lines. The three valid values are "right", "left", and "center".</td>
     *                                                      <td>"center"</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>rotation</td>
     *                                                      <td>The rotation angle(degree).</td>
     *                                                      <td>0</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>font</td>
     *                                                      <td>The specified font used to render.</td>
     *                                                      <td>null</td>
     *                                                  </tr>
     *                                              </table>
     *
     * @return void
     *
     * @example
     * <pre>
     * z.canvas.renderText(c2d, "Hello Canvas!!", {x: 100, y: 100},
     *                      {fill: "#ac2925"}, "center", {font: "20px Arial"});
     * z.canvas.renderText(c2d, "Hello Canvas!!\nRender Text.", {x: 200, y: 200},
     *                      {fill: "#ac2925"}, "center", {font: "20px Arial",align:"right"});
     * </pre>
     *
     */
    renderText: function (g2d, text, point, style, direction, option) {
    },

    /**
     * Renders the specified shape in a rectangle.
     *
     * @param {CanvasRenderingContext2D}g2d     - The specified canvas 2d context.
     * @param {Object}rect                      - The specified outline rectangle object, with x y width and height properties(in pixels)
     * @param {string}shape                     - The specified shape.
     *                                              <table>
     *                                                  <tr>
     *                                                      <th>#shape#</th>
     *                                                      <th>#description#</th>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>rect</td>
     *                                                      <td>Renders a rectangle shape</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>circle</td>
     *                                                      <td>Renders a circle shape</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>ellipse</td>
     *                                                      <td>Renders a ellipse shape</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>roundrect</td>
     *                                                      <td>Renders a RoundRectangle shape.
     *                                                      <p>The arc radius of the rounded corners should be specified in option.radius parameter</p></td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>triangle</td>
     *                                                      <td>Renders a triangle shape</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>diamond</td>
     *                                                      <td>Renders a diamond shape</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>pentagon</td>
     *                                                      <td>Renders a pentagon shape</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>hexagon</td>
     *                                                      <td>Renders a hexagon shape</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>star</td>
     *                                                      <td>Renders a star shape</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>parallelogram</td>
     *                                                      <td>Renders a parallelogram shape</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>cloud</td>
     *                                                      <td>Renders a cloud shape</td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>custom_shape</td>
     *                                                      <td>Renders a shape specified with {@link z.canvas.registerShape} method</td>
     *                                                  </tr>
     *                                              </table>
     * @param {Object}style                     - The specified style(fillStyle strokeStyle) used to render the shape.
     * @param {Object}[option]                  - Optional. The specified shape option.For example, specifies the rounded rectangle with "radius" attribute.
     * @param {boolean}[noneStyleRender]        - Optional. Specifies whether to render the shape when the style is none. default false
     *
     *
     * @return void
     *
     * @example
     * <pre>
     * var shapes = ["rect", "circle", "ellipse", "roundrect", "triangle", "diamond",
     *                  "pentagon", "hexagon", "star", "parallelogram", "cloud", "right_triangle"];
     * z.util.eachArray(shapes, function (shape, index) {
     *           var row = index / 5 | 0;
     *           var col = index % 5;
     *           var rect = {
     *               x: 10 + col * 120,
     *               y: 60 + row * 120,
     *               width: 100,
     *               height: 80
     *           };
     *           if (shape === "roundrect") {
     *               z.canvas.renderRectShape(g2d, rect, shape, {
     *                   fillStyle: "#1982c8",
     *                   strokeStyle: "#d58512"
     *               }, {radius: 10});//The arc radius of the rounded corners
     *           } else {
     *               z.canvas.renderRectShape(g2d, rect, shape, {
     *                   fillStyle: "#1982c8",
     *                   strokeStyle: "#d58512"
     *               });
     *           }
     *       });
     * </pre>
     *
     */
    renderShape: function (g2d, rect, shape, style, option, noneStyleRender) {
    },
    /**
     * Registers a new shape. Once registered, it can be used in {@link z.canvas.renderShape} method.
     *
     * @param {string}name                  - The specified shape name
     * @param {Function}drawingFunc         - The drawing function of the shape
     *
     * @return void
     *
     * @example
     * <pre>
     * z.canvas.registerShape("right_triangle", function (g2d, rect) {
     *            g2d.beginPath();
     *            z.canvas.path(g2d, [
     *                {x: rect.x, y: rect.y},
     *                {x: rect.x, y: rect.y + rect.height},
     *                {x: rect.x + rect.width, y: rect.y + rect.height}
     *            ]);
     *            g2d.closePath()
     *        });
     * </pre>
     */
    registerShape: function (name, drawingFunc) {
    },
    /**
     * Adds points path to the current sub-path.
     * The path segments can be straight line, cubic Bézier curve and quadratic Bézier curve.
     *
     * @param {CanvasRenderingContext2D}g2d     - The specified canvas 2d con
     * @param {Array}points                     - The path point array. A "seg" attribute can be used to set the <b>next</b> segment type.
     *                                             If omitted, Adds the given point to the current sub-path, connected to the previous one by a straight line(lineTo).
     *                                             Segment types:
     *                                              <table>
     *                                                  <tr>
     *                                                      <th>#value#</th>
     *                                                      <th>#description#</th>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>move_to</td>
     *                                                      <td>Creates a new sub-path with the given point.
     *                                                      <p>previousPoint.moveTo(currentPoint)</p></td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>quadratic_curve_to</td>
     *                                                      <td>Adds the given point to the current sub-path,
     *                                                          connected to the previous one by a quadratic Bézier curve with the given control point.
     *                                                          <p>previousPoint.quadraticCurveTo(currentControlPoint,nextPoint)</p></td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>bezier_curve_to</td>
     *                                                      <td>Adds the given point to the current sub-path,
     *                                                          connected to the previous one by a cubic Bézier curve with the given control points(current point).
     *                                                          <p>previousPoint.bezierCurveTo(currentControlPoint,nextControlPoint,next3rdPoint)</p></td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>line_to</td>
     *                                                      <td>Adds the given point to the current sub-path, connected to the previous one by a straight line.
     *                                                      <p>previousPoint.lineTo(currentPoint)</p></td>
     *                                                  </tr>
     *                                              </table>
     *
     * @return void
     *
     * @example
     * <pre>
     * z.canvas.path(g2d, [
     *      {x: 100, y: 100},//moveTo(100,100), first point
     *      {x: 200, y: 150},//lineTo(200,150)                               *lastSegment == default
     *      {x: 200, y: 200, seg: "quadratic_curve_to"},//lineTo(200,200)    *lastSegment == "move_to"
     *      {x: 300, y: 300},//quadraticCurveTo control point                *lastSegment == "quadratic_curve_to"   -->control point
     *      {x: 400, y: 200},//quadraticCurveTo(300,300,400,200)             *lastSegment == "quadratic_curve_to"   -->quadraticCurveTo end point.
     *      {x: 400, y: 300, seg: "bezier_curve_to"},//lineTo(400,300)       *lastSegment == default
     *      {x: 500, y: 400},//bezierCurveTo control point1                  *lastSegment == "bezier_curve_to"      -->the 1st control point
     *      {x: 600, y: 400},//bezierCurveTo control point2                  *lastSegment == "bezier_curve_to"      -->the 2nd control point
     *      {x: 700, y: 300},//bezierCurveTo(500,400,600,400,700,300)        *lastSegment == "bezier_curve_to"      -->bezierCurveTo end point.
     *      {x: 600, y: 600, seg: "close"}//lineTo(600,600)and closePath()   *lastSegment == default        -->currentSegment=="close" --> close Path.
     * ]);
     * </pre>
     *
     * @see {@link z.canvas.renderPath}
     */
    path: function (g2d, points) {
    },
    /**
     * Renders a path with the specified path points.
     *
     * @param {CanvasRenderingContext2D}g2d     - The specified canvas 2d context.
     * @param {Array}points                     - The path point array. A "seg" attribute can be used to set the <b>next</b> segment type.
     *                                             If omitted, Adds the given point to the current sub-path, connected to the previous one by a straight line(lineTo).
     *                                             Segment types:
     *                                              <table>
     *                                                  <tr>
     *                                                      <th>#value#</th>
     *                                                      <th>#description#</th>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>move_to</td>
     *                                                      <td>Creates a new sub-path with the given point.
     *                                                      <p>previousPoint.moveTo(currentPoint)</p></td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>quadratic_curve_to</td>
     *                                                      <td>Adds the given point to the current sub-path,
     *                                                          connected to the previous one by a quadratic Bézier curve with the given control point.
     *                                                          <p>previousPoint.quadraticCurveTo(currentControlPoint,nextPoint)</p></td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>bezier_curve_to</td>
     *                                                      <td>Adds the given point to the current sub-path,
     *                                                          connected to the previous one by a cubic Bézier curve with the given control points(current point).
     *                                                          <p>previousPoint.bezierCurveTo(currentControlPoint,nextControlPoint,next3rdPoint)</p></td>
     *                                                  </tr>
     *                                                  <tr>
     *                                                      <td>line_to</td>
     *                                                      <td>Adds the given point to the current sub-path, connected to the previous one by a straight line.
     *                                                      <p>previousPoint.lineTo(currentPoint)</p></td>
     *                                                  </tr>
     *                                              </table>
     * @param {Object}style                     - The specified style, used to render the path. For example fillStyle strokeStyle
     * @param {boolean}[noneStyleRender]        - Optional. Specifies whether to render the path when the style is none. default false
     *
     * @return void
     *
     * @example
     * <pre>
     * z.canvas.renderPath(g2d, [
     *      {x: 100, y: 100},//moveTo(100,100), first point
     *      {x: 200, y: 150},//lineTo(200,150)                               *lastSegment == default
     *      {x: 200, y: 200, seg: "quadratic_curve_to"},//lineTo(200,200)    *lastSegment == "move_to"
     *      {x: 300, y: 300},//quadraticCurveTo control point                *lastSegment == "quadratic_curve_to"   -->control point
     *      {x: 400, y: 200},//quadraticCurveTo(300,300,400,200)             *lastSegment == "quadratic_curve_to"   -->quadraticCurveTo end point.
     *      {x: 400, y: 300, seg: "bezier_curve_to"},//lineTo(400,300)       *lastSegment == default
     *      {x: 500, y: 400},//bezierCurveTo control point1                  *lastSegment == "bezier_curve_to"      -->the 1st control point
     *      {x: 600, y: 400},//bezierCurveTo control point2                  *lastSegment == "bezier_curve_to"      -->the 2nd control point
     *      {x: 700, y: 300},//bezierCurveTo(500,400,600,400,700,300)        *lastSegment == "bezier_curve_to"      -->bezierCurveTo end point.
     *      {x: 600, y: 600}//lineTo(600,600)and closePath()                 *lastSegment == default        -->currentSegment=="close" --> close Path.
     * ],{
     *       fillStyle:"red",//Fills the the current path with red color
     *       strokeStyle:"green"//Strokes the the current path with red color
     *  });
     * </pre>
     *
     * @see {@link z.canvas.path}
     */
    renderPath: function (g2d, points, style, noneStyleRender) {
    }
};

/**
 * Initializes i18n locales or translates the specified key.
 * The behavior of the function is determined by the first argument.
 * - If localesOrKey is an object, {@link z.i18n.init} is called to initialize the i18n with the specified locales and option
 * - If localesOrKey is a string, {@link z.i18n.t} is called to translate the specified key to text with the specified locale
 *
 * @param {Object|string}localesOrKey   - If an object, it represents the initialization locales.
 *                                              If a string, it is used as a key for translation.
 * @param {Object}[optionOrVars]        - Optional. For initialization (Object): Options for the initialization.
 *                                              For translation (String): Variables for the translation.
 * @param {string}[locale]              - Optional. The specified locale to translate. If omitted, the current locale is used
 *
 * @example
 * <pre>
 * //Initializes
 * //method1
 * z.i18n({
 *        locale: "en",
 *        "en": {
 *            "hello": "Hello",
 *            "greetings": "Greetings, {name}!"
 *        },
 *        "fr": {
 *            "hello": "Bonjour",
 *            "greetings": "Salutations, {name}!"
 *        }
 *    })
 * //method2
 * z.i18n({
 *        locale: "en",
 *        _locales: ["en", "fr"],
 *
 *        HELLO: ["Hello", "Bonjour"],
 *        GREETINGS: ["Greetings, {name}!", "Salutations, {name}!"]
 * });
 *
 * //Translates
 * z.i18n("hello"); // "Hello"
 * z.i18n("hello", "fr"); // "Bonjour"
 * z.i18n("greetings"); // "Greetings, {name}!"
 * z.i18n("greetings", {name: "focus-ui"}); // "Greetings, {name}!" --> "Greetings, focus-ui!"
 * z.i18n("greetings", {name: "focus-ui"}, "fr") // "Salutations, {name}!" --> "Salutations, focus-ui!"
 * </pre>
 *
 */
z.i18n = function (localesOrKey, optionOrVars, locale) {
}
/**
 * Initializes the i18n with the specified locales and option.
 *
 * @param {Object}locales       - The locales to be initialized.
 * @param {Object}[option]      - The option of the i18n.
 *
 * @example
 * <pre>
 * //method1
 * z.i18n({
 *        locale: "en",
 *        "en": {
 *            "hello": "Hello",
 *            "greetings": "Greetings, {name}!"
 *        },
 *        "fr": {
 *            "hello": "Bonjour",
 *            "greetings": "Salutations, {name}!"
 *        }
 *    })

 * //method2
 * z.i18n({
 *        locale: "en",
 *        _locales: ["en", "fr"],
 *
 *        HELLO: ["Hello", "Bonjour"],
 *        GREETINGS: ["Greetings, {name}!", "Salutations, {name}!"]
 *   });
 * </pre>
 */
z.i18n.init = function (locales, option) {
};
/**
 * Sets the current locale.
 * The default locale is "en".
 *
 * @param {string}locale        - The specified locale to set.
 *
 * @example
 * z.i18n.setLocale('en')
 */
z.i18n.setLocale = function (locale) {
};
/**
 * Gets the current locale.
 *
 * @return {string}locale       - The current locale.
 *
 * @example
 * z.i18n.getLocale('zh'); // "en"
 */
z.i18n.getLocale = function () {
};
/**
 * Translates the specified key to text with the specified locale.
 * This is an alias for z.i18n.translate.
 *
 * @param {string}key           - The specified key.
 * @param {Object}[vars]        - Optional. The properties used to replace the variables in text.
 * @param {string}[locale]      - Optional. The specified locale. If omitted, the current locale is used.
 *
 * @return {string}text         - The text result.
 *
 * @example
 * z.i18n.t("hello"); // "Hello"
 * z.i18n.t("hello", "fr"); // "Bonjour"
 * z.i18n.t("greetings"); // "Greetings, {name}!"
 * z.i18n.t("greetings", {name: "focus-ui"}); // "Greetings, {name}!" --> "Greetings, focus-ui!"
 * z.i18n.t("greetings", {name: "focus-ui"}, "de") // "Salutations, {name}!" --> "Salutations, focus-ui!"
 */
z.i18n.t = function (key, vars, locale) {
};
/**
 * Add a new locale.
 *
 * @param {string}locale        - The name of the locale.
 * @param {Object}i18ns         - The content of the locale.
 * @param {boolean}[replace]    - Optional. If true, the existing locale will be replaced, otherwise the content will be appended.
 *
 * @example
 * <pre>
 * z.i18n.addLocale("fr", {
 *        "hello": "Bonjour"
 *    });
 * z.i18n.addLocale("fr", {
 *        "hello": "Bonjour"
 *    }, true);
 * </pre>
 */
z.i18n.addLocale = function (locale, i18ns, replace) {
};
/**
 * Removes the specified from the i18n map.
 *
 * @param {string}locale        - The removed locale.
 *
 * @example
 * z.i18n.removeLocale("de")
 */
z.i18n.removeLocale = function (locale) {
};
/**
 * Add item to the locale map.
 *
 * @param {string}key           - The key of the item.
 * @param {string|*}value       - The value of the item.
 * @param {string}[locale]      - Optional. The specified locale. If omitted, the current locale is used.
 *
 * @example
 * z.i18n.addLocaleItem("hi", "Hi");
 * z.i18n.addLocaleItem("hi", "Hi", "en");
 */
z.i18n.addLocaleItem = function (key, value, locale) {
};
/**
 * Removes the specified item from the locale map.
 *
 * @param {string}key           - The specified key to be removed
 * @param {string}[locale]      - Optional. The specified locale. If omitted, the current locale is used.
 *
 * @example
 * z.i18n.removeLocaleItem("hi");
 * z.i18n.removeLocaleItem("hi", "fr");
 */
z.i18n.removeLocaleItem = function (key, locale) {
}

/**
 * Sets the default value of the system.
 *
 * @param {string|Object}key    - The specified key to set.
 * @param {*}[value]            - The value of the key.
 *
 * @example
 * z.setDefault("FORM_FORM_MODEL_ATTRIBUTE","data-ze-model");
 * z.setDefault({
 *   "FORM_FORM_HIDDEN_ATTRIBUTE":"data-ze-hidden",
 *   "FORM_FORM_DISABLED_ATTRIBUTE":"data-ze-disabled",
 * });
 * z.setDefault("AJAX_HEADERS.Cache-Control","no-cache, no-store, must-revalidate");//deep set
 */
z.setDefault = function (key, value) {
};
/**
 * Gets the specified default value of the system.
 *
 * @param {string}key       - The specified key to get.
 *
 * @return {*}value         - The the default value of the system.
 *
 * @example
 * z.getDefault("FORM_VALIDATOR_RULES_ATTRIBUTE");
 */
z.getDefault = function (key) {
};
/**
 *
 * The base class for all the view components and model data.
 *
 * @constructor
 * @extends Object
 *
 * @property {Function}superClass   - The super class.
 *
 * @param {Object}[props]           - Optional, the initialization properties object.
 *                                      If the enumerable value is function, it will be attached as the property of the instance,
 *                                      else the property will be added into the properties object of the instance.
 * @return {$ZObject}object         - The $ZObject object.
 *
 * @example
 * <pre>
 * var data = new z.Data({
 *        'isVisible': function () {
 *            return this.getProperty("value") > 100;//get property by getProperty method
 *        },
 *        "value": 200
 *    });
 * console.log(data.isVisible());//true, the function is the property of the data
 * console.log(data.gets());//{value: 200}, the non-functional properties are added into the properties object
 * </pre
 *
 */
var $ZObject = function (props) {
};
/**
 * The prototype of the parent class.
 * @memberOf $ZObject
 */
$ZObject.superClass = {};
/**
 * Sets one or more properties of the data.
 *
 * @param {string|Object}key        - The key of the property to set. If it is Object,the value parameter will be ignored
 * @param {*}[value]                - The value of of the property.
 *
 * @return  {$ZObject}data          - The data object self
 *
 * @example
 * <pre>
 * var data = new z.Data({
 *     name:"focus-ui"
 * })
 * data.set("version","2.0");
 * data.set({
 *     "name": "focus-ui",
 *     "version: "2.0"
 * })
 * </pre>
 */
$ZObject.prototype.set = function (key, value) {
};
/**
 * Gets the value of the specified key.
 *
 * @param {string}key   - The specified key to get.
 *
 * @return {*}value     - The value of the key.
 *
 * @example
 * <pre>
 * var data = new z.Data({
 *      name: "focus-ui",
 *      version: 2.0
 * })
 * data.get("name");//"focus-ui"
 * </pre>
 */
$ZObject.prototype.get = function (key) {
};
/**
 * Removes the property with the specified key from the data.
 * This is an alias for $ZObject.prototype.removeProperty
 *
 * @param {string}key           - The specified key to remove
 *
 * @return  {$ZObject}data      - The data object self
 *
 * @example
 * <pre>
 * var data = new z.Data({
 *      name: "focus-ui",
 *      version: 2.0
 * })
 * data.remove("version");
 * </pre>
 */
$ZObject.prototype.remove = function (key) {
};
/**
 * Determines whether the data contains the specified property key.
 * This is an alias for $ZObject.prototype.hasProperty
 *
 * @param {string}key           - The specified key to check.
 *
 * @return {boolean}result      - true if the data has the specified key property; otherwise, false.
 *
 * @example
 * <pre>
 * var data = new z.Data({
 *      name: "focus-ui",
 *      version: 2.0
 * })
 * data.has("name");//true
 * data.has("city");//false
 * </pre>
 */
$ZObject.prototype.has = function (key) {
};
/**
 * Gets the properties object with the specified keys.
 * This is an alias for $ZObject.prototype.getProperties
 *
 * @param {Array}[keys]                 - Optional, the specified key array. If omitted, returns all the own properties.
 *
 * @return {Object}properties           - The properties object contains the specified properties.
 *
 * @example
 * <pre>
 * var data = new z.Data({
 *      name: "focus-ui",
 *      version": 2.0
 * })
 * data.gets(["name","version"])//{name:"focus-ui","version":2.0}
 * data.gets();//{name:"focus-ui","version":2.0}
 * </pre>
 */
$ZObject.prototype.gets = function (keys) {
};
/**
 * Gets the class name of the instance.
 *
 * @return {Object}className    - The class name of the instance.
 *
 * @example
 * <pre>
 * node.getClassName();//"Node"
 * link.getClassName();//"Link"
 * group.getClassName();//"Group"
 * tree.getClassName();//"Tree"
 * </pre>
 */
$ZObject.prototype.getClassName = function () {
};

/**
 * The class that support event handlers.
 * A class that extends the $ChangeSupport can handle events.
 * ex)addListener,removeListener,dispatchEvent
 *
 * @constructor
 * @extends $ZObject
 *
 * @return {$ChangeSupport}changeSupport   - The ChangeSupport instance
 *
 * @example
 * <pre>
 * var listener = function (event) {
 *        console.log(event);   //{oldValue: 10, newValue: 20}
 *    };
 * cs.addListener("value_change", listener);    //add listener
 * cs.dispatchEvent("value_change", {oldValue: 10, newValue: 20}); //dispatch event
 * cs.removeListener("value_change", listener); // remove listener
 *
 * var changeListener = function (event) {
 *        console.log(event); //{property: "price", new_value: 20, old_value: 10}
 *    };
 * cs.addChangeListener(changeListener);
 * cs.dispatchChangeEvent("price", 20, 10);
 * cs.removeChangeListener(changeListener);
 *
 * </pre>
 */
var $ChangeSupport = function (args) {
};
/**
 * Sets up a function that will be called whenever the specified event is dispatched
 *
 * @param {string}type                  - A string representing the event type to listen for.
 * @param {Function}listener            - The specified function to add.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 *
 * @see {@link $ChangeSupport}
 */
$ChangeSupport.prototype.addListener = function (type, listener, thisArg) {
};
/**
 * Removes an event handler that has been attached with the {@link $ChangeSupport.addListener} method.
 *
 * @param {string}type                  - A string representing the event type to listen for.
 * @param {Function}listener            - The specified function to remove.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @see {@link $ChangeSupport}
 */
$ChangeSupport.prototype.removeListener = function (type, listener, thisArg) {
};
/**
 * Dispatches an event from the $ChangeSupport instance.
 * The attached listeners of the specified type will be invoked.
 *
 * @param {string}type      - The event type, a string like "change" or "my-event"
 * @param {Object}event     - The event object to be dispatched
 *
 * @return void
 *
 * @see {@link $ChangeSupport}
 */
$ChangeSupport.prototype.dispatchEvent = function (type, event) {
};
/**
 * Sets up a function that will be called whenever the "change" event is dispatched
 * This method is a shortcut for $ChangeSupport.addListener("change", listener, thisArg);
 *
 * @param {Function}listener            - The specified function to add.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @see {@link $ChangeSupport}
 */
$ChangeSupport.prototype.addChangeListener = function (listener, thisArg) {
};
/**
 * Removes an event handler that has been attached with the {@link $ChangeSupport.addChangeListener} method.
 * This method is a shortcut for $ChangeSupport.removeListener("change", listener, thisArg);
 *
 * @param {Function}listener            - The specified function to remove.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @see {@link $ChangeSupport}
 */
$ChangeSupport.prototype.removeChangeListener = function (listener, thisArg) {
};
/**
 * Dispatches an "change" event from the $ChangeSupport instance.
 * This method is a shortcut for $ChangeSupport.dispatchEvent("change", {property: property, new_value: newValue, old_value: oldValue});
 *
 * @param {string}property      - The property name of the change event
 * @param {*}newValue           - The new value of the property
 * @param {*}oldValue           - The old value of the property
 */
$ChangeSupport.prototype.dispatchChangeEvent = function (property, newValue, oldValue) {
};

/**
 * The base class for all view components.
 *
 * @constructor
 * @extends $ChangeSupport
 *
 * @param {Object}[args]    - Optional. The arguments to initialize the component.
 *                             <table>
 *                                 <tr>
 *                                     <th>#option</th>
 *                                     <th>#description</th>
 *                                     <th>#default</th>
 *                                 </tr>
 *                                 <tr>
 *                                     <td>appendTo</td>
 *                                     <td>the parent node of the view</td>
 *                                     <td></td>
 *                                 </tr>
 *                                 <tr>
 *                                     <td>class</td>
 *                                     <td>the specified css class name of the view</td>
 *                                     <td></td>
 *                                 </tr>
 *                                 <tr>
 *                                     <td>style</td>
 *                                     <td>the specified css style of the view</td>
 *                                     <td></td>
 *                                 </tr>
 *                             </table>
 *
 * @return {$IView}iView   - The IView instance
 */
var $IView = function (args) {
};
/**
 * Appends the root div of the view component to the parent node.
 *
 * @param {HTMLElement|string}parentNode      - The specified parent element. It can be selectors or an HTMLElement.
 *
 * @return void
 *
 * @example
 * view.appendTo("#treeDiv")
 */
$IView.prototype.appendTo = function (parentNode) {
};
/**
 * Gets the root div of the view component.
 *
 * @return {HTMLElement}root    - The root div of the view.
 */
$IView.prototype.getRoot = function () {
};
/**
 * Updates the view component.
 * Update does a lot of work and is very expensive, ex)repaint/dom update, if it is called frequently, it is better to use batch option.
 *
 * @param {boolean}[batch]      - Optional. If true, these several independent updates will be grouped together(requestAnimationFrame).
 *                                 If the update method is called multiple times in a short period of time, it will run once only.
 *
 * @return void
 *
 * @example
 * view.update();
 */
$IView.prototype.update = function (batch) {
};
/**
 * Sets up a function that will be called whenever the property of the view is changed.
 *
 *
 * @param {Function}listener            - The specified function to run when the change event occurs.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 * var view = new z.widget.Tree();
 * var listener = function(event){
 *      console.log(event);//{property: "class", new_value: "test", old_value: undefined}
 * }
 * view.onViewChange(listener); // add listener
 * view.set("class","test");
 * view.offViewChange(listener) // remove listener
 * </pre>
 *
 * @see {@link $IView.offViewChange}.
 */
$IView.prototype.onViewChange = function (listener, thisArg) {
};
/**
 * Removes an event handler that has been attached with the {@link $IView.onViewChange} method.
 *
 * @param {Function}listener            - The specified function to remove.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @see {@link $IView.onViewChange}.
 */
$IView.prototype.offViewChange = function (listener, thisArg) {
};

/**
 * The component that implements $CheckInterface will have the ability to check data.
 * Most data widget components implement this interface, ex) Grid/TreeGrid/Tree/ListView/Menu.
 * Generally, you need to set the checkbox_visible property of the components to true to enable check select.
 * The 'checkable' property of the component/data is used to enable/disable check.
 *
 * @param {Function}clazz   - The constructor to implement the interface, ex) z.widget.Tree
 */
var $CheckInterface = function (clazz) {
};
/**
 * The isCheckable is a callback function used to control whether the data can be checked or not.
 * Sets the checkbox_visible property of the components to true to enable data check.
 *
 * @param {z.Data}data              - The data to be checked.
 *
 * @return {boolean}checkable       - If true, the data can be checked, otherwise not
 *
 * @example
 * <pre>
 * var list = new z.widget.ListView({
 *     checkbox_visible: true,  //enable
 *     isCheckable: function (data) {
 *         return data.get("age") > 10; // Only data with age > 10 can be checked.
 *     }
 * })
 * </pre>
 *
 */
$CheckInterface.prototype.isCheckable = function (data) {
};
/**
 * Sets up a function that will be called whenever check selection changes.
 *
 * @param {Function}listener            - The specified function to run when check selection changes, taking one argument changeEvt with two properties
 *                                          <ul>
 *                                              <li>type</li>       - The type of the check selection changes. the option value is add/remove/clear/set.
 *                                              <li>data</li>       - The check changed data. If type is add/remove, it is a data({@link z.Data}) Object. If type is clear/set, it is an data array,
 *                                          </ul>
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 * view.onCheckChange(function (changeEvt) {
 *      console.log(changeEvt.type);
 *      console.log(changeEvt.data);
 *  });
 * </pre>
 *
 */
$CheckInterface.prototype.onCheckChange = function (listener, thisArg) {
};
/**
 * Checks the specified data.
 *
 * @param {z.Data|Object|Array}data     - The specified data or the array containing the data to be checked .
 * @param {boolean}[isAdd]              - Optional. If true, check the data in append mode, otherwise, check the data in replace mode(clear+set), default false(replace mode)
 *
 * @return void
 *
 * @example
 * <pre>
 *    var data1 = new z.Data({name: "data1"});
 *    var data2 = new z.Data({name: "data2"});
 *    var data3 = new z.Data({name: "data3"});
 *    var listView = z.widget.ListView({
 *           appendTo: "#listDiv",
 *           checkbox_visible: true,
 *           data: [data1, data2, data3]
 *       });
 *    listView.check(data1);//data1 is checked;
 *    listView.check([data2, data3]);//[data2,data3] are checked, data1 is unchecked
 *    listView.check(data1, true);//[data1,data2,data3] are checked
 * </pre>
 *
 */
$CheckInterface.prototype.check = function (data, isAdd) {
};
/**
 * Unchecks the specified data.
 *
 * @param {z.Data|Object|Array}data    - The specified data or the array containing the data to be unchecked.
 *
 * @return void
 *
 * @example
 * <pre>
 *    var data1 = new z.Data({name: "data1"});
 *    var data2 = new z.Data({name: "data2"});
 *    var data3 = new z.Data({name: "data3"});
 *    var listView = z.widget.ListView({
 *                   appendTo: "#listDiv",
 *                   checkbox_visible: true,
 *                   data: [data1, data2, data3]
 *               });
 *    listView.check([data1, data2]);//[data1,data2] are checked;
 *    listView.uncheck(data1);//only data2 checked
 * <pre>
 *
 */
$CheckInterface.prototype.uncheck = function (data) {
};
/**
 * Clears all the checked data.
 *
 * @return void
 *
 * @example
 * <pre>
 *    var data1 = new z.Data({name: "data1"});
 *    var data2 = new z.Data({name: "data2"});
 *    var data3 = new z.Data({name: "data3"});
 *    var listView = z.widget.ListView({
 *                   appendTo: "#listDiv",
 *                   checkbox_visible: true,
 *                   data: [data1, data2, data3]
 *               });
 *    listView.check([data1, data2]);//[data1,data2] are checked;
 *    listView.clearCheck();//no checked data
 *
 * </pre>
 */
$CheckInterface.prototype.clearCheck = function () {
};
/**
 * Checks all the data in the component.
 *
 * @param {boolean}[onlyVisible]    - Optional. If false, all the data(visible/invisible) will be checked,
 *                                              otherwise, only the visible data will be checked, default true(only visible).
 *
 * @return void
 *
 * @example
 * <pre>
 *    var data1 = new z.Data({name: "data1"});
 *    var data2 = new z.Data({name: "data2", visible: false});// data2 is not visible.
 *    var data3 = new z.Data({name: "data3"});
 *    var listView = z.widget.ListView({
 *                   appendTo: "#listDiv",
 *                   checkbox_visible: true,
 *                   data: [data1, data2, data3]
 *               });
 *    listView.checkAll(); // data2 is not checked
 *    listView.checkAll(false);// data2 is checked
 * </pre>
 */
$CheckInterface.prototype.checkAll = function (onlyVisible) {
};
/**
 * Clears all the checked data.
 * This is an alias for {@link $CheckInterface.clearCheck}.
 */
$CheckInterface.prototype.uncheckAll = function () {
};
/**
 * Returns an array which contains all the checked data.
 *
 * @return {Array}checkedArr    - The checked data array.
 *
 * @example
 * <pre>
 * var data1 = new z.Data({name: "data1"});
 * var data2 = new z.Data({name: "data2"});
 * var data3 = new z.Data({name: "data3"});
 * var listView = z.widget.ListView({
 *                appendTo: "#listDiv",
 *                checkbox_visible: true,
 *                data: [data1, data2, data3]
 *            });
 * listView.checkAll();
 * console.log(listView.getChecked());//[data1,data2,data3]
 * </pre>
 */
$CheckInterface.prototype.getChecked = function () {
};
/**
 * Determines whether the passed data is checked
 *
 * @param {z.Data}data          - The data to be checked.
 *
 * @return {boolean}value       - true if the data is checked; otherwise, false.
 *
 * @example
 * <pre>
 * var data1 = new z.Data({name: "data1"});
 * var data2 = new z.Data({name: "data2"});
 * var data3 = new z.Data({name: "data3"});
 * var listView = z.widget.ListView({
 *                appendTo: "#listDiv",
 *                checkbox_visible: true,
 *                data: [data1, data2, data3]
 *            });
 * listView.check([data1, data2]);
 * console.log(listView.isChecked(data1));//true
 * console.log(listView.isChecked(data3));//false
 * </pre>
 */
$CheckInterface.prototype.isChecked = function (data) {
};

/**
 * The component that implements $SelectInterface will have the ability to select data.
 * Almost all data components implement this interface, ex) Grid/TreeGrid/Tree/ListView/Menu/GView.
 * The 'selectable' property of the component/data is used to enable/disable data select.
 *
 * @param {Function}clazz   - The constructor to implement the interface, ex) z.widget.Tree
 */
var $SelectInterface = function (clazz) {
};
/**
 * The isSelectable is a callback function used to control whether the data can be selected or not.
 *
 * @param {z.Data}data              - The data to be checked.
 *
 * @return {boolean}checkable       - If true, the data can be selected, otherwise not.
 *
 * @example
 * <pre>
 * view.isSelectable = function (data) {
 *     return data.get("url") != null;
 * }
 * </pre>
 */
$SelectInterface.prototype.isSelectable = function (data) {
};
/**
 * Sets up a function that will be called whenever the selection changes.
 *
 * @param {Function}listener                - The specified function to run when the selection changes.
 * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 *  view.onSelectChange(function (evt) {
 *      console.log(evt.type, evt.data);
 *  });
 * </pre>
 *
 */
$SelectInterface.prototype.onSelectChange = function (listener, thisArg) {
};
/**
 * Sets up a function that will be called whenever the selection changes.
 *
 * ★The difference between onSelectChange and onSelectBatchChange is
 * When using the {@link $SelectInterface.select|select} method to set the new selection data,
 * if the current selection is not empty, the clear method will be called first to clear the current selection, and then select the specified data.
 * During this process, two events('clear' and 'set') will be emitted quickly,
 * - the listener set up by the onSelectChange method will be called <b>twice</b>.
 * - onSelectBatchChange method will merge the two events, and the listener will be called only <b>once</b>
 *
 * @param {Function}listener                - The specified function to run when the selection changes.
 * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 *  view.onSelectBatchChange(function (selected) {//param is the selected data array
 *      console.log(selected)
 *  });
 * </pre>
 */
$SelectInterface.prototype.onSelectBatchChange = function (listener, thisArg) {
};
/**
 * Selects the specified data.
 *
 * @param {z.Data|Object|Array}data     - The specified data or the array containing the data to be selected .
 * @param {boolean}[isAdd]              - Optional. If true, select the data in append mode, otherwise, select the data in replace mode(clear+set), default false(replace mode)
 *
 * @return void
 *
 * @example
 * <pre>
 *  view.select({name:"focus-ui"});//object
 *  view.select([{name:"data1"},{name:"data2"}]);//array
 *
 *  view.select(data1);//model data
 *  view.select([data1,data2]);//model data array
 * </pre>
 *
 */
$SelectInterface.prototype.select = function (data, isAdd) {
};
/**
 * Unselects the specified data.
 *
 * @param {z.Data|Object|Array}data    - The specified data or the array containing the data be be unselected.
 *
 * @return void
 *
 * @example
 * <pre>
 *  view.unselect({name:"focus-ui"});//object
 *  view.unselect([{name:"data1"},{name:"data2"}]);//object array
 *
 *  view.unselect(data1);//model data
 *  view.unselect([data1,data2]);//model data array
 * </pre>
 */
$SelectInterface.prototype.unselect = function (data) {
};
/**
 * Clears all the selection.
 *
 * @return void
 *
 * @example
 * view.clearSelect();
 */
$SelectInterface.prototype.clearSelect = function () {
};
/**
 * Makes all the data selected.
 *
 * @param {boolean}[onlyVisible]    - Optional. If false, all the data(visible/invisible) will be selected,
 *                                              otherwise, only the visible data will be selected, default true(only visible).
 *
 * @return void
 *
 * @example
 * view.selectAll();
 */
$SelectInterface.prototype.selectAll = function (onlyVisible) {
};
/**
 * Returns an array of all the selected items.
 *
 * @return [Array]selectedArray     - An array containing all the selected data.
 *
 * @example
 * view.getSelected();
 */
$SelectInterface.prototype.getSelected = function () {
};
/**
 * Returns the last selected data.
 *
 * @return {z.Data}lastSelectedData     - The last selected data.
 *
 * @example
 * view.getLastSelected();
 */
$SelectInterface.prototype.getLastSelected = function () {
};
/**
 * Returns true if the specified data is selected, else false.
 *
 * @param {Object|z.Data}data       - The specified data to be checked. It can be an object or a z.Data instance.
 *
 * @return {boolean}isSelected      - true if the data is selected; otherwise false.
 *
 * @example
 * view.isSelected(data)
 */
$SelectInterface.prototype.isSelected = function (data) {
};

/**
 * The component that implements $ExpandInterface will have the ability to expand/collapse the data.
 * The following components implement this interface, Tree/TreeGrid/Menu/Collapse/GView
 *
 * @param {Function}clazz   - The constructor to implement the interface, ex) z.widget.Tree
 */
var $ExpandInterface = function (clazz) {
};
/**
 * The isExpandable is a callback function used to control whether the data can be expanded/collapsed or not.
 *
 * @param {z.Data}data              - The data to be checked.
 *
 * @return {boolean}expandable      - If true, the data can be expanded/collapsed, otherwise not.
 *
 * @example
 * <pre>
 * view.isExpandable = function (data) {
 *     return data.get("age") > 18;
 * }
 * </pre>
 */
$ExpandInterface.prototype.isExpandable = function (data) {
};
/**
 * Sets up a function that will be called whenever the data expand state changes(expand/collapse).
 *
 * @param {Function}listener                - The specified function to run when the expand state changes.
 * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 *  view.onExpandChange(function (evt) {
 *      console.log(evt.type, evt.data); //type: add/remove/clear/set
 *  });
 * </pre>
 *
 */
$ExpandInterface.prototype.onExpandChange = function (listener, thisArg) {
};
/**
 * Sets up a function that will be called whenever the data is expanded(only expand).
 *
 * @param {Function}listener                - The specified function to run when the data is expanded.
 * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 *  view.onExpand(function (data) {
 *      console.log(data);
 *  });
 * </pre>
 *
 */
$ExpandInterface.prototype.onExpand = function (listener, thisArg) {
};
/**
 * Sets up a function that will be called whenever the data is collapsed(only collapse).
 *
 * @param {Function}listener                - The specified function to run when the data is collapsed.
 * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 *  view.onCollapse(function (data) {
 *      console.log(data);
 *  });
 * </pre>
 *
 */
$ExpandInterface.prototype.onCollapse = function (listener, thisArg) {
};
/**
 * Expands the specified data.
 *
 * @version 2.1 - add expand_ancestor param
 *
 * @param {z.Data|Object|Array}data     - The specified data or the array containing the data to be expanded.
 * @param {boolean}expand_ancestor      - If true, ancestors of the data will be expanded, default false.
 *
 * @return void
 *
 * @example
 * <pre>
 *  view.expand({name:"focus-ui"});//object
 *  view.expand([{name:"data1"},{name:"data2"}]);//array
 *
 *  view.expand(data1);//model data
 *  view.expand([data1,data2]);//model data array
 *  view.expand(data1,true);//data1 and the ancestors will be expanded
 * </pre>
 *
 */
$ExpandInterface.prototype.expand = function (data, expand_ancestor) {
};
/**
 * Collapses the specified data.
 *
 * @version 2.1 - add collapse_descendant param
 *
 * @param {z.Data|Object|Array}data         - The specified data or the array containing the data to be collapsed.
 * @param {boolean}collapse_descendant      - If true, the descendants of the data will be collapsed, default false.
 *
 * @return void
 *
 * @example
 * <pre>
 *  view.collapse({name:"focus-ui"});//object
 *  view.collapse([{name:"data1"},{name:"data2"}]);//array
 *
 *  view.collapse(data1);//model data
 *  view.collapse([data1,data2]);//model data array
 *  view.collapse(data1,true);//data1 abd the descendants will be collapsed
 * </pre>
 *
 */
$ExpandInterface.prototype.collapse = function (data, collapse_descendant) {
};
/**
 * Makes all the data expanded.
 *
 * @param {boolean}[onlyVisible]    - Optional. If false, all the data(visible/invisible) will be expanded,
 *                                              otherwise, only the visible data will be expanded, default true(only visible).
 *
 * @return void
 *
 * @example
 * view.expandAll();
 */
$ExpandInterface.prototype.expandAll = function (onlyVisible) {
};
/**
 * Makes all the data collapsed.
 *
 * @return void
 *
 * @example
 * view.collapseAll();
 */
$ExpandInterface.prototype.collapseAll = function () {
};
/**
 * Returns true if the specified data is expanded, else false.
 *
 * @param {Object|z.Data}data       - The specified data to be checked. It can be an object or a z.Data instance.
 *
 * @return {boolean}isExpanded      - true if the data is expanded; otherwise false.
 *
 * @example
 * view.isExpanded(data);
 */
$ExpandInterface.prototype.isExpanded = function (data) {
};

/**
 * The component that implements $HoverInterface will have the ability to hover the data.
 * The 'hoverable' property of the component/data is used to enable/disable data hover
 *
 */
var $HoverInterface = function (clazz) {
};
/**
 * The isHoverable is a callback function used to control whether the data can be hovered or not.
 *
 * @param {z.Data}data              - The data to be checked.
 *
 * @return {boolean}checkable       - If true, the data can be hovered, otherwise not
 *
 * @example
 * <pre>
 * var list = new z.widget.ListView({
 *     isHoverable: function (data) {
 *         return data.get("age") > 10; // Only data with age > 10 can be hovered.
 *     }
 * })
 * </pre>
 *
 */
$HoverInterface.prototype.isHoverable = function (data) {
};
/**
 * Sets the current hover data.
 *
 * @param {Object|z.Data}data   - The specified data to be hovered.
 *
 * @return void
 *
 * @example
 * view.setHoverData({name:"focus-ui"});//object
 * view.setHoverData(data1);//model data
 */
$HoverInterface.prototype.setHoverData = function (data) {
};
/**
 * Returns the current hover data.
 *
 * @return {z.Data}data     - The current hover data
 */
$HoverInterface.prototype.getHoverData = function () {
};
/**
 * Returns true if the specified data is hover, else false.
 *
 * @param {Object|z.Data}data       - The specified data to be checked. It can be an object or a z.Data instance.
 *
 * @return {boolean}isHover         - true if the data is hover; otherwise false.
 */
$HoverInterface.prototype.isHover = function (data) {
};
/**
 * Sets up a function that will be called whenever the hover data is changed.
 *
 * @param {Function}listener            - The specified function to run when hover data changes, taking one argument changeEvt with two properties
 *                                          <ul>
 *                                              <li>data</li>       - The hover changed data(z.Data),
 *                                              <li>isHover</li>    - whether the data  is hover or not,
 *                                          </ul>
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 * view.onHoverChange(function (evt) {
 *      console.log(evt.data,evt.isHover);
 *  });
 * </pre>
 *
 */
$HoverInterface.prototype.onHoverChange = function (listener, thisArg) {
};

/**
 *
 * The z.Data is the most basic object class in component, z.gv.Node/z.gv.Link, etc. are all inherited from z.Data.
 * The z.Data and z.Provider is the data-driven model of the ui component.
 * The same data will be displayed as different object in different components. ex) it will be displayed as a row in the table component and as a node in the tree component and so on.
 *
 * @memberOf z
 * @extends $ChangeSupport
 * @constructor
 *
 * @param {Object}[args]        - Optional, the arguments to initialize the model data.
 *                                  <table>
 *                                      <tr>
 *                                          <th>#option#</th>
 *                                          <th>#description#</th>
 *                                          <th>#default#</th>
 *                                      </tr>
 *                                      <tr>
 *                                          <td>name</td>
 *                                          <td>The name attribute of the data</td>
 *                                          <td></td>
 *                                     </tr>
 *                                 </table>
 *
 * @return {z.Data}data         - The data instance
 *
 * @example
 * <pre>
 * var data = new z.Data({
 *      name:"focus-ui"
 * })
 * var data = new z.gv.Node({
 *      name:"focus-ui"
 * })
 * </pre>
 *
 * @see {@link $ZObject}
 */
z.Data = function (args) {
};
/**
 * Adds the specified child data to the list of children of the current data.It equals to: child.set("parent",data)
 *
 * A data can not have two parent.
 * If the the specified child data already has another parent, it will be automatically removed from the parent data first.
 *
 * The following operations are not allowed
 * -The specified child data is current data
 * -The specified child data is ancestor of the current data
 *
 * @param {z.Data}child     - The child data to add
 *
 * @return void
 *
 * @example
 * <pre>
 * var parentData = new z.Data({name: "parent"});
 * var childData1 = new z.Data({name: "child1"});
 * var childData2 = new z.Data({name: "child2"});
 *
 * parentData.addChild(childData1);// add a child data
 * childData2.set("parent", parentData);//equals to:   parentData.addChild(childData2);
 *
 * console.log(parentData.isParentOf(childData1));//true
 * console.log(parentData.isParentOf(childData2));//true
 * console.log(parentData.getChildren());//[childData1,childData2]
 *
 * parentData.removeChild(childData1); //remove a child data
 * console.log(parentData.isParentOf(childData1));//false
 *
 * parentData.clearChildren(); // clear all the children data
 * console.log(parentData.getChildren());//[]
 *
 * parentData.addChild(parentData);// do nothing
 * console.log(parentData.getChildren());//[]
 *
 * parentData.addChild(childData1);
 * childData1.addChild(childData2);
 * childData2.addChild(parentData);// do nothing
 * console.log(childData2.getChildren());//[]
 * </pre>
 */
z.Data.addChild = function (child) {
};
/**
 * Removes a child data from the current data.
 *
 * @param {z.Data}child     - The specified child data to remove
 *
 * @return void;
 *
 * @see {@link z.Data.addChild}
 */
z.Data.removeChild = function (child) {
};
/**
 * Removes all children data form the current data.
 *
 * @return void
 *
 * @see {@link z.Data.addChild}
 */
z.Data.clearChildren = function () {
};
/**
 * Gets all the children data array form the current data.
 *
 * @param {boolean}[copy]       - If not true, a copy of the children array will be returned, otherwise, return children array. If the returned array may be modified, please do not use true.
 *
 * @return {Array}children      - The children data array.
 *
 * @see {@link z.Data.addChild}
 */
z.Data.getChildren = function (copy) {
};
/**
 * Determines whether the data is the parent of the specified child.
 *
 * @param {z.Data}child         - The child data to be checked.
 *
 * @return {boolean}isParent    - true if the current data is the parent of the specified data; otherwise, false.
 *
 * @see {@link z.Data.addChild}
 */
z.Data.isParentOf = function (child) {
};
/**
 * Determines whether the current data has children or not
 *
 * @return {boolean}has         -  true if the current data has the children data; otherwise, false.
 */
z.Data.hasChildren = function () {
};
/**
 * Executes a provided function once for each children data
 * <b>The callback function returns false to break the loop.</b>
 *
 * @param {Function}callback            - Function to execute for each child,<b>Returns false to break the loop.</b> taking two arguments:
 *                                          <ul>
 *                                              <li>currentData</li>    - The current data being processed in the model provider.
 *                                              <li>index</li>          - The index of the current data being processed in the model provider.
 *                                          </ul>
 * @param {Object}[thisArg]            - Value to use as this (i.e the reference Object) when executing callback.
 *
 * @return void
 *
 * @see {@link z.util.eachArray}
 */
z.Data.eachChildren = function (callback, thisArg) {
};

/**
 * The z.Provider is the container and of the Data
 * - Manage Data(add/remove/query)
 * - Event Forward
 * - Drive View(1:N)
 *
 * @memberOf z
 * @constructor
 *
 * @param {Array|Object}[args] - The array of the data or the property of the provider
 *
 * @example
 * <pre>
 *  var provider = new z.Provider([data1, data2])
 * </pre>
 *
 */
z.Provider = function (args) {
};
/**
 * Adds data to the provider.
 *
 * @param {z.Data|Array}data        - The data to be added, It can be an array or a z.Data instance.
 * @param {number}[index]           - Optional. The index at which to insert the data.
 *
 * @return void
 *
 * @example
 * <pre>
 * provider.add(new z.Data({name: "focus-ui"}));//model data
 * provider.add(new z.Data({name: "focus-ui"}),0);//with index
 * provider.add([new z.Data({name: "data1"}), new z.Data({name: "data2"})]);//model data array
 * </pre>
 */
z.Provider.prototype.add = function (data, index) {
};
/**
 * Removes the specified data from the provider.
 *
 * @param {z.Data}data     - The specified data to be removed.
 *
 * @return void
 *
 * @example
 * provider.remove(aData);
 *
 */
z.Provider.prototype.remove = function (data) {
};
/**
 * Removes all the data from the provider.
 *
 * @return void
 *
 * @example
 * provider.clear();
 *
 */
z.Provider.prototype.clear = function () {
};
/**
 * Determines whether the provider contains the specified data.
 *
 * @param {z.Data}data          - The specified data to search.
 *
 * @return {boolean}            - true if the the provider contains the data; otherwise, false.
 *
 * @example
 * provider.contains(aData)
 *
 */
z.Provider.prototype.contains = function (data) {
};
/**
 * Returns the first data that matches the specified condition.
 *
 * @param {string|Object|Function}prop      - The specified property name. It can be a string or an object or a function. If prop is an object or a function, the value parameter will be ignored.
 * @param {*}[value]                        - The specified value.
 *
 * @return {z.Data}data                     - The first data the matches the specified condition; otherwise, undefined is returned.
 *
 * @example
 * <pre>
 * provider.find("name", "focus-ui");// the data with name="focus-ui"
 * provider.find({// the data with name="focus-ui" and version=2.0
 *        name: "focus-ui",
 *        version: 2.0
 *    });
 * provider.find(function (data) {
 *        return data.get("name")==="focus-ui";// the data with name="focus-ui"
 *    })
 * </pre>
 *
 */
z.Provider.prototype.find = function (prop, value) {
};
/**
 * Returns a new array with all the data that matches the specified condition.
 *
 * @param {string|Object|Function}prop      - The specified property name. It can be an object or a string or a function. If prop is an object or a function, the value parameter will be ignored.
 * @param {*}[value]                        - The specified value.
 *
 * @return {Array}dataArray                 - The array with all data that matches the specified condition.
 *
 * @example
 * <pre>
 * provider.filter("type","node");//all the data with type="node"
 * provider.filter({//all the data with type="node" and shape="circle"
 *        type:"node",
 *        shape:"circle"
 *    });
 * provider.filter(function (data) {
 *        return data.get("type")==="node";//all the data with type="node"
 *    })
 * </pre>
 *
 */
z.Provider.prototype.filter = function (prop, value) {
};
/**
 * Returns an array containing all the data.
 *
 * @return {Array}dataArray     - The array containing all the data.
 *
 * @example
 * provider.toArray();
 */
z.Provider.prototype.toArray = function () {
};
/**
 * Returns the number of the data in model provider.
 *
 * @return {number}size        - The number of the data
 *
 * @example
 * provider.size();
 */
z.Provider.prototype.size = function () {
};
/**
 * Executes a provided function once for each data.
 * <b>The callback function returns false to break the loop.</b>
 *
 * @param {Function}callback            - Function to execute for each data,<b>Returns false to break the loop.</b> taking two arguments:
 *                                          <ul>
 *                                              <li>currentData</li>    - The current data being processed in the model provider.
 *                                              <li>index</li>          - The index of the current data being processed in the model provider.
 *                                          </ul>
 * @param {Object}[thisArg]            - Value to use as this (i.e the reference Object) when executing callback.
 *
 * @return void
 *
 * @example
 * <pre>
 * var nameArr = [];
 * provider.each(function (data) {
 *        nameArr.push(data.get("name"));
 *    });
 * var hasGroup = false;
 * provider.each(function (data,index) {
 *        if (data.get("type") === "group") {
 *            hasGroup = true;
 *            return false;
 *        }
 *    });
 * </pre>
 *
 */
z.Provider.prototype.each = function (callback, thisArg) {
};

/**
 * The base class for all model data components.
 * <b>★Some properties can be set on the data or on the view. The priority of the attributes on the data is higher than the attributes on the view</b>.
 * ex)selectable/checkable/hoverable/expandable/movable/visible/disabled
 *
 *
 * @extends $IView
 * @param {Object}[args]    - Optional. The arguments to initialize the component. see {@link $IView}
 *                              <table>
 *                                  <tr>
 *                                      <th>#option#</th>
 *                                      <th>#description#</th>
 *                                      <th>#default#</th>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>data</td>
 *                                      <td>the model data of the view , see {@link $IDataView.setData|setData}</td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>selectable</td>
 *                                      <td>If true, the data can be selected. see {@link $SelectInterface.isSelectable|isSelectable}</td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>checkable</td>
 *                                      <td>If false, the data can not be checked. see {@link $CheckInterface.isCheckable|isCheckable}.</td>
 *                                      <td>true</td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>hoverable</td>
 *                                      <td>If true, the data can not be hover. see {@link $HoverInterface.isHoverable|isHoverable}.</td>
 *                                      <td>false</td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>expandable</td>
 *                                      <td>If false, the data can not be expanded/collapsed. see {@link $ExpandInterface.isExpandable|isExpandable}.</td>
 *                                      <td>true</td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>movable</td>
 *                                      <td>If false, the data can not be movable. see {@link $IDataView.isMovable|isMovable}</td>
 *                                      <td>true</td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>visible</td>
 *                                      <td>If false, the data will not be visible. see {@link $IDataView.isVisible|isVisible}</td>
 *                                      <td>true</td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>disabled</td>
 *                                      <td>If true, the data will be disabled, can not be selected/checked/hovered/moved. see {@link $IDataView.isDisabled|isDisabled}</td>
 *                                      <td>false</td>
 *                                  </tr>
 *                              </table>
 * @constructor
 */
var $IDataView = function (args) {
};
/**
 * Sets the data provider for the view component.
 *  The view is driven by the provider, displays the data in the provider, and listens to the change of the provider to update the view
 * @param {z.Provider}provider          - The data provider
 *
 * @return void
 *
 * @example
 * <pre>
 * var provider = new z.Provider([data1, data2])
 * view.setProvider(provider)
 * </pre>
 */
$IDataView.prototype.setProvider = function (provider) {
};
/**
 * Sets the model data for the view component.
 *
 * @param {Array|Object|z.Provider}data          - The model data. It can be an array or an object
 *
 * @return void
 *
 * @example
 * <pre>
 * view.setData([
 *    {name: "data1"},
 *    {name: "data2"}
 *  ])
 * </pre>
 */
$IDataView.prototype.setData = function (data) {
};
/**
 * Adds data to the model provider of the view component.
 *
 * @param {Object|Array|z.Data}data         - The data to be added. It can be an object or an array or a z.Data instance.
 * @param {number}[index]                   - Optional. The index at which to insert the data.
 *
 * @return void
 *
 * @example
 * view.addData({name:"focus-ui"});//object
 * view.addData({name:"focus-ui"},0);//index
 *
 * view.addData([{name:"data1"},{name:"data2"}]);//array
 *
 * view.addData(new z.Data({name:"focus-ui"}));//model data
 */
$IDataView.prototype.addData = function (data, index) {
};
/**
 * Removes the specified data from the model provider.
 *
 * @param {Object|Array|z.Data}data     - The specified data to be removed. It can be an object or an array or a z.Data instance.
 *
 * @return void
 *
 * @example
 * view.removeData({name: "focus-ui"});
 * view.removeData([{name: "data1"}, {name: "data2"}]);
 *
 */
$IDataView.prototype.removeData = function (data) {
};
/**
 * Removes all the data from the model provider.
 *
 * @return void
 *
 * @example
 * view.clearData();
 *
 */
$IDataView.prototype.clearData = function () {
};
/**
 * Determines whether the model provider contains the specified data.
 *
 * @param {Object|z.Data}data       - The specified data to search. It can be an object or a z.Data instance.
 *
 * @return {boolean}                - true if the the model provider contains the data; otherwise, false.
 *
 * @example
 * view.containsData({name:"data"})
 *
 */
$IDataView.prototype.containsData = function (data) {
};
/**
 * Returns the first data that matches the specified condition.
 *
 * @param {string|Object|Function}prop      - The specified property name. It can be a string or an object or a function. If prop is an object or a function, the value parameter will be ignored.
 * @param {*}[value]                        - The specified value.
 *
 * @return {z.Data}data                     - The first data the matches the specified condition; otherwise, undefined is returned.
 *
 * @example
 * <pre>
 * view.findData("name", "focus-ui");// the data with name="focus-ui"
 * view.findData({// the data with name="focus-ui" and version=2.0
 *        name: "focus-ui",
 *        version: 2.0
 *    });
 * view.findData(function (data) {
 *        return data.get("name")==="focus-ui";// the data with name="focus-ui"
 *    })
 * </pre>
 *
 */
$IDataView.prototype.findData = function (prop, value) {
};
/**
 * Returns a new array with all the data that matches the specified condition.
 *
 * @param {string|Object|Function}prop      - The specified property name. It can be an object or a string or a function. If prop is an object or a function, the value parameter will be ignored.
 * @param {*}[value]                        - The specified value.
 *
 * @return {Array}dataArray                 - The array with all data that matches the specified condition.
 *
 * @example
 * <pre>
 * view.filterData("type","node");//all the data with type="node"
 * view.filterData({//all the data with type="node" and shape="circle"
 *        type:"node",
 *        shape:"circle"
 *    });
 * view.filterData(function (data) {
 *        return data.get("type")==="node";//all the data with type="node"
 *    })
 * </pre>
 *
 */
$IDataView.prototype.filterData = function (prop, value) {
};
/**
 * Executes a provided function once for each model data.
 * <b>The callback function returns false to break the loop.</b>
 *
 * @param {Function}callback            - Function to execute for each data,<b>Returns false to break the loop.</b> taking two arguments:
 *                                          <ul>
 *                                              <li>currentData</li>    - The current data being processed in the model provider.
 *                                              <li>index</li>          - The index of the current data being processed in the model provider.
 *                                          </ul>
 * @param {Object}[thisArg]            - Value to use as this (i.e the reference Object) when executing callback.
 *
 * @return void
 *
 * @example
 * <pre>
 * var nameArr = [];
 * view.eachData(function (data) {
 *        nameArr.push(data.get("name"));
 *    });
 * var hasGroup = false;
 * view.eachData(function (data,index) {
 *        if (data.get("type") === "group") {
 *            hasGroup = true;
 *            return false;
 *        }
 *    });
 * </pre>
 *
 */
$IDataView.prototype.eachData = function (callback, thisArg) {
};
/**
 * Returns an array containing all the data.
 *
 * @return {Array}dataArray     - The array containing all the data.
 *
 * @example
 * var arr = view.getDataArray();
 */
$IDataView.prototype.getDataArray = function () {
};
/**
 * Returns the data provider of the view.
 *
 * @return {z.Provider}provider     - The provider of the view.
 *
 * @example
 * var privider = view.getProvider();
 */
$IDataView.prototype.getProvider = function () {
};
/**
 * Returns the number of the data in model provider.
 *
 * @return {number}size        - The number of the data
 *
 * @example
 * var count = view.getDataSize();
 */
$IDataView.prototype.getDataSize = function () {
};
/**
 * Executes a provided function once for each model data by hierarchy .
 * <b>The callback function returns false to break the loop.</b>
 *
 * @param {Function}callback            - Function to execute for each data,<b>Returns false to break the loop.</b> taking one argument:
 *                                          <ul>
 *                                              <li>currentData</li>     - The current data being processed in the model provider.
 *                                          </ul>
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing callback.
 *
 * @return void
 *
 * @example
 * <pre>
 * var nameArr = [];
 * view.hEachData(function (data) {
 *        nameArr.push(data.get("name"));
 *   });
 * </pre>
 */
$IDataView.prototype.hEachData = function (callback, thisArg) {
};
/**
 * Returns an array containing all the data without parent data.
 *
 * @return {Array}rootDataArr       - The array containing all the data without parent property.
 *
 * @example
 * var rootDataArr = view.getRootDataArray();
 */
$IDataView.prototype.getRootDataArray = function () {
};

/**
 * Sets up a function that will be called whenever the model changes(setData/addData/removeData/clearData/dataPropertyChange)
 *
 * @param {Function}listener            - The specified function to add.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 * view.onModelChange(function (evt) {
 *        console.log(evt.type,evt.event);
 *    });
 * var aData = new z.Data();
 * view.setData([new z.Data(), new z.Data()]);//type:set_provider
 * view.addData(aData);//type:provider
 * aData.set("name", "abc");//type:data
 * view.removeData(aData);//type:provider
 * </pre>
 */
$IDataView.prototype.onModelChange = function (listener, thisArg) {
};
/**
 * Removes an event handler that has been attached with the {@link $IDataView.onModelChange|onModelChange} method.
 *
 * @param {Function}listener            - The specified function to remove.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * view.offModelChange(addedListener);
 *
 */
$IDataView.prototype.offModelChange = function (listener, thisArg) {
};
/**
 * Sets up a function that will be called whenever data is added to the view component.
 *
 * @param {Function}listener            - The specified function to add.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 * view.onDataAdd(function (addedData) {
 *      console.log(addedData);
 *  })
 * </pre>
 *
 */
$IDataView.prototype.onDataAdd = function (listener, thisArg) {
};
/**
 * Sets up a function that will be called whenever data is removed from the view component.
 *
 * @param {Function}listener            - The specified function to add.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 * view.onDataRemove(function (removedData) {
 *      console.log(removedData);
 *  })
 * </pre>
 *
 */
$IDataView.prototype.onDataRemove = function (listener, thisArg) {
};
/**
 * Sets up a function that will be called whenever remove all data are removed from the view component.
 *
 * @param {Function}listener            - The specified function to add.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 * view.onDataClear(function (dataArr) {
 *      console.log(dataArr);
 *  })
 * </pre>
 *
 */
$IDataView.prototype.onDataClear = function (listener, thisArg) {
};
/**
 * Sets up a function that will be called whenever data in the view component changes.
 *
 * @param {Function}listener            - The specified function to add.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 * view.onDataChange(function (data, evt) {
 *      console.log(data, evt);
 *  })
 * </pre>
 *
 */
$IDataView.prototype.onDataChange = function (listener, thisArg) {
};

/**
 * Adds a visible filter to the view .
 * <b>The filter function returns false to make the data hidden.</b>
 *
 *
 * @param {Function}filter      - The filter function, <b>Returns false to make the data hidden.</b> taking one argument:
 *                                  <ul>
 *                                      <li>currentData</li>    - The current data being processed in the view model provider.
 *                                  </ul>
 * @return void
 *
 * @example
 * <pre>
 * view.addVisibleFilter(function (data) {
 *     var filterValue = z.dom.getValue("#filterInput").trim();
 *     if (filterValue) {
 *         filterValue = filterValue.toLowerCase();
 *         var name = data.get("name");
 *         if (name.toLowerCase().indexOf(filterValue) >= 0) {
 *             return true;
 *         }
 *         return false;
 *     }
 *     return true;
 * });
 * </pre>
 *
 */
$IDataView.prototype.addVisibleFilter = function (filter) {
};
/**
 * Removes the visible filter added to the view.
 *
 * @param {Function}addedFilter     - The visible filter function added to the view.
 *
 * @return void
 *
 * @example
 * view.removeVisibleFilter(addedFilter);
 */
$IDataView.prototype.removeVisibleFilter = function (addedFilter) {
};
/**
 * Clears all the visible filters added to the view.
 *
 * @return void
 *
 * @example
 * view.clearVisibleFilter();
 */
$IDataView.prototype.clearVisibleFilter = function () {
};

/**
 * Sets up a function that will be called when the data is clicked.
 *
 * @param {Function}listener        - The specified function to run when the data is clicked.
 * @param {Object}[thisArg]         - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 * view.onDataClick(function (evt) {
 *     console.log(evt.data);//the clicked data
 *     console.log(evt.event);//the click event
 *  })
 * </pre>
 */
$IDataView.prototype.onDataClick = function (listener, thisArg) {
};
/**
 * Sets up a function that will be called when the data is double-clicked.
 *
 * @param {Function}listener        - The specified function to run when the data is double-clicked.
 * @param {Object}[thisArg]         - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 * view.onDataDblClick(function (evt) {
 *     console.log(evt.data);//the double-clicked data
 *     console.log(evt.event);//the double-clicked event
 *  })
 * </pre>
 */
$IDataView.prototype.onDataDblClick = function (listener, thisArg) {
};

/**
 * The isMovable is a callback function used to control whether the data can be moved or not.
 *
 * @param {z.Data}data              - The data to be checked.
 *
 * @return {boolean}movable         - If true, the data can be moved, otherwise not.
 *
 * @example
 * <pre>
 * view.isMovable = function (node) {
 *     return node === centerNode;
 * }
 * </pre>
 */
$IDataView.prototype.isMovable = function (data) {
};
/**
 * The isVisible is a callback function used to control whether the data is visible.
 *
 * @param {z.Data}data              - The data to be checked.
 *
 * @return {boolean}visible         - If true, the data will be visible, otherwise not.
 *
 * @example
 * <pre>
 * view.isVisible = function (data) {
 *     return z.type.isNode(data);
 * }
 * </pre>
 */
$IDataView.prototype.isVisible = function (data) {
};
/**
 * The isDisabled is a callback function used to control whether the data is disabled.
 * The disabled data can not be moved/selected/checked/expand/...
 *
 * @param {z.Data}data              - The data to be checked.
 *
 * @return {boolean}disabled        - If true, the data will be disabled, otherwise not.
 *
 * @example
 * <pre>
 * view.isDisabled = function (data) {
 *     return z.type.isGroup(data);
 * }
 * </pre>
 */
$IDataView.prototype.isDisabled = function (data) {
};

Object.assign($IDataView.prototype, $CheckInterface.prototype);
Object.assign($IDataView.prototype, $SelectInterface.prototype);
Object.assign($IDataView.prototype, $ExpandInterface.prototype);
Object.assign($IDataView.prototype, $HoverInterface.prototype);

/**
 * The base class for all canvas components
 *
 * @extends $IDataView
 *
 * @param {Object}[args]    - Optional. The arguments to initialize the component. see {@link $IView} and {@link $IDataView}
 *                              <table>
 *                                  <tr>
 *                                      <th>#option#</th>
 *                                      <th>#description#</th>
 *                                      <th>#default#</th>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>translate_x</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>translate_y</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>zoom</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>zoom_factor</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>max_zoom</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>min_zoom</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>grid_line_visible</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>grid_line_space</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>grid_line_stroke</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>grid_line_stroke_line_width</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>grid_line_axis_stroke_line_width</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>grid_line_visible</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>grid_line_visible</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>grid_line_visible</td>
 *                                      <td></td>
 *                                      <td></td>
 *                                  </tr>
 *                              </table>
 */
var $IDataCanvasRendererView = function (args) {
};
/**
 * Zooms in the canvas.
 * It wil add a scaling transformation to the canvas.
 * newZoom = zoom * zoom_factor
 * gView.set("zoom", gView.get("zoom") * gView.get("zoom_factor")) method can also be used to set the new zoom in value
 *
 * @param {boolean}[center]     - If not false, the center point of the component will be the center point of the zoom,
 *                                  otherwise the upper-left corner(0,0) will be the center point of the zoom, default true
 *
 * @return void
 *
 * @example
 * gView.zoomIn();
 * gView.zoomIn(false);
 */
$IDataCanvasRendererView.prototype.zoomIn = function (center) {
};
/**
 * Zooms out the canvas.
 * It wil add a scaling transformation to the canvas.
 * newZoom = zoom / zoom_factor
 * gView.set("zoom", gView.get("zoom") / gView.get("zoom_factor")) method can also be used to set the new zoom out value
 *
 * @param {boolean}[center]     - If not false, the center point of the component will be the center point of the zoom,
 *                                  otherwise the upper-left corner(0,0) will be the center point of the zoom, default true
 *
 * @return void
 *
 * @example
 * gView.zoomOut();
 * gView.zoomOut(false);
 */
$IDataCanvasRendererView.prototype.zoomOut = function (center) {
};
/**
 * Sets the new zoom value, the center point of the component will be the center point of the zoom
 *
 * @param {number}zoom  - the new zoom value.
 *
 * @return void
 *
 * @example
 * gView.zoomCenter(1);
 * gView.zoomCenter(0.6);
 * gView.zoomCenter(2);
 */
$IDataCanvasRendererView.prototype.zoomCenter = function (zoom) {
};
/**
 * Sets the new zoom value, the specified point will be the center point of the zoom
 *
 * @param {number}zoom      - the new zoom value.
 * @param {Object}point     - the specified point, it must be the offset point relative to the upper-left corner.
 *                              see {@link $IDataCanvasRendererView.getEventRelativePoint|getEventRelativePoint}
 *
 * @return void
 *
 * @example
 * <pre>
 * z.dom.event.on(gView.getRoot(), "wheel", function (evt) {
 *        evt.preventDefault();
 *        var zoomFactor = gView.getProperty("zoom_factor");
 *        var zoom = gView.getProperty("zoom");
 *        if ($DomWheelEventUtil.isWheelDown(evt)) {
 *            zoom /= zoomFactor
 *        } else {
 *            zoom *= zoomFactor
 *        }
 *        gView.zoomByPoint(zoom, gView.getEventRelativePoint(evt));
 *    });
 * </pre>
 *
 */
$IDataCanvasRendererView.prototype.zoomByPoint = function (zoom, point) {
};
/**
 * Adds a translation transformation to the canvas matrix by moving the canvas and its origin x units horizontally and y units vertically.
 *
 * @param {number}x     - the specified distance to move in the horizontal direction
 * @param {number}y     - the specified distance to move in the vertical direction
 *
 * @return void
 *
 * @example
 * gView.translate(100, 100);
 * gView.translate({x: 200, y: 200});// point object can also be acceptable argument
 */
$IDataCanvasRendererView.prototype.translate = function (x, y) {
};
/**
 * Reset the current transformation matrix value(zoom/translate).
 * It equals to: gView.set({zoom: 1,translate_x: 0,translate_y: 0})
 * @return void
 *
 * @example
 * gView.resetTransform();
 */
$IDataCanvasRendererView.prototype.resetTransform = function () {
};
/**
 * Returns the original point of the specified event or displayed/transformed point, which can be used as the property of the data.
 * The result is a point relative to the upper-left corner of the component(*Not Transformed*).
 *
 * @param {MouseEvent|TouchEvent|Object}evtOrTransformedPoint   - The event or displayed/transformed point to the upper-left corner of the current view.
 *
 * @return {Object}point                                        - The original point relative to the upper-left corner of the component
 *
 * @example
 * console.log(gView.getOriginalPoint({x: 100, y: 100}));
 * console.log(gView.getOriginalPoint(mouseEvent));
 *
 * node.setPosition(gView.getOriginalPoint(mouseEvent));
 * node.setCenter(gView.getOriginalPoint(mouseEvent));
 */
$IDataCanvasRendererView.prototype.getOriginalPoint = function (evtOrTransformedPoint) {
};
/**
 * Returns the original rectangle of the displayed/transformed rectangle, which can be used as the property of the data.
 * The result is a rectangle relative to the upper-left corner of the component(*Not Transformed*).
 *
 * @param {Object}transformedRect   - The displayed/transformed rectangle to the upper-left corner of the current view
 *
 * @return {Object}point            - The original rectangle relative to the upper-left corner of the component
 *
 * @example
 * var p1 = gView.getEventRelativePoint(mouseDownEvent);
 * var p2 = gView.getEventRelativePoint(mouseUpEvent);
 * var modelRect = gView.getOriginalRect(z.math.calcPointsBounds(p1, p2));
 *
 */
$IDataCanvasRendererView.prototype.getOriginalRect = function (transformedRect) {
};
/**
 * Returns the point of the specified event relative to the upper-left corner of the component.
 *
 * @param {MouseEvent|TouchEvent}evt        - The specified event
 *
 * @return {Object}point                    - The relative point to the upper-left corner of the component.
 *
 * @example
 * <pre>
 * z.dom.event.onclick(function (event) {
 *     console.log(gView.getEventRelativePoint(event));
 * })
 * </pre>
 */
$IDataCanvasRendererView.prototype.getEventRelativePoint = function (evt) {
};
/**
 * Returns the bounds of the specified data relative to upper-left corner of the current window {@link https://developer.mozilla.org/en-US/docs/Glossary/Viewport|viewport}.
 * The Bounds is the area actually displayed on the page after *Transformed*
 *
 * @param {z.Data}data              - The specified data object.
 * @param {boolean}[bodyOnly]       - If false, returns the whole bounds(body+label+outline+...) of the data,
 *                                    otherwise returns the body bounds of the data(default)
 *
 * @return {object}bounds           - The bounds of the specified data relative to upper-left corner of the window viewport
 *
 * @example
 * gView.getDataWindowBounds(node)
 * gView.getDataWindowBounds(node,true)
 *
 */
$IDataCanvasRendererView.prototype.getDataWindowBounds = function (data, bodyOnly) {
};
/**
 * Returns the bounds of the specified data relative to upper-left corner of the entire page document.
 * The Bounds is the area actually displayed on the page after *Transformed*
 *
 * @param {z.Data}data              - The specified data object.
 * @param {boolean}[bodyOnly]       - If false, returns the whole bounds(body+label+outline+...) of the data,
 *                                    otherwise, returns the body bounds of the data(default)
 *
 * @return {object}bounds           - The bounds of the specified data relative to upper-left corner of the page document
 *
 * @example
 * gView.getDataPageBounds(node)
 * gView.getDataPageBounds(node,true)
 *
 */
$IDataCanvasRendererView.prototype.getDataPageBounds = function (data, bodyOnly) {
};
/**
 * Returns the data at the specified event or relative point.
 *
 * @param {MouseEvent|TouchEvent|Object}evtOrTransformedPoint   - The event or displayed/transformed point to the upper-left corner of the current view.
 * @param {boolean}[bodyOnly]                                   - If false, the whole bounds(body+label+outline+...) will be used for checking,
 *                                                               otherwise, only the body bounds will be used for checking(default)
 *
 * @returns {z.Data}data                                        - The data at the specified event or relative point.
 *
 * @example
 * gView.getDataAt(mouseDownEvent)
 * gView.getDataAt({x: 100, y: 100}, false)
 */
$IDataCanvasRendererView.prototype.getDataAt = function (evtOrTransformedPoint, bodyOnly) {
};
/**
 * Returns all the data array at the specified event or relative point.
 *
 * @param {MouseEvent|TouchEvent|Object}evtOrTransformedPoint   - The event or displayed/transformed point to the upper-left corner of the current view.
 * @param {boolean}[bodyOnly]                                   - If false, the whole bounds(body+label+outline+...) will be used for checking,
 *                                                               otherwise, only the body bounds will be used for checking(default)
 *
 * @returns {Array}dataArray                                    - The all data array at the specified event or relative point.
 *
 * @example
 * gView.getDataArrayAt(mouseDownEvent)
 * gView.getDataArrayAt({x: 100, y: 100}, false)
 */
$IDataCanvasRendererView.prototype.getDataArrayAt = function (evtOrTransformedPoint, bodyOnly) {
};
/**
 * Returns all the data array at the specified relative rectangle.
 *
 * @param {Object}transformedRect   - The specified displayed/transformed rectangle.
 * @param {boolean}[bodyOnly]       - If false, the whole bounds(body+label+outline+...) will be used to for checking,
 *                                    otherwise, only the body bounds will be used for checking(default)
 *
 * @returns {z.Data}dataArray       - The all data array at the specified rectangle.
 *
 * @example
 * gView.getDataArrayAtRect({x: 100, y: 100, width:100, height:100}, false)
 */
$IDataCanvasRendererView.prototype.getDataArrayAtRect = function (transformedRect, bodyOnly) {
};

/**
 * The base class for all popup components.
 *
 * @constructor
 * @extends $IView
 *
 * @param {Object}[args]        - The arguments to initialize the popup component.
 *                               <table>
 *                                   <tr>
 *                                       <th>#option#</th>
 *                                       <th>#description#</th>
 *                                       <th>#default#</th>
 *                                   </tr>
 *                                   <tr>
 *                                       <td>close_icon_visible</td>
 *                                       <td>Specifies whether the close icon is visible. If true, the close icon will be visible. Otherwise invisible</td>
 *                                       <td></td>
 *                                   </tr>
 *                                   <tr>
 *                                       <td>close_on_click</td>
 *                                       <td>Specifies whether the popup component should close when it is clicked</td>
 *                                       <td>false</td>
 *                                   </tr>
 *                                   <tr>
 *                                       <td>close_on_click_outside</td>
 *                                       <td>Specifies whether the popup component should close when clicking outside of the component</td>
 *                                       <td>false</td>
 *                                   </tr>
 *                                   <tr>
 *                                       <td>content</td>
 *                                       <td>the content of the popup component</td>
 *                                       <td></td>
 *                                   </tr>
 *                                   <tr>
 *                                       <td>title</td>
 *                                       <td>the title of the popup component</td>
 *                                       <td></td>
 *                                   </tr>
 *                               </table>
 *
 * @return {$IPopUpView}popUpView        -  The PopUpView instance
 *
 */
var $IPopUpView = function (args) {
};
/**
 * Opens the popup component and makes the component visible.
 *
 * @param {string|HTMLElement}[refEle]    - The specified reference element to position the popup component.
 *                                          Only effective when the component is a IHostPopUpView instance(Tooltip/Popover)
 *
 * @example
 * <pre>
 * var tooltip = new z.widget.Tooltip({
 *      content:"This is a tooltip"
 * });
 * tooltip.open("#refButton")
 * </pre>
 *
 */
$IPopUpView.prototype.open = function (refEle) {
};
/**
 * Closes the popup component.
 * Removes the component's root div from the DOM.
 */
$IPopUpView.prototype.close = function () {
};

/**
 * @memberOf z
 * @namespace
 */
z.widget = {};
/**
 * The ListView component represents the listed data items.
 *
 * @constructor
 * @extends $IDataView
 *
 * @param {Object}[args]                    - Optional. The arguments to initialize the ListView.
 *
 * @return {z.widget.ListView}listView      -  The ListView instance
 *
 * @example
 * <pre>
 * //<b>as constructor</b>
 * var listView = new z.widget.ListView({
 *     appendTo:".container",   //the parentNode of the listView
 *     data:[                   //the model data
 *        {name: "Item1"},
 *        {name: "Item2"}
 *      ]
 *  })
 * //<b>as method</b>
 * var listView = z.widget.ListView({//'new' is omitted
 *     appendTo:".container",
 *     data:[
 *        {name: "Item1"},
 *        {name: "Item2"}
 *      ]
 *  })
 * </pre>
 */
z.widget.ListView = function (args) {
};
/**
 * The Tree component represents a hierarchical collection of items.
 *
 * @constructor
 * @extends $IDataView
 *
 * @param {Object}args              - The arguments to initialize the Tree.
 *
 * @return {z.widget.Tree}tree      -  The Tree instance
 *
 * @example
 * <pre>
 * var tree = z.widget.Tree({
 *        appendTo: ".container",
 *        data: [
 *            {
 *                name: "This PC",
 *                children: [
 *                    {name: "Documents"},
 *                    {name: "Downloads"},
 *                    {
 *                        name: "Windows(C:)",
 *                        children: [
 *                            {name: "Program Files"},
 *                            {name: "Users"},
 *                            {name: "Windows"}
 *                        ]
 *                    }
 *                ]
 *            }
 *        ]
 *    });
 * tree.expandAll();
 * </pre>
 */
z.widget.Tree = function (args) {
};
/**
 * The Tabs component is a hybrid component that is made of a multiview and a tabbar
 *
 * @constructor
 * @extends $IDataView
 *
 * @param {Object}args              - The arguments to initialize the Tabs.
 *
 * @return {z.widget.Tabs}tabs      -  The Tabs instance
 *
 * @example
 * <pre>
 * var tabs = z.widget.Tabs({
 *        appendTo: ".container",
 *        data: [{name: "Text", content: "Text Content"},
 *            {name: "Element", content: z.dom.query("form")}]
 *    });W
 * </pre>
 */
z.widget.Tabs = function (args) {
};
/**
 * The Collapse component is used to show and hide content.
 *
 * @constructor
 * @extends $IDataView
 *
 * @param {Object}args                  - The arguments to initialize the Collapse.
 *
 * @return {z.widget.Collapse}collapse  -  The Collapse instance
 *
 * @example
 * <pre>
 * var collapse = z.widget.Collapse({
 *        appendTo: ".container",
 *        data: [
 *            {name: "Text", content: "Text Content"},
 *            {name: "Form", content: z.dom.query("form")}
 *        ]
 *    });
 * </pre>
 */
z.widget.Collapse = function (args) {
};
/**
 * The Grid component is a lightweight Table widget built to easily replace HTML Tables.
 * That provides professional look-and-feel and convenient programming model for displaying data in a scrollable and sortable table。
 *
 * @constructor
 * @extends $IDataView
 *
 * @param {Object}args              - The arguments to initialize the Grid.
 *
 * @return {z.widget.Grid}grid      -  The Grid instance
 *
 * @example
 * <pre>
 * var grid = z.widget.Grid({
 *        appendTo: ".container",
 *        columns: [
 *            {name: "#", field: "index"},
 *            {name: "Language", field: "language"},
 *            {name: "Ratings", field: "ratings"},
 *            {name: "Change", field: "change"}
 *        ],
 *        data: [{"index": 1, "language": "Java", "ratings": "15.93%", "change": "2.66%"},
 *            {"index": 2, "language": "C", "ratings": "14.28%", "change": "4.12%"},
 *            {"index": 3, "language": "Python", "ratings": "8.38%", "change": "4.60%"}]
 *    });
 * </pre>
 */
z.widget.Grid = function (args) {
};
/**
 * The TreeGrid component is the hybrid between Grid and Tree.
 * That supports multi-column display of hierarchical data.
 *
 * @constructor
 * @extends $IDataView
 *
 * @param {Object}args                      - The arguments to initialize the TreeGrid.
 *
 * @return {z.widget.TreeGrid}treeGrid      -  The TreeGrid instance
 *
 * @example
 * <pre>
 * var treeGrid = z.widget.TreeGrid({
 *        appendTo: ".container",
 *        columns: [
 *            {name: "Name", field: "name"},
 *            {name: "Type", field: "type"},
 *            {name: "Total Size", field: "total_size"},
 *            {name: "Free Space", field: "free_space"}
 *        ],
 *        data: [{
 *            name: "Folders",
 *            children: [
 *                {name: "Documents", type: "System Folder"},
 *                {name: "Downloads", type: "System Folder"},
 *                {name: "Pictures", type: "System Folder"}
 *            ]
 *        }]
 *    });
 * </pre>
 */
z.widget.TreeGrid = function (args) {
};
/**
 * The Menu component is toggleable overlays for displaying lists of links and more.
 *
 * @constructor
 * @extends $IDataView
 *
 * @param {Object}args              - The arguments to initialize the Menu.
 *
 * @return {z.widget.Menu}menu      -  The Menu instance
 *
 * @example
 * <pre>
 * var menu = z.widget.Menu({
 *        appendTo: ".container",
 *        data: [
 *            {
 *                name: "File",
 *                children: [
 *                    {name: "New Tab"},
 *                    {name: "New Window"},
 *                    {name: "Save Page AS..."},
 *                    {divider: true},
 *                    {name: "Print..."},
 *                    {divider: true},
 *                    {name: "Exit"}
 *                ]
 *            },
 *            {
 *                name: "Edit",
 *                children: [
 *                    {name: "Cut"},
 *                    {name: "Copy"},
 *                    {name: "Paste"},
 *                    {name: "Delete"},
 *                    {divider: true},
 *                    {name: "Select All"}
 *                ]
 *            }
 *        ]
 *    });
 * </pre>
 */
z.widget.Menu = function (args) {
};
/**
 * The Pagination component helps present numerous items from the dataset dividing them into groups to display on separate pages.
 * It is used in conjunction with data components like Grid.
 *
 * @constructor
 * @extends $IView
 *
 * @param {Object}args      - The arguments to initialize the Pagination.
 *                              <table>
 *                                  <tr>
 *                                      <th>#argument#</th>
 *                                      <th>#description#</th>
 *                                      <th>#default#</th>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>page_sizes</td>
 *                                      <td>options of item count per page</td>
 *                                      <td>[20, 50, 100]</td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>page_size</td>
 *                                      <td>the item count of each page</td>
 *                                      <td>20</td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>page_index</td>
 *                                      <td>the current page index</td>
 *                                      <td>1</td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>total</td>
 *                                      <td>total item count</td>
 *                                      <td>0</td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>pager_count</td>
 *                                      <td>the maximum number of the pager buttons</td>
 *                                      <td>7</td>
 *                                  </tr>
 *                                  <tr>
 *                                      <td>layout</td>
 *                                      <td>layout of Pagination, separated with a comma, the valid values are: "sizes","pager","total","refresh"</td>
 *                                      <td>"sizes,pager,total,refresh"</td>
 *                                  </tr>
 *                              </table>
 *
 * @return {z.widget.Pagination}pagination      - The Pagination instance
 *
 * @example
 * <pre>
 * var pagination = z.widget.Pagination({
 *    appendTo: ".container",
 *    total: 2019,
 *    page_index: 2,
 *    page_sizes: [20, 50, 100, 200]
 * });
 * pagination.onPageChange(function (pageInfo) {
 *   console.log(pageInfo)
 * });
 * pagination.onRefresh(function (pageInfo) {
 *    console.log(pageInfo)
 * });
 * </pre>
 *
 */
z.widget.Pagination = function (args) {
};
/**
 * Gets the paging information.
 *
 * @return {Object}config   - The paging information.
 *                           {
 *                              index: 1,//page_index, start from 1
 *                              size: 20,//page_size
 *                              skip: 0,//(page_index-1)*page_size
 *                              number: 10,//page number
 *                              start: start,//the start index
 *                              end: end,//the end index
 *                              total: total//total count
 *                           };
 *
 * @example
 * pagination.getPageConfig();
 *
 */
z.widget.Pagination.prototype.getPageConfig = function () {
};

/**
 * The Tooltip component is used to display a popup message.
 * The {@link z.widget.tooltip}/{@link z.widget.tooltip.init}/{@link z.widget.tooltip.open}/{@link z.widget.tooltip.close} methods are the easier way to show/hide tooltip.
 *
 * @see {@link z.widget.tooltip}
 * @see {@link z.widget.tooltip.init}
 * @see {@link z.widget.tooltip.open}
 * @see {@link z.widget.tooltip.close}
 *
 * @constructor
 * @extends $IPopUpView
 *
 * @param {Object}[args]                    - The arguments to initialize the Tooltip, see {@link $IPopUpView IPopUpView }
 *                                           <table>
 *                                               <tr>
 *                                                   <th>#option#</th>
 *                                                   <th>#description#</th>
 *                                                   <th>#default#</th>
 *                                               </tr>
 *                                               <tr>
 *                                                   <td>direction</td>
 *                                                   <td>the direction of the tooltip, the valid values are:
 *                                                   "up_left", "up", "up_right",
 *                                                   "left_up", "left", "left_down",
 *                                                   "right_up", "right","right_down"
 *                                                   "down_left", "down","down_right"
 *                                                   "screen_center"</td>
 *                                                   <td>"right"</td>
 *                                               </tr>
 *                                               <tr>
 *                                                   <td>offset</td>
 *                                                   <td>the offset(px) of the tooltip</td>
 *                                                   <td>2</td>
 *                                               </tr>
 *                                           </table>
 *
 * @return {z.widget.Tooltip}tooltip        -  The Tooltip instance
 *
 *
 * @example
 * <pre>
 * var tooltip = new z.widget.Tooltip({
 *    content: "This is a tooltip",
 *    title: "Tooltip Title",
 *    direction: "right",
 *    offset: 6
 * });
 * tooltip.open("#tooltipButton");//show a  tooltip on the right of the button
 * </pre>
 */
z.widget.Tooltip = function (args) {
};
/**
 * Initializes the tooltip for the specified element, the trigger event listener is added to open/close tooltip.
 * The specified element attributes are use to show tooltip.
 * <table>
 *     <tr>
 *         <th>#tooltip option#</th>
 *         <th>#element attribute#</th>
 *         <th>#description#</th>
 *     </tr>
 *     <tr>
 *         <td>content</td>
 *         <td>data-content/title</td>
 *         <td>the content of the tooltip</td>
 *     </tr>
 *     <tr>
 *         <td>title</td>
 *         <td>data-title</td>
 *         <td>the title of the tooltip</td>
 *     </tr>
 *     <tr>
 *         <td>direction</td>
 *         <td>data-direction</td>
 *         <td>the direction of the tooltip, default is 'right'</td>
 *     </tr>
 *     <tr>
 *         <td>offset</td>
 *         <td>data-offset</td>
 *         <td>the offset of the tooltip</td>
 *     </tr>
 * </table>
 *
 * @function
 * @see {@link z.widget.Tooltip}
 *
 * @param {string|HTMLElement}refEle        - The specified reference element to position the tooltip. It can be selectors or an HTMLElement
 * @param {string}[trigger]                 - Optional. The event type to show tooltip. If omitted, the 'hover' is used.
 *                                              <table>
 *                                                  <tr>
 *                                                      <th>#trigger#</th>
 *                                                      <th>#open event#</th>
 *                                                      <th>#close event#</th>
 *                                                  </tr>
 *                                                  <tr>
 *                                                      <td>hover</td>
 *                                                      <td>mouseenter</td>
 *                                                      <td>mouseleave</td>
 *                                                  </tr>
 *                                                  <tr>
 *                                                      <td>focus</td>
 *                                                      <td>focus</td>
 *                                                      <td>blur</td>
 *                                                  </tr>
 *                                                  <tr>
 *                                                      <td>click</td>
 *                                                      <td>click</td>
 *                                                      <td>click</td>
 *                                                  </tr>
 *                                              </table>
 * @param {boolean}auto_close               - If false, the tooltip does not close automatically, otherwise, an event listener is added to close the tooltip automatically.
 *
 * @return void
 *
 * @example
 *
 * <button id="autoBtn"  data-content="tooltip content">tooltip()</button>
 *
 * //show tooltip when the pointer enters button, hide tooltip when the pointer leaves button
 * z.widget.tooltip("#autoBtn");
 *
 * //show tooltip when you click the button, click again to hide
 * z.widget.tooltip("#autoBtn","click");//tooltip will open on hover
 *
 */
z.widget.tooltip = function (refEle, trigger, auto_close) {
};
/**
 * Initializes tooltips for all elements with the data-toggle="tooltip" attribute.
 * The trigger event type is the value of the data-trigger attribute. Default is hover
 *
 * @function
 * @see {@link z.widget.tooltip}
 *
 * @param {string|HTMLElement}[container]     - Optional. The specified container element to query all the tooltip elements. If omitted, the document.body is used.
 *
 * @return void
 *
 * @example
 * z.widget.tooltip.init();
 * z.widget.tooltip.init("form");
 */
z.widget.tooltip.init = function (container) {
};
/**
 * Opens a tooltip on the specified element.
 *
 * @function
 *
 * @param {string|HTMLElement}refEle        - The reference refEle element to position the tooltip
 * @param {string|Object}options            - The specified options.
 *                                              <ul>
 *                                                  <li>if options is a string</li>it will be the content of the tooltip
 *                                                  <li>if options is an object</li>see {@link z.widget.Tooltip} parameters
 *                                              </ul>
 * @return {z.widget.Tooltip}tooltip        - The tooltip instance.
 *
 * @example
 *  z.widget.tooltip.open("#onBtn", "This is a tooltip");
 */
z.widget.tooltip.open = function (refEle, options) {
};
/**
 * Closes all the tooltips.
 * @return void
 *
 * @example
 * z.widget.tooltip.close();
 */
z.widget.tooltip.close = function () {
};

/**
 * The Popover component is used to display popup secondary information.
 * The {@link z.widget.popover}/{@link z.widget.popover.init}/{@link z.widget.popover.open}/{@link z.widget.popover.close} methods are the easier way to show/hide popover
 *
 * @see {@link z.widget.popover}
 * @see {@link z.widget.popover.init}
 * @see {@link z.widget.popover.open}
 * @see {@link z.widget.popover.close}
 *
 * @constructor
 * @extends $IPopUpView
 *
 * @param {Object}[args]       - The arguments to create the Popover, see {@link $IPopUpView IPopUpView }
 *                               <table>
 *                                   <tr>
 *                                       <th>#option#</th>
 *                                       <th>#description#</th>
 *                                       <th>#default#</th>
 *                                   </tr>
 *                                   <tr>
 *                                       <td>direction</td>
 *                                       <td>the direction of the popover, the valid values are:
 *                                       "up_left", "up", "up_right",
 *                                       "left_up", "left", "left_down",
 *                                       "right_up", "right","right_down"
 *                                       "down_left", "down","down_right"
 *                                       "screen_center"</td>
 *                                       <td>"right"#</td>
 *                                   </tr>
 *                                   <tr>
 *                                       <td>offset</td>
 *                                       <td>the offset(px) of the popover</td>
 *                                       <td>2</td>
 *                                   </tr>
 *                               </table>
 *
 */
z.widget.Popover = function (args) {
};
/**
 *
 * Initializes the popover for the specified element, the trigger event listener is added to open/close popover.
 * The specified element attributes are use to show popover.
 * <table>
 *     <tr>
 *         <th>#popover option#</th>
 *         <th>#element attribute#</th>
 *         <th>#description#</th>
 *     </tr>
 *     <tr>
 *         <td>content</td>
 *         <td>data-content/title</td>
 *         <td>the content of the popover</td>
 *     </tr>
 *     <tr>
 *         <td>title</td>
 *         <td>data-title</td>
 *         <td>the title of the popover</td>
 *     </tr>
 *     <tr>
 *         <td>direction</td>
 *         <td>data-direction</td>
 *         <td>the direction of the popover, default is 'right'</td>
 *     </tr>
 *     <tr>
 *         <td>offset</td>
 *         <td>data-offset</td>
 *         <td>the offset of the popover</td>
 *     </tr>
 * </table>
 *
 * @function
 * @see {@link z.widget.Popover}
 *
 * @param {string|HTMLElement}refEle        - The specified reference element to position the popover. It can be selectors or an HTMLElement
 * @param {string}[trigger]                 - Optional. The event type to show popover. If omitted, the 'click' is used.
 *                                              <table>
 *                                                  <tr>
 *                                                      <th>#trigger#</th>
 *                                                      <th>#open event#</th>
 *                                                      <th>#close event#</th>
 *                                                  </tr>
 *                                                  <tr>
 *                                                      <td>hover</td>
 *                                                      <td>mouseenter</td>
 *                                                      <td>mouseleave</td>
 *                                                  </tr>
 *                                                  <tr>
 *                                                      <td>focus</td>
 *                                                      <td>focus</td>
 *                                                      <td>blur</td>
 *                                                  </tr>
 *                                                  <tr>
 *                                                      <td>click</td>
 *                                                      <td>click</td>
 *                                                      <td>click</td>
 *                                                  </tr>
 *                                              </table>
 * @param {boolean}auto_close               - If false, the popover does not close automatically, otherwise, an event listener is added to close the popover automatically.
 *
 * @return void
 *
 * @example
 *
 * <button id="autoBtn"  data-content="popover content">popover()</button>
 *
 * //show popover when the pointer enters button, hide popover when the pointer leaves button
 * z.widget.popover("#autoBtn");
 *
 * //show popover when you click the button, click again to hide
 * z.widget.popover("#autoBtn","click");//popover will open on hover
 *
 */
z.widget.popover = function (refEle, trigger, auto_close) {
};
/**
 * Initializes popovers for all elements with the data-toggle="popover" attribute.
 * The trigger event type is the value of the data-trigger attribute. Default is click
 *
 * @function
 * @see {@link z.widget.popover}
 *
 * @param {string|HTMLElement}[container]       - Optional. The specified container to query all the popover elements. If omitted, the document.body is used.
 *
 * @return void
 *
 * @example
 * z.widget.popover.init();
 * z.widget.popover.init("form");
 */
z.widget.popover.init = function (container) {
};
/**
 * Opens a popover on the specified element.
 *
 * @function
 *
 * @param {string|HTMLElement}refEle        - The specified reference element to position the popover
 * @param {string|Object}options            - The specified options.
 *                                              <ul>
 *                                                  <li>if options is a string</li>it is the content of the popover
 *                                                  <li>if options is an object</li> see {@link z.widget.Popover} parameters
 *                                              </ul>
 * @return {z.widget.Popover}popover        - The popover instance.
 *
 * @example
 *  z.widget.popover.open("#onBtn", "This is a popover");
 */
z.widget.popover.open = function (refEle, options) {
};
/**
 * Closes all the popovers.
 *
 * @return void
 *
 * @example
 * z.widget.popover.close();
 */
z.widget.popover.close = function () {
};

/**
 *
 * Opens/Closes a dialog with the specified content element.
 *
 * @param {string|HTMLElement}modalContentEle       - The specified content element
 * @param {Object|boolean}[options]                 - The specified options to show the modal.<b>If false, the dialog will be closed.<b>
 *                                                      <table>
 *                                                          <tr>
 *                                                              <th>#option#</th>
 *                                                              <th>#description#</th>
 *                                                              <th>#default#</th>
 *                                                          </tr>
 *                                                          <tr>
 *                                                              <td>mask_visible</td>
 *                                                              <td>Specifies whether the mask is visible</td>
 *                                                              <td>true</td>
 *                                                          </tr>
 *                                                          <tr>
 *                                                              <td>close_on_click_outside</td>
 *                                                              <td>Specifies whether the modal should close when clicking outside of the modal</td>
 *                                                              <td>true</td>
 *                                                          </tr>
 *                                                          <tr>
 *                                                              <td>release_on_close</td>
 *                                                              <td>Specifies whether the content element should be released to the old position(before open) when the modal is closed</td>
 *                                                              <td>true</td>
 *                                                          </tr>
 *                                                      </table>
 * @param {string|HTMLElement}[parentNode]          - The parent node to show the modal. If omitted, the dialog will be appended to the document.body.
 *
 * @return [Modal]modal                             - The modal instance.
 *
 * @example
 * z.widget.modal("#modalDiv", {close_on_click_outside: false});//open
 * z.widget.modal("#modalDiv", false);//close
 */
z.widget.modal = function (modalContentEle, options, parentNode) {
};
/**
 * Initializes modals for all elements with the data-toggle="modal" attribute.
 * The trigger event type is the value of the data-trigger attribute. Default is click
 * The specified element attributes are use to open modal.
 * <table>
 *     <tr>
 *         <th>#tooltip option#</th>
 *         <th>#element attribute#</th>
 *         <th>#description#</th>
 *     </tr>
 *     <tr>
 *         <td>content</td>
 *         <td>data-content/title</td>
 *         <td>The content of the modal</td>
 *     </tr>
 *     <tr>
 *         <td>class</td>
 *         <td>data-class</td>
 *         <td>The specified className of the modal</td>
 *     </tr>
 *     <tr>
 *         <td>close_on_click_outside</td>
 *         <td>data-close-on-click-outside</td>
 *         <td>Specifies whether the modal should close when clicking outside of the modal</td>
 *     </tr>
 * </table>
 *
 *
 * @param {string|HTMLElement}[container]     - Optional. The specified container to query all the modal elements. If omitted, the document.body is used.
 *
 * @return void
 *
 * @example
 *  <button id="openBtn" class="btn btn-success" data-toggle="zw-modal" data-content="element:#modalDiv">open</button>
 *
 *  z.widget.modal.init();
 */
z.widget.modal.init = function (container) {
};
/**
 * Adds trigger event listener to the specified element.
 * When trigger event is delivered to the element, opens the modal.
 *
 * @param {string|HTMLElement}triggerEle        - The specified trigger element
 * @param {string}[trigger]                     - The trigger event type. Default is click.
 *
 * @return void
 *
 * @example
 * z.widget.modal.on("#triggerBtn");//Add modal open listener.
 */
z.widget.modal.on = function (triggerEle, trigger) {
};

/**
 * Displays an alert dialog with the optional specified content and an OK button.
 *
 * @param {string}message           - The message string you want to display in the alert dialog.
 * @param {string}title             - The title of the the alert dialog
 * @param {Function}[callBack]      - The callback function that will be called when the OK button is clicked.
 * @param {Object}[options]         - The specified options to open the alert dialog. see {@link z.widget.prompt}
 *
 * @return void
 *
 * @example
 * z.widget.alert("This is alert!!", "Alert");
 *
 */
z.widget.alert = function (message, title, callBack, options) {
};
/**
 * Displays a modal dialog with an optional message and two buttons: OK and Cancel.
 *
 * @param {string}message           - The message string you want to display in the alert dialog.
 * @param {string}title             - The title of the the alert dialog
 * @param {Function}[callBack]      - The callback function that will be called when the OK button is clicked.
 * @param {Object}[options]         - The specified options to open the alert dialog. see {@link z.widget.prompt}
 *
 * @return
 *
 * @example
 * <pre>
 * //callback
 * z.widget.confirm("This is confirm!!", "Confirm", function (result) {
 *     console.log(result)//true/false
 *  });
 *
 * //promise
 * z.widget.confirm("This is confirm!!", "Confirm").then(function (result) {
 *    console.log("OK")
 * }).catch(function (reason) {
 *    console.log("Cancel")
 * });
 * </pre>
 */
z.widget.confirm = function (message, title, callBack, options) {
};
/**
 * Displays a dialog with an optional message prompting the user to input some text.
 *
 * @param {string}message           - The message string you want to display in the alert dialog.
 * @param {string}title             - The title of the the alert dialog
 * @param {Function}[callBack]      - The callback function that will be called when the OK button is clicked.
 * @param {Object}[options]         - The specified options to open the alert dialog.
 *                                      <table>
 *                                          <tr>
 *                                              <th>#option#</th>
 *                                              <th>#description#</th>
 *                                              <th>#default#</th>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>confirm_class</td>
 *                                              <td>the class name of the OK button</td>
 *                                              <td>z-button primary</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>cancel_class</td>
 *                                              <td>the class name of the Cancel button</td>
 *                                              <td>z-button</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>input_class</td>
 *                                              <td>the class name of the input</td>
 *                                              <td></td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>value</td>
 *                                              <td>the initialization value of the input</td>
 *                                              <td></td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>confirm_text</td>
 *                                              <td>the label of the OK button</td>
 *                                              <td>OK</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>cancel_text</td>
 *                                              <td>the label of the Cancel button</td>
 *                                              <td>Cancel</td>
 *                                          </tr>
 *                                      </table>
 * @return
 *
 * @example
 * <pre>
 * //callback
 * z.widget.prompt("This is prompt!!", "Prompt", function (result) {
 *    console.log(result);//null/input value
 * });
 * //promise
 * z.widget.prompt("This is prompt!!", "Prompt").then(function (value) {
 *    console.log(value)
 * }).catch(function (reason) {
 *    console.log(null)
 * });
 * </pre>
 */
z.widget.prompt = function (message, title, callBack, options) {
};
/**
 * Displays a loading dialog.
 *
 * @param {string|boolean}[label]         - The message string you want to display in the loading dialog.<b> If false, closes the loading dialog</b>
 * @param {string|HTMLElement}[parentNode]    - The specified parent element. It can be selectors or an HTMLElement. If omitted, the dialog will be appended to the document.body.
 *
 * @return
 *
 * @example
 *  z.widget.loading("loading");//open
 *  z.widget.loading(false);//close
 *
 *  z.widget.loading("loading", "#formDiv");//parentNode open
 *  z.widget.loading(false, "#formDiv");//close
 */
z.widget.loading = function (label, parentNode) {
};
/**
 * Displays an notification to the user.
 *
 * @param {string|boolean}labelOrFalse      - The notification string you want to display in the notification dialog.
 * @param {Object}[options]                 - The specified options to open the notification dialog.
 *                                              <table>
 *                                                  <tr>
 *                                                      <th>#option#</th>
 *                                                      <th>#description#</th>
 *                                                      <th>#default#</th>
 *                                                  </tr>
 *                                                  <tr>
 *                                                      <td>type</td>
 *                                                      <td>the type of the notification. The valid values are: success,info,warning,error</td>
 *                                                      <td></td>
 *                                                  </tr>
 *                                                  <tr>
 *                                                      <td>duration</td>
 *                                                      <td>duration time in millisecond before close. It will not automatically close if value<=0</td>
 *                                                      <td>0</td>
 *                                                  </tr>
 *                                                  <tr>
 *                                                      <td>title</td>
 *                                                      <td>the title of the notification dialog</td>
 *                                                      <td></td>
 *                                                  </tr>
 *                                                  <tr>
 *                                                      <td>close_icon_visible</td>
 *                                                      <td>Specifies whether the close icon is visible. If true, the close icon will be visible. Otherwise invisible</td>
 *                                                      <td>true</td>
 *                                                  </tr>
 *                                                  <tr>
 *                                                      <td>position</td>
 *                                                      <td>the position to show the notification dialog. The valid values are: top_right,top_left,bottom_right,bottom_left </td>
 *                                                      <td>top_right</td>
 *                                                  </tr>
 *                                                  <tr>
 *                                                      <td>direction</td>
 *                                                      <td>the direction of the notification dialog. The valid values are: up,down,left,right.  If omitted, it is determined by position. </td>
 *                                                      <td></td>
 *                                                  </tr>
 *                                              </table>
 *
 * @return
 *
 * @example
 * z.widget.notify("This is a notification!!");
 * z.widget.notify("This is a success notification!!", {type: "success", duration: 1000}); // 1s
 */
z.widget.notify = function (labelOrFalse, options) {
};


/**
 * @memberOf z
 * @namespace
 */
z.form = {
    /**
     * Initializes the dom attribute event listener.
     *
     * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing event listener.
     * @param {string|HTMLElement}[root]        - The root element to initialize.It can be selectors or an HTMLElement.If omitted, the root element is document.
     *
     * @return void
     *
     * @example
     * <pre>
     *   //dom
     *  <button ze-on="click:handleBtnClick,handleBtnClick1">button</button>
     *
     *  <input ze-on="blur:handleBlur;focus:handleFocus">
     *
     *  //script
     *  var thisArg = {
     *           name: "name",
     *           handleBtnClick: function () {
     *               console.log("btn click")
     *           },
     *           handleBtnClick1: function () {
     *               console.log("btn click1")
     *           },
     *           handleBlur: function () {
     *               console.log("input blur")
     *           },
     *           handleFocus: function () {
     *               console.log("input focus")
     *           }
     *       };
     *   z.form.attrOn(thisArg);
     *
     * </pre>
     */
    attrOn: function (thisArg, root) {
    },
    /**
     * Removes the event listener added with {@link z.form.attrOn}
     *
     * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing event listener.
     * @param {string|HTMLElement}[root]        - The root element to initialize.It can be selectors or an HTMLElement.If omitted, the root element is document.
     *
     * @return void
     * @example
     * <pre>
     *      z.form.attrOff(thisArg);
     * </pre>
     *
     * @see {@link z.form.attrOn}
     */
    attrOff: function (thisArg, root) {
    }
};

/**
 * Validates the form fields
 * @name z.form.Validator.validate_func
 *
 * see {@link z.form.Validator.prototype.validate}.
 * The difference between 'z.form.Validator.validate' and 'z.form.Validator.prototype.validate' is
 * - 'z.form.Validator.validate' is a utility function that can be used directly
 * - 'z.form.Validator.prototype.validate' is the method of the Validator class, used by Validator instance
 *
 *
 * @param {string|HTMLElement}form      - The form to be validated
 * @param {Array}[rules]                - Optional. The rules used to validate
 * @param {Object}[option]              - Optional. The option to validate the form
 *                                      <table>
 *                                          <tr>
 *                                              <th>#key#</th>
 *                                              <th>#description#</th>
 *                                              <th>#default#</th>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>invalid_class</td>
 *                                              <td>The className applied to the invalid form fields</td>
 *                                              <td>'z-validator-invalid'</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>message_class</td>
 *                                              <td>The className applied to the invalid messages</td>
 *                                              <td>'z-validator-message'</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>autofocus</td>
 *                                              <td>If not false, the first invalid element will get the focus after validation</td>
 *                                              <td>true</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>visible_only</td>
 *                                              <td>Whether to only validate visible elements</td>
 *                                              <td>true</td>
 *                                          </tr>
 *                                      </table>
 *
 *
 * @return {Array}invalidArray          -The array of invalid fields.
 *                                      <table>
 *                                          <tr>
 *                                              <th>#key#</th>
 *                                              <th>#description#</th>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>reason</td>
 *                                              <td>The invalid rule name</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>element</td>
 *                                              <td>The invalid form element</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>message</td>
 *                                              <td>The invalid message</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td> rule</td>
 *                                              <td>The invalid rule object</td>
 *                                          </tr>
 *                                      </table>
 *
 *
 * @example
 * <pre>
 *  var errArr = z.form.Validator.validate("#formDiv");
 *  console.log(errArr.length > 0 ? "error count:" + errArr.length : "success");
 * </pre>
 *
 */
z.form.Validator.validate = function (form, rules, option) {
};
/**
 * Resets the invalid form fields.
 * @name z.form.Validator.reset_func
 *
 * @param {string|HTMLElement}form      - The form(root) to be reset
 * @param {Object}[option]              - Optional. The option to reset the form, see {@link z.form.Validator.validate_func|z.form.Validator.validate}
 *
 * @example
 * <pre>
 *  z.form.Validator.reset("#formDiv");
 * </pre>
 */
z.form.Validator.reset = function (form, option) {
};
/**
 * Registers a new validation rule.
 * @name z.form.Validator.registerRule_func
 *
 * List of built-in validation rules:
 * <table>
 *     <tr>
 *         <th>#rule#</th>
 *         <th>#message#</th>
 *         <th>#description#</th>
 *     </tr>
 *     <tr>
 *         <td>required</td>
 *         <td>The field is required</td>
 *         <td></td>
 *     </tr>
 *     <tr>
 *         <td>integer</td>
 *         <td>The field must be an integer</td>
 *         <td></td>
 *     </tr>
 *     <tr>
 *         <td>numeric</td>
 *         <td>The field must contain only numbers</td>
 *         <td></td>
 *     </tr>
 *     <tr>
 *         <td>alphanumeric</td>
 *         <td>The field must only contain alpha-numeric characters</td>
 *         <td></td>
 *     </tr>
 *     <tr>
 *         <td>alphanumeric_dash</td>
 *         <td>The field must only contain alpha-numeric characters, underscores and dashes</td>
 *         <td></td>
 *     </tr>
 *     <tr>
 *         <td>alphanumeric_space</td>
 *         <td>The field must only contain alpha-numeric characters and space characters</td>
 *         <td></td>
 *     </tr>
 *     <tr>
 *         <td>email</td>
 *         <td>The field must be a valid email address</td>
 *         <td></td>
 *     </tr>
 *     <tr>
 *         <td>ipv4</td>
 *         <td>The field must be a valid IP</td>
 *         <td></td>
 *     </tr>
 *     <tr>
 *         <td>minlength[??]</td>
 *         <td>The field must be at least ?? characters in length</td>
 *         <td></td>
 *     </tr>
 *     <tr>
 *         <td>maxlength[??]</td>
 *         <td>The field must not exceed ?? characters in length</td>
 *         <td></td>
 *     </tr>
 *     <tr>
 *         <td>greaterthan[??]</td>
 *         <td>The field must contain a number greater than ??</td>
 *         <td></td>
 *     </tr>
 *     <tr>
 *         <td>lessthan[??]</td>
 *         <td>The field must contain a number less than ??</td>
 *         <td></td>
 *     </tr>
 *     <tr>
 *         <td>equal[??]</td>
 *         <td>The field must be equal to ??</td>
 *         <td></td>
 *     </tr>
 *     <tr>
 *         <td>match[??]</td>
 *         <td>The field must match ?? field</td>
 *         <td></td>
 *     </tr>
 * </table>
 *
 * @param {string}ruleName          - The name of the rule
 * @param {Function}valMethod       - The validation method, if return false, the validation is invalid.
 * @param {string}[ruleMsg]         - The default invalid message.
 *
 * @return void
 *
 * @example
 * <pre>
 * z.form.Validator.registerRule("alphanumeric_underscore", function (element, param) {
 *     //return true/false
 *     return /^[a-zA-Z0-9]+$/.test(z.dom.getValue(element));
 * }, "The field must only contain alpha-numeric characters, underscores");
 * </pre>
 *
 */
z.form.Validator.registerRule = function (ruleName, valMethod, ruleMsg) {

};
/**
 * Registers the default message for the specified rule.
 * @name z.form.Validator.registerRuleMessage_func
 *
 * @param {string}ruleName          - The name of the specified rule
 * @param {string}[message]         - The default invalid invalid message.
 *
 * @return void
 *
 * @example
 * <pre>
 * z.form.Validator.registerRuleMessage("alphanumeric_underscore", "The field must only contain alpha-numeric characters, underscores");
 * </pre>
 *
 */
z.form.Validator.registerRuleMessage = function (ruleName, message) {
};

/**
 *
 * Creates a Validator instance.
 *
 * ★ All elements with the 'v-rules' attribute will be added to validation rules.
 * ★ The Validator can also be used as an Object, please see example.
 *
 * <b>
 * The difference between
 *  var validator = z.form.Validator("form");
 *  var invalidArray = validator.validate();
 * and
 *  z.form.Validator.validate("form")
 * is that z.form.Validator.validate() does not add change listener to re-validate the element when the value of the element has been changed.
 * </b>
 *
 * @memberOf z.form
 * @name z.form.Validator
 * @constructor
 *
 * @param {string|HTMLElement}form      - The form to be validated
 * @param {Array}[rules]                - The rules used to validate
 * @param {Object}[options]             - The options used to validate
 *                                          <table>
 *                                              <tr>
 *                                                  <th>#option#</th>
 *                                                  <th>#description#</th>
 *                                                  <th>#default#</th>
 *                                              </tr>
 *                                              <tr>
 *                                                  <td>invalid_class</td>
 *                                                  <td>The className applied to the invalid form fields</td>
 *                                                  <td>'z-validator-invalid'</td>
 *                                              </tr>
 *                                              <tr>
 *                                                  <td>message_class</td>
 *                                                  <td>The className applied to the invalid messages</td>
 *                                                  <td>'z-validator-message'</td>
 *                                              </tr>
 *                                              <tr>
 *                                                  <td>autofocus</td>
 *                                                  <td>If not false, the first invalid element will get the focus after validation</td>
 *                                                  <td>true</td>
 *                                              </tr>
 *                                              <tr>
 *                                                  <td>message</td>
 *                                                  <td>If false, the invalid message will not be appended</td>
 *                                                  <td></td>
 *                                              </tr>
 *                                              <tr>
 *                                                  <td>message_container</td>
 *                                                  <td>If specified, the invalid messages will be appended to the message container</td>
 *                                                  <td>null</td>
 *                                              </tr>
 *                                          </table>
 *
 *  @return  {z.form.Validator}validator    - The Validator instance
 *
 *  @example
 *  //<b>as constructor</b>
 *  <pre>
 *  var validator = new z.form.Validator("form", [
 *        {name: "username", rules: "required|alphanumeric"},
 *        {name: "email", rules: "email"},
 *        {name: "password", rules: "required|minlength[8]"},
 *        {name: "confirm_password", rules: "required|match[password]"},
 *        {name: "city", rules: "required"},
 *        {name: "agree", rules: "required"}
 *   ]);
 *   validator.validate();
 *  </pre>
 *
 *  //<b>as object</b>
 *  <pre>
 *  var invalidArray = z.form.Validator.validate("form",
 *  [
 *     {name: "username", rules: "required|alphanumeric"},
 *     {name: "email", rules: "email"},
 *     {name: "password", rules: "required|minlength[8]"},
 *     {name: "confirm_password", rules: "required|match[password]"},
 *     {name: "city", rules: "required"},
 *     {name: "agree", rules: "required"}
 *   ],
 *  {
 *     invalid_class: "is-invalid",
 *     message_class: "invalid-feedback"
 *  });
 *
 *  z.form.Validator.reset("form");
 *
 *  z.form.Validator.registerRule("alphanumeric_underscore", function (element, param) {
 *      //return true/false
 *      return /^[a-zA-Z0-9]+$/.test(z.dom.getValue(element));
 *  }, "The field must only contain alpha-numeric characters, underscores");
 *
 *   z.form.Validator.registerRuleMessage(ruleName, valMethod, ruleMsg);
 *
 *   z.form.Validator.registerRuleMessage("alphanumeric_underscore", The field must only contain alpha-numeric characters, underscores");
 *  </pre>
 */
z.form.Validator = function (form, rules, options) {
};
/**
 * Validates the form fields
 *
 * @return {Array}invalidArray        - The array of invalid fields.
 *                                      <table>
 *                                          <tr>
 *                                              <th>#key#</th>
 *                                              <th>#description#</th>
 *                                          </tr>
 *                                          <tr>
 *                                              <td> reason</td>
 *                                              <td>The invalid rule name</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td> element</td>
 *                                              <td>The invalid form element</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td> message</td>
 *                                              <td>The invalid message</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td> rule</td>
 *                                              <td>The invalid rule object</td>
 *                                          </tr>
 *                                      </table>
 *
 * @example
 * <pre>
 *  var validator = z.form.Validator("form");//equals to: var validator = new z.form.Validator("form");
 *  var invalidArray = validator.validate();
 *
 * </pre>
 */
z.form.Validator.prototype.validate = function () {
};
/**
 * Resets the invalid form fields.
 *
 * @example
 * <pre>
 *  validator.validate();
 * </pre>
 */
z.form.Validator.prototype.reset = function () {
};
/**
 * Sets up a function that will be called whenever the form elements(to be validated) are changed
 *
 * @param listener                      - The specified function to run when the change event occurs.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @example
 * <pre>
 * validator.onValidate(function (result) {
 *   var errArray =result.errors ;
 *   if (errArray.length > 0) {
 *       z.dom.setAttribute("#submitBtn", "disabled", "disabled");
 *   } else {
 *       z.dom.removeAttribute("#submitBtn", "disabled");
 *   }
 * });
 * </pre>
 */
z.form.Validator.prototype.onValidate = function (listener, thisArg) {
};
/**
 * Registers a new validation rule. see {@link z.form.Validator.registerRule_func|z.form.Validator.registerRule}
 */
z.form.Validator.prototype.registerRule = function (ruleName, valMethod, ruleMsg) {
};
/**
 * Registers the default message for the specified rule. see {@link z.form.Validator.registerRuleMessage_func|z.form.Validator.registerRuleMessage}
 */
z.form.Validator.prototype.registerRuleMessage = function (ruleName, message) {
};

/**
 * Creates a Form instance.
 * z.form.Form is a form manager that allows you to easily manage the form.
 * The value and the status(visible/disabled) of the elements in the form can be set by the value object.
 *
 * setValue method can be used to set the values of the elements in the form.
 * getValue method can be used to get the values of the elements in the form.
 * clearValue method can be used to clear the values of the elements in the form.
 *
 * @memberOf z.form
 * @name z.form.Form
 * @constructor
 *
 * @param {string|HTMLElement}form      - The specified form to be managed.
 * @param {Object}[options]             - The options used to manage the form.
 *                                          <table>
 *                                              <tr>
 *                                                  <th>#option#</th>
 *                                                  <th>#description#</th>
 *                                                  <th>#default#</th>
 *                                              </tr>
 *                                              <tr>
 *                                                  <td>validate</td>
 *                                                  <td>If not false, the elements in the form will be validated by {@link z.form.Validator}.
 *                                                      <b>If some elements have invalid values, calling the getValue method will return null.</b></td>
 *                                                  <td>true</td>
 *                                              </tr>
 *                                          </table>
 *
 * @return {z.form.Form}formInstance    - The z.form.Form instance.

 *
 * @example
 * <pre>
 * var form = z.form.Form("#formDiv");
 * z.dom.event.onclick("#setBtn", function () {
 *      form.setValue({
 *          name: "Rider",
 *          email: "rider@focus-ui.com",
 *          address: {
 *              country: "United States",
 *              state: "California"
 *          },
 *          agree: true
 *      })
 *  });
 * z.dom.event.onclick("#getBtn", function () {
 *      z.widget.alert(JSON.stringify(form.getValue(), null, "  "))
 *  });
 * z.dom.event.onclick("#clearBtn", function () {
 *      form.clearValue();
 *  })
 * </pre>
 *
 */
z.form.Form = function (form, options) {
};
/**
 * Sets the values of the elements in the form and resets the invalid form fields.
 *
 * @param {Object}[value]       - The value used to set. If the value is null, the values of all elements will be cleared
 *
 * @return void
 *
 * @example
 * <pre>
 * var form = z.form.Form("#formDiv");
 * form.setValue({
 *    name: "Rider",
 *    email: "rider@focus-ui.com",
 *    address: {
 *        country: "United States",
 *        state: "California"
 *    },
 *    agree: true
 * })
 * </pre>
 */
z.form.Form.prototype.setValue = function (value) {
};
/**
 * Gets the values of the elements in the form.
 * <b>★ If validate option is not false, when some elements have invalid values, calling the getValue() method will return null.</b>
 *
 * @param {boolean}[validate]       - If false, validation is disabled, and return the current form value.
 *
 * @return {Object|null}value       - The values of the elements in the form.
 *
 * @example
 * form.getValue()
 */
z.form.Form.prototype.getValue = function (validate) {
};
/**
 * Clears the values of the elements in the form and resets the invalid form fields.
 *
 * @return void
 * @example
 *  form.clearValue();
 */
z.form.Form.prototype.clearValue = function () {
};
/**
 * Sets up a function that will be called when any element(with ze-model attribute) in form is changed.
 *
 * @param listener                      - The specified function to run when the change event occurs.
 * @param {Object}[thisArg]             - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 * from.onFormChange(function(evt){
 *      console.log(evt);
 * })
 * </pre>
 *
 */
z.form.Form.prototype.onFormChange = function (listener, thisArg) {
};
/**
 * Updates the status(visible/hidden/disabled) of the elements in the form.
 *
 * @param {Object}[value]             - Optional. The Value used to update the status.
 *                                         By default, the value of the element in the form is used to update the status.
 *
 * @return void
 *
 * @example
 * <pre>
 * from.updateStatus()
 * </pre>
 *
 */
z.form.Form.prototype.updateStatus = function (value) {
};
/**
 * Gets the validator of the form.
 *
 * @return {z.form.Validator|null}validator       - The validator of the form.
 *                                                  If validate property of the form is false, return null.
 *
 * @example
 * <pre>
 * from.getValidator()
 * </pre>
 *
 */
z.form.Form.prototype.getValidator = function () {
};
/**
 * The component that implements $LinkBundleInterface will have the ability to bundle link.
 * The 'bundleable' property of the link and The 'bundleable' property of the GView are used to enable/disable check.
 *
 * @version 2.4.0
 *
 * @param {Function}clazz   - The constructor to implement the interface, ex) z.gv.GView
 */
var $LinkBundleInterface = function (clazz) {
};
/**
 * The isLinkBundleable is a callback function used to control whether the link can be bundled or not.
 *
 * @param {z.gv.Link}link           - The link to be checked.
 *
 * @return {boolean}bundleable      - If true, the link can be bundled, otherwise not.
 *
 * @example
 * <pre>
 * gView.isLinkBundleable = function (link) {
 *     return data.get("weight") < 100;
 * }
 * </pre>
 */
$LinkBundleInterface.prototype.isLinkBundleable = function (link) {
};
/**
 * Sets up a function that will be called whenever the link bundle state changes(bundle/unbundle).
 *
 * @param {Function}listener                - The specified function to run when the bundle state changes.
 * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 *  gView.onLinkBundleChange(function (evt) {
 *      console.log(evt.type, evt.data); //type: add/remove/clear/set
 *  });
 * </pre>
 *
 */
$LinkBundleInterface.prototype.onLinkBundleChange = function (listener, thisArg) {
};
/**
 * Sets up a function that will be called whenever the link is bundled(only expand).
 *
 * @param {Function}listener                - The specified function to run when the link is bundled.
 * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 * gView.onLinkBundle(function (link) {
 *     console.log(link);
 * });
 * </pre>
 *
 */
$LinkBundleInterface.prototype.onLinkBundle = function (listener, thisArg) {
};
/**
 * Sets up a function that will be called whenever the link is unbundled(only unbundle).
 *
 * @param {Function}listener                - The specified function to run when the link is unbundled.
 * @param {Object}[thisArg]                 - Value to use as this (i.e the reference Object) when executing listener.
 *
 * @return void
 *
 * @example
 * <pre>
 * gView.onLinkUnbundle(function (link) {
 *     console.log(link);
 * });
 * </pre>
 *
 */
$LinkBundleInterface.prototype.onLinkUnbundle = function (listener, thisArg) {
};
/**
 * Bundles the specified link.
 *
 *
 * @param {z.gv.Link|Object|Array}link      - The specified link or the array containing the link to be bundled.
 *
 * @return void
 *
 * @example
 * <pre>
 * gView.bundleLink({name:"link"});//object
 * gView.bundleLink([{name:"link1"},{name:"link2"}]);//array
 *
 * gView.bundleLink(link1);//model link
 * gView.bundleLink([link1,link2]);//model link array
 * </pre>
 *
 */
$LinkBundleInterface.prototype.bundleLink = function (link) {
};
/**
 * Unbundles the specified link.
 *
 *
 * @param {z.gv.Link|Object|Array}link         - The specified link or the array containing the link to be unbundled.
 *
 * @return void
 *
 * @example
 * <pre>
 *  gView.unbundleLink({name:"link"});//object
 *  gView.unbundleLink([{name:"link1"},{name:"link2"}]);//array
 *
 *  gView.unbundleLink(link1);//model link
 *  gView.unbundleLink([link1,link2]);//model link array
 * </pre>
 *
 */
$LinkBundleInterface.prototype.unbundleLink = function (link) {
};
/**
 * Bundles all the link.
 *
 * @return void
 *
 * @example
 * gView.bundleAllLinks();
 */
$LinkBundleInterface.prototype.bundleAllLinks = function () {
};
/**
 * Unbundles all the link.
 *
 * @return void
 *
 * @example
 * gView.unbundleAllLinks();
 */
$LinkBundleInterface.prototype.unbundleAllLinks = function () {
};
/**
 * Returns true if the specified link is bundled, else false.
 *
 * @param {Object|z.gv.Link}link    - The specified link to be checked. It can be an object or a z.gv.Link instance.
 *
 * @return {boolean}isBundled       - true if the link is bundled; otherwise false.
 *
 * @example
 * gView.isLinkBundled(data);
 */
$LinkBundleInterface.prototype.isLinkBundled = function (link) {
};
/**
 * Returns where the specified link is the agent of the multiple bundled links.
 * By default, the first link is the agent.
 * The method can be rewritten to custom the agent.
 * You can even specify multiple links as agents if you want.
 *
 * @param {z.gv.Link}link               - The specified link to be checked.
 * @param {Array}currentLinkBundles     - The links bundled together with the specified link.
 *
 * @return {boolean}isAgent             - true if the link is the agent; otherwise false.
 *
 */
$LinkBundleInterface.prototype.isLinkBundleAgent = function (link, currentLinkBundles) {
};
/**
 * Returns all links that should be bundled together with the specified link.
 * If 'bundle_group' property in link, the link will be grouped by 'bundle_group' value; otherwise it will be grouped by type
 * The method can be rewritten to custom the bundle rule.
 *
 * @param {z.gv.Link}link           - The specified link.
 *
 * @return {Array}bundleLinks       - All links that should be bundled together with the specified link.
 *
 * @example
 * gView.getLinkBundles(link);
 */
$LinkBundleInterface.prototype.getLinkBundles = function (link) {
};
/**
 * Returns the size of the links that should be bundled together with the specified link.
 *
 * @param {z.gv.Link}link           - The specified link.
 *
 * @return {number}bundleSize       - the size of the links that should be bundled together with the specified link.
 *
 * @example
 * gView.getLinkBundleSize(link);
 */
$LinkBundleInterface.prototype.getLinkBundleSize = function (link) {
};
/**
 * Returns all the bundled links.
 *
 *
 * @return {number}bundled       - all the bundled links.
 *
 * @example
 * gView.getLinkBundled();
 */
$LinkBundleInterface.prototype.getLinkBundled = function () {
};

/**
 * @memberOf z
 * @namespace
 */
z.gv = {};

/**
 * In GView, the node has different types, such as shape, image, path, etc. By default, the node will be disabled as a shape.
 *
 * @extends z.Data
 * @constructor
 *
 * @param {Object}[props]       - Optional, the arguments to initialize the node data. see {@link z.Data}
 *                                  <table>
 *                                      <tr>
 *                                          <th>#option#</th>
 *                                          <th>#description#</th>
 *                                          <th>#default#</th>
 *                                      </tr>
 *                                      <tr>
 *                                          <td>x</td>
 *                                          <td>The x coordinate</td>
 *                                          <td>0</td>
 *                                     </tr>
 *                                     <tr>
 *                                          <td>y</td>
 *                                          <td>The y coordinate</td>
 *                                          <td>0</td>
 *                                     </tr>
 *                                     <tr>
 *                                          <td>width</td>
 *                                          <td>The width of the node</td>
 *                                          <td>
 *                                              <p>shape type:32</p>
 *                                              <p>image type:the width of the image</p>
 *                                          </td>
 *                                     </tr>
 *                                     <tr>
 *                                          <td>height</td>
 *                                          <td>The height  of the node</td>
 *                                          <td>
 *                                              <p>shape type:32</p>
 *                                              <p>image type:the width of the image</p>
 *                                          </td>
 *                                     </tr>
 *                                     <tr>
 *                                          <td>shape</td>
 *                                          <td>The shape of the node, see {@link z.canvas.renderShape}</td>
 *                                          <td>circle</td>
 *                                     </tr>
 *                                     <tr>
 *                                          <td>fill</td>
 *                                          <td>The fill represents the color or style to use inside shapes, it can be color, gradient or pattern</td>
 *                                          <td>#1982c8</td>
 *                                     </tr>
 *                                     <tr>
 *                                          <td>stroke</td>
 *                                          <td>The stroke represents the color or style to use for the lines around the shapes, it can be color, or gradient</td>
 *                                          <td>#1982c8</td>
 *                                     </tr>
 *                                     <tr>
 *                                          <td>image</td>
 *                                          <td>The image source of the node,it can be url, base64 or a register image name.
 *                                          <p>The type of the image can be png,svg and any type supported by canvas.</p>
 *                                          </td>
 *                                          <td></td>
 *                                     </tr>
 *                                     <tr>
 *                                          <td>points</td>
 *                                          <td>The point array of the path node,ex)[{x: 100, y: 80}, {x: 300, y: 80}]</td>
 *                                          <td></td>
 *                                     </tr>
 *                                     <tr>
 *                                          <td>label_position</td>
 *                                          <td>The position of the label.The valid values are: "center", "top", "bottom", "left", "right"</td>
 *                                          <td>bottom</td>
 *                                     </tr>
 *                                     <tr>
 *                                          <td>outline_stroke</td>
 *                                          <td>The outline_stroke represents the color or style to use for the outline around the shapes, it can be color, or gradient</td>
 *                                          <td></td>
 *                                     </tr>
 *                                     <tr>
 *                                          <td>rotation</td>
 *                                          <td>The rotation angle of the node</td>
 *                                          <td>0</td>
 *                                     </tr>
 *                                     <tr>
 *                                          <td>alpha</td>
 *                                          <td>The alpha angle of the node(0-1)</td>
 *                                          <td>1</td>
 *                                     </tr>
 *                                 </table>
 *
 *
 * @return {z.gv.Node}node      - The z.gv.Node instance
 * @example
 * <pre>
 * var imgNode = new z.gv.Node({
 *     name: "image node",
 *     image: "../_icons/computer.svg",
 *     x: 100, y: 100
 * });
 * var shapeNode = new z.gv.Node({
 *     name: "shape node",
 *     shape: "circle",
 *     x: 300, y: 100,
 *     width: 60, height: 60
 * });
 * var pathNode = new z.gv.Node({
 *     name: "path node",
 *     fill: null,
 *     end_arrow_shape: "arrow",
 *     points: [
 *         {x: 500, y: 120, seg: "bezier_curve_to"},
 *         {x: 600, y: 90},
 *         {x: 600, y: 190},
 *         {x: 700, y: 130}
 *     ]
 * })
 * </pre>
 *
 */
z.gv.Node = function (props) {
};
/**
 * Get all links connected to the node, it contains all from links and to links
 *
 * @return {Array}links     - The links array
 *
 * @example
 * node.getLinks();
 *
 * @see {@link z.gv.Node.getFromLinks}
 * @see {@link z.gv.Node.getToLinks}
 */
z.gv.Node.prototype.getLinks = function () {
};
/**
 * Gets all the links with the from node of each link is the current node.
 *
 * @return {Array}fromLinks     - The array of links from the current node
 *
 * @example
 * node.getFromLinks();
 *
 */
z.gv.Node.prototype.getFromLinks = function () {
};
/**
 * Gets all the links with the to node of each link is the current node.
 *
 * @return {Array}toLinks  - The array of links to the current node
 *
 * @example
 * node.getToLinks();
 */
z.gv.Node.prototype.getToLinks = function () {
};
/**
 * Gets all the links from the specified fromNode to current node.
 *
 * @param {z.gv.Node}fromNode   - The specified fromNode.
 *
 * @return {Array}links         - The array of links from fromNode to the current node
 *
 * @example
 * node.getLinksFrom(aNode);
 */
z.gv.Node.prototype.getLinksFrom = function (fromNode) {
};
/**
 * Gets all the links from the current node to the specified toNode.
 *
 * @param {z.gv.Node}toNode     - The specified toNode.
 *
 * @return {Array}links         - The array of links from the current node to the specified toNode
 *
 * @example
 * node.getLinksTo(zNode);
 */
z.gv.Node.prototype.getLinksTo = function (toNode) {
};
/**
 * Gets all the links between the current node and the specified node.
 *
 * @param {z.gv.Node}peerNode   - The specified node.
 *
 * @return {Array}links         - The array of links between the current node and the specified node
 *
 * @example
 * node.getLinksBetween(peerNode);
 */
z.gv.Node.prototype.getLinksBetween = function (peerNode) {
};

/**
 * Sets the position point of the node.
 *
 * @param {Object}[point]        - The new position point of the node
 *
 * @return void
 *
 * @example
 * <pre>
 *  node.setPosition({x: 100, y: 100});
 *  node.setPosition(200, 200);
 * </pre>
 */
z.gv.Node.prototype.setPosition = function (point) {
};
/**
 * Gets the position point of the node.
 *
 * @return {Object}point    - The position point of the node
 *
 * @example
 * <pre>
 *  node.getPosition();//{x:100,y:100}
 * </pre>
 */
z.gv.Node.prototype.getPosition = function () {
};
/**
 * Sets the center point of the node.
 *
 * @param {Object}[centerPoint]        - The new center point of the node
 *
 * @return void
 *
 * @example
 * <pre>
 *  node.setCenter({x: 100, y: 100});
 *  node.setCenter(200, 200);
 * </pre>
 */
z.gv.Node.prototype.setCenter = function (centerPoint) {
};
/**
 * Gets the center point of the node.
 *
 * @return {Object}point    - The center point of the node
 *
 * @example
 * <pre>
 *  node.getCenter();
 * </pre>
 */
z.gv.Node.prototype.getCenter = function () {
};
/**
 * Sets the size of the node.
 *
 * @param {Object|number}size       - The new size of the node
 *
 * @return void
 *
 * @example
 * <pre>
 *  node.setSize({width: 100, height: 100});
 *  node.setSize(100, 100);
 *  node.setSize(100); // width=height=100
 * </pre>
 */
z.gv.Node.prototype.setSize = function (size) {
};
/**
 * Gets the size of the node.
 *
 * @return {Object}size     - The size of the node
 *
 * @example
 * <pre>
 *  node.getSize();//{width:100, height:100}
 * </pre>
 */
z.gv.Node.prototype.getSize = function () {
};
/**
 * Get the bounds of the node.
 *
 * @param {z.gv.GView}[gView]       - There are many properties that will affect the bounds of the node on gView, ex)node_width/node_height
 *                                     If gView is specified, these properties be used to calculate the bounds.
 * @param {boolean}[bodyOnly]       - If not false, return the body bounds(body+label+outline+arrow), if false, return the whole bounds.
 *
 * @return {Object}bounds           - The bounds of the node, it is an object with the x,y,width,and height properties.
 *
 * @example
 * <pre>
 *  node.getBounds();               //body bounds,{x:100,y:100,width:60,height:60}
 *  node.getBounds(gView);          //body bounds in gView
 *  node.getBounds(false);          //whole bounds
 *  node.getBounds(gView,false);    //whole bounds in gView
 * </pre>
 */
z.gv.Node.prototype.getBounds = function (gView, bodyOnly) {
};

/**
 * The link is a line connecting two nodes.
 * It can be straight line, right-angle polyline or the curve
 *
 * @extends z.Data
 * @constructor
 *
 * @param {z.gv.Node}[from]         - The from node of the link, equals to props.from
 * @param {z.gv.Node}[to]           - The to node of the link, equals to props.to
 * @param {Object}[props]           - Optional, the arguments to initialize the node data. see {@link z.Data}
 *                                      <table>
 *                                          <tr>
 *                                              <th>#option#</th>
 *                                              <th>#description#</th>
 *                                              <th>#default#</th>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>type</td>
 *                                              <td>The type of the link, if type is null, the link will be a straight line.
 *                                                  <p>The valid values are: "ra_hv", "ra_vh", "ra_top", "ra_bottom", "ra_left", "ra_right", "ra_hvh", "ra_vhv"</p></td>
 *                                              <td>null</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>stroke</td>
 *                                              <td>The stroke represents the color or style to use for the link line</td>
 *                                              <td>#1982c8</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>stroke_line_width</td>
 *                                              <td>The width of the stroke line</td>
 *                                              <td>1</td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>stroke_line_dash</td>
 *                                              <td>The line dash used to stroke line, ex)[6,3]</td>
 *                                              <td></td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>from_arrow_shape</td>
 *                                              <td>Arrow shape at the from position.
 *                                                  The valid values are: arrow, stealth_arrow, open_arrow, rect, circle, ellipse, roundrect, triangle, diamond, pentagon, hexagon, star, parallelogram, cloud.
 *                                              </td>
 *                                              <td></td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>to_arrow_shape</td>
 *                                              <td>Arrow shape at the to position</td>
 *                                              <td></td>
 *                                          </tr>
 *                                          <tr>
 *                                              <td>alpha</td>
 *                                              <td>The alpha angle of the link(0-1)</td>
 *                                              <td>1</td>
 *                                          </tr>
 *                                      </table>
 *
 * @return {z.gv.Link}link      - The Link instance
 *
 * @example
 * <pre>
 * var link1 = z.gv.Link(node1, node2, {
 *        name: "link",
 *        stroke: "red"
 * });
 * var link2 = z.gv.Link({
 *        "name": "link",
 *        "from": from,
 *        "to": to,
 *        "type": "ra_hv" //right angle link
 * });
 * </pre>
 */
z.gv.Link = function (from, to, props) {
};
/**
 * Gets the point array of the link path.
 *
 * @return {Array}points    - The path points of the link.
 *
 * @example
 * link.getPathPoints();
 */
z.gv.Link.prototype.getPathPoints = function () {
};

/**
 * In GView, the bounds of the group is determined by the child nodes.
 * -When the group is collapsed, it is the same as the Node.
 * -When the group is expanded, it is a shape/path composed of children.
 *
 * The expanded state properties is starts with 'expand_', ex)expand_shape
 *
 * @extends z.gv.Node
 * @constructor
 *
 * @param {Object}[props]       - Optional, the arguments to initialize the group data. see {@link z.Data} and {@link z.gv.Node}
 *                                  <table>
 *                                      <tr>
 *                                          <th>#option#</th>
 *                                          <th>#description#</th>
 *                                          <th>#default#</th>
 *                                      </tr>
 *                                      <tr>
 *                                          <td>expand_shape</td>
 *                                          <td>The shape when the group is expanded. The valid values are: "rect","circle","ellipse","roundrect","parallelogram","covexhull"</td>
 *                                          <td>covexhull</td>
 *                                     </tr>
 *                                      <tr>
 *                                          <td>expand_padding</td>
 *                                          <td>The padding between the outline and the bounds of the children</td>
 *                                          <td>10</td>
 *                                     </tr>
 *                                      <tr>
 *                                          <td>expand_fill</td>
 *                                          <td>The fill represents the color or style to use inside shapes, it can be color, gradient or pattern</td>
 *                                          <td>rgba(50,100,200,0.1)</td>
 *                                     </tr>
 *                                      <tr>
 *                                          <td>expand_stroke</td>
 *                                          <td>The stroke represents the color or style to use for the lines around the shapes, it can be color, or gradient</td>
 *                                          <td>#1982c8</td>
 *                                     </tr>
 *                                      <tr>
 *                                          <td>expand_stroke_line_width</td>
 *                                          <td>The width of the stroke line</td>
 *                                          <td>#1982c8</td>
 *                                     </tr>
 *                                  </table>
 *
 * @return {z.gv.Group}group      - The z.gv.Group instance
 *
 * @example
 * <pre>
 *  var group = new z.gv.Group({
 *      name: "group",
 *      expand_shape: "rect"
 *  })
 *  var node1 = new z.gv.Node({
 *      parent:group
 *  })
 *  var node2 = new z.gv.Node({
 *      parent:group
 *  })
 * </pre>
 *
 */
z.gv.Group = function (props) {
};
/**
 * Subview is a special data type used for level display of data.
 * If subview is set, only the descendants of the current subview will be visible. see {@link z.gv.GView.getCurrentSubview} and {@link z.gv.GView.setCurrentSubview}
 *
 * @extends z.Data
 * @constructor
 *
 * @param {Object}[props]           - Optional, the arguments to initialize the subview data. see {@link z.Data}
 *
 * @return {z.gv.Subview}subview    - The Subview instance
 *
 * @example
 * <pre>
 * var subView = z.gv.Subview({
 *                name: "Subview",
 *                x: 100,
 *                y: 120
 *            });
 * subView.addChild(node1)
 * subView.addChild(node2)
 * </pre>
 *
 */
z.gv.Subview = function (props) {
};
/**
 * z.gv.LinkSubview is a Subview data type displayed as link.
 *
 * @extends z.gv.Subview
 * @extends z.gv.Link
 * @constructor
 *
 * @param {z.gv.Node}[from]             - The from node of the link, see {@link z.gv.Link}
 * @param {z.gv.Node}[to]               - The to node of the link, see {@link z.gv.Link}
 * @param {Object}[props]               - Optional, the arguments to initialize the subview data. see {@link z.Data}
 *
 * @return {z.gv.LinkSubview}subview    - The LinkSubview instance
 *
 * @example
 * <pre>
 * var fromNode = new z.gv.Node({x: 250, y: 60});
 * var toNode = new z.gv.Node({x: 450, y: 200});
 * var linkSubview = new z.gv.LinkSubview(fromNode, toNode, {name: "LinkSubview"});
 * </pre>
 *
 */
z.gv.LinkSubview = function (from, to, props) {
};

/**
 * z.gv.GView is a graphical visualization component based on canvas.
 * The data in GView component will be displayed as Node/Link/Group, etc, and can be clicked, selected and moved.
 *
 * @extends $IDataCanvasRendererView
 *
 * @constructor
 *
 * @param {Object}[props]           - Optional. The arguments to initialize the GView. see {@link $IDataView}
 *
 * @return {z.gv.GView}gView        - The GView instance
 *
 * @example
 * <pre>
 * var node1 = new z.gv.Node({
 *        name: "node1",
 *        x: 100, y: 100
 * });
 * var node2 = new z.gv.Node({
 *        name: "node2",
 *        x: 200, y: 200
 * });
 * var link = z.gv.Link(node1, node2, {
 *        name: "link"
 * });
 * var gv = z.gv.GView({
 *        appendTo: "#gvDiv",
 *        data: [node1, node2, link]
 * });
 * </pre>
 *
 */

z.gv.GView = function (props) {
};
/**
 * Zooms and translates to make all data visible and fill the current view.
 *
 * @param {boolean}[later]          - If true, the action will be performed before the next repaint see {@link z.util.callRAFLater}
 * @param {Array|{z.Data}}[data]    - Optional, If data is specified, the boundary of data will be the area of zoomFit
 *
 * @return void
 *
 * @example
 * gView.zoomFit();
 * gView.zoomFit(false);
 * gView.zoomFit(false, node);
 */
z.gv.GView.zoomFit = function (later, data) {
};
/**
 * Translates to center all data in the center of the current view.
 * The difference with zoomFit is zoomFit will zoom and translate，but translateCenter will only translate.
 *
 * @param {boolean}[later]          - If true, the action will be performed before the next repaint see {@link z.util.callRAFLater}
 * @param {Array|{z.Data}}[data]    - Optional, If data is specified, the boundary of data will be the area of translateCenter
 *
 * @return void
 *
 * @example
 * gView.translateCenter();
 * gView.translateCenter(false);
 * gView.translateCenter(false, node);
 */
z.gv.GView.translateCenter = function (later, data) {
}
/**
 * Returns the current subview of the GView. see {@link z.gv.Subview}
 *
 * @return {z.gv.Subview}currentSubview - The current subview, returns null, if at the top level.
 *
 * @example
 * gView.getCurrentSubview();
 */
z.gv.GView.getCurrentSubview = function () {
};
/**
 * Set the current subview of the GView. see {@link z.gv.Subview}
 *
 * @param {z.gv.Subview}[subview]     - the new subview, if null, return to the top view
 *
 * @return void
 *
 * @example
 * gView.setCurrentSubview(subview)
 * gView.setCurrentSubview(null)
 */
z.gv.GView.setCurrentSubview = function (subview) {
}

Object.assign(z.gv.GView.prototype, $LinkBundleInterface.prototype);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = z;
}
