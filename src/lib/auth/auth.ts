import ConfigStore from "configstore";
const pkg = require("../../../package.json");
import tokenPrompt from "../prompts/tokenPrompt";
import { ClientConfig } from "snyk-api-client";

const conf = new ConfigStore(pkg.name);

const getApiToken = async () => {
  let apiToken = conf.get("snyk-api.token");
  if (!apiToken) apiToken = await askForTokenAndSet();
  return apiToken;
};

const saveTokenToConfig = (token: string) => {
  conf.set({ "snyk-api.token": token });
};

const saveTokenToApiClient = (token: string) => {
  ClientConfig.set({ apiToken: token });
};

const askForTokenAndSet = async () => {
  const { token } = await tokenPrompt();
  saveTokenToConfig(token);
  return token;
};

const processAuth = async () => {
  // If token not set, we prompt for token,
  // the only way to exit without submitting prompt
  // would be to exit the process
  if (!ClientConfig.getApiToken()) {
    const token = await getApiToken();
    saveTokenToApiClient(token);
  }
};

const clearToken = () => {
  ClientConfig.set({ apiToken: undefined });
  conf.set({ "snyk-api.token": undefined });
};

export { getApiToken, saveTokenToConfig, processAuth, clearToken };
