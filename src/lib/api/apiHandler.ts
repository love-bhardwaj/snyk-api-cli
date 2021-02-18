import { API_SELECTION } from '../enums/enums';
import { apiSpinnerStart, apiSpinnerStop } from '../../lib/utils/spinners';
import { appErrorLog, appDebugLog } from '../../lib/utils/debugLogger';
import handleApiError from '../../lib/utils/handleApiError';
import { printRed } from '../../lib/utils/printToConsole';
import apiList from './apiList';
import handleGeneralRequest from './general/general';
import handleUserRequest from './users/users';
import handleGroupRequest from './groups/groups';
import chalk from 'chalk';

export default async function (args: any) {
  const { api } = args;

  try {
    switch (api) {
      case API_SELECTION.GENERAL:
        await handleGeneralRequest(args);
        break;
      case API_SELECTION.USERS:
        await handleUserRequest(args);
        break;
      case API_SELECTION.GROUPS:
        await handleGroupRequest(args);
        break;
      case API_SELECTION.ORGS:
        break;
      case API_SELECTION.INTEGRATIONS:
        break;
      case API_SELECTION.PROJECTS:
        break;
      case API_SELECTION.DEPENDENCIES:
        break;
      case API_SELECTION.LICENSES:
        break;
      case API_SELECTION.ENTITLEMENTS:
        break;
      case API_SELECTION.TEST:
        break;
      case API_SELECTION.MONITOR:
        break;
      case API_SELECTION.REPORTING:
        break;
      case API_SELECTION.AUDIT:
        break;
      default:
        // General
        console.log(
          `API selection ${chalk.red(api)} not valid. Valid API selections are: [${chalk.greenBright(apiList)}]`,
        );
        break;
    }
  } catch (error) {
    appErrorLog(error);
    const errorMessage = handleApiError(error);
    return printRed(errorMessage);
  }
}
