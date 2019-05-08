/** @babel */

import utils from './utils'

function getXxssGrammarRules (grammar) {
  const rules = { prefix: '', withSemicolon: ';' }
  switch (grammar) {
    case 'source.less':
      rules.prefix = '@'
      break
    case 'source.css.scss':
      rules.prefix = '$'
      break
    case 'source.sass':
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

function retrieveInSelections (ranges, option = 'reverse') {
  const editor = atom.workspace.getActiveTextEditor()
  const RE = new RegExp(/#([0-9a-f]{6}|[0-9a-f]{3})/, 'g')
  const REG = new RegExp(/cc([\-_]|[0-9a-zA-Z])+(?!=[A-Za-z0-9])/, 'g')
  let match
  ranges.forEach(range => {
    for (let i = range.start.row; i <= range.end.row; i++) {
      while ((match = RE.exec(range.content)) !== null) {
        let startColumn = range.start.column + RE.lastIndex - match[0].length
        let endColumn = range.start.column + RE.lastIndex
        editor.addSelectionForBufferRange([[i, startColumn], [i, endColumn]])
      }
      while ((match = REG.exec(range.content)) !== null) {
        let startColumn = range.start.column + REG.lastIndex - match[0].length
        let endColumn = range.start.column + REG.lastIndex
        editor.addSelectionForBufferRange([[i, startColumn], [i, endColumn]])
      }
    }
  })
  editor.mutateSelectedText((selection, index) => {
    let unknown = selection.getText()
    let output
    if (unknown.match(RE)) {
      output = utils.convertHexToText(unknown)
      output ? selection.insertText(output) : selection.clear()
    } else {
      output = utils.dictSymbolToHex(unknown)
      output ? selection.insertText(output) : selection.clear()
    }
  })
}

function retrieveOnCursors (cursors, indicator) {
  const editor = atom.workspace.getActiveTextEditor()
  const RE = new RegExp(/#([0-9a-f]{6}|[0-9a-f]{3}(?!=.))/, 'g')
  const REG = new RegExp(/cc([\-_]|[0-9a-zA-Z])+(?!=[A-Za-z0-9])/, 'g')
  cursors.forEach(cursor => {
    let hexRange = cursor.getCurrentWordBufferRange({ wordRegex: RE })
    let symbolRange = cursor.getCurrentWordBufferRange({ wordRegex: REG })
    if (hexRange.start.column !== hexRange.end.column) {
      editor.addSelectionForBufferRange(hexRange)
    } else if (symbolRange.start.column !== symbolRange.end.column) {
      editor.addSelectionForBufferRange(symbolRange)
    }
  })

  editor.mutateSelectedText((selection, index) => {
    let unknown = selection.getText()
    let output
    if (unknown.match(RE)) {
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
