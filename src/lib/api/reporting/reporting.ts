import { Report } from 'snyk-api-client';
import { COMMAND_ARGS, REPORTING_API_ENDPOINTS } from '../../../enums/enums';
import { InvalidEndpointError } from '../../../errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../utils/spinners';
import { appDebugLog, reqDebugLog } from '../../utils/debugLogger';
import reportingEndpoints from './reportingEndpoints';
import chalk from 'chalk';
import inputValidation from '../../utils/inputValidation';
import prettyPrint from '../../utils/prettyPrint';
import readJsonFile from '../../utils/readJsonFile';

export default async (args: any) => {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Processing reporting API request');
  apiSpinnerStart();

  try {
    switch (endpoint) {
      case REPORTING_API_ENDPOINTS.LIST_LATEST_ISSUES:
        inputValidation({ args, filePath: true });

        const filePath = args[COMMAND_ARGS.FILE];
        const fileContent = readJsonFile(filePath);

        let queryParams: any = {};
        if (args[COMMAND_ARGS.PAGE]) queryParams.page = args[COMMAND_ARGS.PAGE];
        if (args[COMMAND_ARGS.PER_PAGE]) queryParams.perPage = args[COMMAND_ARGS.PER_PAGE];
        if (args[COMMAND_ARGS.SORT_BY]) queryParams.sortBy = args[COMMAND_ARGS.SORT_BY];
        if (args[COMMAND_ARGS.ORDER]) queryParams.orger = args[COMMAND_ARGS.ORDER];
        if (args[COMMAND_ARGS.GROUP_BY]) queryParams.groupBy = args[COMMAND_ARGS.GROUP_BY];

        const listLatesIssuesRes = await Report.getListOfLatestIssues({ requestBody: fileContent, queryParams });
        apiSpinnerStop();
        reqDebugLog(listLatesIssuesRes);
        prettyPrint(listLatesIssuesRes.response);
        break;
      case REPORTING_API_ENDPOINTS.LIST_ISSUES:
        inputValidation({ args, from: true, to: true, filePath: true });

        const from = args[COMMAND_ARGS.FROM];
        const to = args[COMMAND_ARGS.TO];

        const filePath1 = args[COMMAND_ARGS.FILE];
        const fileContent1 = readJsonFile(filePath1);

        let queryParams1: any = { from, to };
        if (args[COMMAND_ARGS.PAGE]) queryParams1.page = args[COMMAND_ARGS.PAGE];
        if (args[COMMAND_ARGS.PER_PAGE]) queryParams1.perPage = args[COMMAND_ARGS.PER_PAGE];
        if (args[COMMAND_ARGS.SORT_BY]) queryParams1.sortBy = args[COMMAND_ARGS.SORT_BY];
        if (args[COMMAND_ARGS.ORDER]) queryParams1.orger = args[COMMAND_ARGS.ORDER];
        if (args[COMMAND_ARGS.GROUP_BY]) queryParams1.groupBy = args[COMMAND_ARGS.GROUP_BY];

        const listIssuesRes = await Report.getListOfIssues({ requestBody: fileContent1, queryParams: queryParams1 });
        apiSpinnerStop();
        reqDebugLog(listIssuesRes);
        prettyPrint(listIssuesRes.response);
        break;

      case REPORTING_API_ENDPOINTS.LATEST_ISSUE_COUNTS:
        inputValidation({ args, filePath: true });

        const filePath2 = args[COMMAND_ARGS.FILE];
        const fileContent2 = readJsonFile(filePath2);

        let queryParams2: any = {};
        if (args[COMMAND_ARGS.GROUP_BY]) queryParams2.groupBy = args[COMMAND_ARGS.GROUP_BY];

        const latestIssueCountRes = await Report.getLatestIssueCounts({
          requestBody: fileContent2,
          queryParams: queryParams2,
        });
        apiSpinnerStop();
        reqDebugLog(latestIssueCountRes);
        prettyPrint(latestIssueCountRes.response);
        break;

      case REPORTING_API_ENDPOINTS.ISSUE_COUNTS:
        inputValidation({ args, from: true, to: true, filePath: true });

        const from1 = args[COMMAND_ARGS.FROM];
        const to1 = args[COMMAND_ARGS.TO];

        const filePath3 = args[COMMAND_ARGS.FILE];
        const fileContent3 = readJsonFile(filePath3);

        let queryParams3: any = { from: from1, to: to1 };
        if (args[COMMAND_ARGS.GROUP_BY]) queryParams3.groupBy = args[COMMAND_ARGS.GROUP_BY];

        const issueCountsRes = await Report.getIssueCounts({ requestBody: fileContent3, queryParams: queryParams3 });
        apiSpinnerStop();
        reqDebugLog(issueCountsRes);
        prettyPrint(issueCountsRes.response);
        break;

      case REPORTING_API_ENDPOINTS.LATEST_PROJECT_COUNTS:
        inputValidation({ args, filePath: true });
        const filePath4 = args[COMMAND_ARGS.FILE];
        const fileContent4 = readJsonFile(filePath4);

        const latestProjectCountRes = await Report.getLatestProjectCounts({ requestBody: fileContent4 });
        apiSpinnerStop();
        reqDebugLog(latestProjectCountRes);
        prettyPrint(latestProjectCountRes.response);
        break;

      case REPORTING_API_ENDPOINTS.PROJECT_COUNTS:
        inputValidation({ args, filePath: true, from: true, to: true });

        const from2 = args[COMMAND_ARGS.FROM];
        const to2 = args[COMMAND_ARGS.TO];

        const filePath5 = args[COMMAND_ARGS.FILE];
        const fileContent5 = readJsonFile(filePath5);

        const queryParams4: any = { from: from2, to: to2 };
        const projectCountsRes = await Report.getProjectCountsOverTime({
          requestBody: fileContent5,
          queryParams: queryParams4,
        });
        apiSpinnerStop();
        reqDebugLog(projectCountsRes);
        prettyPrint(projectCountsRes.response);
        break;

      case REPORTING_API_ENDPOINTS.TEST_COUNTS:
        inputValidation({ args, filePath: true, from: true, to: true });

        const from3 = args[COMMAND_ARGS.FROM];
        const to3 = args[COMMAND_ARGS.TO];

        const filePath6 = args[COMMAND_ARGS.FILE];
        const fileContent6 = readJsonFile(filePath6);

        const queryParams5: any = { from: from3, to: to3 };
        if (args[COMMAND_ARGS.GROUP_BY]) queryParams5.groupBy = args[COMMAND_ARGS.GROUP_BY];
        const testCountRes = await Report.getTestCounts({ requestBody: fileContent6, queryParams: queryParams5 });
        apiSpinnerStop();
        reqDebugLog(testCountRes);
        prettyPrint(testCountRes.response);
        break;
      default:
        apiSpinnerStop();
        throw new InvalidEndpointError(
          `The --endpoint or -e value passed is not acceptable, select one from [${chalk.greenBright(
            reportingEndpoints,
          )}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
};
