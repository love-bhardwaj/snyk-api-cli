import { expect } from 'chai';
import { run } from '../../utils';
import {
  FilePathError,
  IntegrationIdError,
  IntegrationTypeError,
  JobIdError,
  OrgIdError,
} from '../../../src/errors/errors';

const orgNotFoundErrString = 'Org test was not found or you may not have the correct permissions to access the org.';
const endpointErrString = 'The --endpoint or -e value passed is not acceptable';
const eontError = 'no such file or directory';
const orgIdError = new OrgIdError();
const integIdError = new IntegrationIdError();
const filePathError = new FilePathError();
const integTypeError = new IntegrationTypeError();
const jobIdError = new JobIdError();

describe('PROCESS: Test integration API related commands', () => {
  describe('Invalid endpoint test:', () => {
    it('Should print error for endpoint not valid', () => {
      const res = run('process -a=integrations -e=something-invalid');
      expect(res).to.have.string(endpointErrString);
    });
  });

  describe('List integrations endpoint:', () => {
    it('Should print error to console if no --org-id or -o', () => {
      const res = run('process -a=integrations -e=list-integrations');
      expect(res).to.have.string(orgIdError.message);
    });

    it('Should call the API endpoint', () => {
      const res = run('process -a=integrations -e=list-integrations -o=test');
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Add new integration endpoint:', () => {
    it('Should print error to console if no --org-id or -o', () => {
      const res = run('process -a=integrations -e=add-new-integration');
      expect(res).to.have.string(orgIdError.message);
    });

    it('Should print error to console if no file path provided --file or -f', () => {
      const res = run('process -a=integrations -e=add-new-integration -o=test');
      expect(res).to.have.string(filePathError.message);
    });

    it('Should print error if file path is not valid', () => {
      const res = run('process -a=integrations -e=add-new-integration -o=test -f=./test/something');
      expect(res).to.have.string(eontError);
    });

    it('Should call the API endpoint and return results', () => {
      const res = run(
        'process -a=integrations -e=add-new-integration -o=test -f=./test/json/integrations/addNewIntegration.json',
      );
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Update existing integration', () => {
    it('Should print error to console if no --org-id or -o', () => {
      const res = run('process -a=integrations -e=update-existing-integration');
      expect(res).to.have.string(orgIdError.message);
    });

    it('Should pritn error for no integration ID argument', () => {
      const res = run('process -a=integrations -e=update-existing-integration -o=test');
      expect(res).to.have.string(integIdError.message);
    });

    it('Should print error to console if no file path provided --file or -f', () => {
      const res = run('process -a=integrations -e=update-existing-integration -o=test --integration-id=test');
      expect(res).to.have.string(filePathError.message);
    });

    it('Should call API and return the org error', () => {
      const res = run(
        'process -a=integrations -e=update-existing-integration -o=test --integration-id=test -f=./test/json/integrations/updateExistingIntegration.json',
      );
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Delete integration credentials', () => {
    it('Should print error if not org ID arg provided', () => {
      const res = run('process -a=integrations -e=delete-credentials');
      expect(res).to.have.string(orgIdError.message);
    });

    it('Should print error if not integ ID provided', () => {
      const res = run('process -a=integrations -e=delete-credentials -o=test');
      expect(res).to.have.string(integIdError.message);
    });

    it('Should retun the results from the API call', () => {
      const res = run('process -a=integrations -e=delete-credentials -o=test --integration-id=test');
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Provision new broker token', () => {
    it('Should throw error for no org ID provided', () => {
      const res = run('process -a=integrations -e=provision-new-broker-token');
      expect(res).to.have.string(orgIdError.message);
    });

    it('Should throw error for not integration ID provided', () => {
      const res = run('process -a=integrations -e=provision-new-broker-token -o=test');
      expect(res).to.have.string(integIdError.message);
    });

    it('Should retun the results from the API call', () => {
      const res = run('process -a=integrations -e=provision-new-broker-token -o=test --integration-id=test');
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Switch broker token', () => {
    it('Should print error for no org ID', () => {
      const res = run('process -a=integrations -e=switch-broker-token');
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should print error for no integ ID', () => {
      const res = run('process -a=integrations -e=switch-broker-token -o=test');
      expect(res).to.have.string(integIdError.message);
    });
    it('Should return result from the API', () => {
      const res = run('process -a=integrations -e=switch-broker-token -o=test --integration-id=test');
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Clone integration', () => {
    it('Should print error for no org ID', () => {
      const res = run('process -a=integrations -e=clone-integration');
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should print error for no integ ID', () => {
      const res = run('process -a=integrations -e=clone-integration -o=test');
      expect(res).to.have.string(integIdError.message);
    });
    it('Should print error for no file path', () => {
      const res = run('process -a=integrations -e=clone-integration -o=test --integration-id=test');
      expect(res).to.have.string(filePathError.message);
    });
    it('Should print error for file not found', () => {
      const res = run(
        'process -a=integrations -e=clone-integration -o=test --integration-id=test --file=./test/something.json',
      );
      expect(res).to.have.string(eontError);
    });
    it('Should return results from the API', () => {
      const res = run(
        'process -a=integrations -e=clone-integration -o=test --integration-id=test --file=./test/json/integrations/cloneIntegration.json',
      );
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Get integration by type', () => {
    it('Should print error for org ID not found', () => {
      const res = run('process -a=integrations -e=get-integration-by-type');
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should return for type argument not found', () => {
      const res = run('process -a=integrations -e=get-integration-by-type -o=test');
      expect(res).to.have.string(integTypeError.message);
    });
    it('Should return results from the API', () => {
      const res = run('process -a=integrations -e=get-integration-by-type -o=test --integration-type=test');
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Import project', () => {
    it('Should print error if org ID not found', () => {
      const res = run('process -a=integrations -e=import-project');
      expect(res).to.have.string(orgIdError.message);
    });

    it('Should print error if integrations ID not found', () => {
      const res = run('process -a=integrations -e=import-project -o=test');
      expect(res).to.have.string(integIdError.message);
    });

    it('Should print error if file path not found', () => {
      const res = run('process -a=integrations -e=import-project -o=test --integration-id=test');
      expect(res).to.have.string(filePathError.message);
    });

    it('Should print error for file not found', () => {
      const res = run(
        'process -a=integrations -e=import-project -o=test --integration-id=test --file=./test/json/integrations/something.json',
      );
      expect(res).to.have.string(eontError);
    });
    it('Should print the result from the API call', () => {
      const res = run(
        'process -a=integrations -e=import-project -o=test --integration-id=test --file=./test/json/integrations/importProject.json',
      );
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });
  describe('Get import job details', () => {
    it('Should print error for org ID not passed', () => {
      const res = run('process -a=integrations -e=get-import-job-details');
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should print error for integration ID not passed', () => {
      const res = run('process -a=integrations -e=get-import-job-details -o=test');
      expect(res).to.have.string(integIdError.message);
    });
    it('Should print error for job ID not passed', () => {
      const res = run('process -a=integrations -e=get-import-job-details -o=test --integration-id=test');
      expect(res).to.have.string(jobIdError.message);
    });

    it('Should return the response from the API', () => {
      const res = run('process -a=integrations -e=get-import-job-details -o=test --integration-id=test --job-id=test');
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Get integration settings', () => {
    it('Should print error for org ID not passed', () => {
      const res = run('process -a=integrations -e=get-integration-settings');
      expect(res).to.have.string(orgIdError.message);
    });
    it('Should print error for integration ID not found', () => {
      const res = run('process -a=integrations -e=get-integration-settings -o=test');
      expect(res).to.have.string(integIdError.message);
    });
    it('Should return the response from the API', () => {
      const res = run('process -a=integrations -e=get-integration-settings -o=test --integration-id=test');
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });

  describe('Update integration settings', () => {
    it('Should print error if org ID not passed', () => {
      const res = run('process -a=integrations -e=update-integration-settings');
      expect(res).to.have.string(orgIdError.message);
    });

    it('Should print error if integration ID not passed', () => {
      const res = run('process -a=integrations -e=update-integration-settings -o=test');
      expect(res).to.have.string(integIdError.message);
    });

    it('Should print error if file path not passed', () => {
      const res = run('process -a=integrations -e=update-integration-settings -o=test --integration-id=test');
      expect(res).to.have.string(filePathError.message);
    });
    it('Should print error if file not present', () => {
      const res = run(
        'process -a=integrations -e=update-integration-settings -o=test --integration-id=test -f=./test/something.json',
      );
      expect(res).to.have.string(eontError);
    });
    it('Should return the response from the API', () => {
      const res = run(
        'process -a=integrations -e=update-integration-settings -o=test --integration-id=test -f=./test/json/integrations/updateIntegrationSettings.json',
      );
      expect(res).to.have.string(orgNotFoundErrString);
    });
  });
});
