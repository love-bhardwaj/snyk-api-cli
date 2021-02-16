import { clearToken } from "../../../lib/auth/auth";

const command = "config [options]";
const describe = "Save the Snyk API token";
const builder = {
  "clear-token": {
    describe: "Clear the saved API token",
  },
};

const handler = function (argv: any) {
  console.log("From config handler: ", argv);
  if (argv["clear-token"]) {
    clearToken();
  }
};

export default { command, describe, builder, handler };
