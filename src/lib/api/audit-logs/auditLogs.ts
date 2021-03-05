import { Log } from 'snyk-api-client';
import { COMMAND_ARGS, AUDIT_LOGS_API_ENDPOINTS } from '../../../enums/enums';
import { InvalidEndpointError } from '../../../errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../utils/spinners';
import { appDebugLog, reqDebugLog } from '../../utils/debugLogger';
import auditLogsEndpoints from './auditLogsEndpoints';
import chalk from 'chalk';
import inputValidation from '../../utils/inputValidation';
import prettyPrint from '../../utils/prettyPrint';
import readJsonFile from '../../utils/readJsonFile';

export default async (args: any) => {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Process reporting API request');
  apiSpinnerStart();

  try {
    switch (endpoint) {
      case AUDIT_LOGS_API_ENDPOINTS.GROUP_LEVEL_LOGS:
        inputValidation({ args, groupId: true });

        const groupId = args[COMMAND_ARGS.GROUP_ID];

        let filePath,
          fileContent = {};

        if (args[COMMAND_ARGS.FILE]) {
          filePath = args[COMMAND_ARGS.FILE];
          fileContent = readJsonFile(filePath);
        }

        let queryParams: any = {};
        if (args[COMMAND_ARGS.FROM]) queryParams.from = args[COMMAND_ARGS.FROM];
        if (args[COMMAND_ARGS.TO]) queryParams.to = args[COMMAND_ARGS.TO];
        if (args[COMMAND_ARGS.PAGE]) queryParams.page = args[COMMAND_ARGS.PAGE];
        if (args[COMMAND_ARGS.SORT_ORDER]) queryParams.sortOrder = args[COMMAND_ARGS.SORT_ORDER];

        const groupLevelLogs = await Log.getGroupLevelLogs({ groupId }, { requestBody: fileContent, queryParams });
        apiSpinnerStop();
        reqDebugLog(groupLevelLogs);
        prettyPrint(groupLevelLogs.response);
        break;
      case AUDIT_LOGS_API_ENDPOINTS.ORG_LEVEL_LOGS:
        inputValidation({ args, orgId: true });

        const orgId = args[COMMAND_ARGS.ORG_ID];

        let filePath1,
          fileContent1 = {};

        if (args[COMMAND_ARGS.FILE]) {
          filePath1 = args[COMMAND_ARGS.FILE];
          fileContent1 = readJsonFile(filePath1);
        }

        let queryParams1: any = {};
        if (args[COMMAND_ARGS.FROM]) queryParams1.from = args[COMMAND_ARGS.FROM];
        if (args[COMMAND_ARGS.TO]) queryParams1.to = args[COMMAND_ARGS.TO];
        if (args[COMMAND_ARGS.PAGE]) queryParams1.page = args[COMMAND_ARGS.PAGE];
        if (args[COMMAND_ARGS.SORT_ORDER]) queryParams1.sortOrder = args[COMMAND_ARGS.SORT_ORDER];

        const orgLevelLogs = await Log.getOrgLevelLogs(
          { orgId },
          { requestBody: fileContent1, queryParams: queryParams1 },
        );
        apiSpinnerStop();
        reqDebugLog(orgLevelLogs);
        prettyPrint(orgLevelLogs.response);
        break;
      default:
        apiSpinnerStop();
        throw new InvalidEndpointError(
          `
          The --endpoint or -e value passed is not acceptable, select one from [${chalk.greenBright(
            auditLogsEndpoints,
          )}]
          `,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
};
