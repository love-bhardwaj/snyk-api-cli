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
import handler from '../../../lib/list/listHandler';

const command = 'list [options]';
const describe = 'List API and related endpoints available';

const builder: yargs.CommandBuilder = {
  api: {
    describe: 'The API group you want to get the endpoints for',
    alias: 'a',
    string: true,
  },
};

export default { command, describe, builder, handler };
