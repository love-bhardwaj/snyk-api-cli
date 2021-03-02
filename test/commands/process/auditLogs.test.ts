import { run, expectEndpointErr } from '../../utils';
import { REPORTING_API_ENDPOINTS } from '../../../src/enums/enums';

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

  describe('Group level logs', () => {});
  describe('Org level logs', () => {});
});
