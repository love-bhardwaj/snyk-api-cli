import { saveTokenToConfig } from "../../../lib/auth/auth";

const command = "auth <token>";
const describe = "Save the Snyk API token";
const builder = {};

const handler = function (argv: any) {
  const { token } = argv;
  saveTokenToConfig(token);
};

export default { command, describe, builder, handler };
