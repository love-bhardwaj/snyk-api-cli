import { expect } from 'chai';
import { run } from '../../utils';

const endpointErrString = 'The --endpoint or -e value passed is not acceptable';
const apiString = 'what orgs can the current token access?';

describe('PROCESS: Test general API related commands', () => {
  describe('Invalid endpoint test:', () => {
    it('Should print error to console for not a valid endpoint', () => {
      const res = run('process -a=general -e=something-invalid');
      expect(res).to.have.string(endpointErrString);
    });

    it('Should return the results from API', () => {
      const res = run('process -a=general -e=api-docs');
      expect(res).to.have.string(apiString);
    });
  });
});
