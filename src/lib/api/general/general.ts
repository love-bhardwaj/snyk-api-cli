import { General } from "snyk-api-client";
import { GENERAL_API_ENDPOINTS } from "../../../lib/enums/enums";
import { appDebugLog, appErrorLog } from "../../../lib/utils/debugLogger";
import { apiSpinnerStart, apiSpinnerStop } from "../../../lib/utils/spinners";
import chalk from "chalk";
import generalEndpoints from "./generalEndpoints";

export default async function (args: any) {
  apiSpinnerStart();
  try {
    switch (args["endpoint"]) {
      case GENERAL_API_ENDPOINTS.API_DOCS:
        const apiDocs = await General.getDocs();
        apiSpinnerStop();
        console.log(apiDocs.response);
        break;
      default:
        apiSpinnerStop();
        return console.log(
          `The ${chalk.red(
            "endpoint"
          )} value passed is not acceptable, select one from [${chalk.greenBright(
            generalEndpoints
          )}]`
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
}
