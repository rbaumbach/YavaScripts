var expect = require('chai').expect;
var sinon = require('sinon');

describe('alf', function() {
  let alf;

  beforeEach(function() {
    subject = require('../src/alf.js').alf;
  });

  it('is named correctly', function() {
    expect(subject.name).to.equal('Gordon Shumway');
  });

  it('is from the correct home planet', function() {
    expect(subject['home-planet']).to.equal('Melmac');
  });

  it('has correct fur color', function() {
    expect(subject['fur-color']).to.equal('Brown')
  });

  it('has specific likes', function() {
    expect(subject.likes).to.deep.equal(['cats', 'jokes', 'mischief']);
  });

  describe('when eating a cat', function() {
    describe('after 1 second', function() {
      let isAbleToCatchCat;
      let mockTimeOutter;

      beforeEach(function() {
        mockTimeOutter = sinon.stub();
        mockTimeOutter.callsFake(function(completionHandler) {
          completionHandler();
        });
      });

      describe('when it is able to catch the cat', function() {
        beforeEach(function() {
          isAbleToCatchCat = true;
        });

        it('resolves the consumers promise with correct text', async function() {
          const resolvedResult = await subject.eatCat(isAbleToCatchCat, mockTimeOutter);

          console.log(mockTimeOutter.getCall(0));

          expect(mockTimeOutter.args[0][1]).to.equal(1000);

          expect(resolvedResult).to.equal('Cat was eaten');
        });
      });

      describe('when it is NOT able to catch the cat', function() {
        beforeEach(function() {
          isAbleToCatchCat = false;
        });

        it('rejects the cosumers promise with the correct text', async function() {
          try {
            await subject.eatCat(isAbleToCatchCat, mockTimeOutter);
          } catch(error) {
            expect(mockTimeOutter.args[0][1]).to.equal(1000);

            expect(error).to.equal('Cat got away');
          }
        });
      });
    });
  });
});
