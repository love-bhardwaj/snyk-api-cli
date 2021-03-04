import chalk from 'chalk';

export function printRed(message: string) {
  return console.log(chalk.red(message));
}

export function printGreen(message: string) {
  return console.log(chalk.greenBright(message));
}

export function printBlue(message: string) {
  return console.log(chalk.blueBright(message));
}

export function printWhite(message: string) {
  return console.log(chalk.white(message));
}
