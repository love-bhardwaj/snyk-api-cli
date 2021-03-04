import { clearToken, saveTokenToConfig } from '../../../lib/auth/auth';
import { printGreen, printRed } from '../../../lib/utils/printToConsole';
import { appDebugLog } from '../../../lib/utils/debugLogger';
import { COMMAND_ARGS } from '../../../enums/enums';
import JSONify from '../../../lib/utils/JSONify';
import yargs from 'yargs';

const command = 'config [options]';
const describe = 'CLI configurations';
const builder: yargs.CommandBuilder = {
  'clear-token': {
    describe: 'Clear the saved API token',
    boolean: true,
  },
  'auth-token': {
    describe: 'Save the Snyk API token',
    string: true,
  },
};

const handler = (argv: any) => {
  appDebugLog(`Config command called with argv: ${JSONify(argv)}`);

  if (argv[COMMAND_ARGS.CLEAR_TOKEN]) {
    clearToken();
    return printRed('API token cleared!');
  } else if (argv[COMMAND_ARGS.AUTH_TOKEN]) {
    const token = argv[COMMAND_ARGS.AUTH_TOKEN];
    if (!token) return printRed('Auth token not provided');
    saveTokenToConfig(token);
    return printGreen('API token set!');
  } else {
    return printRed('Invalid args passed!');
  }
};

export default { command, describe, builder, handler };
