## To-dos

Your thoughts about these to-dos is welcomed. So do new ideas.

- [x] retrieve inline #HEX from name to color. *Behave waggishly when triggered with multi-lines.*
- [ ] retrieve in multi-lines.
- [x] auto select the color on cursor to convert to the color name without manual selecting.
- [ ] maybe multi-cursor converting.
- [x] trim any special character since *sass variables is invalid in those cases*. eg: "!", ".", "$", "/". It has been down by a dep named [lodash](https://lodash.com/). A great utility library.
- [x] handle new special cases like `color-co₂`, convert to `color-co2`?
- [ ] make it configrable like whitelist for trimming, variablizing and naming-styles in non-sass/scss/less file types.
- [ ] solve the problem that one needs to hit `u` 3 times in vim to achieve `ctrl-z` cancelling back to color code.
- [ ] tip the deviation if one color hasn't been named yet. The tolerance range should be adjustable in the config. When the percentage is less than a limit, show these two (not that so) similar colors in a palette(made of lately used color?) and let user choose to use the nearest dicted one or keep the no-name original.
- [ ] look-up function: use some trigger(like `ctrl`) to check/show the meaning of one specific color name lively online(wiki, Google).
- [ ] override [color-names](https://github.com/meodai/color-names)' values(= keep the names, assign custom values); override the name itself(= keep the values, assign custom names); moreover a totally new name-value(-explanation) pair could be born locally to users' liking, or even be commited to the current repo.
- [ ] not just #HEX, any valid color code should be available as an input.
- [x] clear the selection after converting? Offer a checkbox to switch.
