import { run, expectEndpointErr, expectFilePathErr, expectEontErr, expectOrgNotFound } from '../../utils';
import { REPORTING_API_ENDPOINTS } from '../../../src/enums/enums';

describe('PROCESS: Test reporting API related commands', () => {
  describe('Invalid endpoint test', () => {
    it('Should print error for endpoint not valid', () => {
      const res = run(`process -a=reporting -e=something-invalid`);
      expectEndpointErr(res);
    });
  });

  describe('List of latest issues', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=reporting -e=${REPORTING_API_ENDPOINTS.LIST_LATEST_ISSUES}`);
      expectFilePathErr(res);
    });
    it('Should print error for file not found', () => {
      const res = run(`process -a=reporting -e=${REPORTING_API_ENDPOINTS.LIST_LATEST_ISSUES} --file=test.json`);
      expectEontErr(res);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.LIST_LATEST_ISSUES} --file=./test/json/reporting/filters.json`,
      );
      expectOrgNotFound(res);
    });
  });
});
