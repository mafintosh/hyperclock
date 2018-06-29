# hyperclock

Distributed, secure clock over a [hypercore](https://github.com/mafintosh/hypercore)

```
npm install hyperclock
```

Useful if you need a trusted clock in a distributed system.

## Usage

``` js
const hyperclock = require('hyperclock')

const clock = hyperclock('./clock')

clock.createReadStream({live: true}).on('data', console.log)
```

Running the above prints stuff similar to

```
{ type: 'hyperclock' }
{ time: 1530285479803,
  random:
   <Buffer e2 c6 9a d6 b0 36 69 91 f1 80 a1 93 f7 55 fa 1e 83 13 76 fe c9 3f f8 e2 7d 05 9c 82 83 79 15 ac> }
{ time: 1530285480804,
  random:
   <Buffer 6f 32 bd df 96 ac 64 a1 71 56 6b 12 78 92 18 2d ed 10 6f 2f b6 44 f5 c0 e8 a2 5a c0 fe 99 ac 4e> }
{ time: 1530285481806,
  random:
   <Buffer d8 7b 3b 09 ae 0c 48 f8 18 c6 61 93 4b 1a ce 3b 5c 17 1e 0e c1 4d ad 9a 8e 7f dd 37 62 36 b9 6d> }
{ time: 1530285482808,
  random:
   <Buffer d0 ec 7d 1c 97 3a 1f ac fd ac 38 53 a7 7b e2 4c c5 38 cd 82 d5 24 1b e4 fe 99 05 c5 08 2c 5c a9> }
```

## API

#### `feed = hyperclock(storage, [key], [options])`

Create a new clock feed. The returned value is a [hypercore](https://github.com/mafintosh/hypercore) that
represents a clock you can replicate elsewhere using normal hypercore replication.

The first entry is a header identifying this as a hyperclock and the subsequent ones look like this

```js
{
  time: unixTime,
  random: <32 random bytes>
}
```

You can use the random values to prove that you've seen a specific time in a distributed system
assuming you trust this clock.

`storage`, `key`, and `options` are all forwarded to the hypercore constructor.

Per default the time is added every `1000ms`. If you want to change this set the `{interval: ms}` option.

## License

MIT
