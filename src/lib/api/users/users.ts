import { User } from "snyk-api-client";
import { USERS_API_ENDPOINTS } from "../../../lib/enums/enums";
import chalk from "chalk";
import CLI from "clui";
import clearLine from "../../utils/clearLine";
import userEndpoints from "./usersEndpoints";
import prettyPrint from "../../utils/prettyPrint";
import readJsonFile from "../../utils/readJsonFile";

const Spinner = CLI.Spinner;
let processing = new Spinner("Processing request");

export default async function (args: any) {
  processing.start();

  try {
    switch (args["endpoint"]) {
      case USERS_API_ENDPOINTS.GET_USER_DETAILS:
        const userId = args["user-id"];
        if (!userId) throw new Error("--user-id is required for this endpoint");
        const userDetails = await User.getUserDetails({ userId });
        processing.stop();
        clearLine();
        prettyPrint(userDetails.response);
        break;
      case USERS_API_ENDPOINTS.GET_MY_DETAILS:
        const myDetails = await User.getMyDetails();
        processing.stop();
        clearLine();
        prettyPrint(myDetails.response);
        break;
      case USERS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS:
        const orgId = args["org-id"];
        if (!orgId) throw new Error("--org-id is required for this endpoint");
        const orgNotiSettings = await User.getOrgNotiSettings({ orgId });
        processing.stop();
        clearLine();
        prettyPrint(orgNotiSettings.response);
        break;
      case USERS_API_ENDPOINTS.MODIFY_ORG_NOTI_SETTINGS:
        const org = args["org-id"];
        const filePath = args["f"];

        if (!org) throw new Error("--org-id is required for this endpoint");
        if (!filePath) throw new Error("file path(-f or --file) required");
        const modifyOrgNotiFile = readJsonFile(filePath);
        const modifiedNotiSettings = await User.modifyOrgNotiSettings(
          { orgId: org },
          { requestBody: modifyOrgNotiFile }
        );
        processing.stop();
        clearLine();
        prettyPrint(modifiedNotiSettings.response);
        break;
      case USERS_API_ENDPOINTS.GET_PROJECT_NOTI_SETTINGS:
        const orgId3 = args["org-id"];
        const projectId = args["project-id"];

        if (!orgId3)
          throw new Error("--org-id or -o is required for this endpoint");
        if (!projectId)
          throw new Error("--project-id or -p is required for this endpoint");

        const projectNotiSettings = await User.getProjNotiSettings({
          orgId: orgId3,
          projectId,
        });
        processing.stop();
        clearLine();
        prettyPrint(projectNotiSettings.response);
        break;
      case USERS_API_ENDPOINTS.MODIFY_PROJECT_NOTI_SETTINGS:
        const orgId4 = args["o"];
        const projectId1 = args["p"];
        const filePath1 = args["f"];

        if (!orgId4)
          throw new Error("--org-id or -o is required for this endpoint");
        if (!projectId1)
          throw new Error("--project-id or -p is required for this endpoint");
        if (!filePath1) throw new Error("file path(-f or --file) required");

        const modProjNotiSets = readJsonFile(filePath1);

        const modProjNotSetsRes = await User.modifyProjNotiSettings(
          { orgId: orgId4, projectId: projectId1 },
          { requestBody: modProjNotiSets }
        );
        processing.stop();
        clearLine();
        prettyPrint(modProjNotSetsRes.response);
        break;

      default:
        processing.stop();
        clearLine();
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
    processing.stop();
    clearLine();
    return console.log(chalk.red(errorMessage));
  }
}
