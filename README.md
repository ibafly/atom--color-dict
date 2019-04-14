# Color Dict

Replace #HEX values with colors' names in general, with variables in less/scss/sass and more(to-do).

Cloned on the other atom package [var-that-color](https://atom.io/packages/var-that-color), using [color-names](https://github.com/meodai/color-names) dictionary instead for more color names.

## Usage

- Select the `#HEX` first, hit `ctrl-alt-d` then.
- No selecting, just put the cursor on the `#HEX` and hit `ctrl-alt-d` (Not working for multi-cursor for now).

## To-do

- [ ] retrieve inline #HEX from name to color.
- [x] auto select the color on cursor to convert to the color name without manual selecting.
- [ ] maybe multi-cursor converting.
- [ ] trim any special character since *sass variables is invalid in those cases*. eg: "!", ".", "$".
- [ ] make it configrable like whitelist for trimming, variablizing and naming-styles in non-CSS file types.
- [ ] solve the problem that one needs to hit `u` 3 times in vim to achieve `ctrl-z` cancelling back to color code.
- [ ] tip the deviation if one color hasn't be named yet. The tolerance range should be adjustable in config. When the percentage is less than a limit, show these two (not that so) similar colors in a palette(made of lately used color?) and let user choose to use the nearest dicted one or keep the no-name original.
- [ ] look-up function: use some trigger(like `ctrl`) to check/show the meaning of one specific color name lively online(wiki, Google).
- [ ] override [color-names](https://github.com/meodai/color-names)' values(= keep the names, assign custom values); override the name itself(= keep the values, assign custom names); moreover a totally new name-value(-explanation) pair could be born locally to users' liking, or even be commited to the current repo.
