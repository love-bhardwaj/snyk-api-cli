import chalk from 'chalk';
import apiOptions from '../api/apiList';
import generalEndpoints from '../api/general/generalEndpoints';

const menus = {
  main: `
    ${chalk.greenBright('snyk-api --api=[api-group] --endpoint=[api-endpoint] <arguments>')}

    ${chalk.blueBright('--api')} .......................... [${chalk.cyanBright(apiOptions)}]
    ${chalk.blueBright('--auth={SNYK_API_TOKEN}')} ........ [${chalk.cyanBright('Set the Snyk API token')}]
    ${chalk.blueBright('--clear-auth')} ................... [${chalk.cyanBright('Remove the saved Snyk API token')}]
    `,
  general: `
    "Available endpoint for general API group"

    ${chalk.blueBright('--endpoint')} ........ [${chalk.cyanBright(generalEndpoints)}]
    `,
};

export default function help(argv: any) {
  if (argv.api) {
    switch (argv.api) {
      case 'general':
        console.log(menus.general);
        break;
      default:
        break;
    }
  } else {
    console.log(menus.main);
  }
}
