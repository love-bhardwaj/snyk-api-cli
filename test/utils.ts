import { execSync } from 'child_process';

export const run = (args: string) => {
  return execSync(`ts-node src/index ${args}`).toString();
};
