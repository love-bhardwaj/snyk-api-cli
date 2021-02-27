import { run, expectOrgIdErr, expectEndpointErr, expectOrgNotFound } from '../../utils';
import { DEPENDENCIES_API_ENDPOINTS } from '../../../src/enums/enums';

describe('PROCESS: Test dependencies API', () => {
  describe('Endpoint validation test', () => {
    it('Should print error to console for not a valid endpoint', () => {
      const res = run('process -a=dependencies -e=something-invalid');
      expectEndpointErr(res);
    });
  });

  describe('List all dependencies', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=dependencies -e=${DEPENDENCIES_API_ENDPOINTS.LIST_ALL_DEPENDENCIES}`);
      expectOrgIdErr(res);
    });

    it('Should return the results from the API', () => {
      const res = run(`process -a=dependencies -e=${DEPENDENCIES_API_ENDPOINTS.LIST_ALL_DEPENDENCIES} --org-id=test`);
      expectOrgNotFound(res);
    });
  });
});
