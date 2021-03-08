import { run, expectEndpointErr, expectGroupIdErr, isValidJSON, expectOrgIdErr, expectOrgNotFound } from '../../utils';
import { AUDIT_LOGS_API_ENDPOINTS } from '../../../src/enums/enums';
import { expect } from 'chai';

const date = new Date();
date.setMonth(date.getMonth() - 1);
const fromDate = date.toISOString().split('T')[0];
const toDate = new Date().toISOString().split('T')[0];

describe('PROCESS: Test audit logs API related commands', () => {
  describe('Invalid endpoint test', () => {
    it('Should print error for endpoint not valid', () => {
      const res = run(`process -a=audit-logs -e=something-invalid`);
      expectEndpointErr(res);
    });
  });

  describe('Group level logs', () => {
    it('Should print an error for group ID not provided', () => {
      const res = run(`process -a=audit-logs -e=${AUDIT_LOGS_API_ENDPOINTS.GROUP_LEVEL_LOGS}`);
      expectGroupIdErr(res);
    });

    it('Should return the results from the API', () => {
      const res = run(
        `process -a=audit-logs -e=${AUDIT_LOGS_API_ENDPOINTS.GROUP_LEVEL_LOGS} --group-id=test --page=1 --sort-order=DESC --from=2021-02-01 --to=2021-03-01`,
      );
      expect(isValidJSON(res)).to.be.true;
    });
  });

  describe('Org level logs', () => {
    it('Should print an error for org ID not provided', () => {
      const res = run(`process -a=audit-logs -e=${AUDIT_LOGS_API_ENDPOINTS.ORG_LEVEL_LOGS}`);
      expectOrgIdErr(res);
    });

    it('Should return the results from the API', () => {
      const res = run(
        `process -a=audit-logs -e=${AUDIT_LOGS_API_ENDPOINTS.ORG_LEVEL_LOGS} --org-id=test --page=1 --sort-order=DESC --from=2021-02-01 --to=2021-03-01`,
      );
      expect(res).to.have.string('may not have the correct permissions to access the org');
    });
  });
});
