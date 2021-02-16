import api from "../../../lib/api/apiHandler";
import { checkAuth } from "../../../lib/auth/auth";

const command = "process [options]";
const describe = "Process the API request";

const builder = {
  api: {
    describe:
      "The API group you want to call, example: general, users, projects, etc",
    demand: true,
    alias: "a",
  },
  endpoint: {
    describe:
      "The API endpoint you want to call, example: api-docs, get-projects",
    demand: true,
    alias: "e",
  },
  "group-id": {
    describe: "Clear the saved API token",
    alias: "g",
  },
  "org-id": {
    describe: "Snyk organization ID",
    alias: "o",
  },
  "project-id": {
    describe: "Snyk project ID",
    alias: "p",
  },
  "user-id": {
    describe: "Snyk user ID",
    alias: "u",
  },
  "issue-id": {
    describe: "Vulnerability issue ID",
  },
  file: {
    describe: "Input JSON file(Request body)",
    alias: "f",
  },
};

const handler = async function (argv: any) {
  await checkAuth();
  await api(argv);
};

export default { command, describe, builder, handler };
