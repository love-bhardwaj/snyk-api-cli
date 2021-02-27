import { expect } from 'chai';
import {
  run,
  isValidJSON,
  expectFilePathErr,
  expectOrgIdErr,
  expectEontErr,
  expectOrgNotFound,
  expectEndpointErr,
} from '../../utils';
import { OrgIdError, FilePathError, UserIdError } from '../../../src/errors/errors';
import { ORGS_API_ENDPOINTS } from '../../../src/enums/enums';

const orgNotFoundErrString = 'Org test was not found or you may not have the correct permissions to access the org.';
const endpointErrString = 'The --endpoint or -e value passed is not acceptable';
const eontError = 'no such file or directory';
const orgIdError = new OrgIdError();
const filePathError = new FilePathError();
const userIdError = new UserIdError();

describe('PROCESS: Test organizations API related commands', () => {
  describe('Invalid endpoint test', () => {
    it('Should print error for endpoint not valid', () => {
      const res = run(`process -a=orgs -e=something-invalid`);
      expectEndpointErr(res);
    });
  });

  describe('List user orgs', () => {
    it('Should return the results from the API', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.LIST_USER_ORGS}`);
      expect(isValidJSON(res)).to.true;
    });
  });

  describe('Create a new org', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.CREATE_NEW_ORG}`);
      expectFilePathErr(res);
    });
    it('Should print error for file note found', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.CREATE_NEW_ORG} --file=test.json`);
      expectEontErr(res);
    });
    it('Should return the result from the API', () => {
      const res = run(
        `process -a=orgs -e=${ORGS_API_ENDPOINTS.CREATE_NEW_ORG} --file=./test/json/organizations/createOrg.json`,
      );
      expect(isValidJSON(res)).to.be.true;
    });
  });

  describe('Get org notification settings', () => {
    it('Should return error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS}`);
      expectOrgIdErr(res);
    });

    it('Should return result from the API', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS} -o=test`);
      expectOrgNotFound(res);
    });
  });

  describe('Set org notification settings', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.SET_ORG_NOTI_SETTINGS}`);
      expectOrgIdErr(res);
    });
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.SET_ORG_NOTI_SETTINGS} -o=test`);
      expectFilePathErr(res);
    });
    it('Should print error for file not found', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.SET_ORG_NOTI_SETTINGS} -o=test --file=test.json`);
      expectEontErr(res);
    });
    it('Should return the result from the API', () => {
      const res = run(
        `process -a=orgs -e=${ORGS_API_ENDPOINTS.SET_ORG_NOTI_SETTINGS} -o=test --file=./test/json/organizations/setOrgNotiSettings.json`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Invite user to org', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.INVITE_USER}`);
      expectOrgIdErr(res);
    });
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.INVITE_USER} -o=test`);
      expectFilePathErr(res);
    });
    it('Should print error for file not found', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.INVITE_USER} -o=test --file=test.json`);
      expectEontErr(res);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=orgs -e=${ORGS_API_ENDPOINTS.INVITE_USER} -o=test --file=./test/json/organizations/inviteUser.json`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('List org members', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.LIST_ORG_MEMBERS}`);
      expectOrgIdErr(res);
    });
    it('Should return the results from the API', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.LIST_ORG_MEMBERS} -o=test`);
      expectOrgNotFound(res);
    });
  });

  describe('View org settings', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.VIEW_ORG_SETTINGS}`);
      expectOrgIdErr(res);
    });
    it('Should return the results from the API', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.VIEW_ORG_SETTINGS} -o=test`);
      expectOrgNotFound(res);
    });
  });

  describe('Update org settings', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_ORG_SETTINGS}`);
      expectOrgIdErr(res);
    });
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_ORG_SETTINGS} -o=test`);
      expectFilePathErr(res);
    });
    it('Should print error for file not valid', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_ORG_SETTINGS} -o=test --file=test.json`);
      expectEontErr(res);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_ORG_SETTINGS} -o=test --file=./test/json/organizations/updateOrgSettings.json`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Update member role', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE}`);
      expectOrgIdErr(res);
    });
    it('Should print error for user ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE} -o=test`);
      expect(res).to.have.string(userIdError.message);
    });
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE} -o=test --user-id=test`);
      expectFilePathErr(res);
    });
    it('Should print error for file not present', () => {
      const res = run(
        `process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE} -o=test --user-id=test --file=test.json`,
      );
      expectEontErr(res);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE} -o=test --user-id=test --file=./test/json/organizations/updateMemberInOrg.json`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Remove member from org', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.REMOVE_MEMBER}`);
      expectOrgIdErr(res);
    });
    it('Should print error for user ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.REMOVE_MEMBER} -o=test`);
      expect(res).to.have.string(userIdError.message);
    });
    it('Should return the results from the API', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.REMOVE_MEMBER} -o=test --user-id=test`);
      expectOrgNotFound(res);
    });
  });

  describe('Remove org', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.REMOVE_ORG}`);
      expectOrgIdErr(res);
    });
    it('Should return the results from the API', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.REMOVE_ORG} -o=test`);
      expectOrgNotFound(res);
    });
  });
});
