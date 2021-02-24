import { Org } from 'snyk-api-client';
import { COMMAND_ARGS, ORGS_API_ENDPOINTS } from '../../../lib/enums/enums';
import { FilePathError, InvalidEndpointError, OrgIdError, UserIdError } from '../../../lib/errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../../lib/utils/spinners';
import { reqDebugLog } from '../../../lib/utils/debugLogger';
import objPrintable from '../../../lib/utils/objPrintable';
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
        reqDebugLog(objPrintable(userOrgs));
        prettyPrint(userOrgs.response);
        return;
      case ORGS_API_ENDPOINTS.CREATE_NEW_ORG:
        const filePath = args[COMMAND_ARGS.FILE];
        if (!filePath) throw new FilePathError();

        const newOrgFile = readJsonFile(filePath);

        const createOrgRes = await Org.createNewOrg({ requestBody: newOrgFile });
        reqDebugLog(objPrintable(createOrgRes));
        apiSpinnerStop();
        prettyPrint(createOrgRes.response);
        return;
      case ORGS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS:
        const orgId = args[COMMAND_ARGS.ORG_ID];

        if (!orgId) throw new OrgIdError();

        const orgNotiRes = await Org.getOrgNotiSettings({ orgId });
        reqDebugLog(objPrintable(orgNotiRes));
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
        reqDebugLog(objPrintable(updateOrgNotiRes));

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
        reqDebugLog(objPrintable(addUserRes));

        apiSpinnerStop();
        prettyPrint(addUserRes.response);
        return;
      case ORGS_API_ENDPOINTS.LIST_ORG_MEMBERS:
        const orgId3 = args[COMMAND_ARGS.ORG_ID];
        const includeGroupAdmins = args[COMMAND_ARGS.INCLUDE_GROUP_ADMINS];

        if (!orgId3) throw new OrgIdError();

        const listMembersRes = await Org.listMembers({ orgId: orgId3 }, { queryParams: { includeGroupAdmins } });
        reqDebugLog(objPrintable(listMembersRes));
        apiSpinnerStop();
        prettyPrint(listMembersRes.response);
        return;
      case ORGS_API_ENDPOINTS.VIEW_ORG_SETTINGS:
        const orgId4 = args[COMMAND_ARGS.ORG_ID];

        if (!orgId4) throw new OrgIdError();

        const orgSettingsRes = await Org.viewOrgSettings({ orgId: orgId4 });
        reqDebugLog(objPrintable(orgSettingsRes));

        apiSpinnerStop();

        prettyPrint(orgSettingsRes.response);
        return;
      case ORGS_API_ENDPOINTS.UPDATE_ORG_SETTINGS:
        const orgId5 = args[COMMAND_ARGS.ORG_ID];
        const filePath3 = args[COMMAND_ARGS.FILE];

        if (!orgId5) throw new OrgIdError();
        if (!filePath3) throw new FilePathError();

        const fileContent = readJsonFile(filePath3);

        const updateSettingsRes = await Org.updateOrgSettings({ orgId: orgId5 }, { requestBody: fileContent });
        reqDebugLog(objPrintable(updateSettingsRes));

        apiSpinnerStop();

        prettyPrint(updateSettingsRes.response);
        return;
      case ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE:
        const orgId6 = args[COMMAND_ARGS.ORG_ID];
        const userId = args[COMMAND_ARGS.USER_ID];
        const filePath4 = args[COMMAND_ARGS.FILE];

        if (!orgId6) throw new OrgIdError();
        if (!userId) throw new UserIdError();
        if (!filePath4) throw new FilePathError();

        const updateRoleBody = readJsonFile(filePath4);

        const updateMemberRole = await Org.updateMemberRole(
          { orgId: orgId6, userId: userId },
          { requestBody: updateRoleBody },
        );
        reqDebugLog(objPrintable(updateMemberRole));
        apiSpinnerStop();
        prettyPrint(updateMemberRole.response);
        return;
      case ORGS_API_ENDPOINTS.REMOVE_MEMBER:
        const orgId7 = args[COMMAND_ARGS.ORG_ID];
        const userId1 = args[COMMAND_ARGS.USER_ID];

        if (!orgId7) throw new OrgIdError();
        if (!userId1) throw new UserIdError();

        const removeMemberRes = await Org.removeOrgMember({ orgId: orgId7, userId: userId1 });
        reqDebugLog(objPrintable(removeMemberRes));
        apiSpinnerStop();
        prettyPrint(removeMemberRes.response);
        return;
      case ORGS_API_ENDPOINTS.REMOVE_ORG:
        const orgId8 = args[COMMAND_ARGS.ORG_ID];

        if (!orgId8) throw new OrgIdError();

        const removeOrgRes = await Org.removeOrg({ orgId: orgId8 });
        reqDebugLog(objPrintable(removeOrgRes));
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
