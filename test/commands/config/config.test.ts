import { expect } from 'chai';
import { run } from '../../utils';

describe('CONFIG: command testing', () => {
  it('Should return error if not token passed', () => {
    const res = run('config --auth-token');
    expect(res).to.have.string('Invalid args passed');
  });
});
