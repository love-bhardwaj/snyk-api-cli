import ora from "ora";
import chalk from "chalk";

export function apiSpinner() {
  const spinner = ora(chalk.blueBright("Calling Snyk API..."));
  spinner.color = "yellow";
  return spinner;
}
