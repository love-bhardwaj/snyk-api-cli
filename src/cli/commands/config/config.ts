import chalk from "chalk";
import { clearToken } from "../../../lib/auth/auth";
import { printRed } from "../../../lib/utils/printToConsole";

const command = "config [options]";
const describe = "Save the Snyk API token";
const builder = {
  "clear-token": {
    describe: "Clear the saved API token",
  },
};

const handler = function (argv: any) {
  if (argv["clear-token"]) {
    clearToken();
    return printRed("API token cleared!");
  }
};

export default { command, describe, builder, handler };
