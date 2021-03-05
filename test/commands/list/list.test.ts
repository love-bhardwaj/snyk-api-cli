import { run } from '../../utils';
import { expect } from 'chai';
import {
  API_SELECTION,
  GENERAL_API_ENDPOINTS,
  GROUPS_API_ENDPOINTS,
  INTEGRATIONS_ENDPOINTS,
  ORGS_API_ENDPOINTS,
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
  });
});
