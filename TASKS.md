## To-dos

Your thoughts about these to-dos is welcomed. So do new ideas.

- [x] Retrieve inline #HEX from name to color. *Behave waggishly when triggered with multi-line*
- [x] Retrieve in multi-line. *Multi-line looks ok in one single mode, but not good when editor has cursors, inline selections and blockSelections in the same time.*
- [ ] Retrieve in multi-line in multi-mode at the same time. Don't know if it's possible.
- [ ] Retrieve when the indicator is set to none.
- [x] Auto select the color on cursor to convert to the color name symbol without manual selecting.
- [x] Maybe multi-cursor converting.
- [x] Trim any special character since *Sass variables is invalid in those cases*. eg: "!", ".", "$", "/". It has been down by a dep named [lodash](https://lodash.com/). A great utility library.
- [x] Handle new special cases like `color-co₂`, convert to `color-co2`?
- [ ] Make it configrable like whitelist for trimming, variablizing and naming-styles in non-sass/scss/less file types.
- [x] Solve the problem that one needs to hit `u` 3 times in vim to achieve a `ctrl-z` undo.
- [ ] Tip the deviation if one color hasn't been named yet. The tolerance range should be adjustable in the config. When the percentage is less than a limit, show these two (not that so) similar colors in a palette(made of lately used color?) and let user choose to use the nearest dicted one or keep the no-name original.
- [ ] Look-up function: use some trigger(like `ctrl`) to check/show the meaning of one specific color name lively online(wiki, Google).
- [ ] Override [color-names](https://github.com/meodai/color-names)' values(= keep the names, assign custom values); override the name itself(= keep the values, assign custom names); moreover a totally new name-value(-explanation) pair could be born locally to users' liking, or even be commited to the current repo.
- [ ] Not just #HEX, any valid color code should be available as an input.
- [x] Clear the selection after converting? Offer a checkbox to switch.
