import ConfigStore from "configstore";
const pkg = require("../../../package.json");
import tokenPrompt from "../prompts/tokenPrompt";
import { ClientConfig } from "snyk-api-client";

const conf = new ConfigStore(pkg.name);

const getApiToken = async (): Promise<string> => {
  try {
    let apiToken = conf.get("snyk-api.token");
    if (!apiToken) apiToken = await askForTokenAndSet();
    return Promise.resolve(apiToken);
  } catch (error) {
    return Promise.reject(error);
  }
};

const saveTokenToConfig = (token: string) => {
  conf.set({ "snyk-api.token": token });
};

const saveTokenToApiClient = (token: string) => {
  ClientConfig.set({ apiToken: token });
};

const askForTokenAndSet = async (): Promise<string> => {
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
  try {
    if (!ClientConfig.getApiToken()) {
      const token = await getApiToken();
      saveTokenToApiClient(token);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const clearToken = () => {
  ClientConfig.set({ apiToken: undefined });
  conf.set({ "snyk-api.token": undefined });
};

export { getApiToken, saveTokenToConfig, processAuth, clearToken };
