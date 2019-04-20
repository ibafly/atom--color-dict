/* eslint-env mocha */

import colorDict from '../lib/color-dict'
import chai from 'chai'

chai.should()
// chai.use(require('chai-things'))

describe('unit test', function() {
  it('#HEX to color name', function() {
    (colorDict.getOutput('#2299dd')).should.be.equal('Home World');
  });
});
