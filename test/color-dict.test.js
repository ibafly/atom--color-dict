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
//   it('#HEX to color name', function () {
//     const RangeObj1 = [{
//       content:
// `   #2299dd  #2299dd#dd9922  #29d
//     #111 #222 here comes none-hex words after a hex
//     now some before hexes #333      #444#555
//     #666 #777in between#888     #999`,
//       start: { row: 16, column: 4 },
//       end: { row: 19, column: 36 }
//     }]
//
//     convertToVarsPairs(RangeObj1, 'source.css.scss').should.equal('Home World')
//   })
  it('match a #HEX array in a hexes-only line', function () {
    const line1 = '  #2299dd  #2299dd#dd9922  #29d   '
    const line2 = '#111 #222 here comes none-hex words after a hex'
    const line3 = 'now some before hexes #333      #444#555  '
    const line4 = '#666 #777in between#888     #999'

    utils.matchHexesInAHexesOnlyLine(line1).should.eql(['#2299dd', '#2299dd', '#dd9922', '#29d'])
    utils.matchHexesInAHexesOnlyLine(line2).should.equal(line2)
    utils.matchHexesInAHexesOnlyLine(line3).should.equal(line3)
    utils.matchHexesInAHexesOnlyLine(line4).should.equal(line4)

  })
})
