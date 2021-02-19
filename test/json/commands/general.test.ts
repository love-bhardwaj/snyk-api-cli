import { expect } from 'chai';
import { run } from '../utils';

describe('GENERAL: help command testing', () => {
  it('Should return the help output', () => {
    const res = run(' --help');
    expect(res).to.have.string(`--help`);
    expect(res).to.have.string('--version');
  });
});
