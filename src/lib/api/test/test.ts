import { Test } from 'snyk-api-client';
import { TEST_API_ENDPOINTS, COMMAND_ARGS } from '../../../enums/enums';
import { InvalidEndpointError } from '../../../errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../utils/spinners';
import { appDebugLog, reqDebugLog } from '../../utils/debugLogger';
import testEndpoints from './testEndpoints';
import chalk from 'chalk';
import inputValidation from '../../utils/inputValidation';
import prettyPrint from '../../utils/prettyPrint';
import readJson from '../../utils/readJsonFile';

export default async (args: any) => {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Processing test API request');
  apiSpinnerStart();

  try {
    switch (endpoint) {
      case TEST_API_ENDPOINTS.TEST_MAVEN_PACKAGE:
        inputValidation({ args, groupId: true, artifactId: true, packageVersion: true });
        const groupId = args[COMMAND_ARGS.GROUP_ID];
        const artifactId = args[COMMAND_ARGS.ARTIFACT_ID];
        const version = args[COMMAND_ARGS.PACKAGE_VERSION];

        let queryParams: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams.org = args[COMMAND_ARGS.ORG_ID];
        if (args[COMMAND_ARGS.REPOSITORY]) queryParams.repository = args[COMMAND_ARGS.REPOSITORY];

        const mavenPackageRes = await Test.testMavenPackage({ groupId, artifactId, version }, { queryParams });
        apiSpinnerStop();
        reqDebugLog(mavenPackageRes);
        prettyPrint(mavenPackageRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_MAVEN_FILE:
        inputValidation({ args, filePath: true });
        const filePath = args[COMMAND_ARGS.FILE];

        const fileContent = readJson(filePath);

        let queryParams1: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams1.org = args[COMMAND_ARGS.ORG_ID];
        if (args[COMMAND_ARGS.REPOSITORY]) queryParams1.repository = args[COMMAND_ARGS.REPOSITORY];

        const mavenFileRes = await Test.testMavenFile({ requestBody: fileContent, queryParams: queryParams1 });
        apiSpinnerStop();
        reqDebugLog(mavenFileRes);
        prettyPrint(mavenFileRes.response);
        break;
      default:
        apiSpinnerStop();
        throw new InvalidEndpointError(
          `The --endpoint or -e value passed is not acceptable, select one from [${chalk.greenBright(testEndpoints)}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
};
