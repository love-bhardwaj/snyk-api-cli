import api from '../../../lib/api/apiHandler';
import { processAuth } from '../../../lib/auth/auth';
import { appDebugLog, appErrorLog } from '../../../lib/utils/debugLogger';
import { printRed } from '../../../lib/utils/printToConsole';
import objPrintable from '../../../lib/utils/JSONify';
import handleApiError from '../../../lib/utils/handleApiError';
import yargs from 'yargs';
import apiList from '../../../lib/api/apiList';
import generalEndpoints from '../../../lib/api/general/generalEndpoints';
import usersEndpoints from '../../../lib/api/users/usersEndpoints';
import groupsEndpoints from '../../../lib/api/groups/groupsEndpoints';
import orgsEndpoints from '../../../lib/api/organizations/organizationsEndpoints';
import integEndpoints from '../../../lib/api/integrations/integrationEndpoints';
import projectsEndpoints from '../../../lib/api/projects/projectsEndpoints';
import dependenciesEndpoints from '../../../lib/api/dependencies/dependenciesEndpoints';

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
    // choices: [
    //   ...generalEndpoints,
    //   ...usersEndpoints,
    //   ...groupsEndpoints,
    //   ...orgsEndpoints,
    //   ...integEndpoints,
    //   ...projectsEndpoints,
    //   ...dependenciesEndpoints,
    // ],
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
  'sort-by': { describe: 'Query parameter', string: true },
  order: { describe: 'Query parameter', string: true },
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
