import { execSync } from 'child_process';

export const run = (args: string) => {
  return execSync(`ts-node src/index ${args}`).toString();
};

export const isValidJSON = (args: any) => {
  try {
    JSON.parse(args);
  } catch (e) {
    return false;
  }
  return true;
};
