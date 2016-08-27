import { expect } from 'chai';
import counter from '../app/reducers/counter';

describe('reducer', () => {
  it('(0, INCREMENT) should return 1', () => {
    expect(
      counter(0, { type: 'INCREMENT' })
    ).to.be.equal(1);
  });

  it('(0, DECREMENT) should return -1', () => {
    expect(
      counter(0, { type: 'DECREMENT' })
    ).to.be.equal(-1);
  });
});
