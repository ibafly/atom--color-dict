/** @babel */

import utils from './utils'
const COLOR_INDICATOR_KEY = 'color-dict.colorIndicator'
const STYLUS_PREFIX = 'color-dict.stylusPrefix'
const GRAMMA_IN_CSS = 'color-dict.colorDefinitionSyntaxInCss'

function getXxssGrammarRules (grammar) {
  const rules = { prefix: '', withSemicolon: ';', divider: ': ' }
  switch (grammar === 'source.css' ? GRAMMA_IN_CSS : grammar) {
    case 'CSS': case 'source.css':
      rules.prefix = '--'
      break
    case 'less': case 'source.less':
      rules.prefix = '@'
      break
    case 'SCSS': case 'source.css.scss':
      rules.prefix = '$'
      break
    case 'Stylus': case 'source.css.stylus':
      rules.prefix = atom.config.get(STYLUS_PREFIX) ? '$' : ''
      rules.withSemicolon = ''
      rules.divider = ' = '
      break
    case 'Sass': case 'source.sass':
      rules.prefix = '$'
      rules.withSemicolon = ''
      break
    default:
      return undefined
  }
  return rules
}

function convertToVarsPairs (blockRanges, grammarRules) {
  blockRanges.forEach(block => {
    let convertedLines = ''
    const regex = /[^\r\n]+/g
    let linesArray
    while ((linesArray = regex.exec(block.content)) !== null) {
      let oneLine = linesArray[0]
      let hexesOrLine = utils.matchHexesInAHexesOnlyLine(oneLine)
      if (Array.isArray(hexesOrLine)) {
        hexesOrLine.forEach((hex) => {
          convertedLines += utils.convertHexToText(hex, grammarRules)
        })
      } else {
        convertedLines += `${hexesOrLine}\n`
      }
    }
    delete block.content
    const editor = atom.workspace.getActiveTextEditor()
    // editor.setTextInBufferRange(block, convertedLines)
    let blockSelection = editor.addSelectionForBufferRange(block)
    blockSelection.insertText(convertedLines)
  })
}

function retrieveInSelections (ranges, indicator = atom.config.get(COLOR_INDICATOR_KEY), option = 'reverse') {
  const editor = atom.workspace.getActiveTextEditor()
  const A_HEX_RE = new RegExp(/#([0-9a-f]{6}|[0-9a-f]{3})/, 'mg')
  const A_SYMBOL_RE = new RegExp(`${indicator}([-_]|[0-9a-zA-Z])+(?!=[A-Za-z0-9])`, 'mg')
  let match
  ranges.forEach(range => {
    let linesArrayPerRange = range.content.split('\n')
    linesArrayPerRange.forEach((line, index) => {
      let startColumn, endColumn
      while ((match = A_HEX_RE.exec(line)) !== null) {
        if (index === 0 && range.start.column !== 0) {
          startColumn = range.start.column + A_HEX_RE.lastIndex - match[0].length
          endColumn = range.start.column + A_HEX_RE.lastIndex
        } else {
          startColumn = A_HEX_RE.lastIndex - match[0].length
          endColumn = A_HEX_RE.lastIndex
        }
        let rowNum = index + range.start.row
        editor.addSelectionForBufferRange([[rowNum, startColumn], [rowNum, endColumn]])
      }
      while ((match = A_SYMBOL_RE.exec(line)) !== null) {
        if (index === 0 && range.start.column !== 0) {
          startColumn = range.start.column + A_SYMBOL_RE.lastIndex - match[0].length
          endColumn = range.start.column + A_SYMBOL_RE.lastIndex
        } else {
          startColumn = A_SYMBOL_RE.lastIndex - match[0].length
          endColumn = A_SYMBOL_RE.lastIndex
        }
        let rowNum = index + range.start.row
        editor.addSelectionForBufferRange([[rowNum, startColumn], [rowNum, endColumn]])
      }
    })
  })
  editor.mutateSelectedText((selection, index) => {
    let unknown = selection.getText()
    let output
    if (unknown.match(A_HEX_RE)) {
      output = utils.convertHexToText(unknown)
      output ? selection.insertText(output) : selection.clear()
    } else {
      output = utils.dictSymbolToHex(unknown)
      output ? selection.insertText(output) : selection.clear()
    }
  })
}

function retrieveOnCursors (cursors, indicator = atom.config.get(COLOR_INDICATOR_KEY)) {
  const editor = atom.workspace.getActiveTextEditor()
  const A_HEX_RE = new RegExp(/#([0-9a-fA-F]{3}){1,2}/, 'g')
  const A_SYMBOL_RE = new RegExp(`${indicator}([-_]|[0-9a-zA-Z])+(?!=[A-Za-z0-9])`, 'g')
  cursors.forEach(cursor => {
    let hexRange = cursor.getCurrentWordBufferRange({ wordRegex: A_HEX_RE })
    let symbolRange = cursor.getCurrentWordBufferRange({ wordRegex: A_SYMBOL_RE })
    if (hexRange.start.column !== hexRange.end.column) {
      editor.addSelectionForBufferRange(hexRange)
    } else if (symbolRange.start.column !== symbolRange.end.column) {
      editor.addSelectionForBufferRange(symbolRange)
    }
  })
  editor.mutateSelectedText((selection, index) => {
    let unknown = selection.getText()
    let output
    if (unknown.match(A_HEX_RE)) {
      output = utils.convertHexToText(unknown)
      output ? selection.insertText(output) : selection.clear()
    } else {
      output = utils.dictSymbolToHex(unknown)
      output ? selection.insertText(output) : selection.clear()
    }
  })
}

module.exports = {
  getXxssGrammarRules,
  convertToVarsPairs,
  retrieveInSelections,
  retrieveOnCursors
}
