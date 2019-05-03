import utils from './utils'

function getXxssGrammarRules (grammar) {
  const rules = { prefix: '', withSemicolon: 1 }
  switch (grammar) {
    case 'source.less':
      rules.prefix = '@'
      break
    case 'source.css.scss':
      rules.prefix = '$'
      break
    case 'source.sass':
      rules.prefix = '$'
      rules.withSemicolon = 0
      break
    default:
      return undefined
  }
  return rules
}

function convertToVarsPairs (blockRanges) {
  console.log(blockRanges)
  utils.getHexesInAHexsOnlyLine('#123456')
    // const selectedLinesArray = blockRanges.map(range => { range.getText().match(/[^\r\n]+/g) })
    // console.log(selectedLinesArray)
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
