// TinyColor v1.3.0
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License
// convert colors between formats

let TinyColor;
const ColorMatchers = require('little-mod/colorMatchers');

module.exports =
  (TinyColor = (function() {
    TinyColor = class TinyColor extends ColorMatchers {
      static initClass() {
        this.prototype.tinyCounter = 0;
        // Big List of Colors
        // ------------------
        // <http://www.w3.org/TR/css3-color/#svg-color>
        this.prototype.names = {
          aliceblue: 'f0f8ff',
          antiquewhite: 'faebd7',
          aqua: '0ff',
          aquamarine: '7fffd4',
          azure: 'f0ffff',
          beige: 'f5f5dc',
          bisque: 'ffe4c4',
          black: '000',
          blanchedalmond: 'ffebcd',
          blue: '00f',
          blueviolet: '8a2be2',
          brown: 'a52a2a',
          burlywood: 'deb887',
          burntsienna: 'ea7e5d',
          cadetblue: '5f9ea0',
          chartreuse: '7fff00',
          chocolate: 'd2691e',
          coral: 'ff7f50',
          cornflowerblue: '6495ed',
          cornsilk: 'fff8dc',
          crimson: 'dc143c',
          cyan: '0ff',
          darkblue: '00008b',
          darkcyan: '008b8b',
          darkgoldenrod: 'b8860b',
          darkgray: 'a9a9a9',
          darkgreen: '006400',
          darkgrey: 'a9a9a9',
          darkkhaki: 'bdb76b',
          darkmagenta: '8b008b',
          darkolivegreen: '556b2f',
          darkorange: 'ff8c00',
          darkorchid: '9932cc',
          darkred: '8b0000',
          darksalmon: 'e9967a',
          darkseagreen: '8fbc8f',
          darkslateblue: '483d8b',
          darkslategray: '2f4f4f',
          darkslategrey: '2f4f4f',
          darkturquoise: '00ced1',
          darkviolet: '9400d3',
          deeppink: 'ff1493',
          deepskyblue: '00bfff',
          dimgray: '696969',
          dimgrey: '696969',
          dodgerblue: '1e90ff',
          firebrick: 'b22222',
          floralwhite: 'fffaf0',
          forestgreen: '228b22',
          fuchsia: 'f0f',
          gainsboro: 'dcdcdc',
          ghostwhite: 'f8f8ff',
          gold: 'ffd700',
          goldenrod: 'daa520',
          gray: '808080',
          green: '008000',
          greenyellow: 'adff2f',
          grey: '808080',
          honeydew: 'f0fff0',
          hotpink: 'ff69b4',
          indianred: 'cd5c5c',
          indigo: '4b0082',
          ivory: 'fffff0',
          khaki: 'f0e68c',
          lavender: 'e6e6fa',
          lavenderblush: 'fff0f5',
          lawngreen: '7cfc00',
          lemonchiffon: 'fffacd',
          lightblue: 'add8e6',
          lightcoral: 'f08080',
          lightcyan: 'e0ffff',
          lightgoldenrodyellow: 'fafad2',
          lightgray: 'd3d3d3',
          lightgreen: '90ee90',
          lightgrey: 'd3d3d3',
          lightpink: 'ffb6c1',
          lightsalmon: 'ffa07a',
          lightseagreen: '20b2aa',
          lightskyblue: '87cefa',
          lightslategray: '789',
          lightslategrey: '789',
          lightsteelblue: 'b0c4de',
          lightyellow: 'ffffe0',
          lime: '0f0',
          limegreen: '32cd32',
          linen: 'faf0e6',
          magenta: 'f0f',
          maroon: '800000',
          mediumaquamarine: '66cdaa',
          mediumblue: '0000cd',
          mediumorchid: 'ba55d3',
          mediumpurple: '9370db',
          mediumseagreen: '3cb371',
          mediumslateblue: '7b68ee',
          mediumspringgreen: '00fa9a',
          mediumturquoise: '48d1cc',
          mediumvioletred: 'c71585',
          midnightblue: '191970',
          mintcream: 'f5fffa',
          mistyrose: 'ffe4e1',
          moccasin: 'ffe4b5',
          navajowhite: 'ffdead',
          navy: '000080',
          oldlace: 'fdf5e6',
          olive: '808000',
          olivedrab: '6b8e23',
          orange: 'ffa500',
          orangered: 'ff4500',
          orchid: 'da70d6',
          palegoldenrod: 'eee8aa',
          palegreen: '98fb98',
          paleturquoise: 'afeeee',
          palevioletred: 'db7093',
          papayawhip: 'ffefd5',
          peachpuff: 'ffdab9',
          peru: 'cd853f',
          pink: 'ffc0cb',
          plum: 'dda0dd',
          powderblue: 'b0e0e6',
          purple: '800080',
          rebeccapurple: '663399',
          red: 'f00',
          rosybrown: 'bc8f8f',
          royalblue: '4169e1',
          saddlebrown: '8b4513',
          salmon: 'fa8072',
          sandybrown: 'f4a460',
          seagreen: '2e8b57',
          seashell: 'fff5ee',
          sienna: 'a0522d',
          silver: 'c0c0c0',
          skyblue: '87ceeb',
          slateblue: '6a5acd',
          slategray: '708090',
          slategrey: '708090',
          snow: 'fffafa',
          springgreen: '00ff7f',
          steelblue: '4682b4',
          tan: 'd2b48c',
          teal: '008080',
          thistle: 'd8bfd8',
          tomato: 'ff6347',
          turquoise: '40e0d0',
          violet: 'ee82ee',
          wheat: 'f5deb3',
          white: 'fff',
          whitesmoke: 'f5f5f5',
          yellow: 'ff0',
          yellowgreen: '9acd32'
        };

        // Make it easy to access colors via `hexNames[hex]`
        this.prototype.hexNames = [];
      }

      constructor(color, opts) {
        // If input is already a TinyColor, return itself

        super();

        if (color == null) {
          color = '';
        }
        if (opts == null) {
          opts = {};
        }
        if (color instanceof TinyColor) {
          return color;
        }
        // If we are called as a function, call using new instead
        if (!(this instanceof TinyColor)) {
          return new TinyColor(color, opts);
        }
        // Make it easy to access colors via `hexNames[hex]`
        this.hexNames = this.flip(this.names);
        const rgb = this.inputToRGB(color);
        this._originalInput = color;
        this._r = rgb.r;
        this._g = rgb.g;
        this._b = rgb.b;
        this._a = rgb.a;
        this._roundA = Math.round(100 * this._a) / 100;
        this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType;
        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, @ was already taken care of by `inputToRgb`
        if (this._r < 1) {
          this._r = Math.round(this._r);
        }
        if (this._g < 1) {
          this._g = Math.round(this._g);
        }
        if (this._b < 1) {
          this._b = Math.round(this._b);
        }
        this._ok = rgb.ok;
        this._tc_id = this.tinyCounter++;
      }

      // If input is an object, force 1 into "1.0" to handle ratios properly
      // String input requires "1.0" as input, so 1 will be treated as 1
      fromRatio(color, opts) {
        if (typeof color === 'object') {
          const newColor = {};
          for (let i in color) {
            if (color.hasOwnProperty(i)) {
              if (i === 'a') {
                newColor[i] = color[i];
              } else {
                newColor[i] = this.convertToPercentage(color[i]);
              }
            }
          }
          color = newColor;
        }
        return TinyColor(color, opts);
      }

      // Given a string or object, convert that input to RGB
      // Possible string inputs:
      //
      //     "red"
      //     "#f00" or "f00"
      //     "#ff0000" or "ff0000"
      //     "#ff000000" or "ff000000"
      //     "rgb 255 0 0" or "rgb (255, 0, 0)"
      //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
      //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
      //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
      //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
      //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
      //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
      //
      inputToRGB(color) {
        let rgb = {
          r: 0,
          g: 0,
          b: 0
        };
        let a = 1;
        let ok = false;
        let format = false;
        if (typeof color === 'string') {
          color = this.stringInputToObject(color);
        }
        if (typeof color === 'object') {
          if (this.isValidCSSUnit(color.r) && this.isValidCSSUnit(color.g) && this.isValidCSSUnit(color.b)) {
            rgb = this.rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
          } else if (this.isValidCSSUnit(color.h) && this.isValidCSSUnit(color.s) && this.isValidCSSUnit(color.v)) {
            color.s = this.convertToPercentage(color.s);
            color.v = this.convertToPercentage(color.v);
            rgb = this.hsvToRgb(color.h, color.s, color.v);
            ok = true;
            format = 'hsv';
          } else if (this.isValidCSSUnit(color.h) && this.isValidCSSUnit(color.s) && this.isValidCSSUnit(color.l)) {
            color.s = this.convertToPercentage(color.s);
            color.l = this.convertToPercentage(color.l);
            rgb = this.hslToRgb(color.h, color.s, color.l);
            ok = true;
            format = 'hsl';
          }
          if (color.hasOwnProperty('a')) {
            ({
              a
            } = color);
          }
        }
        a = this.boundAlpha(a);
        return {
          ok,
          format: color.format || format,
          r: Math.min(255, Math.max(rgb.r, 0)),
          g: Math.min(255, Math.max(rgb.g, 0)),
          b: Math.min(255, Math.max(rgb.b, 0)),
          a
        };
      }

      // Conversion Functions
      // --------------------
      // `@rgbToHsl`, `@rgbToHsv`, `@hslToRgb`, `@hsvToRgb` modified from:
      // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
      // `@rgbToRgb`
      // Handle bounds / percentage checking to conform to CSS color spec
      // <http://www.w3.org/TR/css3-color/>
      // *Assumes:* r, g, b in [0, 255] or [0, 1]
      // *Returns:* { r, g, b } in [0, 255]
      rgbToRgb(r, g, b) {
        return {
          r: this.bound01(r, 255) * 255,
          g: this.bound01(g, 255) * 255,
          b: this.bound01(b, 255) * 255
        };
      }

      // `@rgbToHsl`
      // Converts an RGB color value to HSL.
      // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
      // *Returns:* { h, s, l } in [0,1]
      rgbToHsl(r, g, b) {
        r = this.bound01(r, 255);
        g = this.bound01(g, 255);
        b = this.bound01(b, 255);
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = undefined;
        let s = undefined;
        const l = (max + min) / 2;
        if (max === min) {
          h = (s = 0);
          // achromatic
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = ((g - b) / d) + (g < b ? 6 : 0);
              break;
            case g:
              h = ((b - r) / d) + 2;
              break;
            case b:
              h = ((r - g) / d) + 4;
              break;
          }
          h /= 6;
        }
        return {
          h,
          s,
          l
        };
      }

      // `@hslToRgb`
      // Converts an HSL color value to RGB.
      // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
      // *Returns:* { r, g, b } in the set [0, 255]
      hslToRgb(h, s, l) {
        let r = undefined;
        let g = undefined;
        let b = undefined;

        h = this.bound01(h, 360);
        s = this.bound01(s, 100);
        l = this.bound01(l, 100);

        if (s === 0) {
          r = (g = (b = l));
          // achromatic
        } else {
          const q = l < 0.5 ? l * (1 + s) : (l + s) - (l * s);
          const p = (2 * l) - q;
          r = this.hue2rgb(p, q, h + (1 / 3));
          g = this.hue2rgb(p, q, h);
          b = this.hue2rgb(p, q, h - (1 / 3));
        }
        return {
          r: r * 255,
          g: g * 255,
          b: b * 255
        };
      }

      hue2rgb(p, q, t) {
        if (t < 0) {
          t += 1;
        }
        if (t > 1) {
          t -= 1;
        }
        if (t < (1 / 6)) {
          return p + ((q - p) * 6 * t);
        }
        if (t < (1 / 2)) {
          return q;
        }
        if (t < (2 / 3)) {
          return p + ((q - p) * ((2 / 3) - t) * 6);
        }
        return p;
      }

      // `@rgbToHsv`
      // Converts an RGB color value to HSV
      // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
      // *Returns:* { h, s, v } in [0,1]
      rgbToHsv(r, g, b) {
        r = this.bound01(r, 255);
        g = this.bound01(g, 255);
        b = this.bound01(b, 255);
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = undefined;
        let s = undefined;
        const v = max;
        const d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
          h = 0;
          // achromatic
        } else {
          switch (max) {
            case r:
              h = ((g - b) / d) + (g < b ? 6 : 0);
              break;
            case g:
              h = ((b - r) / d) + 2;
              break;
            case b:
              h = ((r - g) / d) + 4;
              break;
          }
          h /= 6;
        }
        return {
          h,
          s,
          v
        };
      }

      // `@hsvToRgb`
      // Converts an HSV color value to RGB.
      // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
      // *Returns:* { r, g, b } in the set [0, 255]
      hsvToRgb(h, s, v) {
        h = this.bound01(h, 360) * 6;
        s = this.bound01(s, 100);
        v = this.bound01(v, 100);
        const i = Math.floor(h);
        const f = h - i;
        const p = v * (1 - s);
        const q = v * (1 - (f * s));
        const t = v * (1 - ((1 - f) * s));
        const mod = i % 6;
        const r = [
          v,
          q,
          p,
          p,
          t,
          v
        ][mod];
        const g = [
          t,
          v,
          v,
          q,
          p,
          p
        ][mod];
        const b = [
          p,
          p,
          t,
          v,
          v,
          q
        ][mod];
        return {
          r: r * 255,
          g: g * 255,
          b: b * 255
        };
      }

      // `@rgbToHex`
      // Converts an RGB color to hex
      // Assumes r, g, and b are contained in the set [0, 255]
      // Returns a 3 or 6 character hex
      rgbToHex(r, g, b, allow3Char) {
        const hex = [
          this.pad2(Math.round(r).toString(16)),
          this.pad2(Math.round(g).toString(16)),
          this.pad2(Math.round(b).toString(16))
        ];
        // Return a 3 character hex if possible
        if (allow3Char && (hex[0].charAt(0) === hex[0].charAt(1)) && (hex[1].charAt(0) === hex[1].charAt(1)) && (hex[2].charAt(0) === hex[2].charAt(1))) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }
        return hex.join('');
      }

      // `@rgbaToHex`
      // Converts an RGBA color plus alpha transparency to hex
      // Assumes r, g, b and a are contained in the set [0, 255]
      // Returns an 8 character hex
      rgbaToHex(r, g, b, a) {
        const hex = [
          this.pad2(this.convertDecimalToHex(a)),
          this.pad2(Math.round(r).toString(16)),
          this.pad2(Math.round(g).toString(16)),
          this.pad2(Math.round(b).toString(16))
        ];
        return hex.join('');
      }

      // Utilities
      // ---------
      // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
      flip(o) {
        const flipped = {};
        for (let i in o) {
          if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
          }
        }
        return flipped;
      }

      // Return a valid alpha value [0,1] with all invalid values being set to 1
      boundAlpha(a) {
        a = parseFloat(a);
        if (isNaN(a) || (a < 0) || (a > 1)) {
          a = 1;
        }
        return a;
      }

      // Take input from [0, n] and return it as [0, 1]
      bound01(n, max) {
        if (this.isOnePointZero(n)) {
          n = '100%';
        }
        const processPercent = this.isPercentage(n);
        n = Math.min(max, Math.max(0, parseFloat(n)));
        // Automatically convert percentage into number
        if (processPercent) {
          n = parseInt(n * max, 10) / 100;
        }
        // Handle floating point rounding errors
        if (Math.abs(n - max) < 0.000001) {
          return 1;
        }
        // Convert into [0, 1] range if it isn't already
        return (n % max) / parseFloat(max);
      }

      // Force a number between 0 and 1
      clamp01(val) {
        return Math.min(1, Math.max(0, val));
      }

      // Parse a base-16 hex value into a base-10 integer
      parseIntFromHex(val) {
        return parseInt(val, 16);
      }

      // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
      // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
      isOnePointZero(n) {
        return (typeof n === 'string') && (n.indexOf('.') !== -1) && (parseFloat(n) === 1);
      }

      // Check to see if string passed in is a percentage
      isPercentage(n) {
        return (typeof n === 'string') && (n.indexOf('%') !== -1);
      }

      // Force a hex value to have 2 characters
      pad2(c) {
        if (c.length === 1) {
          return `0${c}`;
        } else {
          return `${c}`;
        }
      }

      // Replace a decimal with it's percentage value
      convertToPercentage(n) {
        if (n <= 1) {
          n = `${n * 100}%`;
        }
        return n;
      }

      // Converts a decimal to a hex value
      convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
      }

      // Converts a hex value to a decimal
      convertHexToDecimal(h) {
        return this.parseIntFromHex(h) / 255;
      }

      // `@isValidCSSUnit`
      // Take in a single string / number and check to see if it looks like a CSS unit
      // (see `matchers` above for definition).
      isValidCSSUnit(color) {
        return !!super.matchers.CSS_UNIT.exec(color);
      }

      // `@stringInputToObject`
      // Permissive string parsing.  Take in a number of formats, and output an object
      // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
      stringInputToObject(color) {
        color = color.replace(/^\s+/, '').replace(/\s+$/, '').toLowerCase();
        let named = false;
        if (this.names[color]) {
          color = this.names[color];
          named = true;
        } else if (color === 'transparent') {
          return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            format: 'name'
          };
        }
        // Try to match string input using regular expressions.
        // Keep most of the number bounding out of @ function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // @ way the result will be the same whether the TinyColor is initialized with string or object.
        let match = undefined;
        if (match = super.matchers.rgb.exec(color)) {
          return {
            r: match[1],
            g: match[2],
            b: match[3]
          };
        }
        if (match = super.matchers.rgba.exec(color)) {
          return {
            r: match[1],
            g: match[2],
            b: match[3],
            a: match[4]
          };
        }
        if (match = super.matchers.hsl.exec(color)) {
          return {
            h: match[1],
            s: match[2],
            l: match[3]
          };
        }
        if (match = super.matchers.hsla.exec(color)) {
          return {
            h: match[1],
            s: match[2],
            l: match[3],
            a: match[4]
          };
        }
        if (match = super.matchers.hsv.exec(color)) {
          return {
            h: match[1],
            s: match[2],
            v: match[3]
          };
        }
        if (match = super.matchers.hsva.exec(color)) {
          return {
            h: match[1],
            s: match[2],
            v: match[3],
            a: match[4]
          };
        }
        if (match = super.matchers.hex8.exec(color)) {
          return {
            a: this.convertHexToDecimal(match[1]),
            r: this.parseIntFromHex(match[2]),
            g: this.parseIntFromHex(match[3]),
            b: this.parseIntFromHex(match[4]),
            format: named ? 'name' : 'hex8'
          };
        }
        if (match = super.matchers.hex6.exec(color)) {
          return {
            r: this.parseIntFromHex(match[1]),
            g: this.parseIntFromHex(match[2]),
            b: this.parseIntFromHex(match[3]),
            format: named ? 'name' : 'hex'
          };
        }
        if (match = super.matchers.hex3.exec(color)) {
          return {
            r: this.parseIntFromHex(match[1] + '' + match[1]),
            g: this.parseIntFromHex(match[2] + '' + match[2]),
            b: this.parseIntFromHex(match[3] + '' + match[3]),
            format: named ? 'name' : 'hex'
          };
        }
        return false;
      }

      isDark() {
        return this.getBrightness() < 128;
      }

      isLight() {
        return !this.isDark();
      }

      isValid() {
        return this._ok;
      }

      getOriginalInput() {
        return this._originalInput;
      }

      getFormat() {
        return this._format;
      }

      getAlpha() {
        return this._a;
      }

      getBrightness() {
        //http://www.w3.org/TR/AERT#color-contrast
        const rgb = this.toRgb();
        return ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
      }

      getLuminance() {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        const rgb = this.toRgb();
        let RsRGB = undefined;
        let GsRGB = undefined;
        let BsRGB = undefined;
        let R = undefined;
        let G = undefined;
        let B = undefined;
        RsRGB = rgb.r / 255;
        GsRGB = rgb.g / 255;
        BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
          R = RsRGB / 12.92;
        } else {
          R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);
        }
        if (GsRGB <= 0.03928) {
          G = GsRGB / 12.92;
        } else {
          G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);
        }
        if (BsRGB <= 0.03928) {
          B = BsRGB / 12.92;
        } else {
          B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);
        }
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
      }

      setAlpha(value) {
        this._a = this.boundAlpha(value);
        this._roundA = Math.round(100 * this._a) / 100;
        return this;
      }

      toHsv() {
        const hsv = this.rgbToHsv(this._r, this._g, this._b);
        return {
          h: hsv.h * 360,
          s: hsv.s,
          v: hsv.v,
          a: this._a
        };
      }

      toHsvString() {
        const hsv = this.rgbToHsv(this._r, this._g, this._b);
        const h = Math.round(hsv.h * 360);
        const s = Math.round(hsv.s * 100);
        const v = Math.round(hsv.v * 100);
        if (this._a === 1) {
          return `hsv(${h}, ${s}%, ${v}%)`;
        } else {
          return `hsva(${h}, ${s}%, ${v}%, ${this._roundA})`;
        }
      }

      toHsl() {
        const hsl = this.rgbToHsl(this._r, this._g, this._b);
        return {
          h: hsl.h * 360,
          s: hsl.s,
          l: hsl.l,
          a: this._a
        };
      }

      toHslString() {
        const hsl = this.rgbToHsl(this._r, this._g, this._b);
        const h = Math.round(hsl.h * 360);
        const s = Math.round(hsl.s * 100);
        const l = Math.round(hsl.l * 100);
        if (this._a === 1) {
          return `hsl(${h}, ${s}%, ${l}%)`;
        } else {
          return `hsla(${h}, ${s}%, ${l}%, ${this._roundA})`;
        }
      }

      toRatioHslString() {
        const hsl = this.rgbToHsl(this._r, this._g, this._b);
        const h = Math.round(hsl.h * 360);
        const s = Math.round(hsl.s);
        const l = Math.round(hsl.l);
        if (this._a === 1) {
          return `hsl(${h}, ${s}, ${l})`;
        } else {
          return `hsla(${h}, ${s}, ${l}, ${this._roundA})`;
        }
      }

      toHex(allow3Char) {
        return this.rgbToHex(this._r, this._g, this._b, allow3Char);
      }

      toHexString(allow3Char) {
        return `#${this.toHex(allow3Char)}`;
      }

      toHex8() {
        return this.rgbaToHex(this._r, this._g, this._b, this._a);
      }

      toHex8String() {
        return `#${this.toHex8()}`;
      }

      toRgb() {
        // fix to make them below 255
        let b;
        let c_r = Math.round(this._r);
        let c_g = Math.round(this._g);
        const c_b = Math.round(this._b);
        if (c_r > 255) {
          c_r = 255;
        }
        if (c_g > 255) {
          c_g = 255;
        }
        if (c_b > 255) {
          c_(b = 255);
        }
        return {
          r: c_r,
          g: c_g,
          b: c_b,
          a: this._a
        };
      }

      toRgbString() {
        if (this._a === 1) {
          return `rgb(${Math.round(this._r)}, ${Math.round(this._g)}, ${Math.round(this._b)})`;
        } else {
          return `rgba(${Math.round(this._r)}, ${Math.round(this._g)}, ${Math.round(this._b)}, ${this._roundA})`;
        }
      }

      toPercentageRgb() {
        return {
          r: `${Math.round(this.bound01(this._r, 255) * 100)}%`,
          g: `${Math.round(this.bound01(this._g, 255) * 100)}%`,
          b: `${Math.round(this.bound01(this._b, 255) * 100)}%`,
          a: this._a
        };
      }

      toPercentageRgbString() {
        if (this._a === 1) {
          return `rgb(${Math.round(this.bound01(this._r, 255) * 100)}%, ${Math.round(this.bound01(this._g, 255) * 100)}%, ${Math.round(this.bound01(this._b, 255) * 100)}%)`;
        } else {
          return `rgba(${Math.round(this.bound01(this._r, 255) * 100)}%, ${Math.round(this.bound01(this._g, 255) * 100)}%, ${Math.round(this.bound01(this._b, 255) * 100)}%, ${this._roundA})`;
        }
      }

      toRatioRgbString() {
        if (this._a === 1) {
          return `rgb(${Math.round(this.bound01(this._r, 255))}, ${Math.round(this.bound01(this._g, 255))}, ${Math.round(this.bound01(this._b, 255))})`;
        } else {
          return `rgba(${Math.round(this.bound01(this._r, 255))}, ${Math.round(this.bound01(this._g, 255))}, ${Math.round(this.bound01(this._b, 255))}, ${this._roundA})`;
        }
      }

      toName() {
        if (this._a === 0) {
          return 'transparent';
        }
        if (this._a < 1) {
          return false;
        }
        return this.hexNames[this.rgbToHex(this._r, this._g, this._b, true)] || false;
      }

      toString(format) {
        const formatSet = !!format;
        format = format || this._format;
        let formattedString = false;
        const hasAlpha = (this._a < 1) && (this._a >= 0);
        const needsAlphaFormat = !formatSet && hasAlpha && ((format === 'hex') || (format === 'hex6') || (format === 'hex3') || (format === 'name'));
        if (needsAlphaFormat) {
          // Special case for "transparent", all other non-alpha formats
          // will return rgba when there is transparency.
          if ((format === 'name') && (this._a === 0)) {
            return this.toName();
          }
          return this.toRgbString();
        }
        if (format === 'rgb') {
          formattedString = this.toRgbString();
        }
        if (format === 'prgb') {
          formattedString = this.toPercentageRgbString();
        }
        if (format === 'rrgb') {
          formattedString = this.toRatioRgbString();
        }
        if ((format === 'hex') || (format === 'hex6')) {
          formattedString = this.toHexString();
        }
        if (format === 'hex3') {
          formattedString = this.toHexString(true);
        }
        if (format === 'hex8') {
          formattedString = this.toHex8String();
        }
        if (format === 'name') {
          formattedString = this.toName();
        }
        if (format === 'hsl') {
          formattedString = this.toHslString();
        }
        if (format === 'rhsl') {
          formattedString = this.toRatioHslString();
        }
        if (format === 'hsv') {
          formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
      }

      clone() {
        return TinyColor(this.toString());
      }

      random() {
        return this.fromRatio({
          r: Math.random(),
          g: Math.random(),
          b: Math.random()
        });
      }

      // `equals`
      // Can be called with any TinyColor input
      equals(color1, color2) {
        if (!color1 || !color2) {
          return false;
        }
        return TinyColor(color1).toRgbString() === TinyColor(color2).toRgbString();
      }
    };
    TinyColor.initClass();
    return TinyColor;
  })());
