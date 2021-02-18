import { saveTokenToConfig } from '../../../lib/auth/auth';
import { appDebugLog } from '../../../lib/utils/debugLogger';

const command = 'auth <token>';
const describe = 'Save the Snyk API token';
const builder = {};

const handler = (argv: any) => {
  appDebugLog(`Auth command with argv: ${JSON.stringify(argv)}`);
  const { token } = argv;
  saveTokenToConfig(token);
  appDebugLog('Token saved to config store');
};

export default { command, describe, builder, handler };
