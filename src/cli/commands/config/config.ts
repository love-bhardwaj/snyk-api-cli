import { clearToken } from "../../../lib/auth/auth";

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
    return console.log("Token cleared");
  }
};

export default { command, describe, builder, handler };
