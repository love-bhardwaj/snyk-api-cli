import api from '../../../lib/api/apiHandler';
import { processAuth } from '../../../lib/auth/auth';
import { appDebugLog, appErrorLog } from '../../../lib/utils/debugLogger';
import { printRed } from '../../../lib/utils/printToConsole';
import objPrintable from '../../../lib/utils/JSONify';
import handleApiError from '../../../lib/utils/handleApiError';
import yargs from 'yargs';

const command = 'process [options]';
const describe = 'Process the API request';

const builder: yargs.CommandBuilder = {
  api: {
    describe: 'The API group you want to call, example: general, users, projects, etc',
    demand: true,
    alias: 'a',
    string: true,
    // choices: apiList,
  },
  endpoint: {
    describe: 'The API endpoint you want to call, example: api-docs, get-projects',
    demand: true,
    alias: 'e',
    string: true,
  },
  'group-id': {
    describe: 'Snyk group ID or in some cases the package group ID',
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
  'integration-id': {
    describe: 'Snyk integration ID',
    string: true,
  },
  'integration-type': {
    describe: 'Snyk integration type, used to get integration by type',
    string: true,
  },
  'include-group-admins': {
    describe: 'Include group admins when listing organization members',
    boolean: true,
  },
  'job-id': {
    describe: 'Snyk import job ID',
    string: true,
  },
  'sort-by': {
    describe: 'The key to sort by query parameter',
    string: true,
  },
  order: {
    describe: 'Order or direction of sort results  query parameter',
    string: true,
  },
  'group-by': {
    describe: 'Group by query parameter',
    string: true,
  },
  from: {
    describe: 'The date you wish to fetch results from, in the format YYYY-MM-DD Example: 2017-07-01',
    string: true,
  },
  to: {
    describe: 'The date you wish to fetch results until, in the format YYYY-MM-DD Example: 2017-07-07',
    string: true,
  },
  'entitlement-key': {
    describe: 'Entitlement key to get entitlement value',
    string: true,
  },
  'artifact-id': {
    describe: 'Package Artifact ID',
    string: true,
  },
  'package-version': {
    describe: 'Package version',
    string: true,
  },
  repository: {
    describe: 'Repository hosting the pacakge',
    string: true,
  },
  'package-name': {
    describe: 'Package name',
    string: true,
  },
  'gem-name': {
    describe: 'Gem name',
    string: true,
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
    const errorMessage = handleApiError(error);
    printRed(errorMessage);
  }
};

export default { command, describe, builder, handler };
