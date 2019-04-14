let ColorMatchers;
module.exports =
  (ColorMatchers = (function() {
    ColorMatchers = class ColorMatchers {
      static initClass() {

        // global matchers regexs
        this.prototype.matchers = (function() {
          // <http://www.w3.org/TR/css3-values/#integers>
          const CSS_INTEGER = '[-\\+]?\\d+%?';
          // <http://www.w3.org/TR/css3-values/#number-value>
          const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
          // Allow positive/negative integer/number. Don't capture the either/or, just the entire outcome.
          const CSS_UNIT = `(?:${CSS_NUMBER})|(?:${CSS_INTEGER})`;
          // Actual matching.
          // Parentheses and commas are optional, but not required.
          // Whitespace can take the place of commas or opening paren
          const PERMISSIVE_MATCH3 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`;
          const PERMISSIVE_MATCH4 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`;
          return {
            CSS_UNIT: new RegExp(CSS_UNIT),
            rgb: new RegExp(`rgb${PERMISSIVE_MATCH3}`),
            rgba: new RegExp(`rgba${PERMISSIVE_MATCH4}`),
            hsl: new RegExp(`hsl${PERMISSIVE_MATCH3}`),
            hsla: new RegExp(`hsla${PERMISSIVE_MATCH4}`),
            hsv: new RegExp(`hsv${PERMISSIVE_MATCH3}`),
            hsva: new RegExp(`hsva${PERMISSIVE_MATCH4}`),
            hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex: /(\#[0-9a-f]{8}|\#[0-9a-f]{6}|\#[0-9a-f]{3})/i
          };
        })();
      }

      // match and return the matched string
      getMatch(text) {
        // matches
        const matched = [];
        // the formats to match
        const formats = [
          'rgb',
          'rgba',
          'hsl',
          'hsla',
          'hsv',
          'hsva',
          'hex'
        ];

        // loop through each of the regexs
        for (let format of Array.from(formats)) {
          // match until possible
          let match = undefined;
          // if it matches add it to the matched array
          while ((match = this.matchers[format].exec(text))) {
            const color = new this.constructor(match[0]);
            const index = text.indexOf(match[0]);
            const _length = match[0].length;
            // only add if a valid color
            if (color.isValid()) {
              matched.push({
                color: match[0],
                format,
                start: index,
                end: index + _length
              });
            }
            // replace the 'text' buffer with empty string to keep the text length same
            text = text.replace(match[0], (new Array(_length + 1)).join(' '));
          }
        }

        // return the matched strings
        return matched;
      }
    };
    ColorMatchers.initClass();
    return ColorMatchers;
  })());
