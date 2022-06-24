// import axios from 'axios';
// import fs from 'fs';
// console.log(typeof axios);
// console.log(typeof fs);
import {lib} from './lib'
import Cls from './Cls';
import {func} from './func';
/* lib is a name exported object from the module lib.*/
console.log(lib.someObject); /* should print "Hello World"*/ // call object - obj.key
console.log(lib.someFunction()); /* should print "Foobar"*/ // call function ()
console.log(Cls()); /* Cls is a function which is exported as the default export of the module Cls*/
console.log(func()); /* func is a function which is exported as the named export of the module func */
