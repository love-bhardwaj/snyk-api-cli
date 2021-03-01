import { Monitor } from 'snyk-api-client';
import { MONITOR_API_ENDPOINTS, COMMAND_ARGS } from '../../../enums/enums';
import { InvalidEndpointError } from '../../../errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../utils/spinners';
import { appDebugLog, reqDebugLog } from '../../utils/debugLogger';
import monitorEndpoints from './monitorEndpoints';
import chalk from 'chalk';
import inputValidation from '../../utils/inputValidation';
import prettyPrint from '../../utils/prettyPrint';
import readJsonFile from '../../utils/readJsonFile';

export default async (args: any) => {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Processing monitor API request');
  apiSpinnerStart();

  try {
    switch (endpoint) {
      case MONITOR_API_ENDPOINTS.MONITOR_DEP_GRAPH:
        inputValidation({ args, filePath: true });

        const filePath = args[COMMAND_ARGS.FILE];
        const fileContent = readJsonFile(filePath);

        let queryParams: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams.org = args[COMMAND_ARGS.ORG_ID];

        const monitorDepGraphRes = await Monitor.monitorDepGraph({ requestBody: fileContent, queryParams });
        apiSpinnerStop();
        reqDebugLog(monitorDepGraphRes);
        prettyPrint(monitorDepGraphRes.response);
        break;
      default:
        apiSpinnerStop();
        throw new InvalidEndpointError(
          `The --endpoint or -e value passed is not acceptable, select one from [${chalk.greenBright(
            monitorEndpoints,
          )}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
};
