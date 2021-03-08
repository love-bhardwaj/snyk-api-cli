import {
  run,
  expectOrgIdErr,
  expectFilePathErr,
  expectOrgNotFound,
  expectEndpointErr,
  expectIntegIdErr,
  expectIntegTypeErr,
  expectJobIdErr,
} from '../../utils';

describe('PROCESS: Test integration API related commands', () => {
  describe('Invalid endpoint test:', () => {
    it('Should print error for endpoint not valid', () => {
      const res = run('process -a=integrations -e=something-invalid');
      expectEndpointErr(res);
    });
  });

  describe('List integrations endpoint:', () => {
    it('Should print error to console if no --org-id or -o', () => {
      const res = run('process -a=integrations -e=list-integrations');
      expectOrgIdErr(res);
    });

    it('Should call the API endpoint', () => {
      const res = run('process -a=integrations -e=list-integrations -o=test');
      expectOrgNotFound(res);
    });
  });

  describe('Add new integration endpoint:', () => {
    it('Should print error to console if no --org-id or -o', () => {
      const res = run('process -a=integrations -e=add-new-integration');
      expectOrgIdErr(res);
    });

    it('Should print error to console if no file path provided --file or -f', () => {
      const res = run('process -a=integrations -e=add-new-integration -o=test');
      expectFilePathErr(res);
    });

    it('Should call the API endpoint and return results', () => {
      const res = run(
        'process -a=integrations -e=add-new-integration -o=test -f=./test/json/integrations/addNewIntegration.json',
      );
      expectOrgNotFound(res);
    });
  });

  describe('Update existing integration', () => {
    it('Should print error to console if no --org-id or -o', () => {
      const res = run('process -a=integrations -e=update-existing-integration');
      expectOrgIdErr(res);
    });

    it('Should pritn error for no integration ID argument', () => {
      const res = run('process -a=integrations -e=update-existing-integration -o=test');
      expectIntegIdErr(res);
    });

    it('Should print error to console if no file path provided --file or -f', () => {
      const res = run('process -a=integrations -e=update-existing-integration -o=test --integration-id=test');
      expectFilePathErr(res);
    });

    it('Should call API and return the org error', () => {
      const res = run(
        'process -a=integrations -e=update-existing-integration -o=test --integration-id=test -f=./test/json/integrations/updateExistingIntegration.json',
      );
      expectOrgNotFound(res);
    });
  });

  describe('Delete integration credentials', () => {
    it('Should print error if not org ID arg provided', () => {
      const res = run('process -a=integrations -e=delete-credentials');
      expectOrgIdErr(res);
    });

    it('Should print error if not integ ID provided', () => {
      const res = run('process -a=integrations -e=delete-credentials -o=test');
      expectIntegIdErr(res);
    });

    it('Should retun the results from the API call', () => {
      const res = run('process -a=integrations -e=delete-credentials -o=test --integration-id=test');
      expectOrgNotFound(res);
    });
  });

  describe('Provision new broker token', () => {
    it('Should throw error for no org ID provided', () => {
      const res = run('process -a=integrations -e=provision-new-broker-token');
      expectOrgIdErr(res);
    });

    it('Should throw error for not integration ID provided', () => {
      const res = run('process -a=integrations -e=provision-new-broker-token -o=test');
      expectIntegIdErr(res);
    });

    it('Should retun the results from the API call', () => {
      const res = run('process -a=integrations -e=provision-new-broker-token -o=test --integration-id=test');
      expectOrgNotFound(res);
    });
  });

  describe('Switch broker token', () => {
    it('Should print error for no org ID', () => {
      const res = run('process -a=integrations -e=switch-broker-token');
      expectOrgIdErr(res);
    });
    it('Should print error for no integ ID', () => {
      const res = run('process -a=integrations -e=switch-broker-token -o=test');
      expectIntegIdErr(res);
    });
    it('Should return result from the API', () => {
      const res = run('process -a=integrations -e=switch-broker-token -o=test --integration-id=test');
      expectOrgNotFound(res);
    });
  });

  describe('Clone integration', () => {
    it('Should print error for no org ID', () => {
      const res = run('process -a=integrations -e=clone-integration');
      expectOrgIdErr(res);
    });
    it('Should print error for no integ ID', () => {
      const res = run('process -a=integrations -e=clone-integration -o=test');
      expectIntegIdErr(res);
    });
    it('Should print error for no file path', () => {
      const res = run('process -a=integrations -e=clone-integration -o=test --integration-id=test');
      expectFilePathErr(res);
    });

    it('Should return results from the API', () => {
      const res = run(
        'process -a=integrations -e=clone-integration -o=test --integration-id=test --file=./test/json/integrations/cloneIntegration.json',
      );
      expectOrgNotFound(res);
    });
  });

  describe('Get integration by type', () => {
    it('Should print error for org ID not found', () => {
      const res = run('process -a=integrations -e=get-integration-by-type');
      expectOrgIdErr(res);
    });
    it('Should return for type argument not found', () => {
      const res = run('process -a=integrations -e=get-integration-by-type -o=test');
      expectIntegTypeErr(res);
    });
    it('Should return results from the API', () => {
      const res = run('process -a=integrations -e=get-integration-by-type -o=test --integration-type=test');
      expectOrgNotFound(res);
    });
  });

  describe('Import project', () => {
    it('Should print error if org ID not found', () => {
      const res = run('process -a=integrations -e=import-project');
      expectOrgIdErr(res);
    });

    it('Should print error if integrations ID not found', () => {
      const res = run('process -a=integrations -e=import-project -o=test');
      expectIntegIdErr(res);
    });

    it('Should print error if file path not found', () => {
      const res = run('process -a=integrations -e=import-project -o=test --integration-id=test');
      expectFilePathErr(res);
    });

    it('Should print the result from the API call', () => {
      const res = run(
        'process -a=integrations -e=import-project -o=test --integration-id=test --file=./test/json/integrations/importProject.json',
      );
      expectOrgNotFound(res);
    });
  });
  describe('Get import job details', () => {
    it('Should print error for org ID not passed', () => {
      const res = run('process -a=integrations -e=get-import-job-details');
      expectOrgIdErr(res);
    });
    it('Should print error for integration ID not passed', () => {
      const res = run('process -a=integrations -e=get-import-job-details -o=test');
      expectIntegIdErr(res);
    });
    it('Should print error for job ID not passed', () => {
      const res = run('process -a=integrations -e=get-import-job-details -o=test --integration-id=test');
      expectJobIdErr(res);
    });

    it('Should return the response from the API', () => {
      const res = run('process -a=integrations -e=get-import-job-details -o=test --integration-id=test --job-id=test');
      expectOrgNotFound(res);
    });
  });

  describe('Get integration settings', () => {
    it('Should print error for org ID not passed', () => {
      const res = run('process -a=integrations -e=get-integration-settings');
      expectOrgIdErr(res);
    });
    it('Should print error for integration ID not found', () => {
      const res = run('process -a=integrations -e=get-integration-settings -o=test');
      expectIntegIdErr(res);
    });
    it('Should return the response from the API', () => {
      const res = run('process -a=integrations -e=get-integration-settings -o=test --integration-id=test');
      expectOrgNotFound(res);
    });
  });

  describe('Update integration settings', () => {
    it('Should print error if org ID not passed', () => {
      const res = run('process -a=integrations -e=update-integration-settings');
      expectOrgIdErr(res);
    });

    it('Should print error if integration ID not passed', () => {
      const res = run('process -a=integrations -e=update-integration-settings -o=test');
      expectIntegIdErr(res);
    });

    it('Should print error if file path not passed', () => {
      const res = run('process -a=integrations -e=update-integration-settings -o=test --integration-id=test');
      expectFilePathErr(res);
    });

    it('Should return the response from the API', () => {
      const res = run(
        'process -a=integrations -e=update-integration-settings -o=test --integration-id=test -f=./test/json/integrations/updateIntegrationSettings.json',
      );
      expectOrgNotFound(res);
    });
  });
});
