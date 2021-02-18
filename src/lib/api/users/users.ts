import { User } from "snyk-api-client";
import { USERS_API_ENDPOINTS } from "../../../lib/enums/enums";
import {
  FilePathError,
  OrgIdError,
  ProjectIdError,
  UserIdError,
} from "../../../lib/errors/errors";
import { printRed } from "../../../lib/utils/printToConsole";
import { appDebugLog, appErrorLog } from "../../../lib/utils/debugLogger";
import { apiSpinnerStop, apiSpinnerStart } from "../../../lib/utils/spinners";
import handleApiError from "../../../lib/utils/handleApiError";
import chalk from "chalk";
import userEndpoints from "./usersEndpoints";
import prettyPrint from "../../utils/prettyPrint";
import readJsonFile from "../../utils/readJsonFile";

export default async function (args: any) {
  apiSpinnerStart();

  try {
    switch (args["endpoint"]) {
      case USERS_API_ENDPOINTS.GET_USER_DETAILS:
        const userId = args["user-id"];
        if (!userId) throw new UserIdError();
        const userDetails = await User.getUserDetails({ userId });
        apiSpinnerStop();
        prettyPrint(userDetails.response);
        break;
      case USERS_API_ENDPOINTS.GET_MY_DETAILS:
        const myDetails = await User.getMyDetails();
        apiSpinnerStop();
        prettyPrint(myDetails.response);
        break;
      case USERS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS:
        const orgId = args["org-id"];
        if (!orgId) throw new OrgIdError();
        const orgNotiSettings = await User.getOrgNotiSettings({ orgId });
        apiSpinnerStop();
        prettyPrint(orgNotiSettings.response);
        break;
      case USERS_API_ENDPOINTS.MODIFY_ORG_NOTI_SETTINGS:
        const orgId1 = args["org-id"];
        const filePath = args["f"];

        if (!orgId1) throw new OrgIdError();
        if (!filePath) throw new FilePathError();
        const modifyOrgNotiFile = readJsonFile(filePath);
        const modifiedNotiSettings = await User.modifyOrgNotiSettings(
          { orgId: orgId1 },
          { requestBody: modifyOrgNotiFile }
        );
        apiSpinnerStop();
        prettyPrint(modifiedNotiSettings.response);
        break;
      case USERS_API_ENDPOINTS.GET_PROJECT_NOTI_SETTINGS:
        const orgId2 = args["o"];
        const projectId = args["p"];

        if (!orgId2) throw new OrgIdError();
        if (!projectId) throw new ProjectIdError();

        const projectNotiSettings = await User.getProjNotiSettings({
          orgId: orgId2,
          projectId,
        });
        apiSpinnerStop();
        prettyPrint(projectNotiSettings.response);
        break;
      case USERS_API_ENDPOINTS.MODIFY_PROJECT_NOTI_SETTINGS:
        const orgId4 = args["o"];
        const projectId1 = args["p"];
        const filePath1 = args["f"];

        if (!orgId4) throw new OrgIdError();
        if (!projectId1) throw new ProjectIdError();
        if (!filePath1) throw new FilePathError();

        const modProjNotiSets = readJsonFile(filePath1);

        const modProjNotSetsRes = await User.modifyProjNotiSettings(
          { orgId: orgId4, projectId: projectId1 },
          { requestBody: modProjNotiSets }
        );
        apiSpinnerStop();
        prettyPrint(modProjNotSetsRes.response);
        break;

      default:
        apiSpinnerStop();
        return console.log(
          `The ${chalk.red(
            "endpoint"
          )} value passed is not acceptable, select one from [${chalk.greenBright(
            userEndpoints
          )}]`
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
}
