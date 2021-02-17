import ora from "ora";
import chalk from "chalk";

const apiSpinner = ora(chalk.blueBright("Calling Snyk API..."));
apiSpinner.color = "yellow";

export function apiSpinnerStart() {
  apiSpinner.start();
}

export function apiSpinnerStop() {
  apiSpinner.stop();
  apiSpinner.clear();
}
