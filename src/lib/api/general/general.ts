import { General } from 'snyk-api-client';
import { GENERAL_API_ENDPOINTS, COMMAND_ARGS } from '../../../lib/enums/enums';
import { appDebugLog, appErrorLog } from '../../../lib/utils/debugLogger';
import { apiSpinnerStart, apiSpinnerStop } from '../../../lib/utils/spinners';
import chalk from 'chalk';
import generalEndpoints from './generalEndpoints';
import objPrintable from '../../../lib/utils/objPrintable';

export default async function (args: any) {
  appDebugLog('Processing general API request');
  apiSpinnerStart();
  try {
    switch (args[COMMAND_ARGS.ENDPOINT]) {
      case GENERAL_API_ENDPOINTS.API_DOCS:
        appDebugLog('Fetching API docs');
        const apiDocs = await General.getDocs();
        appDebugLog(`API docs fetched ${objPrintable(apiDocs)}`);
        apiSpinnerStop();
        console.log(apiDocs.response);
        break;
      default:
        apiSpinnerStop();
        return console.log(
          `The ${chalk.red('endpoint')} value passed is not acceptable, select one from [${chalk.greenBright(
            generalEndpoints,
          )}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
}
