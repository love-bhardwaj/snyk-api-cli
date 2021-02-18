import { execSync } from 'child_process';
import { expect } from 'chai';

const test = (args: string) => {
  return execSync(`ts-node src/index ${args}`).toString();
};

describe('Config command testing', () => {
  it('should return the help output', async () => {
    const res = test(' --help');
    expect(res).to.have.string(`--help`);
    console.log('Res: ', res);
  });
});
