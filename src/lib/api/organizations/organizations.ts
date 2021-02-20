import { Org } from 'snyk-api-client';
import { COMMAND_ARGS, ORGS_API_ENDPOINTS } from '../../../lib/enums/enums';
import { FilePathError, OrgIdError } from '../../../lib/errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../../lib/utils/spinners';
import orgEndpoints from './organizationsEndpoints';
import chalk from 'chalk';
import prettyPrint from '../../../lib/utils/prettyPrint';
import readJsonFile from '../../../lib/utils/readJsonFile';

export default async (args: any) => {
  apiSpinnerStart();
  const endpoint = args[COMMAND_ARGS.ENDPOINT];

  try {
    switch (endpoint) {
      case ORGS_API_ENDPOINTS.LIST_USER_ORGS:
        const userOrgs = await Org.listUserOrgs();
        apiSpinnerStop();
        prettyPrint(userOrgs.response);
        return;
      case ORGS_API_ENDPOINTS.CREATE_NEW_ORG:
        const filePath = args[COMMAND_ARGS.FILE];
        if (!filePath) throw new FilePathError();

        const newOrgFile = readJsonFile(filePath);

        const createOrgRes = await Org.createNewOrg({ requestBody: newOrgFile });
        apiSpinnerStop();
        prettyPrint(createOrgRes.response);
        return;
      case ORGS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS:
        const orgId = args[COMMAND_ARGS.ORG_ID];

        const orgNotiRes = await Org.getOrgNotiSettings({ orgId });

        apiSpinnerStop();
        prettyPrint(orgNotiRes.response);
        return;
      case ORGS_API_ENDPOINTS.SET_ORG_NOTI_SETTINGS:
        const orgId1 = args[COMMAND_ARGS.ORG_ID];
        const filePath1 = args[COMMAND_ARGS.FILE];

        if (!orgId1) throw new OrgIdError();
        if (!filePath1) throw new FilePathError();

        const orgNotiFile = readJsonFile(filePath1);

        const updateOrgNotiRes = await Org.setOrgNotiSettings({ orgId: orgId1 }, { requestBody: orgNotiFile });

        apiSpinnerStop();
        prettyPrint(updateOrgNotiRes.response);
        return;
      case ORGS_API_ENDPOINTS.INVITE_USER:
        const orgId2 = args[COMMAND_ARGS.ORG_ID];
        const filePath2 = args[COMMAND_ARGS.FILE];

        if (!orgId2) throw new OrgIdError();
        if (!filePath2) throw new FilePathError();

        const usersFile = readJsonFile(filePath2);

        const addUserRes = await Org.inviteUserToOrg({ orgId: orgId2 }, { requestBody: usersFile });

        apiSpinnerStop();
        prettyPrint(addUserRes.response);
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
