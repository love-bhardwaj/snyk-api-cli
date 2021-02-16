import ConfigStore from "configstore";
const pkg = require("../../../package.json");
import inquirer from "../prompts/tokenPrompt";
import { ClientConfig } from "snyk-api-client";

const conf = new ConfigStore(pkg.name);

const getApiToken = async () => {
  let apiToken = conf.get("snyk-api.token");
  if (!apiToken) apiToken = await askForToken();
  return apiToken;
};

const saveTokenToConfig = (token: string) => {
  conf.set({ "snyk-api.token": token });
};

const askForToken = async () => {
  const res = await inquirer();
  conf.set({ "snyk-api.token": res.token });
  return res.token;
};

const checkAuth = async () => {
  if (!ClientConfig.getApiToken()) {
    const token = await getApiToken();
    ClientConfig.set({ apiToken: token });
  }
};

const clearToken = () => {
  ClientConfig.set({ apiToken: undefined });
  conf.set({ "snyk-api.token": undefined });
};

export { getApiToken, saveTokenToConfig, checkAuth, clearToken };
