import { Org } from 'snyk-api-client';
import { COMMAND_ARGS, ORGS_API_ENDPOINTS } from '../../../enums/enums';
import { InvalidEndpointError } from '../../../errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../../lib/utils/spinners';
import { appDebugLog, reqDebugLog } from '../../../lib/utils/debugLogger';
import orgEndpoints from './organizationsEndpoints';
import chalk from 'chalk';
import prettyPrint from '../../../lib/utils/prettyPrint';
import readJsonFile from '../../../lib/utils/readJsonFile';
import inputValidation from '../../utils/inputValidation';

export default async (args: any) => {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Processing orgs API request');
  apiSpinnerStart();

  try {
    switch (endpoint) {
      case ORGS_API_ENDPOINTS.LIST_USER_ORGS:
        const userOrgs = await Org.listUserOrgs();
        apiSpinnerStop();
        reqDebugLog(userOrgs);
        prettyPrint(userOrgs.response);
        return;
      case ORGS_API_ENDPOINTS.CREATE_NEW_ORG:
        inputValidation({ args, filePath: true });
        const filePath = args[COMMAND_ARGS.FILE];

        const newOrgFile = readJsonFile(filePath);

        const createOrgRes = await Org.createNewOrg({ requestBody: newOrgFile });
        reqDebugLog(createOrgRes);
        apiSpinnerStop();
        prettyPrint(createOrgRes.response);
        return;
      case ORGS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS:
        inputValidation({ args, orgId: true });
        const orgId = args[COMMAND_ARGS.ORG_ID];

        const orgNotiRes = await Org.getOrgNotiSettings({ orgId });
        reqDebugLog(orgNotiRes);
        apiSpinnerStop();
        prettyPrint(orgNotiRes.response);
        return;
      case ORGS_API_ENDPOINTS.SET_ORG_NOTI_SETTINGS:
        inputValidation({ args, orgId: true, filePath: true });
        const orgId1 = args[COMMAND_ARGS.ORG_ID];
        const filePath1 = args[COMMAND_ARGS.FILE];

        const orgNotiFile = readJsonFile(filePath1);

        const updateOrgNotiRes = await Org.setOrgNotiSettings({ orgId: orgId1 }, { requestBody: orgNotiFile });
        reqDebugLog(updateOrgNotiRes);

        apiSpinnerStop();
        prettyPrint(updateOrgNotiRes.response);
        return;
      case ORGS_API_ENDPOINTS.INVITE_USER:
        inputValidation({ args, orgId: true, filePath: true });
        const orgId2 = args[COMMAND_ARGS.ORG_ID];
        const filePath2 = args[COMMAND_ARGS.FILE];

        const usersFile = readJsonFile(filePath2);

        const addUserRes = await Org.inviteUserToOrg({ orgId: orgId2 }, { requestBody: usersFile });
        reqDebugLog(addUserRes);

        apiSpinnerStop();
        prettyPrint(addUserRes.response);
        return;
      case ORGS_API_ENDPOINTS.LIST_ORG_MEMBERS:
        inputValidation({ args, orgId: true });
        const orgId3 = args[COMMAND_ARGS.ORG_ID];
        const includeGroupAdmins = args[COMMAND_ARGS.INCLUDE_GROUP_ADMINS];

        const listMembersRes = await Org.listMembers({ orgId: orgId3 }, { queryParams: { includeGroupAdmins } });
        reqDebugLog(listMembersRes);
        apiSpinnerStop();
        prettyPrint(listMembersRes.response);
        return;
      case ORGS_API_ENDPOINTS.VIEW_ORG_SETTINGS:
        inputValidation({ args, orgId: true });
        const orgId4 = args[COMMAND_ARGS.ORG_ID];

        const orgSettingsRes = await Org.viewOrgSettings({ orgId: orgId4 });
        reqDebugLog(orgSettingsRes);

        apiSpinnerStop();

        prettyPrint(orgSettingsRes.response);
        return;
      case ORGS_API_ENDPOINTS.UPDATE_ORG_SETTINGS:
        inputValidation({ args, orgId: true, filePath: true });
        const orgId5 = args[COMMAND_ARGS.ORG_ID];
        const filePath3 = args[COMMAND_ARGS.FILE];

        const fileContent = readJsonFile(filePath3);

        const updateSettingsRes = await Org.updateOrgSettings({ orgId: orgId5 }, { requestBody: fileContent });
        reqDebugLog(updateSettingsRes);

        apiSpinnerStop();

        prettyPrint(updateSettingsRes.response);
        return;
      case ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE:
        inputValidation({ args, orgId: true, userId: true, filePath: true });
        const orgId6 = args[COMMAND_ARGS.ORG_ID];
        const userId = args[COMMAND_ARGS.USER_ID];
        const filePath4 = args[COMMAND_ARGS.FILE];

        const updateRoleBody = readJsonFile(filePath4);

        const updateMemberRole = await Org.updateMemberRole(
          { orgId: orgId6, userId: userId },
          { requestBody: updateRoleBody },
        );
        reqDebugLog(updateMemberRole);
        apiSpinnerStop();
        prettyPrint(updateMemberRole.response);
        return;
      case ORGS_API_ENDPOINTS.REMOVE_MEMBER:
        inputValidation({ args, orgId: true, userId: true });
        const orgId7 = args[COMMAND_ARGS.ORG_ID];
        const userId1 = args[COMMAND_ARGS.USER_ID];

        const removeMemberRes = await Org.removeOrgMember({ orgId: orgId7, userId: userId1 });
        reqDebugLog(removeMemberRes);
        apiSpinnerStop();
        prettyPrint(removeMemberRes.response);
        return;
      case ORGS_API_ENDPOINTS.REMOVE_ORG:
        inputValidation({ args, orgId: true });
        const orgId8 = args[COMMAND_ARGS.ORG_ID];

        const removeOrgRes = await Org.removeOrg({ orgId: orgId8 });
        reqDebugLog(removeOrgRes);
        apiSpinnerStop();
        prettyPrint(removeOrgRes.response);
        return;
      default:
        apiSpinnerStop();
        throw new InvalidEndpointError(
          `The --endpoint or -e value passed is not acceptable, select one from [${chalk.greenBright(orgEndpoints)}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
};
