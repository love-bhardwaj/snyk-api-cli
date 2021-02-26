import chalk from 'chalk';
import debug from 'debug';
import JSONify from './JSONify';

const appDebugLogger = debug('app');
const errorLogger = debug('error');
const reqDebugLogger = debug('req');
const miscDebugLogger = debug('misc');
const sensitiveLogger = debug('secret');

export function appDebugLog(...messages: any) {
  for (const message of messages) {
    typeof message === 'object'
      ? appDebugLogger(`${chalk.green(JSONify(message))}`)
      : appDebugLogger(`${chalk.greenBright(message)}`);
  }
}

export function appErrorLog(...errors: any) {
  for (const error of errors) {
    typeof error === 'object' ? errorLogger(JSONify(error)) : errorLogger(`${error.stack ? error.stack : error}`);
  }
}

export function reqDebugLog(...messages: any) {
  for (const message of messages) {
    typeof message === 'object'
      ? reqDebugLogger(`${chalk.blueBright(JSONify(message))}`)
      : reqDebugLogger(`${chalk.blueBright(message)}`);
  }
}
export function miscDebugLog(...messages: any) {
  for (const message of messages) {
    typeof message === 'object'
      ? miscDebugLogger(`${chalk.yellowBright(JSONify(message))}`)
      : miscDebugLogger(`${chalk.yellowBright(message)}`);
  }
}

export function sensitiveLog(...messages: any) {
  for (const message of messages) {
    typeof message === 'object'
      ? sensitiveLogger(`${chalk.greenBright(JSONify(message))}`)
      : sensitiveLogger(`${chalk.greenBright(message)}`);
  }
}
