import { Dependency } from 'snyk-api-client';
import { DEPENDENCIES_API_ENDPOINTS, COMMAND_ARGS } from '../../../enums/enums';
import { InvalidEndpointError } from '../../../errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../utils/spinners';
import { appDebugLog, reqDebugLog } from '../../utils/debugLogger';
import dependenciesEndpoints from './dependenciesEndpoints';
import chalk from 'chalk';
import inputValidation from '../../utils/inputValidation';
import prettyPrint from '../../utils/prettyPrint';

export default async (args: any) => {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Processing dependencies API request');
  apiSpinnerStart();

  try {
    switch (endpoint) {
      case DEPENDENCIES_API_ENDPOINTS.LIST_ALL_DEPENDENCIES:
        inputValidation({ args, orgId: true });
        let queryParams: any = {};
        const orgId = args[COMMAND_ARGS.ORG_ID];
        if (args[COMMAND_ARGS.SORT_BY]) queryParams.sortBy = args[COMMAND_ARGS.SORT_BY];
        if (args[COMMAND_ARGS.ORDER]) queryParams.order = args[COMMAND_ARGS.ORDER];
        if (args[COMMAND_ARGS.PER_PAGE]) queryParams.perPage = args[COMMAND_ARGS.PER_PAGE];
        if (args[COMMAND_ARGS.PAGE]) queryParams.page = args[COMMAND_ARGS.PAGE];

        const dependenciesRes = await Dependency.listAllDependencies({ orgId }, { queryParams });
        apiSpinnerStop();
        reqDebugLog(dependenciesRes);
        prettyPrint(dependenciesRes.response);
        break;
      default:
        apiSpinnerStop();
        throw new InvalidEndpointError(
          `The --endpoint or -e value passed is not acceptable, select one from [${chalk.greenBright(
            dependenciesEndpoints,
          )}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
};
