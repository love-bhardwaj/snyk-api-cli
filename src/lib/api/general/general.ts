import { General } from "snyk-api-client";
import { GENERAL_API_ENDPOINTS } from "../../../lib/enums/enums";
import { appDebugLog } from "../../../lib/utils/debugLogger";
import chalk from "chalk";
import generalEndpoints from "./generalEndpoints";
import ora from "ora";

const apiSpinner = ora(chalk.blueBright("Calling Snyk API..."));
apiSpinner.color = "yellow";

export default async function (args: any) {
  apiSpinner.start();
  try {
    switch (args["endpoint"]) {
      case GENERAL_API_ENDPOINTS.API_DOCS:
        const apiDocs = await General.getDocs();
        apiSpinner.stop();
        apiSpinner.clear();
        console.log(apiDocs.response);
        break;
      default:
        apiSpinner.stop();
        apiSpinner.clear();
        return console.log(
          `The ${chalk.red(
            "endpoint"
          )} value passed is not acceptable, select one from [${chalk.greenBright(
            generalEndpoints
          )}]`
        );
    }
  } catch (error) {
    appDebugLog(error.stack ? error.stack : error);
    apiSpinner.stop();
    apiSpinner.clear();
    return console.log(chalk.red(error.error.message));
  }
}
