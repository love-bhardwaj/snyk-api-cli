import {
  run,
  expectEndpointErr,
  expectFilePathErr,
  expectEontErr,
  expectOrgNotFound,
  expectFromArgErr,
  expectToArgErr,
} from '../../utils';
import { REPORTING_API_ENDPOINTS } from '../../../src/enums/enums';

const date = new Date();
date.setMonth(date.getMonth() - 1);
const fromDate = date.toISOString().split('T')[0];
const toDate = new Date().toISOString().split('T')[0];

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

  describe('List issues', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=reporting -e=${REPORTING_API_ENDPOINTS.LIST_ISSUES}`);
      expectFilePathErr(res);
    });

    it('Should print error for file not found', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.LIST_ISSUES} --file=test.json --from=${fromDate} --to=${toDate}`,
      );
      expectEontErr(res);
    });

    it('Should print error for from arg missing', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.LIST_ISSUES} --file=./test/json/reporting/filters.json`,
      );
      expectFromArgErr(res);
    });
    it('Should print error for to arg missing', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.LIST_ISSUES} --file=./test/json/reporting/filters.json --from=${fromDate}`,
      );
      expectToArgErr(res);
    });

    it('Should print results from the API', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.LIST_ISSUES} --file=./test/json/reporting/filters.json --from=${fromDate} --to=${toDate}`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Latest issue counts', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=reporting -e=${REPORTING_API_ENDPOINTS.LATEST_ISSUE_COUNTS}`);
      expectFilePathErr(res);
    });
    it('Should print error for no file found', () => {
      const res = run(`process -a=reporting -e=${REPORTING_API_ENDPOINTS.LATEST_ISSUE_COUNTS} --file=test.json`);
      expectEontErr(res);
    });
    it('Should return results from API', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.LATEST_ISSUE_COUNTS} --file=./test/json/reporting/filters.json`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Issue counts', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=reporting -e=${REPORTING_API_ENDPOINTS.ISSUE_COUNTS}`);
      expectFilePathErr(res);
    });

    it('Should print error for from arg missing', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.ISSUE_COUNTS} --file=./test/json/reporting/filters.json`,
      );
      expectFromArgErr(res);
    });

    it('Should print error for to arg missing', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.ISSUE_COUNTS} --file=./test/json/reporting/filters.json`,
      );
      expectToArgErr(res);
    });

    it('Should return the results from the API', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.ISSUE_COUNTS} --file=./test/json/reporting/filters.json --from=${fromDate} --to=${toDate}`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Latest project counts', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=reporting -e=${REPORTING_API_ENDPOINTS.LATEST_PROJECT_COUNTS}`);
      expectFilePathErr(res);
    });

    it('Should return the results from API', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.LATEST_PROJECT_COUNTS} --file=./test/json/reporting/filters.json`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Project counts', () => {
    it('Should print error for file not found', () => {
      const res = run(`process -a=reporting -e=${REPORTING_API_ENDPOINTS.PROJECT_COUNTS}`);
      expectFilePathErr(res);
    });
    it('Should print error for the from arg missing', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.PROJECT_COUNTS} --file=./test/json/reporting/filters.json`,
      );
      expectFromArgErr(res);
    });
    it('Should print error for the to arg missing', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.PROJECT_COUNTS} --file=./test/json/reporting/filters.json`,
      );
      expectToArgErr(res);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.PROJECT_COUNTS} --file=./test/json/reporting/filters.json --from=${fromDate} --to=${toDate}`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Test counts', () => {
    it('Should print error for file not found', () => {
      const res = run(`process -a=reporting -e=${REPORTING_API_ENDPOINTS.TEST_COUNTS}`);
      expectFilePathErr(res);
    });
    it('Should print error for the from arg missing', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.TEST_COUNTS} --file=./test/json/reporting/filters.json`,
      );
      expectFromArgErr(res);
    });
    it('Should print error for the to arg missing', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.TEST_COUNTS} --file=./test/json/reporting/filters.json`,
      );
      expectToArgErr(res);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=reporting -e=${REPORTING_API_ENDPOINTS.TEST_COUNTS} --file=./test/json/reporting/filters.json --from=${fromDate} --to=${toDate}`,
      );
      expectOrgNotFound(res);
    });
  });
});
