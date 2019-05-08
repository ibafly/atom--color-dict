/** @babel */

import { CompositeDisposable } from 'atom'
import getConvert from './differentConvert'
import config from './config'

const CLEAR_SELECTION_FLAG = 'color-dict.clearSelection'

function convert (inGrammar) {
  const grammarHitsXxss = getConvert.getXxssGrammarRules(inGrammar)
  const editor = atom.workspace.getActiveTextEditor()
  const selections = editor.getSelectionsOrderedByBufferPosition()
  // extract ranges that visually take up more than one line
  // OR occupy a total line, from [rowNum, 0] to [rowNum+1, 0]
  // these two cases are called block
  // and block selected in .less/scss/sass will be converted to var:value pairs
  const cursors = []
  const blockRanges = []
  const inlineRanges = []

  console.log(selections);
  selections.forEach((selection, index) => {
    if (index < (selections.length - 1) && selection.intersectsWith(selections[index + 1])) {
      console.log(selection.intersectsWith(selections[index + 1]));
      selection.merge(selections[index + 1])
    }
    let range = selection.getBufferRange()
    console.log(range);
    if (range.start.row === range.end.row &&
    (range.start.column === range.end.column |
      range.end.column === range.start.column + 1
    )) {
      cursors.push(selection.cursor)
    } else if ((range.start.row === range.end.row &&
      range.end.column > range.start.column + 1) |
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

  if (selections.length !== 0) {
    console.log(selections);
    editor.clearSelections()
    if (blockRanges.length !== 0 && grammarHitsXxss) {
      console.log(blockRanges)
      getConvert.convertToVarsPairs(blockRanges, grammarHitsXxss)
      getConvert.retrieveInSelections(inlineRanges)
    } else if (blockRanges.length !== 0 | inlineRanges.length !== 0) {
      console.log('no');
      getConvert.retrieveInSelections(blockRanges.concat(inlineRanges))
    }

    if (cursors.length !== 0) {
      console.log(cursors);
      getConvert.retrieveOnCursors(cursors)
    }
  } else {
    atom.notifications.addInfo('No color name or value found')
  }

  if (atom.config.get(CLEAR_SELECTION_FLAG)) {
    editor.clearSelections()
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
