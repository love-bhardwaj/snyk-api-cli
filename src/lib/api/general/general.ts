import { General } from "snyk-api-client";
import { GENERAL_API_ENDPOINTS } from "../../../lib/enums/enums";
import chalk from "chalk";
import CLI from "clui";
import clearLine from "../../utils/clearLine";
import generalEndpoints from "./generalEndpoints";

const Spinner = CLI.Spinner;
let processing = new Spinner("Processing request");

export default async function (args: any) {
  processing.start();
  try {
    switch (args["endpoint"]) {
      case GENERAL_API_ENDPOINTS.API_DOCS:
        const apiDocs = await General.getDocs();
        processing.stop();
        clearLine();
        console.log(apiDocs.response);
        break;
      default:
        processing.stop();
        clearLine();
        return console.log(
          `The ${chalk.red(
            "endpoint"
          )} value passed is not acceptable, select one from [${chalk.greenBright(
            generalEndpoints
          )}]`
        );
    }
  } catch (error) {
    processing.stop();
    clearLine();
    return console.log(chalk.red(error.error.message));
  }
}
