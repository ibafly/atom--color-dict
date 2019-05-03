/* eslint-env mocha */

import utils from '../lib/utils'
import { convertToVarsPairs,
  retrieveInSelections,
  retrieveOnCursors
} from '../lib/differentConvert'

import chai from 'chai'
chai.should()
// chai.use(require('chai-things'))

describe('unit test', function () {
  it('#HEX to color name', function () {
    convertToVarsPairs('#2299dd').should.eql('Home World')
  })
  it('match a #HEX array in a hexes-only line', function () {
    const line = '   #2299dd  #2299dd#dd9922#29d '

    utils.getHexesInAHexesOnlyLine(line).should.eql(['#2299dd', '#2299dd', '#dd9922', '#29d'])
  })
})
