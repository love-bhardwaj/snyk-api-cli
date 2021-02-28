import { run, expectEndpointErr, expectOrgIdErr, expectOrgNotFound, expectEntitlementErr } from '../../utils';
import { ENTITLEMENTS_API_ENDPOINTS } from '../../../src/enums/enums';

describe('PROCESS: Test entitlement related API', () => {
  describe('Endpoint validation test', () => {
    it('Should print error to console for not a valid endpoint', () => {
      const res = run(`process -a=entitlements -e=test`);
      expectEndpointErr(res);
    });
  });

  describe('List all entitlements', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process --api=entitlements -e=${ENTITLEMENTS_API_ENDPOINTS.LIST_ALL_ENTITLEMENTS}`);
      expectOrgIdErr(res);
    });

    it('Should return results from the API', () => {
      const res = run(
        `process --api=entitlements -e=${ENTITLEMENTS_API_ENDPOINTS.LIST_ALL_ENTITLEMENTS} --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Get entitlement value by entitlement key', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process --api=entitlements -e=${ENTITLEMENTS_API_ENDPOINTS.GET_ENTITLEMENT_VALUE}`);
      expectOrgIdErr(res);
    });
    it('Should print error for entitlement key not provided', () => {
      const res = run(
        `process --api=entitlements -e=${ENTITLEMENTS_API_ENDPOINTS.GET_ENTITLEMENT_VALUE} --org-id=test`,
      );
      expectEntitlementErr(res);
    });
    it('should return the results from the API', () => {
      const res = run(
        `process --api=entitlements -e=${ENTITLEMENTS_API_ENDPOINTS.GET_ENTITLEMENT_VALUE} --org-id=test --entitlement-key=licenses`,
      );
      expectOrgNotFound(res);
    });
  });
});
