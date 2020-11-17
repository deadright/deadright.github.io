'use strict';

// COMPOSITION
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
const pipe = (...fns) => x => reduce((y, f) => f(y), fns, x, true);
// PRIMITIVE
const pl = (...ns) => ns.reduce((y, n) => y + n, 0);
const mn = (...ns) => ns.reduce((y, n) => y - n, 0);
const isObj = obj => typeof obj === 'object' && obj !== null;
const toggle = val => !val;
// DOM
const select = slc => document.querySelector(slc);
const selectA = slc => document.querySelectorAll(slc);
const selectC = slc => fn => document.querySelector(slc);
const wrtg = (data, tag) => tag.innerHTML = data;
const adhtm = (cnt) => (el) => { cnt ? el.innerHTML = cnt : null; return el; }
const genel = tag => x => document.createElement(tag);
const append = apto => x => { apto.append(x); return x; };
const apnd = (x, apto) => {
    if (!apto) {
        return console.log("nothing to append to. (apto is empty.)");
    } else {
        apto.append(x);
        return x;
    }
};
const hid = (el, bool) => { el.hidden = bool; return el; }

// WRAPPERS
const foreach = (fn, arr) => isObj(arr) ? arr.forEach(fn) : fn(arr)
// const reduce = (fn, arr, ltr = true) => acc =>
//     ltr ? arr.reduce(fn, acc) : arr.reduceRight(fn, acc);
const push = (arr = [], el) => { arr.push(el); return arr; };
const map = (fn, arr) => arr.map(fn);

// CLASSES
const foreachcl = (fn, cls) => selbycl(cls).forEach(fn);
const remallofcl = (cls) => foreachcl((el) => el.remove(), cls);
const selbycl = slc => document.querySelectorAll(slc);

// THESE WORK ON ARRAYS OF CLASSES. NO DOTS IN CLASS NAMES
const adcl = (cls, el) => el.classList.add(cls);
const remcl = (cls, el) => el.classList.remove(cls);
const adclC = (cls) => (el) => { cls ? el.classList.add(...cls.split(" ")) : null; return el; };
const remclC = (cls) => (el) => { cls ? el.classList.remove(...cls.split(" ")) : null; return el; };
// DEBUG
const trace = label => value => { log(`${ label }: ${ value }`); return value; }
const log = (x) => console.log(x);
// LISTENERS
const ladd = (fn, type, obj = null) => { obj ? obj.addEventListener(type, fn) : document.addEventListener(type, fn); }
const lrem = (fn, type, obj = null) => { obj ? obj.removeEventListener(type, fn) : document.removeEventListener(type, fn); }

function exOn (func, type, options) {
    let k = options.key, obj = options.object;
    let f = func, t = type;
    let compf = (e) => f(e);
    if (options.key && options.once) compf = (e) => {
        if (k == e.key) {
            f(e);
            lrem(compf, t);
        }
    }
    if (options.key && !options.once) compf = (e) => {
        if (k == e.key) {
            f(e);
        }
    }
    if (!options.key && options.once) compf = (e) => {
        f(e);
        lrem(compf, t, obj);
    }
    console.log("once: " + options.once + "; object: " + options.object); 
    ladd(compf, t, options.object);
}

const exOnKey = key => fn => e => { if (e.code === key) fn(e) };
const exOnce = (type, obj) => fn => {
    let compf = (e) => { fn(e); lrem(compf, type); }
    return compf
}
const exOnSpaceOnce = fn => ladd(compose(exOnce("keyup"), exOnKey("Space"))(fn), "keyup");
const exOnSpace = fn => ladd(exOnKey("Space")(fn), "keyup");
const onClick = (fn, obj) => ladd(fn, 'click', obj);

const onClickRunOnce = (fn, obj) => {
    let f = (e) => { fn(e); lrem(f, "click", obj); }
    ladd(f, "click", obj);
}