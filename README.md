# Color Dict

Color name-value converting in general, with variable definition in .less/scss/sass and more(to-dos).

Cloned on the other atom package [var-that-color](https://atom.io/packages/var-that-color), using [color-names](https://github.com/meodai/color-names) dictionary instead for more color names.

## Usage

###### 1. Block Mode:

`#2299dd` ➡️ `$color-home-world: #2299dd;`

 select constructive lines, one #HEX code in a line.

then hit `ctrl-alt-d`. Get key-value pairs.

###### 2. Inline Mode:

`#2299dd` ↔️ `color-home-world`

**put the cursor on** the `#HEX`/color name(the indicator included but not the prefix) **or select** the exact span of that.

then hit `ctrl-alt-d`. Get key-to-value or value-to-key converting.

Not working for multi-cursor for now.

## To-dos

- [x] retrieve inline #HEX from name to color. *Behave waggishly when triggered with multi-lines.*
- [ ] retrieve in multi-lines.
- [x] auto select the color on cursor to convert to the color name without manual selecting.
- [ ] maybe multi-cursor converting.
- [x] trim any special character since *sass variables is invalid in those cases*. eg: "!", ".", "$", "/". It has been down by a dep named [lodash](https://lodash.com/). A great utility library.
- [ ] make it configrable like whitelist for trimming, variablizing and naming-styles in non-sass/scss/less file types.
- [ ] solve the problem that one needs to hit `u` 3 times in vim to achieve `ctrl-z` cancelling back to color code.
- [ ] tip the deviation if one color hasn't be named yet. The tolerance range should be adjustable in config. When the percentage is less than a limit, show these two (not that so) similar colors in a palette(made of lately used color?) and let user choose to use the nearest dicted one or keep the no-name original.
- [ ] look-up function: use some trigger(like `ctrl`) to check/show the meaning of one specific color name lively online(wiki, Google).
- [ ] override [color-names](https://github.com/meodai/color-names)' values(= keep the names, assign custom values); override the name itself(= keep the values, assign custom names); moreover a totally new name-value(-explanation) pair could be born locally to users' liking, or even be commited to the current repo.
- [ ] not just #HEX, any valid color code should be available as an input.
- [ ] clear the selection after converting? offer a checkbox to switch.

## License
[MIT](https://opensource.org/licenses/mit-license.php)

'cc-primary': '$salmon',
'cc-accent': '$gigas',
'cc-bg': '$wild-sand',
'cc-bg-shade': '$melancholia',
'cc-bg-invert': '$#2138ab',
'cc-text': '$#0892d0',
'cc-text-weak': '$#ecefef',
'cc-text-strong': '$#a59344',
'cc-text-heading': '$#a59344',
'cc-text-invert': '$#c09962',
'cc-text-invert-strong': '$#00ab66',
'cc-text-link': '$#9d2933',
'cc-text-link-hover': '$#8ee53f',
