import { expect } from 'chai';
import { run, isValidJSON } from '../../utils';
import {
  OrgIdError,
  IntegrationTypeError,
  IntegrationIdError,
  FilePathError,
  JobIdError,
  GroupIdError,
} from '../../../src/lib/errors/errors';
import { GROUPS_API_ENDPOINTS } from '../../../src/lib/enums/enums';

const orgNotFoundErrString = 'Org test was not found or you may not have the correct permissions to access the org.';
const endpointErrString = 'The --endpoint or -e value passed is not acceptable';
const eontError = 'no such file or directory';
const orgIdError = new OrgIdError();
const integIdError = new IntegrationIdError();
const filePathError = new FilePathError();
const integTypeError = new IntegrationTypeError();
const jobIdError = new JobIdError();
const groupIdError = new GroupIdError();
const groupSettingRes = 'sessionLength';
const groupIdErrResString = 'group public id is not a uuid';

describe('PROCESS: Test groups API related commands', () => {
  describe('Invalid endpoint test:', () => {
    it('Should print error for endpoint not valid', () => {
      const res = run('process -a=groups -e=test');
      expect(res).to.have.string(endpointErrString);
    });
  });

  describe('View group settings', () => {
    it('Should print error if group ID not found', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.VIEW_GROUP_SETTINGS}`);
      expect(res).to.have.string(groupIdError.message);
    });

    it('Should return results from the API', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.VIEW_GROUP_SETTINGS} --group-id=test`);
      expect(res).to.have.string(groupSettingRes);
    });
  });

  describe('Update group settings', () => {
    it('Should print error if group ID not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.UPDATE_GROUP_SETTINGS}`);
      expect(res).to.have.string(groupIdError.message);
    });
    it('Should throw error if file path not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.UPDATE_GROUP_SETTINGS} --group-id=test`);
      expect(res).to.have.string(filePathError.message);
    });
    it('Should throw error if file not found', () => {
      const res = run(
        `process -a=groups -e=${GROUPS_API_ENDPOINTS.UPDATE_GROUP_SETTINGS} --group-id=test --file=./test/something.json`,
      );
      expect(res).to.have.string(eontError);
    });
    it('Should return the result from the API', () => {
      const res = run(
        `process -a=groups -e=${GROUPS_API_ENDPOINTS.UPDATE_GROUP_SETTINGS} --group-id=test --file=./test/json/groups/updateGroupSettings.json`,
      );
      expect(res).to.have.string(groupSettingRes);
    });
  });

  describe('List all group members', () => {
    it('Should print error if group ID not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.LIST_ALL_GROUP_MEMBERS}`);
      expect(res).to.have.string(groupIdError.message);
    });
    it('Should return the results from API', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.LIST_ALL_GROUP_MEMBERS} --group-id=test`);
      //   console.log('Res: ', res);
    });
  });

  describe('Add member to group org', () => {
    it('Should print error if group ID not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.ADD_MEMBER_TO_ORG}`);
      expect(res).to.have.string(groupIdError.message);
    });
    it('Should print error if org ID not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.ADD_MEMBER_TO_ORG} --group-id=test`);
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should print error if file path not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.ADD_MEMBER_TO_ORG} --group-id=test --org-id=test`);
      expect(res).to.have.string(filePathError.message);
    });
    it('Should print error if file not found', () => {
      const res = run(
        `process -a=groups -e=${GROUPS_API_ENDPOINTS.ADD_MEMBER_TO_ORG} --group-id=test --org-id=test --file=./test/json/something.json`,
      );
      expect(res).to.have.string(eontError);
    });
    it('Should return results from API', () => {
      const res = run(
        `process -a=groups -e=${GROUPS_API_ENDPOINTS.ADD_MEMBER_TO_ORG} --group-id=test --org-id=test --file=./test/json/groups/addMemberToOrg.json`,
      );
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('List all group tags', () => {
    it('Should print error if group ID not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.LIST_ALL_GROUP_TAGS}`);
      expect(res).to.have.string(groupIdError.message);
    });
    it('Should return the results from the API', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.LIST_ALL_GROUP_TAGS} --group-id=test`);
      console.log('Results: ', res);
      expect(res).to.have.string(groupIdErrResString);
    });
  });

  describe('Delete tag from group', () => {
    it('Should print error if group ID not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.DELETE_TAG_FROM_GROUP}`);
      expect(res).to.have.string(groupIdError.message);
    });
    it('Should print error if file path not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.DELETE_TAG_FROM_GROUP} --group-id=test`);
      expect(res).to.have.string(filePathError.message);
    });
    it('Should print error if file not found', () => {
      const res = run(
        `process -a=groups -e=${GROUPS_API_ENDPOINTS.DELETE_TAG_FROM_GROUP} --group-id=test --file=somethig.json`,
      );
      expect(res).to.have.string(eontError);
    });
    it('Should return results from API', () => {
      const res = run(
        `process -a=groups -e=${GROUPS_API_ENDPOINTS.DELETE_TAG_FROM_GROUP} --group-id=test --file=./test/json/groups/deleteTagFromGroup.json`,
      );
      expect(res).to.have.string(groupIdErrResString);
    });
  });
});
