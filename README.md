# multiyargs

```
$ cli command1 --foo -- command2 --bar -- command3 --baz
```

```
const cli = require('yargs')
  .command('command1', (builder) => { builder.option('foo', { type: 'boolean' })})
  .command('command2', (builder) => { builder.option('bar', { type: 'boolean' })})
  .command('command3', (builder) => { builder.option('baz', { type: 'boolean' })})
;

const argv = require('multiyargs')(cli, process.argv.slice(2));

/**
[ { _: [ 'command1' ], foo: true, '$0': 'cli' },
  { _: [ 'command2' ], bar: true, '$0': 'cli' },
  { _: [ 'command3' ], baz: true, '$0': 'cli' } ]
 */
```