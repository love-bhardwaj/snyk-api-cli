import { Org } from 'snyk-api-client';
import { COMMAND_ARGS, ORGS_API_ENDPOINTS } from '../../../lib/enums/enums';
import {} from '../../../lib/errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../../lib/utils/spinners';
import orgEndpoints from './organizationsEndpoints';
import chalk from 'chalk';
import prettyPrint from '../../../lib/utils/prettyPrint';

export default async (args: any) => {
  apiSpinnerStart();
  const endpoint = args[COMMAND_ARGS.ENDPOINT];

  try {
    switch (endpoint) {
      case ORGS_API_ENDPOINTS.LIST_USER_ORGS:
        return;
      case ORGS_API_ENDPOINTS.CREATE_NEW_ORG:
        return;
      case ORGS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS:
        return;
      case ORGS_API_ENDPOINTS.SET_ORG_NOTI_SETTINGS:
        return;
      case ORGS_API_ENDPOINTS.INVITE_USER:
        return;
      case ORGS_API_ENDPOINTS.LIST_ORG_MEMBERS:
        return;
      case ORGS_API_ENDPOINTS.VIEW_ORG_SETTINGS:
        return;
      case ORGS_API_ENDPOINTS.UPDATE_ORG_SETTINGS:
        return;
      case ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE:
        return;
      case ORGS_API_ENDPOINTS.REMOVE_MEMBER:
        return;
      case ORGS_API_ENDPOINTS.REMOVE_ORG:
        return;
      default:
        apiSpinnerStop();
        return console.log(
          `The ${chalk.red('endpoint')} value passed is not acceptable, select one from [${chalk.greenBright(
            orgEndpoints,
          )}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
};
