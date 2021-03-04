import { API_SELECTION, COMMAND_ARGS } from '../../../enums/enums';
import yargs from 'yargs';
import { appDebugLog } from '../../../lib/utils/debugLogger';
import JSONify from '../../../lib/utils/JSONify';
import {
  getApiTable,
  getAuditLogsTable,
  getDependencyTable,
  getEntitlementsTable,
  getGeneralTable,
  getGroupsTable,
  getIntegrationTable,
  getLicenseTable,
  getMonitorTable,
  getOrgTable,
  getProjectTable,
  getReportingTable,
  getTestTable,
  getUserTable,
} from '../../../lib/list/tables';

const command = 'list [options]';
const describe = 'List API and related endpoints available';

const builder: yargs.CommandBuilder = {
  api: {
    describe: 'The API group you want to get the endpoints for',
    alias: 'a',
    string: true,
  },
};

const handler = (args: any) => {
  appDebugLog(`List command called with ${JSONify(args)}`);

  if (args[COMMAND_ARGS.API]) {
    const api = args[COMMAND_ARGS.API];

    switch (api) {
      case API_SELECTION.GENERAL:
        const generalTable = getGeneralTable();
        console.log(generalTable);
        break;
      case API_SELECTION.USERS:
        const userTable = getUserTable();
        console.log(userTable);
        break;
      case API_SELECTION.GROUPS:
        const groupsTable = getGroupsTable();
        console.log(groupsTable);
        break;
      case API_SELECTION.ORGS:
        const orgsTable = getOrgTable();
        console.log(orgsTable);
        break;
      case API_SELECTION.INTEGRATIONS:
        const integTable = getIntegrationTable();
        console.log(integTable);
        break;
      case API_SELECTION.PROJECTS:
        const projectTable = getProjectTable();
        console.log(projectTable);
        break;
      case API_SELECTION.DEPENDENCIES:
        const depTable = getDependencyTable();
        console.log(depTable);
        break;
      case API_SELECTION.LICENSES:
        const licensesTable = getLicenseTable();
        console.log(licensesTable);
        break;
      case API_SELECTION.ENTITLEMENTS:
        const entitlementsTable = getEntitlementsTable();
        console.log(entitlementsTable);
        break;
      case API_SELECTION.TEST:
        const testTable = getTestTable();
        console.log(testTable);
        break;
      case API_SELECTION.MONITOR:
        const monitorTable = getMonitorTable();
        console.log(monitorTable);
        break;
      case API_SELECTION.REPORTING:
        const reportingTable = getReportingTable();
        console.log(reportingTable);
        break;
      case API_SELECTION.AUDIT:
        const auditTable = getAuditLogsTable();
        console.log(auditTable);
        break;
    }
  } else {
    const apiTable = getApiTable();
    console.log(apiTable);
  }
};

export default { command, describe, builder, handler };
