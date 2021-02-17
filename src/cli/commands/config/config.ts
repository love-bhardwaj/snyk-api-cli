import { clearToken } from "../../../lib/auth/auth";
import { printRed } from "../../../lib/utils/printToConsole";
import { appDebugLog } from "../../../lib/utils/debugLogger";

const command = "config [options]";
const describe = "Save the Snyk API token";
const builder = {
  "clear-token": {
    describe: "Clear the saved API token",
  },
};

const handler = function (argv: any) {
  appDebugLog(`Config command with argv: ${JSON.stringify(argv)}`);
  if (argv["clear-token"]) {
    clearToken();
    appDebugLog("API token cleared from config");
    return printRed("API token cleared!");
  }
};

export default { command, describe, builder, handler };
