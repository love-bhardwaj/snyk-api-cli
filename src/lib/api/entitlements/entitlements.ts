import { Entitlement } from 'snyk-api-client';
import { InvalidEndpointError } from '../../../errors/errors';
import { COMMAND_ARGS, ENTITLEMENTS_API_ENDPOINTS } from '../../../enums/enums';
import { apiSpinnerStart, apiSpinnerStop } from '../../utils/spinners';
import { appDebugLog, reqDebugLog } from '../../utils/debugLogger';
import entitlementEndpoints from './entitlementEndpoints';
import inputValidation from '../../utils/inputValidation';
import prettyPrint from '../../utils/prettyPrint';
import chalk from 'chalk';

export default async (args: any) => {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Processing entitlement API request');
  apiSpinnerStart();

  try {
    switch (endpoint) {
      case ENTITLEMENTS_API_ENDPOINTS.LIST_ALL_ENTITLEMENTS:
        inputValidation({ args, orgId: true });
        const orgId = args[COMMAND_ARGS.ORG_ID];

        const listEntitlementsRes = await Entitlement.listAllEntitlements({ orgId });
        apiSpinnerStop();
        reqDebugLog(listEntitlementsRes);
        prettyPrint(listEntitlementsRes.response);
        break;
      case ENTITLEMENTS_API_ENDPOINTS.GET_ENTITLEMENT_VALUE:
        inputValidation({ args, orgId: true, entitlementKey: true });
        const orgId1 = args[COMMAND_ARGS.ORG_ID];
        const entitlementKey = args[COMMAND_ARGS.ENTITLEMENT_KEY];

        const entitlementValueRes = await Entitlement.getEntitlementValue({ orgId: orgId1, entitlementKey });
        apiSpinnerStop();
        reqDebugLog(entitlementValueRes);
        prettyPrint(entitlementValueRes.response);
        break;
      default:
        apiSpinnerStop();
        throw new InvalidEndpointError(
          `The --endpoint or -e value passed is not acceptable, select one from [${chalk.greenBright(
            entitlementEndpoints,
          )}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
};
