import chalk from 'chalk';
import debug from 'debug';

const appDebugLogger = debug('app');
const reqDebugLogger = debug('req');
const miscDebugLogger = debug('misc');

export function appDebugLog(...messages: any) {
  for (const message of messages) {
    appDebugLogger(chalk.greenBright(message));
  }
}

export function appErrorLog(...errors: any) {
  for (const error of errors) {
    appDebugLog(error.stack ? error.stack : error);
  }
}

export function reqDebugLog(...messages: any) {
  for (const message of messages) {
    reqDebugLogger(chalk.blueBright(message));
  }
}
export function miscDebugLog(...messages: any) {
  for (const message of messages) {
    miscDebugLogger(chalk.yellowBright(message));
  }
}
