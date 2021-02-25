import chalk from 'chalk';
import debug from 'debug';

const appDebugLogger = debug('app');
const errorLogger = debug('error');
const reqDebugLogger = debug('req');
const miscDebugLogger = debug('misc');
const sensitiveLogger = debug('secret');

function JSONify(obj: any) {
  return JSON.stringify(obj, null, 4);
}

export function appDebugLog(...messages: any) {
  for (const message of messages) {
    appDebugLogger(`${chalk.greenBright(message)}`);
  }
}

export function appErrorLog(...errors: any) {
  for (const error of errors) {
    if (typeof error === 'object') {
      errorLogger(JSONify(error));
    } else {
      errorLogger(`${error.stack ? error.stack : error}`);
    }
  }
}

export function reqDebugLog(...messages: any) {
  for (const message of messages) {
    if (typeof message === 'object') {
      reqDebugLogger(`${chalk.blueBright(JSONify(message))}`);
    } else {
      reqDebugLogger(`${chalk.blueBright(message)}`);
    }
  }
}
export function miscDebugLog(...messages: any) {
  for (const message of messages) {
    miscDebugLogger(`${chalk.yellowBright(message)}`);
  }
}

export function sensitiveLog(...messages: any) {
  for (const message of messages) {
    sensitiveLogger(`${chalk.greenBright(message)}`);
  }
}
