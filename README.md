# Color Dict

Replace #HEX values with colors' names in general, with variables in less/scss/sass.

Cloned on the other atom package [var-that-color](https://atom.io/packages/var-that-color), using [color-names](https://github.com/meodai/color-names) dictionary instead for more color names.

## Usage

- Select the `#HEX` first, hit `ctrl-alt-d` then.
- No selecting, just put the cursor on the `#HEX` and hit `ctrl-alt-d` (Not working for multi-cursor for now).

## To-do

- [ ] retrieve inline #HEX from name to color.
- [x] auto select the color on cursor to convert to the color name without manual selecting.
- [ ] maybe multi-cursor converting.
- [ ] trim any special character since sass variables is invalid in those cases. eg: "!", ".", "$".
- [ ] make it configrable like whitelist for trimming, variablizing and naming-styles in non-CSS file types.
