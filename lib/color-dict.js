/** @babel */

import { CompositeDisposable } from 'atom'
// import utils from './utils'
import config from './config'

const COLOR_INDICATOR_KEY = 'color-dict.colorIndicator'
const SYMBOL_CASE_KEY = 'color-dict.symbolCase'
const VARS_VALUE_FORMAT_KEY = 'color-dict.varsValueFormat'
const CLEAR_SELECTION_FLAG = 'color-dict.clearSelection'

module.exports = {
  config: config
  activate () {
    this.subscriptions = new CompositeDisposable(
      atom.commands.add('atom-text-editor', {
        'color-dict:convert': () => {
          atom.notifications.addInfo('ok is ok', {
            dismissable: true
          })
        }
      })
    )
  },

  deactivate () {
    this.subscriptions.dispose()
  }
}
