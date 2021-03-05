import yargs from 'yargs';
import listHandler from '../../../lib/list/listHandler';
import { appErrorLog } from '../../../lib/utils/debugLogger';
import { printRed } from '../../../lib/utils/printToConsole';

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
  try {
    listHandler(args);
  } catch (error) {
    appErrorLog(error);
    const errorMessage = error.message;
    printRed(errorMessage);
  }
};

export default { command, describe, builder, handler };
