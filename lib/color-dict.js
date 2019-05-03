/** @babel */

import { CompositeDisposable } from 'atom'
import getConvert from './differentConvert'
import config from './config'

const COLOR_INDICATOR_KEY = 'color-dict.colorIndicator'
const SYMBOL_CASE_KEY = 'color-dict.symbolCase'
const VARS_VALUE_FORMAT_KEY = 'color-dict.varsValueFormat'
const CLEAR_SELECTION_FLAG = 'color-dict.clearSelection'

function convert (inGrammar) {
  const grammarHitsXxss = getConvert.getXxssGrammarRules(inGrammar)
  const editor = atom.workspace.getActiveTextEditor()
  const selections = editor.getSelectionsOrderedByBufferPosition()
  // extract ranges that visually take up more than one line
  // OR occupy a total line, from [rowNum, 0] to [rowNum+1, 0]
  // these two cases are called block
  // and block selected in .less/scss/sass will be converted to var:value pairs
  const blockRanges = []
  const inlineRanges = []

  selections.forEach(selection => {
    let range = selection.getBufferRange()
    if (range.start.row === range.end.row |
      (range.end.row === range.start.row + 1 &&
        range.end.column === 0 &&
        range.start.column !== 0
      )) {
      range.content = editor.getTextInBufferRange(range)
      inlineRanges.push(range)
    } else {
      range.content = editor.getTextInBufferRange(range)
      blockRanges.push(range)
    }
  })

  const cursors = editor.getCursorBufferPositions()

  if (selections) {
    if (blockRanges && grammarHitsXxss) {
      getConvert.convertToVarsPairs(blockRanges)
      getConvert.retrieveInSelections(inlineRanges)
    } else {
      getConvert.retrieveInSelections(blockRanges.concat(inlineRanges))
    }
  } else if (cursors) {
    getConvert.retrieveOnCursors(cursors)
  } else {
    atom.notifications.addInfo('No color name or value found')
  }
}

module.exports = {
  config: config,

  activate () {
    const invoke = (here) => {
      let inGrammar = here.getModel().getGrammar().scopeName
      convert(inGrammar)
    }
    this.subscriptions = new CompositeDisposable(
      atom.commands.add('atom-text-editor', {
        'color-dict:convert': function () {
          invoke(this)
        }
      })
    )
  },

  deactivate () {
    this.subscriptions.dispose()
  }
}
