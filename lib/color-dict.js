/** @babel */

import { CompositeDisposable } from 'atom'
import utils from './utils'
import config from './config'

const COLOR_INDICATOR_KEY = 'color-dict.colorIndicator'
const SYMBOL_CASE_KEY = 'color-dict.symbolCase'
const VARS_VALUE_FORMAT_KEY = 'color-dict.varsValueFormat'
const CLEAR_SELECTION_FLAG = 'color-dict.clearSelection'

function convert (inGrammar) {
  const grammarHitsXxss = utils.getXxssGrammarRules(inGrammar)
  const editor = atom.workspace.getActiveTextEditor()
  const selectedRanges = editor.getSelectedBufferRanges()
  // extract ranges that visually take up more than one line
  // OR occupy a total line, from [rowNum, 0] to [rowNum+1, 0]
  // these two cases are called block
  // and block selected in .less/scss/sass will be converted to var:value pairs
  const blockRanges = []
  const inlineRanges = []

  selectedRanges.forEach(range => {
    if (range.start.row === range.end.row |
      (range.end.row === range.start.row + 1 &&
        range.end.column === 0 &&
        range.start.column !== 0
      )) {
      inlineRanges.push(range)
    } else {
      blockRanges.push(range.start)
    }
  })

  const cursors = editor.getCursorBufferPositions()

  if (selectedRanges) {
    if (blockRanges && grammarHitsXxss) {
      utils.convertToVarsPairs(blockRanges)
      utils.retrieveInSelections(inlineRanges)
    } else {
      utils.retrieveInSelections(selectedRanges)
    }
  } else if (cursors) {
    utils.retrieveOnCursors(cursors)
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
