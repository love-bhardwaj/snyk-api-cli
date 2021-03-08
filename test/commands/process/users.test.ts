import { expect } from 'chai';
import {
  isValidJSON,
  run,
  expectOrgNotFound,
  expectOrgIdErr,
  expectFilePathErr,
  expectUserIdErr,
  expectEndpointErr,
  expectProjectIdErr,
} from '../../utils';
import { USERS_API_ENDPOINTS } from '../../../src/enums/enums';

describe('PROCESS: Test users API related commands', () => {
  describe('Invalid endpoint test', () => {
    it('Should print error for endpoint not valid', () => {
      const res = run(`process -a=users -e=something-invalid`);
      expectEndpointErr(res);
    });
  });

  describe('Get user details', () => {
    it('Should print error if no user ID provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.GET_USER_DETAILS}`);
      expectUserIdErr(res);
    });
    it('Should return the result from API', () => {
      const res = run(
        `process -a=users -e=${USERS_API_ENDPOINTS.GET_USER_DETAILS} --user-id=1f61245f-5f5d-4282-916e-5af0bfada8a3`,
      );
      //   console.log(res); Potential API error
    });
  });

  describe('Get my details', () => {
    it('Should return the API results from client', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.GET_MY_DETAILS}`);
      expect(isValidJSON(res)).to.be.true;
    });
  });

  describe('Get org notificatin settings for user', () => {
    it('Should print error if not org ID provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS}`);
      expectOrgIdErr(res);
    });

    it('Should return the results from the API call', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS} -o=test`);
      expectOrgNotFound(res);
    });
  });

  describe('Modify org notification settings', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_ORG_NOTI_SETTINGS}`);
      expectOrgIdErr(res);
    });
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_ORG_NOTI_SETTINGS} --org-id=test`);
      expectFilePathErr(res);
    });

    it('Should return the results from the API', () => {
      const res = run(
        `process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_ORG_NOTI_SETTINGS} --org-id=test --file=./test/json/users/modifyOrgNotiSettings.json`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Get project notification settings', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.GET_PROJECT_NOTI_SETTINGS}`);
      expectOrgIdErr(res);
    });
    it('Should print error for project ID not provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.GET_PROJECT_NOTI_SETTINGS} --org-id=test`);
      expectProjectIdErr(res);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=users -e=${USERS_API_ENDPOINTS.GET_PROJECT_NOTI_SETTINGS} --org-id=test --project-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Modify project notification settings', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_PROJECT_NOTI_SETTINGS}`);
      expectOrgIdErr(res);
    });
    it('Should print error for project ID not provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_PROJECT_NOTI_SETTINGS} --org-id=test`);
      expectProjectIdErr(res);
    });
    it('Should print error for file path not provided', () => {
      const res = run(
        `process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_PROJECT_NOTI_SETTINGS} --org-id=test --project-id=test`,
      );
      expectFilePathErr(res);
    });

    it('Should return results from the API', () => {
      const res = run(
        `process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_PROJECT_NOTI_SETTINGS} --org-id=test --project-id=test --file=./test/json/users/modifyProjNotiSettings.json`,
      );
      expectOrgNotFound(res);
    });
  });
});
