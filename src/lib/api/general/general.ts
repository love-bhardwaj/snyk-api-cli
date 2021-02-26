import { General } from 'snyk-api-client';
import { GENERAL_API_ENDPOINTS, COMMAND_ARGS } from '../../../enums/enums';
import { appDebugLog, reqDebugLog } from '../../utils/debugLogger';
import { apiSpinnerStart, apiSpinnerStop } from '../../utils/spinners';
import chalk from 'chalk';
import generalEndpoints from './generalEndpoints';
import prettyPrint from '../../utils/prettyPrint';
import { InvalidEndpointError } from '../../../errors/errors';

export default async function (args: any) {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Processing general API request');
  apiSpinnerStart();
  try {
    switch (endpoint) {
      case GENERAL_API_ENDPOINTS.API_DOCS:
        const apiDocs = await General.getDocs();
        apiSpinnerStop();
        reqDebugLog(apiDocs);
        prettyPrint(apiDocs.response);
        break;
      default:
        apiSpinnerStop();
        throw new InvalidEndpointError(
          `The --endpoint or -e value passed is not acceptable, select one from [${chalk.greenBright(
            generalEndpoints,
          )}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
}
