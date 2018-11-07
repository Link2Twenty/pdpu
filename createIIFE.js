const jiife = require('jiife');
const xl = 'node_modules/xtal-latx/';
const define = xl + 'define.js';
const xlxl = xl + 'xtal-latx.js';
const ND = xl + 'NavDown.js';
const PDND = 'PDNavDown.js';
const cnp = xl + 'createNestedProp.js';
jiife.processFiles([define, xlxl, ND, PDND,  'p.js', 'p-d.js'], 'p-d.iife.js');
jiife.processFiles([define, xlxl, 'p.js', 'p-d.js', 'p-u.js'], 'p-d.p-u.js');
jiife.processFiles([define, xlxl, cnp, 'p.js', 'p-d.js', 'p-d-x.js', 'p-u.js'], 'p-d.p-d-x.p-u.js');
jiife.processFiles([define, xlxl, cnp, 'p.js', 'p-d.js', 'p-d-x.js', 'p-u.js', 'p-destal.js'], 'p-all.js');
jiife.processFiles([define, xlxl, 'PDQ.js'], 'PDQ.iife.js');