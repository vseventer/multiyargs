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
const expect = require('chai').expect;
const yargs  = require('./mocks/yargs');

// Local modules.
const multiyargs = require('../');

// Test suite.
describe('multiyargs', () => {
  it('given no commands.', () => {
    const args = multiyargs(yargs, [ ]);
    expect(args).to.deep.equal([ ]);
  });

  it('given the separator.', () => {
    const args = multiyargs(yargs, [ '--' ]);
    expect(args).to.deep.equal([
      [ '--' ]
    ]);
  });

  it('given a single command.', () => {
    const args = multiyargs(yargs, [ 'foo', 'bar' ]);
    expect(args).to.deep.equal([
      [ 'foo', 'bar' ]
    ]);
  });

  it('given a single command, starting with the separator.', () => {
    const args = multiyargs(yargs, [ '--', 'foo', 'bar' ]);
    expect(args).to.deep.equal([
      [ '--' ],
      [ 'foo', 'bar' ]
    ]);
  });

  it('given a single command, ending with the separator.', () => {
    const args = multiyargs(yargs, [ 'foo', 'bar', '--' ]);
    expect(args).to.deep.equal([
      [ 'foo', 'bar', '--' ]
    ]);
  });

  it('given two commands.', () => {
    const args = multiyargs(yargs, [ 'foo', 'bar', '--', 'qux' ]);
    expect(args).to.deep.equal([
      [ 'foo', 'bar', '--' ],
      [ 'qux' ]
    ]);
  });

  it('given two commands, starting with the separator.', () => {
    const args = multiyargs(yargs, [ '--', 'foo', 'bar', '--', 'qux' ]);
    expect(args).to.deep.equal([
      [ '--' ],
      [ 'foo', 'bar', '--' ],
      [ 'qux' ]
    ]);
  });

  it('given two commands, ending with two separators.', () => {
    const args = multiyargs(yargs, [ 'foo', 'bar', '--', 'qux', '--' ]);
    expect(args).to.deep.equal([
      [ 'foo', 'bar', '--' ],
      [ 'qux', '--' ]
    ]);
  });
});