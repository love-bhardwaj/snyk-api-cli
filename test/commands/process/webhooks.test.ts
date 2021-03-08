import {
  expectEndpointErr,
  expectFilePathErr,
  expectOrgIdErr,
  expectOrgNotFound,
  expectWebhookArgErr,
  run,
} from '../../utils';
import { API_SELECTION, WEBHOOK_API_ENDPOINTS } from '../../../src/enums/enums';

describe('PROCESS Test webhooks API endpoints', () => {
  describe('Invalid endpoint test', () => {
    it('Should return error for ivalid endpoint provided', () => {
      const res = run(`process -a=${API_SELECTION.WEBHOOKS} -e=something-inalid`);
      expectEndpointErr(res);
    });
  });

  describe('Create webhook tests', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.CREATE_WEBHOOK}`);
      expectOrgIdErr(res);
    });
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.CREATE_WEBHOOK} --org-id=test`);
      expectFilePathErr(res);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.CREATE_WEBHOOK} --org-id=test --file=./test/json/webhooks/createWebhook.json`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('List webhooks tests', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.LIST_WEBHOOKS}`);
      expectOrgIdErr(res);
    });
    it('Should return the results from the API', () => {
      const res = run(`process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.LIST_WEBHOOKS} --org-id=test`);
      expectOrgNotFound(res);
    });
  });

  describe('Retrieve webhook test', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.RETRIEVE_WEBHOOK}`);
      expectOrgIdErr(res);
    });
    it('Should print error for webhook ID not provided', () => {
      const res = run(
        `process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.RETRIEVE_WEBHOOK} --org-id=test`,
      );
      expectWebhookArgErr(res);
    });
    it('Should return results from the API', () => {
      const res = run(
        `process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.RETRIEVE_WEBHOOK} --org-id=test --webhook-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Delete a webhook test', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.DELETE_WEBHOOK}`);
      expectOrgIdErr(res);
    });

    it('Should print error for webhook ID not provided', () => {
      const res = run(`process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.DELETE_WEBHOOK} --org-id=test`);
      expectWebhookArgErr(res);
    });
    it('Should return results from the API', () => {
      const res = run(
        `process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.DELETE_WEBHOOK} --org-id=test --webhook-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Ping a webhook test', () => {
    it('Should print error for org ID not provided', () => {
      const res = run(`process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.PING_WEBHOOK}`);
      expectOrgIdErr(res);
    });
    it('Should print error for webhook ID not provided', () => {
      const res = run(`process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.PING_WEBHOOK} --org-id=test`);
      expectWebhookArgErr(res);
    });
    it('Should return results from the API', () => {
      const res = run(
        `process -a=${API_SELECTION.WEBHOOKS} -e=${WEBHOOK_API_ENDPOINTS.PING_WEBHOOK} --org-id=test --webhook-id=test`,
      );
      expectOrgNotFound(res);
    });
  });
});
