import api from '../../../lib/api/apiHandler';
import { processAuth } from '../../../lib/auth/auth';
import { appDebugLog, appErrorLog } from '../../../lib/utils/debugLogger';
import { printRed } from '../../../lib/utils/printToConsole';
import objPrintable from '../../../lib/utils/objPrintable';

const command = 'process [options]';
const describe = 'Process the API request';

const builder = {
  api: {
    describe: 'The API group you want to call, example: general, users, projects, etc',
    demand: true,
    alias: 'a',
    string: true,
  },
  endpoint: {
    describe: 'The API endpoint you want to call, example: api-docs, get-projects',
    demand: true,
    alias: 'e',
    string: true,
  },
  'group-id': {
    describe: 'Clear the saved API token',
    alias: 'g',
    string: true,
  },
  'org-id': {
    describe: 'Snyk organization ID',
    alias: 'o',
    string: true,
  },
  'project-id': {
    describe: 'Snyk project ID',
    alias: 'p',
    string: true,
  },
  'user-id': {
    describe: 'Snyk user ID',
    alias: 'u',
    string: true,
  },
  'issue-id': {
    describe: 'Vulnerability issue ID',
    string: true,
  },
  file: {
    describe: 'Input JSON file(Request body)',
    alias: 'f',
    string: true,
  },
  'per-page': {
    describe: 'Number of items on a page',
    number: true,
  },
  page: {
    describe: 'Page number',
    number: true,
  },
  'include-group-admins': {
    describe: 'Include group admins when listing organization members',
    boolean: true,
  },
};

const handler = async (argv: any) => {
  /**
   * Since token is required for processing request
   * we process the auth here and then proceed with the API call
   */
  appDebugLog(`Process command with argv: ${objPrintable(argv)}`);
  try {
    await processAuth();
    await api(argv);
  } catch (error) {
    appErrorLog(error);
    printRed('Snyk API token required!');
    process.exit(1);
  }
};

export default { command, describe, builder, handler };
