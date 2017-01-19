/*!
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Mark van Seventer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Strict mode.
'use strict';

// Package modules.
const debug = require('debug')('multiyargs:log');

// Exports.
module.exports = (yargs, argv, forEachCallback) => {
  // Default to `process.argv`.
  argv = argv || process.argv.slice(2);

  // Debug.
  debug('argv: %o', argv);

  // Ensure there is at least one slice.
  if(!argv[0]) {
    argv.push('--');
  }

  // Separate by `--`.
  let result = [ ];
  while(undefined !== argv[0]) {
    // Determine next slice of arguments.
    const index = argv.indexOf('--') + 1; // Set to end of slice.
    const slice = index ? argv.splice(0, index) : argv.splice(0);

    // Debug.
    debug('parsing slice: %o', slice);

    // Parse slice and append to result.
    if(forEachCallback) {
      forEachCallback(undefined !== argv[0]);
    }
    result.push(yargs.parse(slice));
  }

  // Debug.
  debug('done');

  // Return the result.
  return result;
};