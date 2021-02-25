import { expect } from 'chai';
import { run, isValidJSON } from '../../utils';
import { OrgIdError, FilePathError, UserIdError } from '../../../src/lib/errors/errors';
import { ORGS_API_ENDPOINTS } from '../../../src/lib/enums/enums';

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
      expect(res).to.have.string(endpointErrString);
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
      expect(res).to.have.string(filePathError.message);
    });
    it('Should print error for file note found', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.CREATE_NEW_ORG} --file=test.json`);
      expect(res).to.have.string(eontError);
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
      expect(res).to.have.string(orgIdError.message);
    });

    it('Should return result from the API', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS} -o=test`);
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Set org notification settings', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.SET_ORG_NOTI_SETTINGS}`);
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.SET_ORG_NOTI_SETTINGS} -o=test`);
      expect(res).to.have.string(filePathError.message);
    });
    it('Should print error for file not found', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.SET_ORG_NOTI_SETTINGS} -o=test --file=test.json`);
      expect(res).to.have.string(eontError);
    });
    it('Should return the result from the API', () => {
      const res = run(
        `process -a=orgs -e=${ORGS_API_ENDPOINTS.SET_ORG_NOTI_SETTINGS} -o=test --file=./test/json/organizations/setOrgNotiSettings.json`,
      );
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Invite user to org', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.INVITE_USER}`);
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.INVITE_USER} -o=test`);
      expect(res).to.have.string(filePathError.message);
    });
    it('Should print error for file not found', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.INVITE_USER} -o=test --file=test.json`);
      expect(res).to.have.string(eontError);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=orgs -e=${ORGS_API_ENDPOINTS.INVITE_USER} -o=test --file=./test/json/organizations/inviteUser.json`,
      );
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('List org members', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.LIST_ORG_MEMBERS}`);
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should return the results from the API', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.LIST_ORG_MEMBERS} -o=test`);
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('View org settings', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.VIEW_ORG_SETTINGS}`);
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should return the results from the API', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.VIEW_ORG_SETTINGS} -o=test`);
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Update org settings', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_ORG_SETTINGS}`);
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_ORG_SETTINGS} -o=test`);
      expect(res).to.have.string(filePathError.message);
    });
    it('Should print error for file not valid', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_ORG_SETTINGS} -o=test --file=test.json`);
      expect(res).to.have.string(eontError);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_ORG_SETTINGS} -o=test --file=./test/json/organizations/updateOrgSettings.json`,
      );
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Update member role', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE}`);
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should print error for user ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE} -o=test`);
      expect(res).to.have.string(userIdError.message);
    });
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE} -o=test --user-id=test`);
      expect(res).to.have.string(filePathError.message);
    });
    it('Should print error for file not present', () => {
      const res = run(
        `process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE} -o=test --user-id=test --file=test.json`,
      );
      expect(res).to.have.string(eontError);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=orgs -e=${ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE} -o=test --user-id=test --file=./test/json/organizations/updateMemberInOrg.json`,
      );
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Remove member from org', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.REMOVE_MEMBER}`);
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should print error for user ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.REMOVE_MEMBER} -o=test`);
      expect(res).to.have.string(userIdError.message);
    });
    it('Should return the results from the API', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.REMOVE_MEMBER} -o=test --user-id=test`);
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Remove org', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.REMOVE_ORG}`);
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should return the results from the API', () => {
      const res = run(`process -a=orgs -e=${ORGS_API_ENDPOINTS.REMOVE_ORG} -o=test`);
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });
});
