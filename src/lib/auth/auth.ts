import ConfigStore from 'configstore';
const pkg = require('../../../package.json');
import tokenPrompt from '../prompts/tokenPrompt';
import { ClientConfig } from 'snyk-api-client';
import { appDebugLog, sensitiveLog } from '../../lib/utils/debugLogger';

const conf = new ConfigStore(pkg.name);

const getApiToken = async (): Promise<string> => {
  appDebugLog('getApiToken: called');
  try {
    let apiToken = conf.get('snyk-api.token');
    if (!apiToken) apiToken = await askForTokenAndSet();
    sensitiveLog(`return API token: token -> ${apiToken}`);
    return Promise.resolve(apiToken);
  } catch (error) {
    return Promise.reject(error);
  }
};

const saveTokenToConfig = (token: string) => {
  sensitiveLog(`saveTokenToConfig: token -> ${token}`);
  conf.set({ 'snyk-api.token': token });
};

const saveTokenToApiClient = (token: string) => {
  sensitiveLog(`saveTokenToApiClient: token -> ${token}`);
  ClientConfig.set({ apiToken: token });
};

const askForTokenAndSet = async (): Promise<string> => {
  appDebugLog('Prompting user to add token');
  try {
    const { token } = await tokenPrompt();
    saveTokenToConfig(token);
    return Promise.resolve(token);
  } catch (error) {
    return Promise.reject(error);
  }
};

const processAuth = async (): Promise<void> => {
  // If token not set, we prompt for token,
  // the only way to exit without submitting prompt
  // would be to exit the process
  appDebugLog('Processing auth');
  try {
    appDebugLog('Checking token for client');
    if (!ClientConfig.getApiToken()) {
      appDebugLog('Token not configure for client, fetching from config');
      const token = await getApiToken();
      saveTokenToApiClient(token);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const clearToken = () => {
  appDebugLog('Clearing token from client and config');
  ClientConfig.set({ apiToken: undefined });
  conf.set({ 'snyk-api.token': undefined });
};

export { getApiToken, saveTokenToConfig, processAuth, clearToken };
