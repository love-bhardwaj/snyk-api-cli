import { clearToken, saveTokenToConfig } from '../../../lib/auth/auth';
import { printGreen, printRed } from '../../../lib/utils/printToConsole';
import { appDebugLog } from '../../../lib/utils/debugLogger';

const command = 'config [options]';
const describe = 'CLI took configurations';
const builder = {
  'clear-token': {
    describe: 'Clear the saved API token',
  },
  'auth-token': {
    describe: 'Save the Snyk API token',
  },
};

const handler = (argv: any) => {
  appDebugLog(`Config command with argv: ${JSON.stringify(argv)}`);

  if (argv['clear-token']) {
    clearToken();
    return printRed('API token cleared!');
  } else if (argv['auth-token']) {
    const token = argv['auth-token'];
    saveTokenToConfig(token);
    return printGreen('API token saved to config');
  }
};

export default { command, describe, builder, handler };
