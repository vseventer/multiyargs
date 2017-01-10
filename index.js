'use strict';

// Exports.
module.exports = (yargs, argv) => {
  argv = argv || process.argv.slice(2); // Normalize.

  // Separate by `--`.
  let argvSet = [ ], length;
  while(0 !== (length = argv.length)) {
    let index = argv.indexOf('--') + 1;
    argvSet.push(argv.splice(0, index || length));
  }

  // Return.
  return argvSet.map(yargs.parse);
};