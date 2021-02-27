import { License } from 'snyk-api-client';
import { InvalidEndpointError } from '../../../errors/errors';
import { COMMAND_ARGS, LICENSES_API_ENDPOINTS } from '../../../enums/enums';
import { apiSpinnerStart, apiSpinnerStop } from '../../utils/spinners';
import { appDebugLog, reqDebugLog } from '../../utils/debugLogger';
import licensesEndpoints from './licensesEndpoints';
import inputValidation from '../../utils/inputValidation';
import prettyPrint from '../../utils/prettyPrint';
import chalk from 'chalk';

export default async (args: any) => {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Processing licenses API request');
  apiSpinnerStart();

  try {
    switch (endpoint) {
      case LICENSES_API_ENDPOINTS.LIST_ALL_LICENSES:
        inputValidation({ args, orgId: true });
        let queryParams: any = {};
        const orgId = args[COMMAND_ARGS.ORG_ID];

        if (args[COMMAND_ARGS.SORT_BY]) queryParams.sortBy = args[COMMAND_ARGS.SORT_BY];
        if (args[COMMAND_ARGS.ORDER]) queryParams.order = args[COMMAND_ARGS.ORDER];

        const listAllLicensesRes = await License.listAllLicenses({ orgId }, { queryParams });
        apiSpinnerStop();
        reqDebugLog(listAllLicensesRes);
        prettyPrint(listAllLicensesRes.response);
        break;
      default:
        apiSpinnerStop();
        throw new InvalidEndpointError(
          `The --endpoint or -e value passed is not acceptable, select one from [${chalk.greenBright(
            licensesEndpoints,
          )}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
};
