import { expect } from 'chai';
import readJsonFile from '../../src/lib/utils/readJsonFile';

describe('UNIT: Test read json file function', () => {
  it('Should throw error for file not found', () => {
    try {
      const res = readJsonFile('./test/groups/addMemberToOrg.json');
      expect(res).to.not.exist;
    } catch (error) {
      expect(error.code).to.have.string('ENOENT');
    }
  });

  it('Should throw error for invalid JSON', () => {
    try {
      const res = readJsonFile('./test/json/unit/invalidJson.txt');
      expect(res).to.not.exist;
    } catch (error) {
      expect(error.message).to.have.string('Unexpected token');
    }
  });

  it('Should return the content of JSON file', () => {
    const res = readJsonFile('./test/json/unit/validJson.json');
    expect(res['package-name']).to.be.eql('snyk-api');
  });
});
