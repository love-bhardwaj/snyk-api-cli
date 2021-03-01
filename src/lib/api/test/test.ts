import { Test } from 'snyk-api-client';
import { TEST_API_ENDPOINTS, COMMAND_ARGS } from '../../../enums/enums';
import { InvalidEndpointError } from '../../../errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../utils/spinners';
import { appDebugLog, reqDebugLog } from '../../utils/debugLogger';
import testEndpoints from './testEndpoints';
import chalk from 'chalk';
import inputValidation from '../../utils/inputValidation';
import prettyPrint from '../../utils/prettyPrint';
import readJsonFile from '../../utils/readJsonFile';

export default async (args: any) => {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Processing test API request');
  apiSpinnerStart();

  try {
    switch (endpoint) {
      case TEST_API_ENDPOINTS.TEST_MAVEN_PACKAGE:
        inputValidation({ args, packageGroupId: true, artifactId: true, packageVersion: true });
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

        const fileContent = readJsonFile(filePath);

        let queryParams1: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams1.org = args[COMMAND_ARGS.ORG_ID];
        if (args[COMMAND_ARGS.REPOSITORY]) queryParams1.repository = args[COMMAND_ARGS.REPOSITORY];

        const mavenFileRes = await Test.testMavenFile({ requestBody: fileContent, queryParams: queryParams1 });
        apiSpinnerStop();
        reqDebugLog(mavenFileRes);
        prettyPrint(mavenFileRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_NPM_PACKAGE:
        inputValidation({ args, packageName: true, packageVersion: true });

        const packageName = args[COMMAND_ARGS.PACKAGE_NAME];
        const packageVersion = args[COMMAND_ARGS.PACKAGE_VERSION];

        let queryParams2: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams2.org = args[COMMAND_ARGS.ORG_ID];

        const npmPackageRes = await Test.testNpmPackage(
          { packageName, version: packageVersion },
          { queryParams: queryParams2 },
        );
        apiSpinnerStop();
        reqDebugLog(npmPackageRes);
        prettyPrint(npmPackageRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_NPM_FILE:
        inputValidation({ args, filePath: true });

        const filePath1 = args[COMMAND_ARGS.FILE];

        let queryParams3: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams3.org = args[COMMAND_ARGS.ORG_ID];

        const fileContent1 = readJsonFile(filePath1);

        const npmFileRes = await Test.testNpmFile({ requestBody: fileContent1, queryParams: queryParams3 });
        apiSpinnerStop();
        reqDebugLog(npmFileRes);
        prettyPrint(npmFileRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_GOPKG_FILE:
        inputValidation({ args, filePath: true });

        const filePath2 = args[COMMAND_ARGS.FILE];

        let queryParams4: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams4.org = args[COMMAND_ARGS.ORG_ID];

        const fileContent2 = readJsonFile(filePath2);

        const goPkgFileRes = await Test.testGopkgFile({ requestBody: fileContent2, queryParams: queryParams4 });
        apiSpinnerStop();
        reqDebugLog(goPkgFileRes);
        prettyPrint(goPkgFileRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_VENDOR_FILE:
        inputValidation({ args, filePath: true });

        const filePath3 = args[COMMAND_ARGS.FILE];

        let queryParams5: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams5.org = args[COMMAND_ARGS.ORG_ID];

        const fileContent3 = readJsonFile(filePath3);
        const vendorFileRes = await Test.testVendorFile({ requestBody: fileContent3, queryParams: queryParams5 });
        apiSpinnerStop();
        reqDebugLog(vendorFileRes);
        prettyPrint(vendorFileRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_YARN_FILE:
        inputValidation({ args, filePath: true });

        const filePath4 = args[COMMAND_ARGS.FILE];

        let queryParams6: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams6.org = args[COMMAND_ARGS.ORG_ID];

        const fileContent4 = readJsonFile(filePath4);
        const yarnFileRes = await Test.testYarnFile({ requestBody: fileContent4, queryParams: queryParams6 });
        apiSpinnerStop();
        reqDebugLog(yarnFileRes);
        prettyPrint(yarnFileRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_GEM_PACKAGE:
        inputValidation({ args, gemName: true, packageVersion: true });

        const gemName = args[COMMAND_ARGS.GEM_NAME];
        const version1 = args[COMMAND_ARGS.PACKAGE_VERSION];

        let queryParams7: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams7.org = args[COMMAND_ARGS.ORG_ID];

        const gemsPackageRes = await Test.testRubyGemsPackage(
          { gemName, version: version1 },
          { queryParams: queryParams7 },
        );
        apiSpinnerStop();
        reqDebugLog(gemsPackageRes);
        prettyPrint(gemsPackageRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_GEM_FILE:
        inputValidation({ args, filePath: true });

        const filePath5 = args[COMMAND_ARGS.FILE];
        const fileContent5 = readJsonFile(filePath5);

        let queryParams8: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams8.org = args[COMMAND_ARGS.ORG_ID];

        const gemFileRes = await Test.testRubyGemsFile({ requestBody: fileContent5, queryParams: queryParams8 });
        apiSpinnerStop();
        reqDebugLog(gemFileRes);
        prettyPrint(gemFileRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_GRADLE_PACKAGE:
        inputValidation({ args, packageGroupId: true, packageName: true, packageVersion: true });

        const groupId1 = args[COMMAND_ARGS.GROUP_ID];
        const packageName1 = args[COMMAND_ARGS.PACKAGE_NAME];
        const packageVersion1 = args[COMMAND_ARGS.PACKAGE_VERSION];

        let queryParams9: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams9.org = args[COMMAND_ARGS.ORG_ID];
        if (args[COMMAND_ARGS.REPOSITORY]) queryParams9.repository = args[COMMAND_ARGS.REPOSITORY];

        const gradlePackageRes = await Test.testGradlePacakge(
          { group: groupId1, name: packageName1, version: packageVersion1 },
          { queryParams: queryParams9 },
        );
        apiSpinnerStop();
        reqDebugLog(gradlePackageRes);
        prettyPrint(gradlePackageRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_GRADLE_FILE:
        inputValidation({ args, filePath: true });

        const filePath6 = args[COMMAND_ARGS.FILE];
        const fileContent6 = readJsonFile(filePath6);

        let queryParams10: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams10.org = args[COMMAND_ARGS.ORG_ID];
        if (args[COMMAND_ARGS.REPOSITORY]) queryParams10.repository = args[COMMAND_ARGS.REPOSITORY];

        const gradleFileRes = await Test.testGradleFile({ requestBody: fileContent6, queryParams: queryParams10 });
        apiSpinnerStop();
        reqDebugLog(gradleFileRes);
        prettyPrint(gradleFileRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_SBT_PACAKGE:
        inputValidation({ args, packageGroupId: true, artifactId: true, packageVersion: true });

        const groupId2 = args[COMMAND_ARGS.GROUP_ID];
        const artifactId1 = args[COMMAND_ARGS.ARTIFACT_ID];
        const version2 = args[COMMAND_ARGS.PACKAGE_VERSION];

        let queryParams11: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams11.org = args[COMMAND_ARGS.ORG_ID];
        if (args[COMMAND_ARGS.REPOSITORY]) queryParams11.repository = args[COMMAND_ARGS.REPOSITORY];

        const sbtPackageRes = await Test.testSBTPackage(
          { groupId: groupId2, artifactId: artifactId1, version: version2 },
          { queryParams: queryParams11 },
        );
        apiSpinnerStop();
        reqDebugLog(sbtPackageRes);
        prettyPrint(sbtPackageRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_SBT_FILE:
        inputValidation({ args, filePath: true });

        const filePath7 = args[COMMAND_ARGS.FILE];
        const fileContent7 = readJsonFile(filePath7);

        let queryParams12: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams12.org = args[COMMAND_ARGS.ORG_ID];
        if (args[COMMAND_ARGS.REPOSITORY]) queryParams12.repository = args[COMMAND_ARGS.REPOSITORY];

        const sbtFileRes = await Test.testSBTFile({ requestBody: fileContent7, queryParams: queryParams12 });
        apiSpinnerStop();
        reqDebugLog(sbtFileRes);
        prettyPrint(sbtFileRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_PIP_PACKAGE:
        inputValidation({ args, packageName: true, packageVersion: true });

        const packageName2 = args[COMMAND_ARGS.PACKAGE_NAME];
        const packageVersion2 = args[COMMAND_ARGS.PACKAGE_VERSION];

        let queryParams13: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams13.org = args[COMMAND_ARGS.ORG_ID];

        const pipPackageTest = await Test.testPipPackage(
          { packageName: packageName2, version: packageVersion2 },
          { queryParams: queryParams13 },
        );
        apiSpinnerStop();
        reqDebugLog(pipPackageTest);
        prettyPrint(pipPackageTest.response);
        break;
      case TEST_API_ENDPOINTS.TEST_PIP_FILE:
        inputValidation({ args, filePath: true });

        const filePath8 = args[COMMAND_ARGS.FILE];
        const fileContent8 = readJsonFile(filePath8);

        let queryParams14: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams14.org = args[COMMAND_ARGS.ORG_ID];

        const pipFileRes = await Test.testPipFile({ requestBody: fileContent8, queryParams: queryParams14 });
        apiSpinnerStop();
        reqDebugLog(pipFileRes);
        prettyPrint(pipFileRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_COMPOSER_FILE:
        inputValidation({ args, filePath: true });

        const filePath9 = args[COMMAND_ARGS.FILE];
        const fileContent9 = readJsonFile(filePath9);

        let queryParams15: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams15.org = args[COMMAND_ARGS.ORG_ID];

        const composerFileRes = await Test.testComposerFile({ requestBody: fileContent9, queryParams: queryParams15 });
        apiSpinnerStop();
        reqDebugLog(composerFileRes);
        prettyPrint(composerFileRes.response);
        break;
      case TEST_API_ENDPOINTS.TEST_DEP_GRAPH:
        inputValidation({ args, filePath: true });

        const filePath10 = args[COMMAND_ARGS.FILE];
        const fileContent10 = readJsonFile(filePath10);

        let queryParams16: any = {};
        if (args[COMMAND_ARGS.ORG_ID]) queryParams16.org = args[COMMAND_ARGS.ORG_ID];

        const testDepGraphRes = await Test.testDepGraph({ requestBody: fileContent10, queryParams: queryParams16 });
        apiSpinnerStop();
        reqDebugLog(testDepGraphRes);
        prettyPrint(testDepGraphRes.response);
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
