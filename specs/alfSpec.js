const { expect } = require('chai');
const sinon = require('sinon');

describe('alf', () => {
  let subject;

  beforeEach(() => {
    subject = require('../src/alf.js').alf;
  });

  it('is named correctly', () => {
    expect(subject.name).to.equal('Gordon Shumway');
  });

  it('is from the correct home planet', () => {
    expect(subject['home-planet']).to.equal('Melmac');
  });

  it('has correct fur color', () => {
    expect(subject['fur-color']).to.equal('Brown');
  });

  it('has specific likes', () => {
    expect(subject.likes).to.deep.equal(['cats', 'jokes', 'mischief']);
  });

  describe('when eating a cat', () => {
    describe('after 1 second', () => {
      let isAbleToCatchCat;
      let mockTimeOutter;

      beforeEach(() => {
        mockTimeOutter = sinon.stub();
        mockTimeOutter.callsFake((completionHandler) => {
          completionHandler();
        });
      });

      describe('when it is able to catch the cat', () => {
        beforeEach(() => {
          isAbleToCatchCat = true;
        });

        it('resolves the consumers promise with correct text', async () => {
          const resolvedResult = await subject.eatCat(isAbleToCatchCat, mockTimeOutter);

          expect(mockTimeOutter.args[0][1]).to.equal(1000);

          expect(resolvedResult).to.equal('Cat was eaten');
        });
      });

      describe('when it is NOT able to catch the cat', () => {
        beforeEach(() => {
          isAbleToCatchCat = false;
        });

        it('rejects the consumers promise with the correct text', async () => {
          try {
            await subject.eatCat(isAbleToCatchCat, mockTimeOutter);
          } catch (error) {
            expect(mockTimeOutter.args[0][1]).to.equal(1000);

            expect(error).to.equal('Cat got away');
          }
        });
      });
    });
  });

  describe('when getting his todo list', () => {
    let fakeAxios;
    let capturedEndpoint;
    let stubbedPromise;

    beforeEach(() => {
      fakeAxios = {
        get(endpoint) {
          capturedEndpoint = endpoint;

          return stubbedPromise;
        }
      };
    });

    it('makes an axios GET call with proper endpoint', () => {
      stubbedPromise = new Promise(((resolve) => {
        resolve();
      }));

      return subject.getTodoList(fakeAxios).then(() => {
        expect(capturedEndpoint).to.equal('https://jsonplaceholder.typicode.com/todos');
      });
    });

    describe('on resolution', () => {
      let fakeResponse;

      beforeEach(() => {
        fakeResponse = {
          data: [
            {
              id: 1,
              userId: 1,
              title: '1. Eat Cat',
              completed: true
            },
            {
              id: 2,
              userId: 2,
              title: '2. BarbraQue Cat',
              completed: false
            }
          ]
        };

        stubbedPromise = new Promise(((resolve) => {
          resolve(fakeResponse);
        }));
      });

      it('resolves with list of titles with priority', () => {
        return subject.getTodoList(fakeAxios)
          .then((response) => {
            expect(response[0].title).to.equal('1. Eat Cat');
            expect(response[0].priority).to.equal(1);
            expect(response[0].id).to.be.undefined;
            expect(response[0].userId).to.be.undefined;
            expect(response[0].completed).to.be.undefined;

            expect(response[1].title).to.equal('2. BarbraQue Cat');
            expect(response[1].priority).to.equal(1);
            expect(response[1].id).to.be.undefined;
            expect(response[1].userId).to.be.undefined;
            expect(response[1].completed).to.be.undefined;
          });
      });
    });

    describe('on rejection', () => {
      let fakeError;

      beforeEach(() => {
        fakeError = { code: 'I am Error!' };

        stubbedPromise = new Promise(((reject) => {
          reject(fakeError);
        }));
      });

      it('bubbles up the axios error of todos', () => {
        return subject.getTodoList(fakeAxios)
          .catch((error) => {
            expect(error.code).to.equal('I am Error!');
          });
      });
    });
  });
});
