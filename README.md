# Color Dict

[![Greenkeeper badge](https://badges.greenkeeper.io/ibafly/atom--color-dict.svg)](https://greenkeeper.io/)

Color name-value converting in general, with variable definition in .less/scss/sass and more(to-dos).

Cloned on the other atom package [var-that-color](https://atom.io/packages/var-that-color), using [color-names](https://github.com/meodai/color-names) dictionary instead of [Name that color](http://chir.ag/projects/ntc) for more color names.

## Usage

### 1. Block Mode: in .less/scss/sass file types

`#2299dd` -> `$color-home-world: #2299dd;`

Select constructive lines. lines that only include `#HEX`s will be converted.

Then hit `ctrl-alt-d`. Get key-value pairs.

### 2. Inline Mode: in all file types

`#2299dd` <=> `color-home-world`

**Put the cursor on** the `#HEX`/color name(the indicator included but not the prefix) **or select** the exact span of that.

Then hit `ctrl-alt-d`. Get key-to-value or value-to-key converting.

> It's working for multi-cursor and multi-line, but only support `kebab-case`, `snake_case` & `camelCase`.

## To-dos

See future plans in [TASKS](https://github.com/ibafly/atom--color-dict/blob/master/TASKS.md)

## License
[MIT](https://opensource.org/licenses/mit-license.php)
