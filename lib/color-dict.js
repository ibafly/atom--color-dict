'use babel';

const colorNameList = require('color-name-list');
const nearestColor = require('nearest-color');
const config = require('./config.json');
const tinyColor = require('./tinycolor.js');
const camelCase = require('lodash/camelCase');
const snakeCase = require('lodash/snakeCase');
const startCase = require('lodash/startCase');
const kebabCase = require('lodash/kebabCase');

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

    // when there is no selection, see if a cursor is focused
    if (!selectedLinesArray) {
      const cursor = this.editor.getLastCursor();
      // if no cursor then pop error
      if (!cursor) {
        atom.notifications.addError('No color found', {
          dismissable: true
        })
      };
      // match the word on cursor to see if it's a color code
      const editorView = atom.views.getView(this.editor);
      const visibleRowRange = editorView.getVisibleRowRange();
      const cursorScreenRow = cursor.getScreenRow();
      const cursorBufferRow = cursor.getBufferRow();
      const bufferLine = cursor.getCurrentBufferLine();
      const matches = new tinyColor().getMatch(bufferLine);
      const cursorColumn = cursor.getBufferColumn();

      let match = (function() {
        let _match;
        for (let i = 0; i < matches.length; i++) {
          _match = matches[i]
          if (_match.start <= cursorColumn && _match.end >= cursorColumn) {
            return _match;
          }
        }
      })();

      if (match) {
        let autoSelection = null;
        this.editor.clearSelections();
        let autoSelection = this.editor.addSelectionForBufferRange([
          [cursorBufferRow, match.start],
          [cursorBufferRow, match.end]
        ]);
        let autoSelectionRange = autoSelection.getBufferRange();

        autoSelection = {
          color: match,
          row: cursorBufferRow
        };

        let newInline = this.getOutput(match.color);

        this.editor.setTextInBufferRange(autoSelectionRange, newInline);

        return;
      } else {

        autoSelection = {
          column: cursor.getBufferColumn,
          row: cursorBufferRow
        };

        return;
      }
    };

    let convertedLinesArray = selectedLinesArray;
    selectedLinesArray.map((line, index) => {
      let newLine = line;

      if (this.isHex(line)) {
        newLine = this.getOutput(line);
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
    const inputColor = colorNameList.reduce((o, {
      name,
      hex
    }) => Object.assign(o, {
      [name]: hex
    }), {});
    const nearest = nearestColor.from(inputColor);

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
      return `${formattedName}`
    }
  },

  /**
   * Format the color name to config's naming styles.
   * @param  {string} text An color name directly from color-name-list
   * @return {string}      The formatted color name with one naming style
   */
  formatName: function(text) {
    const format = atom.config.get('color-dict.format');

    switch (format) {
      case 'camelCase':
        return camelCase(text);
        break;
      case 'snake_case':
        return snakeCase(text);
        break;
      case 'Start Case':
        return startCase(text);
        break;
      case 'kebab-case':
        return kebabCase(text);
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
