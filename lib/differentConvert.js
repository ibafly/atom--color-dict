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

function setTextInBufferRange (range, text) {
  const editor = atom.workspace.getActiveTextEditor()
  editor.setTextInBufferRange(range, text)
}

function convertToVarsPairs (blockRanges, grammarRules) {
  blockRanges.forEach((block) => {
    let convertedLines = ''
    const regex = /[^\r\n]+/g
    let linesArray
    while ((linesArray = regex.exec(block.content)) !== null) {
      let oneLine = linesArray[0]
      let hexesOrLine = utils.getHexesInAHexesOnlyLine(oneLine)
      if (Array.isArray(hexesOrLine)) {
        hexesOrLine.forEach((hex) => {
          convertedLines += utils.convertHexToText(hex, grammarRules)
        })
      } else {
        convertedLines += `${hexesOrLine}\n`
      }
    }
    delete block.content
    console.log(block);
    console.log(convertedLines);
    setTextInBufferRange(block, convertedLines)
  })
}

function retrieveInSelections () {

}

function retrieveOnCursors () {

}
module.exports = {
  getXxssGrammarRules,
  convertToVarsPairs,
  retrieveInSelections,
  retrieveOnCursors
}
