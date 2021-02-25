import { expect } from 'chai';
import { isValidJSON, run } from '../../utils';
import { USERS_API_ENDPOINTS } from '../../../src/lib/enums/enums';
import { OrgIdError, FilePathError, UserIdError, ProjectIdError } from '../../../src/lib/errors/errors';

const orgNotFoundErrString = 'Org test was not found or you may not have the correct permissions to access the org.';
const endpointErrString = 'The --endpoint or -e value passed is not acceptable';
const eontError = 'no such file or directory';
const orgIdError = new OrgIdError();
const filePathError = new FilePathError();
const userIdError = new UserIdError();
const projectIdError = new ProjectIdError();

describe('PROCESS: Test users API related commands', () => {
  describe('Invalid endpoint test', () => {
    it('Should print error for endpoint not valid', () => {
      const res = run(`process -a=users -e=something-invalid`);
      expect(res).to.have.string(endpointErrString);
    });
  });

  describe('Get user details', () => {
    it('Should print error if no user ID provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.GET_USER_DETAILS}`);
      expect(res).to.have.string(userIdError.message);
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
      expect(res).to.have.string(orgIdError.message);
    });

    it('Should return the results from the API call', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS} -o=test`);
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Modify org notification settings', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_ORG_NOTI_SETTINGS}`);
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_ORG_NOTI_SETTINGS} --org-id=test`);
      expect(res).to.have.string(filePathError.message);
    });
    it('Should print error when file not found', () => {
      const res = run(
        `process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_ORG_NOTI_SETTINGS} --org-id=test --file=test.json`,
      );
      expect(res).to.have.string(eontError);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_ORG_NOTI_SETTINGS} --org-id=test --file=./test/json/users/modifyOrgNotiSettings.json`,
      );
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Get project notification settings', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.GET_PROJECT_NOTI_SETTINGS}`);
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should print error for project ID not provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.GET_PROJECT_NOTI_SETTINGS} --org-id=test`);
      expect(res).to.have.string(projectIdError.message);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=users -e=${USERS_API_ENDPOINTS.GET_PROJECT_NOTI_SETTINGS} --org-id=test --project-id=test`,
      );
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Modify project notification settings', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_PROJECT_NOTI_SETTINGS}`);
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should print error for project ID not provided', () => {
      const res = run(`process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_PROJECT_NOTI_SETTINGS} --org-id=test`);
      expect(res).to.have.string(projectIdError.message);
    });
    it('Should print error for file path not provided', () => {
      const res = run(
        `process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_PROJECT_NOTI_SETTINGS} --org-id=test --project-id=test`,
      );
      expect(res).to.have.string(filePathError.message);
    });
    it('Should print error for file does not exist', () => {
      const res = run(
        `process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_PROJECT_NOTI_SETTINGS} --org-id=test --project-id=test --file=test.json`,
      );
      expect(res).to.have.string(eontError);
    });
    it('Should return results from the API', () => {
      const res = run(
        `process -a=users -e=${USERS_API_ENDPOINTS.MODIFY_PROJECT_NOTI_SETTINGS} --org-id=test --project-id=test --file=./test/json/users/modifyProjNotiSettings.json`,
      );
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });
});
