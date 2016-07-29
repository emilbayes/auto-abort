# `auto-abort`

> Only keep a single instance, aborting previous instances on subsequent calls

## Install

```sh
npm install auto-abort
```

## Usage

```js
var autoAbort = require('auto-abort')
var autoXhr = autoAbort(require('xhr'))

autoXhr({url: '/autocomplete', json: {q: 'hel'}}, handleResponse)
autoXhr({url: '/autocomplete', json: {q: 'hell'}}, handleResponse)
autoXhr({url: '/autocomplete', json: {q: 'hello'}}, handleResponse)

function handleResponse (err, data, res) {
  // Should only be called once, with the most recent request
}
```

## API

### `autoXhr(fn)`

Wraps `fn` with a function that will only keep a single instance of whatever `fn`
returns around, calling `.abort()` on the previous instance before calling
`fn` again. Unless you use something like `unassertify`, the return value of `fn`
will also be checked for an `.abort()` function on each call.

#### `fn`
Type: `Function`

The function to wrap. The function MUST return an object with an `.abort()`
method, examples being `xhr` and `d3.json`

## License

[ISC](LICENSE.md)
