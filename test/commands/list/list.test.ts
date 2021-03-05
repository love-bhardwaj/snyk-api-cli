import { run } from '../../utils';
import { expect } from 'chai';
import {
  API_SELECTION,
  AUDIT_LOGS_API_ENDPOINTS,
  DEPENDENCIES_API_ENDPOINTS,
  ENTITLEMENTS_API_ENDPOINTS,
  GENERAL_API_ENDPOINTS,
  GROUPS_API_ENDPOINTS,
  INTEGRATIONS_ENDPOINTS,
  LICENSES_API_ENDPOINTS,
  MONITOR_API_ENDPOINTS,
  ORGS_API_ENDPOINTS,
  PROJECTS_API_ENDPOINTS,
  REPORTING_API_ENDPOINTS,
  TEST_API_ENDPOINTS,
  USERS_API_ENDPOINTS,
} from '../../../src/enums/enums';

describe('LIST: Command related tests', () => {
  describe('API list tests', () => {
    it('Should return General endpoints available', () => {
      const res = run('list');
      for (const api of Object.values(API_SELECTION)) {
        expect(res).to.have.string(api);
      }
    });
  });

  describe('Endpoints list related tests', () => {
    it('Should return a table of general API endpoints', () => {
      const res = run(`list --api=${API_SELECTION.GENERAL}`);
      for (const endpoint of Object.values(GENERAL_API_ENDPOINTS)) {
        expect(res).to.have.string(endpoint);
      }
    });

    it('Should return a table of users API endpoints', () => {
      const res = run(`list --api=${API_SELECTION.USERS}`);
      for (const endpoint of Object.values(USERS_API_ENDPOINTS)) {
        expect(res).to.have.string(endpoint);
      }
    });

    it('Should return a table of groups API endpoints', () => {
      const res = run(`list --api=${API_SELECTION.GROUPS}`);
      for (const endpoint of Object.values(GROUPS_API_ENDPOINTS)) {
        expect(res).to.have.string(endpoint);
      }
    });

    it('Should return a table of orgs API endpoints', () => {
      const res = run(`list --api=${API_SELECTION.ORGS}`);
      for (const endpoint of Object.values(ORGS_API_ENDPOINTS)) {
        expect(res).to.have.string(endpoint);
      }
    });

    it('Should return a table of orgs API endpoints', () => {
      const res = run(`list --api=${API_SELECTION.INTEGRATIONS}`);
      for (const endpoint of Object.values(INTEGRATIONS_ENDPOINTS)) {
        expect(res).to.have.string(endpoint);
      }
    });

    it('Should return a table of projects API endpoints', () => {
      const res = run(`list --api=${API_SELECTION.PROJECTS}`);
      for (const endpoint of Object.values(PROJECTS_API_ENDPOINTS)) {
        expect(res).to.have.string(endpoint);
      }
    });

    it('Should return a table of dependencies API endpoints', () => {
      const res = run(`list --api=${API_SELECTION.DEPENDENCIES}`);
      for (const endpoint of Object.values(DEPENDENCIES_API_ENDPOINTS)) {
        expect(res).to.have.string(endpoint);
      }
    });

    it('Should return a table of licenses API endpoints', () => {
      const res = run(`list --api=${API_SELECTION.LICENSES}`);
      for (const endpoint of Object.values(LICENSES_API_ENDPOINTS)) {
        expect(res).to.have.string(endpoint);
      }
    });

    it('Should return a table of entitlements API endpoints', () => {
      const res = run(`list --api=${API_SELECTION.ENTITLEMENTS}`);
      for (const endpoint of Object.values(ENTITLEMENTS_API_ENDPOINTS)) {
        expect(res).to.have.string(endpoint);
      }
    });

    it('Should return a table of test API endpoints', () => {
      const res = run(`list --api=${API_SELECTION.TEST}`);
      for (const endpoint of Object.values(TEST_API_ENDPOINTS)) {
        expect(res).to.have.string(endpoint);
      }
    });

    it('Should return a table of monitor API endpoints', () => {
      const res = run(`list --api=${API_SELECTION.MONITOR}`);
      for (const endpoint of Object.values(MONITOR_API_ENDPOINTS)) {
        expect(res).to.have.string(endpoint);
      }
    });

    it('Should return a table of reporting API endpoints', () => {
      const res = run(`list --api=${API_SELECTION.REPORTING}`);
      for (const endpoint of Object.values(REPORTING_API_ENDPOINTS)) {
        expect(res).to.have.string(endpoint);
      }
    });

    it('Should return a table of audit logs API endpoints', () => {
      const res = run(`list --api=${API_SELECTION.AUDIT}`);
      for (const endpoint of Object.values(AUDIT_LOGS_API_ENDPOINTS)) {
        expect(res).to.have.string(endpoint);
      }
    });
  });
});
