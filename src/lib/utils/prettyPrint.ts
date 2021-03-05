import chalk from 'chalk';

export default (obj: object) => {
  console.log(chalk.green(JSON.stringify(obj, null, 4)));
};
