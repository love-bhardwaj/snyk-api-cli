import { expectEndpointErr, expectOrgIdErr, expectOrgNotFound, run } from '../../utils';
import { LICENSES_API_ENDPOINTS } from '../../../src/enums/enums';

describe('PROCESS: Test license related API', () => {
  describe('Endpoint validation test', () => {
    it('Should print error to console for not a valid endpoint', () => {
      const res = run(`process -a=licenses -e=test`);
      expectEndpointErr(res);
    });
  });

  describe('List all licenses', () => {
    it('Should print error for org ID not found', () => {
      const res = run(`process -a=licenses -e=${LICENSES_API_ENDPOINTS.LIST_ALL_LICENSES}`);
      expectOrgIdErr(res);
    });

    it('Should return the results from the API', () => {
      const res = run(`process -a=licenses -e=${LICENSES_API_ENDPOINTS.LIST_ALL_LICENSES} --org-id=test`);
      expectOrgNotFound(res);
    });
  });
});
