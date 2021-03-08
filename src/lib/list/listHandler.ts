import { appDebugLog } from '../utils/debugLogger';
import { COMMAND_ARGS, API_SELECTION } from '../../enums/enums';
import {
  getGeneralTable,
  getUserTable,
  getGroupsTable,
  getOrgTable,
  getIntegrationTable,
  getProjectTable,
  getDependencyTable,
  getLicenseTable,
  getEntitlementsTable,
  getTestTable,
  getMonitorTable,
  getReportingTable,
  getAuditLogsTable,
  getApiTable,
  getWebhooksTable,
} from './tables';
import { InvalidArgumentErr, InvalidEndpointError } from '../../errors/errors';
import apiList from '../api/apiList';
import chalk from 'chalk';
import JSONify from '../utils/JSONify';

export default (args: any) => {
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
      case API_SELECTION.WEBHOOKS:
        const webhooksTable = getWebhooksTable();
        console.log(webhooksTable);
      default:
        throw new InvalidArgumentErr(
          `
          Invalid arguments provided, select one from: [${chalk.green(apiList)}]
          `,
        );
    }
  } else {
    const apiTable = getApiTable();
    console.log(apiTable);
  }
};
