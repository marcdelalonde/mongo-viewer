#!/usr/bin/env node

var path    = require('path'),
    program = require('commander'),
    forever = require('forever-monitor');

program
    .version('0.2.0')
    .option('-p, --port <port>', 'Port on which to listen to (defaults to 8080)', parseInt)
    .parse(process.argv);

var child = new (forever.Monitor)(path.join(__dirname, '..', 'server.js'), {
  silent: false,
  minUptime: 2000,
  max: 1,
  killTree: true,
  env: { PORT: program.port || 8080 }
});

child.on('exit', function (res) {
  console.log('Stopped keeping mongo-viewer alive');
});

child.start();
