import { expect } from 'chai';
import { run, isValidJSON } from '../../utils';
import {
  OrgIdError,
  IntegrationIdError,
  FilePathError,
  IntegrationTypeError,
  JobIdError,
} from '../../../src/lib/errors/errors';

const orgNotFoundErrString = 'Org test was not found or you may not have the correct permissions to access the org.';
const endpointErrString = 'The --endpoint or -e value passed is not acceptable';
const eontError = 'no such file or directory';
const orgIdError = new OrgIdError();
const integIdError = new IntegrationIdError();
const filePathError = new FilePathError();
const integTypeError = new IntegrationTypeError();
const jobIdError = new JobIdError();

describe('PROCESS: Test organizations API related commands', () => {
  describe('Invalid endpoint test', () => {
    it('Should print error for endpoint not valid', () => {
      const res = run('process -a=orgs -e=something-invalid');
      expect(res).to.have.string(endpointErrString);
    });
  });

  describe('List user orgs', () => {
    it('Should return the results from the API', () => {
      const res = run(`process -a=orgs -e=list-user-orgs`);
      expect(isValidJSON(res)).to.true;
    });
  });

  describe('Get org notification settings', () => {
    it('Should return error for org ID not provided');
    it('Should return result from the API');
  });

  describe('Set org notification settings', () => {
    it('Should print error for org ID not provided');
    it('Should print error for file path not provided');
    it('Should print error for file not found');
    it('Should return the result from the API');
  });

  describe('Invite user to org', () => {
    it('Should print error for org ID not provided');
    it('Should print error for file path not provided');
    it('Should print error for file not found');
    it('Should return the results from the API');
  });

  describe('List org members', () => {
    it('Should print error for org ID not provided');
    it('Should return the results from the API');
  });

  describe('View org settings', () => {
    it('Should print error for org ID not provided');
    it('Should return the results from the API');
  });

  describe('Update org settings', () => {
    it('Should print error for org ID not provided');
    it('Should print error for file path not provided');
    it('Should print error for file not valid');
    it('Should return the results from the API');
  });

  describe('Update member role', () => {
    it('Should print error for org ID not provided');
    it('Should print error for user ID not provided');
    it('Should print error for file path not provided');
    it('Should print error for file not present');
    it('Should return the results from the API');
  });
  describe('Remove member from org', () => {
    it('Should print error for org ID not provided');
    it('Should print error for user ID not provided');
    it('Should return the results from the API');
  });
  describe('Remove org', () => {
    it('Should print error for org ID not provided');
    it('Should return the results from the API');
  });
});
