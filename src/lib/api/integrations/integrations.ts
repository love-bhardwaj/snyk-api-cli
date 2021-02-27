import { Integration } from 'snyk-api-client';
import { COMMAND_ARGS, INTEGRATIONS_ENDPOINTS } from '../../../enums/enums';
import {
  FilePathError,
  OrgIdError,
  IntegrationIdError,
  IntegrationTypeError,
  JobIdError,
  InvalidEndpointError,
} from '../../../errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../../lib/utils/spinners';
import { appDebugLog, reqDebugLog } from '../../../lib/utils/debugLogger';
import integrationEndpoints from './integrationEndpoints';
import chalk from 'chalk';
import prettyPrint from '../../../lib/utils/prettyPrint';
import readJsonFile from '../../../lib/utils/readJsonFile';
import inputValidation from '../../utils/inputValidation';

export default async (args: any) => {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Processing integrations API request');
  apiSpinnerStart();

  try {
    switch (endpoint) {
      case INTEGRATIONS_ENDPOINTS.LIST_INTEGRATIONS:
        inputValidation({ args, orgId: true });
        const orgId = args[COMMAND_ARGS.ORG_ID];

        const listIntegRes = await Integration.listIntegrations({ orgId });
        apiSpinnerStop();
        reqDebugLog(listIntegRes);
        prettyPrint(listIntegRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.ADD_NEW_INTEGRATION:
        inputValidation({ args, orgId: true, filePath: true });
        const orgId1 = args[COMMAND_ARGS.ORG_ID];
        const filePath = args[COMMAND_ARGS.FILE];

        const fileContent = readJsonFile(filePath);
        const addNewIntegRes = await Integration.addNewIntegration({ orgId: orgId1 }, { requestBody: fileContent });
        apiSpinnerStop();
        reqDebugLog(addNewIntegRes);
        prettyPrint(addNewIntegRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.UPDATE_EXISTING_INTEGRATION:
        inputValidation({ args, orgId: true, integrationId: true, filePath: true });
        const orgId2 = args[COMMAND_ARGS.ORG_ID];
        const integId = args[COMMAND_ARGS.INTEGRATION_ID];
        const filePath1 = args[COMMAND_ARGS.FILE];

        const fileContent1 = readJsonFile(filePath1);
        const upExistingIntegRes = await Integration.updateIntegration(
          { orgId: orgId2, integrationId: integId },
          { requestBody: fileContent1 },
        );
        apiSpinnerStop();
        reqDebugLog(upExistingIntegRes);
        prettyPrint(upExistingIntegRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.DELETE_CREDENTIALS:
        inputValidation({ args, orgId: true, integrationId: true });
        const orgId3 = args[COMMAND_ARGS.ORG_ID];
        const integId1 = args[COMMAND_ARGS.INTEGRATION_ID];

        const deleteCredRes = await Integration.deleteCredentials({ orgId: orgId3, integrationId: integId1 });
        apiSpinnerStop();
        reqDebugLog(deleteCredRes);
        prettyPrint(deleteCredRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.PROVISION_NEW_BROKER_TOKEN:
        inputValidation({ args, orgId: true, integrationId: true });
        const orgId4 = args[COMMAND_ARGS.ORG_ID];
        const integId2 = args[COMMAND_ARGS.INTEGRATION_ID];

        const newBrokerTokenRes = await Integration.provisionBrokerToken({ orgId: orgId4, integrationId: integId2 });
        apiSpinnerStop();
        reqDebugLog(newBrokerTokenRes);
        prettyPrint(newBrokerTokenRes.response);
        return;

      case INTEGRATIONS_ENDPOINTS.SWITCH_BROKER_TOKEN:
        inputValidation({ args, orgId: true, integrationId: true });
        const orgId5 = args[COMMAND_ARGS.ORG_ID];
        const integId3 = args[COMMAND_ARGS.INTEGRATION_ID];

        const switchTokenRes = await Integration.switchBrokerToken({ orgId: orgId5, integrationId: integId3 });
        apiSpinnerStop();
        reqDebugLog(switchTokenRes);
        prettyPrint(switchTokenRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.CLONE_INTEGRATION:
        inputValidation({ args, orgId: true, integrationId: true, filePath: true });
        const orgId6 = args[COMMAND_ARGS.ORG_ID];
        const integId4 = args[COMMAND_ARGS.INTEGRATION_ID];
        const filePath2 = args[COMMAND_ARGS.FILE];

        const fileContent2 = readJsonFile(filePath2);
        const cloneIntegRes = await Integration.cloneIntegration(
          { orgId: orgId6, integrationId: integId4 },
          { requestBody: fileContent2 },
        );
        apiSpinnerStop();
        reqDebugLog(cloneIntegRes);
        prettyPrint(cloneIntegRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.GET_INTEGRATION_BY_TYPE:
        inputValidation({ args, orgId: true, integType: true });
        const orgId7 = args[COMMAND_ARGS.ORG_ID];
        const integType = args[COMMAND_ARGS.INTEGRATION_TYPE];

        const integByTypeRes = await Integration.getIntegrationByType({ orgId: orgId7, type: integType });
        apiSpinnerStop();
        reqDebugLog(integByTypeRes);
        prettyPrint(integByTypeRes.response);
        return;

      case INTEGRATIONS_ENDPOINTS.IMPORT_PROJECT:
        inputValidation({ args, orgId: true, integrationId: true, filePath: true });
        const orgId8 = args[COMMAND_ARGS.ORG_ID];
        const integId5 = args[COMMAND_ARGS.INTEGRATION_ID];
        const filePath3 = args[COMMAND_ARGS.FILE];

        const fileContent3 = readJsonFile(filePath3);

        const importProjectRes = await Integration.importProject(
          { orgId: orgId8, integrationId: integId5 },
          { requestBody: fileContent3 },
        );
        apiSpinnerStop();
        reqDebugLog(importProjectRes);
        prettyPrint(importProjectRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.GET_IMPORT_JOB_DETAILS:
        inputValidation({ args, orgId: true, integrationId: true, jobId: true });
        const orgId9 = args[COMMAND_ARGS.ORG_ID];
        const integId6 = args[COMMAND_ARGS.INTEGRATION_ID];
        const jobId = args[COMMAND_ARGS.JOB_ID];

        const importJobRes = await Integration.getImportJobDetails({
          orgId: orgId9,
          integrationId: integId6,
          jobId: jobId,
        });
        apiSpinnerStop();
        reqDebugLog(importJobRes);
        prettyPrint(importJobRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.GET_INTEGRATION_SETTINGS:
        inputValidation({ args, orgId: true, integrationId: true });
        const orgId10 = args[COMMAND_ARGS.ORG_ID];
        const integId7 = args[COMMAND_ARGS.INTEGRATION_ID];

        const getIntegSettingRes = await Integration.getIntegrationSettings({
          orgId: orgId10,
          integrationId: integId7,
        });
        apiSpinnerStop();
        reqDebugLog(getIntegSettingRes);
        prettyPrint(getIntegSettingRes.response);
        return;

      case INTEGRATIONS_ENDPOINTS.UPDATE_INTEGRATION_SETTINGS:
        inputValidation({ args, orgId: true, integrationId: true, filePath: true });
        const orgId11 = args[COMMAND_ARGS.ORG_ID];
        const integId8 = args[COMMAND_ARGS.INTEGRATION_ID];
        const filePath4 = args[COMMAND_ARGS.FILE];

        const fileContent4 = readJsonFile(filePath4);

        const updateIntegSetRes = await Integration.updateIntegrationSettings(
          { orgId: orgId11, integrationId: integId8 },
          { requestBody: fileContent4 },
        );
        apiSpinnerStop();
        reqDebugLog(updateIntegSetRes);
        prettyPrint(updateIntegSetRes.response);
        return;
      default:
        apiSpinnerStop();
        throw new InvalidEndpointError(
          `The --endpoint or -e value passed is not acceptable, select one from [${chalk.greenBright(
            integrationEndpoints,
          )}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
};
