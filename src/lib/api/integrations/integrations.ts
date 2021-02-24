import { Integration } from 'snyk-api-client';
import { COMMAND_ARGS, INTEGRATIONS_ENDPOINTS } from '../../../lib/enums/enums';
import {
  FilePathError,
  OrgIdError,
  IntegrationIdError,
  IntegrationTypeError,
  JobIdError,
  InvalidEndpointError,
} from '../../../lib/errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../../lib/utils/spinners';
import { reqDebugLog } from '../../../lib/utils/debugLogger';
import integrationEndpoints from './integrationEndpoints';
import chalk from 'chalk';
import objPrintable from '../../../lib/utils/objPrintable';
import prettyPrint from '../../../lib/utils/prettyPrint';
import readJsonFile from '../../../lib/utils/readJsonFile';

export default async (args: any) => {
  apiSpinnerStart();
  const endpoint = args[COMMAND_ARGS.ENDPOINT];

  try {
    switch (endpoint) {
      case INTEGRATIONS_ENDPOINTS.LIST_INTEGRATIONS:
        const orgId = args[COMMAND_ARGS.ORG_ID];

        if (!orgId) throw new OrgIdError();
        const listIntegRes = await Integration.listIntegrations({ orgId });
        apiSpinnerStop();
        reqDebugLog(objPrintable(listIntegRes));
        prettyPrint(listIntegRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.ADD_NEW_INTEGRATION:
        const orgId1 = args[COMMAND_ARGS.ORG_ID];
        const filePath = args[COMMAND_ARGS.FILE];

        if (!orgId1) throw new OrgIdError();
        if (!filePath) throw new FilePathError();

        const fileContent = readJsonFile(filePath);
        const addNewIntegRes = await Integration.addNewIntegration({ orgId: orgId1 }, { requestBody: fileContent });
        apiSpinnerStop();
        reqDebugLog(objPrintable(addNewIntegRes));
        prettyPrint(addNewIntegRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.UPDATE_EXISTING_INTEGRATION:
        const orgId2 = args[COMMAND_ARGS.ORG_ID];
        const integId = args[COMMAND_ARGS.INTEGRATION_ID];
        const filePath1 = args[COMMAND_ARGS.FILE];

        if (!orgId2) throw new OrgIdError();
        if (!integId) throw new IntegrationIdError();
        if (!filePath1) throw new FilePathError();

        const fileContent1 = readJsonFile(filePath1);
        const upExistingIntegRes = await Integration.updateIntegration(
          { orgId: orgId2, integrationId: integId },
          { requestBody: fileContent1 },
        );
        apiSpinnerStop();
        reqDebugLog(objPrintable(upExistingIntegRes));
        prettyPrint(upExistingIntegRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.DELETE_CREDENTIALS:
        const orgId3 = args[COMMAND_ARGS.ORG_ID];
        const integId1 = args[COMMAND_ARGS.INTEGRATION_ID];

        if (!orgId3) throw new OrgIdError();
        if (!integId1) throw new IntegrationIdError();

        const deleteCredRes = await Integration.deleteCredentials({ orgId: orgId3, integrationId: integId1 });
        apiSpinnerStop();
        reqDebugLog(objPrintable(deleteCredRes));
        prettyPrint(deleteCredRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.PROVISION_NEW_BROKER_TOKEN:
        const orgId4 = args[COMMAND_ARGS.ORG_ID];
        const integId2 = args[COMMAND_ARGS.INTEGRATION_ID];

        if (!orgId4) throw new OrgIdError();
        if (!integId2) throw new IntegrationIdError();

        const newBrokerTokenRes = await Integration.provisionBrokerToken({ orgId: orgId4, integrationId: integId2 });
        apiSpinnerStop();
        reqDebugLog(objPrintable(newBrokerTokenRes));
        prettyPrint(newBrokerTokenRes.response);
        return;

      case INTEGRATIONS_ENDPOINTS.SWITCH_BROKER_TOKEN:
        const orgId5 = args[COMMAND_ARGS.ORG_ID];
        const integId3 = args[COMMAND_ARGS.INTEGRATION_ID];

        if (!orgId5) throw new OrgIdError();
        if (!integId3) throw new IntegrationIdError();

        const switchTokenRes = await Integration.switchBrokerToken({ orgId: orgId5, integrationId: integId3 });
        apiSpinnerStop();
        reqDebugLog(objPrintable(switchTokenRes));
        prettyPrint(switchTokenRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.CLONE_INTEGRATION:
        const orgId6 = args[COMMAND_ARGS.ORG_ID];
        const integId4 = args[COMMAND_ARGS.INTEGRATION_ID];
        const filePath2 = args[COMMAND_ARGS.FILE];

        if (!orgId6) throw new OrgIdError();
        if (!integId4) throw new IntegrationIdError();
        if (!filePath2) throw new FilePathError();

        const fileContent2 = readJsonFile(filePath2);
        const cloneIntegRes = await Integration.cloneIntegration(
          { orgId: orgId6, integrationId: integId4 },
          { requestBody: fileContent2 },
        );
        apiSpinnerStop();
        reqDebugLog(objPrintable(cloneIntegRes));
        prettyPrint(cloneIntegRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.GET_INTEGRATION_BY_TYPE:
        const orgId7 = args[COMMAND_ARGS.ORG_ID];
        const integType = args[COMMAND_ARGS.INTEGRATION_TYPE];

        if (!orgId7) throw new OrgIdError();
        if (!integType) throw new IntegrationTypeError();

        const integByTypeRes = await Integration.getIntegrationByType({ orgId: orgId7, type: integType });
        apiSpinnerStop();
        reqDebugLog(objPrintable(integByTypeRes));
        prettyPrint(integByTypeRes.response);
        return;

      case INTEGRATIONS_ENDPOINTS.IMPORT_PROJECT:
        const orgId8 = args[COMMAND_ARGS.ORG_ID];
        const integId5 = args[COMMAND_ARGS.INTEGRATION_ID];
        const filePath3 = args[COMMAND_ARGS.FILE];

        if (!orgId8) throw new OrgIdError();
        if (!integId5) throw new IntegrationIdError();
        if (!filePath3) throw new FilePathError();

        const fileContent3 = readJsonFile(filePath3);

        const importProjectRes = await Integration.importProject(
          { orgId: orgId8, integrationId: integId5 },
          { requestBody: fileContent3 },
        );
        apiSpinnerStop();
        reqDebugLog(objPrintable(importProjectRes));
        prettyPrint(importProjectRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.GET_IMPORT_JOB_DETAILS:
        const orgId9 = args[COMMAND_ARGS.ORG_ID];
        const integId6 = args[COMMAND_ARGS.INTEGRATION_ID];
        const jobId = args[COMMAND_ARGS.JOB_ID];

        if (!orgId9) throw new OrgIdError();
        if (!integId6) throw new IntegrationIdError();
        if (!jobId) throw new JobIdError();

        const importJobRes = await Integration.getImportJobDetails({
          orgId: orgId9,
          integrationId: integId6,
          jobId: jobId,
        });
        apiSpinnerStop();
        reqDebugLog(objPrintable(importJobRes));
        prettyPrint(importJobRes.response);
        return;
      case INTEGRATIONS_ENDPOINTS.GET_INTEGRATION_SETTINGS:
        const orgId10 = args[COMMAND_ARGS.ORG_ID];
        const integId7 = args[COMMAND_ARGS.INTEGRATION_ID];

        if (!orgId10) throw new OrgIdError();
        if (!integId7) throw new IntegrationIdError();

        const getIntegSettingRes = await Integration.getIntegrationSettings({
          orgId: orgId10,
          integrationId: integId7,
        });
        apiSpinnerStop();
        reqDebugLog(objPrintable(getIntegSettingRes));
        prettyPrint(getIntegSettingRes.response);
        return;

      case INTEGRATIONS_ENDPOINTS.UPDATE_INTEGRATION_SETTINGS:
        const orgId11 = args[COMMAND_ARGS.ORG_ID];
        const integId8 = args[COMMAND_ARGS.INTEGRATION_ID];
        const filePath4 = args[COMMAND_ARGS.FILE];

        if (!orgId11) throw new OrgIdError();
        if (!integId8) throw new IntegrationIdError();
        if (!filePath4) throw new FilePathError();

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
