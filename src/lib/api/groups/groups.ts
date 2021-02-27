import { Group } from 'snyk-api-client';
import { GROUPS_API_ENDPOINTS, COMMAND_ARGS } from '../../../enums/enums';
import { InvalidEndpointError } from '../../../errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../utils/spinners';
import prettyPrint from '../../utils/prettyPrint';
import chalk from 'chalk';
import groupsEndpoints from './groupsEndpoints';
import readJsonFile from '../../utils/readJsonFile';
import inputValidation from '../../utils/inputValidation';
import { appDebugLog, reqDebugLog } from '../../utils/debugLogger';

export default async (args: any) => {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Processing groups API request');
  apiSpinnerStart();

  try {
    switch (endpoint) {
      case GROUPS_API_ENDPOINTS.VIEW_GROUP_SETTINGS:
        inputValidation({ args, groupId: true });
        const { groupId } = args;

        const groupSettings = await Group.viewGroupSettings({ groupId });
        apiSpinnerStop();
        reqDebugLog(groupSettings);
        prettyPrint(groupSettings.response);
        return;
      case GROUPS_API_ENDPOINTS.UPDATE_GROUP_SETTINGS:
        inputValidation({ args, groupId: true, filePath: true });
        const groupId1 = args[COMMAND_ARGS.GROUP_ID];
        const filePath = args[COMMAND_ARGS.FILE];

        const updateGroupSetFile = readJsonFile(filePath);
        const updatedGroupSetRes = await Group.updateGroupSettings(
          { groupId: groupId1 },
          { requestBody: updateGroupSetFile },
        );

        apiSpinnerStop();
        reqDebugLog(updatedGroupSetRes);
        prettyPrint(updatedGroupSetRes.response);
        return;
      case GROUPS_API_ENDPOINTS.LIST_ALL_GROUP_MEMBERS:
        inputValidation({ args, groupId: true });
        const groupId2 = args[COMMAND_ARGS.GROUP_ID];

        const groupMembersRes = await Group.listMembersInGroup({
          groupId: groupId2,
        });
        apiSpinnerStop();
        reqDebugLog(groupMembersRes);
        prettyPrint(groupMembersRes.response);
        return;

      case GROUPS_API_ENDPOINTS.ADD_MEMBER_TO_ORG:
        inputValidation({ args, groupId: true, orgId: true, filePath: true });
        const groupId3 = args[COMMAND_ARGS.GROUP_ID];
        const orgId = args[COMMAND_ARGS.ORG_ID];
        const filePath1 = args[COMMAND_ARGS.FILE];

        const addMembersFile = readJsonFile(filePath1);

        const addMemberRes = await Group.addMemberToOrg({ groupId: groupId3, orgId }, { requestBody: addMembersFile });

        apiSpinnerStop();
        reqDebugLog(addMemberRes);
        prettyPrint(addMemberRes.response);
        return;

      case GROUPS_API_ENDPOINTS.LIST_ALL_GROUP_TAGS:
        inputValidation({ args, groupId: true });
        const groupId4 = args[COMMAND_ARGS.GROUP_ID];

        const perPage = args[COMMAND_ARGS.PER_PAGE];
        const page = args[COMMAND_ARGS.PAGE];

        const listTagsRes = await Group.listAllTagsInGroup({ groupId: groupId4 }, { queryParams: { page, perPage } });

        apiSpinnerStop();
        reqDebugLog(listTagsRes);
        prettyPrint(listTagsRes.response);

        return;
      case GROUPS_API_ENDPOINTS.DELETE_TAG_FROM_GROUP:
        inputValidation({ args, groupId: true, filePath: true });
        const groupId5 = args[COMMAND_ARGS.GROUP_ID];
        const filePath2 = args[COMMAND_ARGS.FILE];

        const deleteTagFile = readJsonFile(filePath2);

        const deleteTagRes = await Group.deleteTagFromGroup({ groupId: groupId5 }, { requestBody: deleteTagFile });

        apiSpinnerStop();
        reqDebugLog(deleteTagRes);
        prettyPrint(deleteTagRes.response);
        return;
      default:
        apiSpinnerStop();
        throw new InvalidEndpointError(
          `The --endpoint or -e value passed is not acceptable, select one from [${chalk.greenBright(
            groupsEndpoints,
          )}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
};
