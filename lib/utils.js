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

function convertToVarsPairs () {

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
