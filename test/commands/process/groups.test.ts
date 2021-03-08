import { expect } from 'chai';
import {
  run,
  expectEndpointErr,
  expectGroupIdErr,
  expectOrgIdErr,
  expectFilePathErr,
} from '../../utils';
import { GROUPS_API_ENDPOINTS } from '../../../src/enums/enums';

const orgNotFoundErrString = 'Org test was not found or you may not have the correct permissions to access the org.';
const groupSettingRes = 'sessionLength';
const groupIdErrResString = 'group public id is not a uuid';

describe('PROCESS: Test groups API related commands', () => {
  describe('Invalid endpoint test:', () => {
    it('Should print error for endpoint not valid', () => {
      const res = run('process -a=groups -e=test');
      expectEndpointErr(res);
    });
  });

  describe('View group settings', () => {
    it('Should print error if group ID not found', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.VIEW_GROUP_SETTINGS}`);
      expectGroupIdErr(res);
    });

    it('Should return results from the API', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.VIEW_GROUP_SETTINGS} --group-id=test`);
      expect(res).to.have.string(groupSettingRes);
    });
  });

  describe('Update group settings', () => {
    it('Should print error if group ID not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.UPDATE_GROUP_SETTINGS}`);
      expectGroupIdErr(res);
    });
    it('Should throw error if file path not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.UPDATE_GROUP_SETTINGS} --group-id=test`);
      expectFilePathErr(res);
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
      expectGroupIdErr(res);
    });
    it('Should return the results from API', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.LIST_ALL_GROUP_MEMBERS} --group-id=test`);
      //   console.log('Res: ', res);
    });
  });

  describe('Add member to group org', () => {
    it('Should print error if group ID not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.ADD_MEMBER_TO_ORG}`);
      expectGroupIdErr(res);
    });
    it('Should print error if org ID not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.ADD_MEMBER_TO_ORG} --group-id=test`);
      expectOrgIdErr(res);
    });
    it('Should print error if file path not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.ADD_MEMBER_TO_ORG} --group-id=test --org-id=test`);
      expectFilePathErr(res);
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
      expectGroupIdErr(res);
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
      expectGroupIdErr(res);
    });
    it('Should print error if file path not provided', () => {
      const res = run(`process -a=groups -e=${GROUPS_API_ENDPOINTS.DELETE_TAG_FROM_GROUP} --group-id=test`);
      expectFilePathErr(res);
    });
    it('Should return results from API', () => {
      const res = run(
        `process -a=groups -e=${GROUPS_API_ENDPOINTS.DELETE_TAG_FROM_GROUP} --group-id=test --file=./test/json/groups/deleteTagFromGroup.json`,
      );
      expect(res).to.have.string(groupIdErrResString);
    });
  });
});
