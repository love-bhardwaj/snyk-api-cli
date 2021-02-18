import { Group } from 'snyk-api-client';
import { GROUPS_API_ENDPOINTS, COMMAND_ARGS } from '../../../lib/enums/enums';
import { FilePathError, GroupIdError, OrgIdError } from '../../../lib/errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../../lib/utils/spinners';
import prettyPrint from '../../../lib/utils/prettyPrint';
import chalk from 'chalk';
import groupsEndpoints from './groupsEndpoints';
import { appErrorLog } from '../../../lib/utils/debugLogger';
import { printRed } from '../../../lib/utils/printToConsole';
import readJsonFile from '../../../lib/utils/readJsonFile';

export default async function (args: any) {
  apiSpinnerStart();
  const endpoint = args[COMMAND_ARGS.ENDPOINT];

  try {
    switch (endpoint) {
      case GROUPS_API_ENDPOINTS.VIEW_GROUP_SETTINGS:
        const { groupId } = args;
        if (!groupId) throw new GroupIdError();
        const groupSettings = await Group.viewGroupSettings({ groupId });
        apiSpinnerStop();
        prettyPrint(groupSettings.response);
        return;
      case GROUPS_API_ENDPOINTS.UPDATE_GROUP_SETTINGS:
        const groupId1 = args[COMMAND_ARGS.GROUP_ID];
        const filePath = args[COMMAND_ARGS.FILE];

        if (!groupId1) throw new GroupIdError();
        if (!filePath) throw new FilePathError();

        const updateGroupSetFile = readJsonFile(filePath);
        const updatedGroupSetRes = await Group.updateGroupSettings(
          { groupId: groupId1 },
          { requestBody: updateGroupSetFile },
        );

        apiSpinnerStop();
        prettyPrint(updatedGroupSetRes.response);
        return;
      case GROUPS_API_ENDPOINTS.LIST_ALL_GROUP_MEMBERS:
        const groupId2 = args[COMMAND_ARGS.GROUP_ID];

        if (!groupId2) throw new GroupIdError();

        const groupMembersRes = await Group.listMembersInGroup({
          groupId: groupId2,
        });
        apiSpinnerStop();
        prettyPrint(groupMembersRes.response);
        return;

      case GROUPS_API_ENDPOINTS.ADD_MEMBER_TO_ORG:
        const groupId3 = args[COMMAND_ARGS.GROUP_ID];
        const orgId = args[COMMAND_ARGS.ORG_ID];
        const filePath1 = args[COMMAND_ARGS.FILE];

        const addMembersFile = readJsonFile(filePath1);

        if (!groupId3) throw new GroupIdError();
        if (!orgId) throw new OrgIdError();

        const addMemberRes = await Group.addMemberToOrg({ groupId: groupId3, orgId }, { requestBody: addMembersFile });

        apiSpinnerStop();

        prettyPrint(addMemberRes.response);
        return;

      case GROUPS_API_ENDPOINTS.LIST_ALL_GROUP_TAGS:
        const groupId4 = args[COMMAND_ARGS.GROUP_ID];

        if (!groupId4) throw new GroupIdError();

        const perPage = args[COMMAND_ARGS.PER_PAGE];
        const page = args[COMMAND_ARGS.PAGE];

        const listTagsRes = await Group.listAllTagsInGroup({ groupId: groupId4 }, { queryParams: { page, perPage } });

        apiSpinnerStop();

        prettyPrint(listTagsRes.response);

        return;
      case GROUPS_API_ENDPOINTS.DELETE_TAG_FROM_GROUP:
        const groupId5 = args[COMMAND_ARGS.GROUP_ID];
        const filePath2 = args[COMMAND_ARGS.FILE];

        if (!groupId5) throw new GroupIdError();

        const deleteTagFile = readJsonFile(filePath2);

        const deleteTagRes = await Group.deleteTagFromGroup({ groupId: groupId5 }, { requestBody: deleteTagFile });

        apiSpinnerStop();

        prettyPrint(deleteTagRes.response);
        return;
      default:
        apiSpinnerStop();
        return console.log(
          `The ${chalk.red('endpoint')} value passed is not acceptable, select one from [${chalk.greenBright(
            groupsEndpoints,
          )}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
}
