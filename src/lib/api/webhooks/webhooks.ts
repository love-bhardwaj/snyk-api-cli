import { Webhook } from 'snyk-api-client';
import { COMMAND_ARGS, WEBHOOK_API_ENDPOINTS } from '../../../enums/enums';
import { InvalidEndpointError } from '../../../errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../utils/spinners';
import { appDebugLog, reqDebugLog } from '../../utils/debugLogger';
import inputValidation from '../../utils/inputValidation';
import webhookEndpoints from './webhooksEndpoints';
import prettyPrint from '../../utils/prettyPrint';
import readJsonFile from '../../utils/readJsonFile';
import chalk from 'chalk';

export default async (args: any) => {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Processing webhooks API request');
  apiSpinnerStart();

  try {
    switch (endpoint) {
      case WEBHOOK_API_ENDPOINTS.CREATE_WEBHOOK:
        inputValidation({ args, orgId: true, filePath: true });
        const orgId = args[COMMAND_ARGS.ORG_ID];
        const filePath = args[COMMAND_ARGS.FILE];

        const fileContent = readJsonFile(filePath);

        const createWebhookRes = await Webhook.createAWebhook({ orgId }, { requestBody: fileContent });
        apiSpinnerStop();
        reqDebugLog(createWebhookRes);
        prettyPrint(createWebhookRes.response);
        break;
      case WEBHOOK_API_ENDPOINTS.LIST_WEBHOOKS:
        inputValidation({ args, orgId: true });
        const orgId1 = args[COMMAND_ARGS.ORG_ID];

        const listWebhooksRes = await Webhook.listWebhooks({ orgId: orgId1 });
        apiSpinnerStop();
        reqDebugLog(listWebhooksRes);
        prettyPrint(listWebhooksRes.response);
        break;
      case WEBHOOK_API_ENDPOINTS.RETRIEVE_WEBHOOK:
        inputValidation({ args, orgId: true, webhookId: true });
        const orgId2 = args[COMMAND_ARGS.ORG_ID];
        const webhookId = args[COMMAND_ARGS.WEBHOOK_ID];

        const retrieveWebhookRes = await Webhook.retrieveAWebhook({ orgId: orgId2, webhookId });
        apiSpinnerStop();
        reqDebugLog(retrieveWebhookRes);
        prettyPrint(retrieveWebhookRes.response);
        break;
      case WEBHOOK_API_ENDPOINTS.DELETE_WEBHOOK:
        inputValidation({ args, orgId: true, webhookId: true });
        const orgId3 = args[COMMAND_ARGS.ORG_ID];
        const webhookId1 = args[COMMAND_ARGS.WEBHOOK_ID];

        const deleteWebhookRes = await Webhook.deleteAWebhook({ orgId: orgId3, webhookId: webhookId1 });
        apiSpinnerStop();
        reqDebugLog(deleteWebhookRes);
        prettyPrint(deleteWebhookRes.response);
        break;
      case WEBHOOK_API_ENDPOINTS.PING_WEBHOOK:
        inputValidation({ args, orgId: true, webhookId: true });
        const orgId4 = args[COMMAND_ARGS.ORG_ID];
        const webhookId2 = args[COMMAND_ARGS.WEBHOOK_ID];

        const pingWebhookRes = await Webhook.pingWebhook({ orgId: orgId4, webhookId: webhookId2 });
        apiSpinnerStop();
        reqDebugLog(pingWebhookRes);
        prettyPrint(pingWebhookRes.response);
        break;
      default:
        apiSpinnerStop();
        throw new InvalidEndpointError(
          `The --endpoint or -e value passed is not acceptable, select one from [${chalk.greenBright(
            webhookEndpoints,
          )}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
};
