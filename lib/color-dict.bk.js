'use babel';
const colorNameList = require('color-name-list');
const nearestColor = require('nearest-color');
const config = require('./config.json');
const tinyColor = require('./tinycolor.js');
const camelCase = require('lodash/camelCase');
const snakeCase = require('lodash/snakeCase');
const startCase = require('lodash/startCase');
const kebabCase = require('lodash/kebabCase');
const deburr = require('lodash/deburr');
const words = require('lodash/words');

export default {
  config: config,

  activate: function() {
    atom.commands.add('atom-workspace', {
      'color-dict:convert': () => this.convert()
    });
  },

  /**
   * Replace selected lines of hex codes with document appropriate variables
   * for use in css pre-processors
   */
  convert: function() {
    this.editor = atom.workspace.getActiveTextEditor();

    const selection = this.editor.getLastSelection();
    const selectionRange = selection.getBufferRange();
    const selectedLines = selection.getText();
    const selectedLinesArray = selectedLines.match(/[^\r\n]+/g);

    const clearSelection = atom.config.get('color-dict.clearSelection');
    let matches, match;

    // when there is no selection, see if a cursor is focused on editor
    if (!selectedLinesArray) {
      const cursor = this.editor.getLastCursor();
      // if no cursor then pop error
      if (!cursor) {
        atom.notifications.addError('No color found', {
          dismissable: true
        });
      }
      // match the word on cursor to see if it's a color code
      const editorView = atom.views.getView(this.editor);
      const visibleRowRange = editorView.getVisibleRowRange();
      const cursorScreenRow = cursor.getScreenRow();
      const cursorBufferRow = cursor.getBufferRow();
      const bufferLine = cursor.getCurrentBufferLine();
      const cursorColumn = cursor.getBufferColumn();

      function cursorOnOneMatch(matches) {
        let _match;
        for (let i = 0; i < matches.length; i++) {
          _match = matches[i];
          if (_match.start <= cursorColumn && _match.end >= cursorColumn) {
            return _match;
          }
        }
      };

      autoSelect = matched => {
        let autoSelection = null;
        this.editor.clearSelections();
        clearSelection ? this.editor.clearSelections():'';
        autoSelection = this.editor.addSelectionForBufferRange([
          [cursorBufferRow, matched.start],
          [cursorBufferRow, matched.end]
        ]);
        let autoSelectionRange = autoSelection.getBufferRange();

        autoSelection = {
          color: matched,
          row: cursorBufferRow
        };

        return autoSelectionRange;
      };

      if ((matches = new tinyColor().getMatch(bufferLine)) && (match = cursorOnOneMatch(matches))) {
        if (match) {

          let newInline = this.getOutput(match.color);
          this.editor.setTextInBufferRange(autoSelect(match), newInline);
          clearSelection ? this.editor.clearSelections():'';

        } else {

          autoSelection = {
            column: cursor.getBufferColumn,
            row: cursorBufferRow
          };

        }
      }

      if ((matches = this.getNameVars(bufferLine)) && (match = cursorOnOneMatch(matches))) {
        autoSelect(match);
        let newColorCode = this.getColorCode(match);
        this.editor.setTextInBufferRange(autoSelect(match), newColorCode);
        clearSelection ? this.editor.clearSelections():'';
        return;
      }
      return;
    }

    let convertedLinesArray = selectedLinesArray;
    selectedLinesArray.map((line, index) => {
      let newLine = line;

      if (this.isHex(line)) {
        newLine = this.getOutput(line);
      } else if (matches = this.getNameVars(line)) {
        newLine = this.getColorCode(matches[0]);
      }

      convertedLinesArray[index] = newLine;
    });

    let convertedLines = '';
    if (convertedLinesArray.length === 1) {
      convertedLines = `${convertedLinesArray[0]}`;
    } else {
      convertedLinesArray.map((line) => {
        convertedLines += `${line}\n`;
      });
    }

    this.editor.setTextInBufferRange(selectionRange, convertedLines);
    clearSelection ? this.editor.clearSelections():'';
  },

  /**
   * Get #HEX of the span (behind cursor) from colorNameList
   * @param  {object} span A span with it's content and position
   * @returns {string}               #HEX code
   */
  getColorCode: function(span) {
    // let reg = /['\u2019\s]/g;
    const reg = /[^A-Za-z0-9]/g;
    const regCo2 = /₂/g;
    let nameWordArray = words(span.nameVar);
    nameWordArray.shift();
    nameWordArray = nameWordArray.join('').toLowerCase();
    let matchedItem = colorNameList.find(item => {
      return deburr(item.name).replace(regCo2, '2').replace(reg, '').toLowerCase() === nameWordArray ? item : null;
    });
    return matchedItem.hex;
  },

  /**
   * Get color variables from one line
   * @param  {string} line One buffer line
   * @returns {array}      A list of span objects whose content matched color variable's pattern
   */
  getNameVars: function(line) {
    const colorIndicator = atom.config.get('color-dict.colorIndicator');
    let nameVarsArray = [];
    let matched = [];
    if (colorIndicator) {
      const INDI_VARS = new RegExp(`${colorIndicator}([\-_]|[0-9a-zA-Z])+(?!=[A-Za-z0-9])`, 'g');
      // [\w\-]+.*(?!=[\w\-])`, 'gi');
      if (nameVarsArray = line.match(INDI_VARS)) {
        let i = -1;
        while (++i < nameVarsArray.length) {
          let nameVar = nameVarsArray[i];
          let index = line.indexOf(nameVar);
          let _length = nameVar.length;
          matched.push({
            nameVar: nameVar,
            start: index,
            end: index + _length
          });
        }

        return matched;
      }
      return;
    }
  },

  /**
   * Get the line replacement output
   * @param  {string} hex A correctly formatted hex value
   * @return {string}     A complete line in the format of (prefix)(indicator)(color-name): (color) or (indicator)(color-name);
   */
  getOutput: function(hex) {
    const outputType = atom.config.get('color-dict.outputType');
    const colorIndicator = atom.config.get('color-dict.colorIndicator');
    // nearestColor need objects {name => hex} as input
    const colorList = colorNameList.reduce((o, {
      name,
      hex
    }) => Object.assign(o, {
      [name]: hex
    }), {});
    const nearest = nearestColor.from(colorList);

    // get closest named color
    // nearest('#f1c1d1'); // => Fairy Tale

    const namedColor = nearest(hex);
    const name = `${colorIndicator} ${namedColor.name}`;
    const formattedName = this.formatName(name);
    const prefix = this.getVariableSetter();

    if (this.getFiletype() === 'less' || this.getFiletype() === 'scss' || this.getFiletype() === 'sass') {
      const output = outputType === 'rgb' ? this.convertHexToRgb(hex) : hex;
      return `${prefix}${formattedName}: ${output};`;
    } else {
      return `${formattedName}`;
    }
  },

  /**
   * Format the color name to config's naming styles.
   * @param  {string} text An color name directly from color-name-list
   * @return {string}      The formatted color name with one naming style
   */
  formatName: function(text) {
    const format = atom.config.get('color-dict.format');
    const regCo2 = /₂/g;
    switch (format) {
      case 'camelCase':
        return camelCase(text).replace(regCo2, '2');
        break;
      case 'snake_case':
        return snakeCase(text).replace(regCo2, '2');
        break;
      case 'Start Case':
        return startCase(text);
        break;
      case 'kebab-case':
        return kebabCase(text).replace(regCo2, '2');
        break;
      default:
        return text;
    }

  },
  /**
   * Get the appropriate variable declaration character
   * @return {String} The variable declaration character
   */
  getVariableSetter: function() {
    if (this.getFiletype() === 'less') {
      return `@`;
    }

    if (this.getFiletype() === 'scss' || this.getFiletype() === 'sass') {
      return `$`;
    }

    return '';
  },

  /**
   * Get the file type of the current active document
   * @return {String} The file type
   */
  getFiletype: function() {
    if (!this.editor.buffer.file) {
      return '';
    }

    return this.editor.buffer.file.path.split('.').pop();
  },

  /**
   * Test if a string is a HEX colour
   * @param  {String}  string The string you want to test
   * @return {Boolean}
   */
  isHex: function(string) {
    const regex = /^#([0-9a-f]{6}|[0-9a-f]{3})$/gi;

    if (!regex.exec(string)) {
      return false;
    }

    return true;
  },

  /**
   * Convert HEX colour to RGB
   * @param  {String}  line A preformatted 3 or 6 digit hex code
   * @return {String}       The converted colour in RGB format
   */
  convertHexToRgb(hex) {
    hex = hex.replace('#', '');

    // Convert 3 digit to 6 digit
    if (hex.length === 3) {
      hex = [
        hex.slice(0, 1),
        hex.slice(0, 1),
        hex.slice(1, 2),
        hex.slice(1, 2),
        hex.slice(2, 3),
        hex.slice(2, 3)
      ].join('');
    }

    red = parseInt(hex.substring(0, 2), 16);
    green = parseInt(hex.substring(2, 4), 16);
    blue = parseInt(hex.substring(4, 6), 16);

    return `rgb(${red}, ${green}, ${blue})`;
  }
};
