import { run, isValidJSON, expectFilePathErr, expectEontErr, expectOrgNotFound } from '../../utils';
import { MONITOR_API_ENDPOINTS } from '../../../src/enums/enums';
import { expect } from 'chai';

describe('PROCESS: Test monitor API commands', () => {
  describe('Monitor dep graph', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=monitor -e=${MONITOR_API_ENDPOINTS.MONITOR_DEP_GRAPH}`);
      expectFilePathErr(res);
    });
    it('Should print error for file not found', () => {
      const res = run(`process -a=monitor -e=${MONITOR_API_ENDPOINTS.MONITOR_DEP_GRAPH} --file=test.json`);
      expectEontErr(res);
    });
    it('Should return result from API', () => {
      const res = run(
        `process -a=monitor -e=${MONITOR_API_ENDPOINTS.MONITOR_DEP_GRAPH} --file=./test/json/monitor/depGraph.json --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });
});
