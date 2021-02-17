import { User } from "snyk-api-client";
import { USERS_API_ENDPOINTS } from "../../../lib/enums/enums";
import {
  FilePathError,
  OrgIdError,
  ProjectIdError,
  UserIdError,
} from "../../../lib/errors/errors";
import { printRed } from "../../../lib/utils/printToConsole";
import chalk from "chalk";
import userEndpoints from "./usersEndpoints";
import prettyPrint from "../../utils/prettyPrint";
import readJsonFile from "../../utils/readJsonFile";
import ora from "ora";

const apiSpinner = ora(chalk.blueBright("Calling Snyk API..."));
apiSpinner.color = "yellow";

export default async function (args: any) {
  apiSpinner.start();

  try {
    switch (args["endpoint"]) {
      case USERS_API_ENDPOINTS.GET_USER_DETAILS:
        const userId = args["user-id"];
        if (!userId) throw new UserIdError();
        const userDetails = await User.getUserDetails({ userId });
        apiSpinner.stop();
        apiSpinner.clear();
        prettyPrint(userDetails.response);
        break;
      case USERS_API_ENDPOINTS.GET_MY_DETAILS:
        const myDetails = await User.getMyDetails();
        apiSpinner.stop();
        apiSpinner.clear();
        prettyPrint(myDetails.response);
        break;
      case USERS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS:
        const orgId = args["org-id"];
        if (!orgId) throw new OrgIdError();
        const orgNotiSettings = await User.getOrgNotiSettings({ orgId });
        apiSpinner.stop();
        apiSpinner.clear();
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
        apiSpinner.stop();
        apiSpinner.clear();
        prettyPrint(modifiedNotiSettings.response);
        break;
      case USERS_API_ENDPOINTS.GET_PROJECT_NOTI_SETTINGS:
        const orgId2 = args["org-id"];
        const projectId = args["project-id"];

        if (!orgId2) throw new OrgIdError();
        if (!projectId) throw new ProjectIdError();

        const projectNotiSettings = await User.getProjNotiSettings({
          orgId: orgId2,
          projectId,
        });
        apiSpinner.stop();
        apiSpinner.clear();
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
        apiSpinner.stop();
        apiSpinner.clear();
        prettyPrint(modProjNotSetsRes.response);
        break;

      default:
        apiSpinner.stop();
        apiSpinner.clear();
        return console.log(
          `The ${chalk.red(
            "endpoint"
          )} value passed is not acceptable, select one from [${chalk.greenBright(
            userEndpoints
          )}]`
        );
    }
  } catch (error) {
    let errorMessage;
    if (error.response) {
      errorMessage = error.response.error || error.error.message;
    } else {
      errorMessage = error.message || "Unknown error";
    }
    // console.error(error);
    apiSpinner.stop();
    apiSpinner.clear();
    return printRed(errorMessage);
  }
}
