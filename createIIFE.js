const jiife = require('jiife');
jiife.processFiles(['node_modules/xtal-latx/define.js', 'node_modules/xtal-latx/xtal-latx.js', 'p.js', 'p-d.js', 'p-u.js'], 'p-d.p-u.js');
jiife.processFiles(['node_modules/xtal-latx/define.js', 'node_modules/xtal-latx/xtal-latx.js', 'p.js', 'p-d.js', 'p-d-x.js', 'p-u.js'], 'p-d.p-d-x.p-u.js');
jiife.processFiles(['node_modules/xtal-latx/define.js', 'node_modules/xtal-latx/xtal-latx.js', 'p.js', 'p-d.js', 'p-d-x.js', 'p-u.js', 'p-destal.js'], 'p-d.p-d-x.p-u.p-destal.js');
jiife.processFiles(['node_modules/xtal-latx/define.js', 'node_modules/xtal-latx/xtal-latx.js', 'p.js', 'p-d.js', 'p-d-x.js', 'p-u.js', 'p-destal.js', 'p-s.js'], 'p-all.iife.js');
jiife.processFiles(['node_modules/xtal-latx/define.js', 'node_modules/xtal-latx/xtal-latx.js', 'PDQ.js'], 'PDQ.iife.js');