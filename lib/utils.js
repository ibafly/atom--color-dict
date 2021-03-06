/** @babel */

import colorNameList from 'color-name-list'
import nearestColor from 'nearest-color'
import words from 'lodash/words'
import deburr from 'lodash/deburr'
import camelCase from 'lodash/camelCase'
import snakeCase from 'lodash/snakeCase'
import startCase from 'lodash/startCase'
import kebabCase from 'lodash/kebabCase'
import tinyColor from './tinycolor.js'

const COLOR_INDICATOR_KEY = 'color-dict.colorIndicator'
const SYMBOL_CASE_KEY = 'color-dict.symbolCase'
const VARS_VALUE_FORMAT_KEY = 'color-dict.varsValueFormat'

function matchNearestColorObj (hex) {
  const colorList = colorNameList.reduce((o, { name, hex }) =>
    Object.assign(o, { [name]: hex }), {})
  const nearest = nearestColor.from(colorList)
  const namedColor = nearest(hex)
  return namedColor
}

function convertNameToSymbol (name, indicator = atom.config.get(COLOR_INDICATOR_KEY), symbolCase = atom.config.get(SYMBOL_CASE_KEY)) {
  // const varsValueFormat = atom.config.get('color-dict.varsValueFormat');
  const nameWithIndicator = `${indicator} ${name}`
  return formatIndicatedNamesCase(nameWithIndicator, symbolCase)
}

function formatIndicatedNamesCase (text, format) {
  const regCo2 = /₂/g
  switch (format) {
    case 'camelCase':
      return camelCase(text).replace(regCo2, '2')
    case 'snake_case':
      return snakeCase(text).replace(regCo2, '2')
    case 'Start Case':
      return startCase(text)
    case 'kebab-case':
      return kebabCase(text).replace(regCo2, '2')
    default:
      return text
  }
}

function decorateSymbolToText (hex, symbol, grammarRules = null, varsValueFormat = atom.config.get(VARS_VALUE_FORMAT_KEY)) {
  const varsValue = convertHexTo(hex, varsValueFormat)
  return grammarRules ? `${grammarRules.prefix}${symbol}${grammarRules.divider}${varsValue}${grammarRules.withSemicolon}\n` : `${symbol}`
}

function convertHexTo (hex, format) {
  switch (format) {
    case 'rgb':
      return convertHexToRgb(hex)
    default: return hex
  }
}

function convertHexToRgb (hex) {
  hex = hex.replace('#', '')

  // Convert 3 digit to 6 digit
  if (hex.length === 3) {
    hex = [
      hex.slice(0, 1),
      hex.slice(0, 1),
      hex.slice(1, 2),
      hex.slice(1, 2),
      hex.slice(2, 3),
      hex.slice(2, 3)
    ].join('')
  }

  let red = parseInt(hex.substring(0, 2), 16)
  let green = parseInt(hex.substring(2, 4), 16)
  let blue = parseInt(hex.substring(4, 6), 16)

  return `rgb(${red}, ${green}, ${blue})`
}

module.exports = {
  matchHexesInAHexesOnlyLine: function (line) {
    // const regex = /(?<=^\s*(#([0-9a-f]{6}|[0-9a-f]{3})\s*)*)(#[0-9a-f]{6}|#[0-9a-f]{3})(?=(\s*(#[0-9a-f]{6}|#[0-9a-f]{3}))*\s*$)/gi
    // regex lookbehind is not supproted by js for now...
    const regex = /^(\s*#([0-9a-fA-F]{3}){1,2})+(?:\s*)$/g
    const regexHex = /#([0-9a-fA-F]{3}){1,2}/g
    const hexesOnlyLine = line.match(regex)
    return hexesOnlyLine ? hexesOnlyLine[0].match(regexHex) : line
  },

  convertHexToText: function (hex, grammarRules) {
    const colorName = matchNearestColorObj(hex).name
    const colorSymbol = convertNameToSymbol(colorName)
    return decorateSymbolToText(hex, colorSymbol, grammarRules)
  },

  matchSymbolsInOneLine: function (line, indicator = atom.config.get(COLOR_INDICATOR_KEY)) {
    let symbolsArray = []
    let matched = []
    if (indicator) {
      const SYMBOL = new RegExp(`${indicator}([\-_]|[0-9a-zA-Z])+(?!=[A-Za-z0-9])`, 'g')
      if ((symbolsArray = line.match(SYMBOL))) {
        let i = -1
        while (++i < symbolsArray.length) {
          let nameVar = symbolsArray[i]
          let index = line.indexOf(nameVar)
          let _length = nameVar.length
          matched.push({
            nameVar: nameVar,
            start: index,
            end: index + _length
          })
        }
      }
    }
    return matched
  },

  getAndSelectNewRangesBehindCursors: function (cursors, ranges, editor) {
    // editor.clearSelections()
    ranges.filter((range) => {
      for (let i = 0; i < cursors.length; i++) {
        if (range.start <= cursors[i].column && range.end >= cursors[i].column) {
          editor.addSelectionForBufferRange(range)
          return range
        }
      }
    })
  },

  dictSymbolToHex: function (symbol) {
    const reg = /[^A-Za-z0-9]/g
    const regCo2 = /₂/g
    let namesWordsArray = words(symbol)
    namesWordsArray.shift()
    namesWordsArray = namesWordsArray.join('').toLowerCase()
    let matchedItem = colorNameList.find(item => {
      return deburr(item.name).replace(regCo2, '2').replace(reg, '').toLowerCase() === namesWordsArray ? item : null
    })
    return matchedItem ? matchedItem.hex : undefined
  }
}
