import { appDebugLog, reqDebugLog } from '../../utils/debugLogger';
import { Project } from 'snyk-api-client';
import { COMMAND_ARGS, PROJECTS_API_ENDPOINTS } from '../../../enums/enums';
import { FilePathError, InvalidEndpointError, IssueIdError, OrgIdError, ProjectIdError } from '../../../errors/errors';
import { apiSpinnerStart, apiSpinnerStop } from '../../utils/spinners';
import chalk from 'chalk';
import projectsEndpoints from './projectsEndpoints';
import prettyPrint from '../../utils/prettyPrint';
import readJsonFile from '../../utils/readJsonFile';
import { CONNREFUSED } from 'dns';

export default async (args: any) => {
  const endpoint = args[COMMAND_ARGS.ENDPOINT];
  appDebugLog('Processing projects API request');
  apiSpinnerStart();

  try {
    switch (endpoint) {
      case PROJECTS_API_ENDPOINTS.LIST_ALL_PROJECTS:
        const orgId = args[COMMAND_ARGS.ORG_ID];
        if (!orgId) throw new OrgIdError();

        const projectListRes = await Project.getAllProjects({ orgId });
        apiSpinnerStop();
        reqDebugLog(projectListRes);
        prettyPrint(projectListRes.response);
        return;
      case PROJECTS_API_ENDPOINTS.RETRIEVE_SINGLE_PROJECT:
        const orgId1 = args[COMMAND_ARGS.ORG_ID];
        const projectId = args[COMMAND_ARGS.PROJECT_ID];

        if (!orgId1) throw new OrgIdError();
        if (!projectId) throw new ProjectIdError();

        const singleProjectRes = await Project.getSingleProject({ orgId: orgId1, projectId });
        apiSpinnerStop();
        reqDebugLog(singleProjectRes);
        prettyPrint(singleProjectRes.response);
        return;
      case PROJECTS_API_ENDPOINTS.UPDATE_PROJECT:
        const orgId2 = args[COMMAND_ARGS.ORG_ID];
        const projectId1 = args[COMMAND_ARGS.PROJECT_ID];
        const filePath = args[COMMAND_ARGS.FILE];

        if (!orgId2) throw new OrgIdError();
        if (!projectId1) throw new ProjectIdError();
        if (!filePath) throw new FilePathError();

        const fileContent = readJsonFile(filePath);
        const updateProjectRes = await Project.updateAProject(
          { orgId: orgId2, projectId: projectId1 },
          { requestBody: fileContent },
        );
        apiSpinnerStop();
        reqDebugLog(updateProjectRes);
        prettyPrint(updateProjectRes.response);
        return;

      case PROJECTS_API_ENDPOINTS.DELETE_PROJECT:
        const orgId3 = args[COMMAND_ARGS.ORG_ID];
        const projectId2 = args[COMMAND_ARGS.PROJECT_ID];

        if (!orgId3) throw new OrgIdError();
        if (!projectId2) throw new ProjectIdError();

        const deleteProjectRes = await Project.deleteAProject({ orgId: orgId3, projectId: projectId2 });
        apiSpinnerStop();
        reqDebugLog(deleteProjectRes);
        prettyPrint(deleteProjectRes.response);

      case PROJECTS_API_ENDPOINTS.DEACTIVATE_PROJECT:
        const orgId4 = args[COMMAND_ARGS.ORG_ID];
        const projectId3 = args[COMMAND_ARGS.PROJECT_ID];

        if (!orgId4) throw new OrgIdError();
        if (!projectId3) throw new ProjectIdError();

        const deacProjRes = await Project.deactivateAProject({ orgId: orgId4, projectId: projectId3 });
        apiSpinnerStop();
        reqDebugLog(deacProjRes);
        prettyPrint(deacProjRes.response);
        return;

      case PROJECTS_API_ENDPOINTS.ACTIVATE_PROJECT:
        const orgId5 = args[COMMAND_ARGS.ORG_ID];
        const projectId4 = args[COMMAND_ARGS.PROJECT_ID];

        if (!orgId5) throw new OrgIdError();
        if (!projectId4) throw new ProjectIdError();

        const actProjectRes = await Project.activateAProject({ orgId: orgId5, projectId: projectId4 });
        apiSpinnerStop();
        reqDebugLog(actProjectRes);
        prettyPrint(actProjectRes.response);
        return;

      case PROJECTS_API_ENDPOINTS.LIST_ALL_AGGREGATE_ISSUES:
        const orgId6 = args[COMMAND_ARGS.ORG_ID];
        const projectId5 = args[COMMAND_ARGS.PROJECT_ID];

        if (!orgId6) throw new OrgIdError();
        if (!projectId5) throw new ProjectIdError();

        const listAggIssuesRes = await Project.getAggProjectIssues({ orgId: orgId6, projectId: projectId5 });
        apiSpinnerStop();
        reqDebugLog(listAggIssuesRes);
        prettyPrint(listAggIssuesRes.response);
        return;

      case PROJECTS_API_ENDPOINTS.GET_PROJECT_DEP_GRAPH:
        const orgId7 = args[COMMAND_ARGS.ORG_ID];
        const projectId6 = args[COMMAND_ARGS.PROJECT_ID];

        if (!orgId7) throw new OrgIdError();
        if (!projectId6) throw new ProjectIdError();

        const depGraphRes = await Project.getProjectDepGraph({ orgId: orgId7, projectId: projectId6 });
        apiSpinnerStop();
        reqDebugLog(depGraphRes);
        prettyPrint(depGraphRes.response);
        return;

      case PROJECTS_API_ENDPOINTS.LIST_ALL_IGNORES:
        const orgId8 = args[COMMAND_ARGS.ORG_ID];
        const projectId7 = args[COMMAND_ARGS.PROJECT_ID];

        if (!orgId8) throw new OrgIdError();
        if (!projectId7) throw new ProjectIdError();

        const listAllIgnoresRes = await Project.listAllIgnores({ orgId: orgId8, projectId: projectId7 });
        apiSpinnerStop();
        reqDebugLog(listAllIgnoresRes);
        prettyPrint(listAllIgnoresRes.response);
        return;

      case PROJECTS_API_ENDPOINTS.RETRIEVE_IGNORE:
        const orgId9 = args[COMMAND_ARGS.ORG_ID];
        const projectId8 = args[COMMAND_ARGS.PROJECT_ID];
        const issueId = args[COMMAND_ARGS.ISSUE_ID];

        if (!orgId9) throw new OrgIdError();
        if (!projectId8) throw new ProjectIdError();
        if (!issueId) throw new IssueIdError();

        const getIgnoreRes = await Project.retrieveIgnore({ orgId: orgId9, projectId: projectId8, issueId });
        apiSpinnerStop();
        reqDebugLog(getIgnoreRes);
        prettyPrint(getIgnoreRes.response);
        return;
      case PROJECTS_API_ENDPOINTS.ADD_IGNORE:
        const orgId10 = args[COMMAND_ARGS.ORG_ID];
        const projectId9 = args[COMMAND_ARGS.PROJECT_ID];
        const issueId1 = args[COMMAND_ARGS.ISSUE_ID];
        const filePath1 = args[COMMAND_ARGS.FILE];

        if (!orgId10) throw new OrgIdError();
        if (!projectId9) throw new ProjectIdError();
        if (!issueId1) throw new IssueIdError();
        if (!filePath1) throw new FilePathError();

        const fileContent1 = readJsonFile(filePath1);
        const addIgnoreRes = await Project.addIgnore(
          { orgId: orgId10, projectId: projectId9, issueId: issueId1 },
          { requestBody: fileContent1 },
        );
        apiSpinnerStop();
        reqDebugLog(addIgnoreRes);
        prettyPrint(addIgnoreRes.response);
        return;
      case PROJECTS_API_ENDPOINTS.REPLACE_IGNORES:
        const orgId11 = args[COMMAND_ARGS.ORG_ID];
        const projectId10 = args[COMMAND_ARGS.PROJECT_ID];
        const issueId2 = args[COMMAND_ARGS.ISSUE_ID];
        const filePath2 = args[COMMAND_ARGS.FILE];

        if (!orgId11) throw new OrgIdError();
        if (!projectId10) throw new ProjectIdError();
        if (!issueId2) throw new IssueIdError();
        if (!filePath2) throw new FilePathError();

        const fileContent2 = readJsonFile(filePath2);
        const replaceIgnoreRes = await Project.replaceIgnores(
          { orgId: orgId11, projectId: projectId10, issueId: issueId2 },
          { requestBody: fileContent2 },
        );
        apiSpinnerStop();
        reqDebugLog(replaceIgnoreRes);
        prettyPrint(replaceIgnoreRes.response);
        return;
      case PROJECTS_API_ENDPOINTS.DELETE_IGNORES:
        const orgId12 = args[COMMAND_ARGS.ORG_ID];
        const projectId11 = args[COMMAND_ARGS.PROJECT_ID];
        const issueId3 = args[COMMAND_ARGS.ISSUE_ID];

        if (!orgId12) throw new OrgIdError();
        if (!projectId11) throw new ProjectIdError();
        if (!issueId3) throw new IssueIdError();

        const deleteIgnoreRes = await Project.deleteIgnores({
          orgId: orgId12,
          projectId: projectId11,
          ignoreId: issueId3,
        });
        apiSpinnerStop();
        reqDebugLog(deleteIgnoreRes);
        prettyPrint(deleteIgnoreRes.response);
        return;
      case PROJECTS_API_ENDPOINTS.LIST_ALL_JIRA_ISSUES:
        const orgId13 = args[COMMAND_ARGS.ORG_ID];
        const projectId12 = args[COMMAND_ARGS.PROJECT_ID];

        if (!orgId13) throw new OrgIdError();
        if (!projectId12) throw new ProjectIdError();

        const jirListRes = await Project.listAllJiraIssues({ orgId: orgId13, projectId: projectId12 });
        apiSpinnerStop();
        reqDebugLog(jirListRes);
        prettyPrint(jirListRes.response);
        return;

      case PROJECTS_API_ENDPOINTS.CREATE_JIRA_ISSUE:
        const orgId14 = args[COMMAND_ARGS.ORG_ID];
        const projectId13 = args[COMMAND_ARGS.PROJECT_ID];
        const issueId4 = args[COMMAND_ARGS.ISSUE_ID];
        const filePath3 = args[COMMAND_ARGS.FILE];

        if (!orgId14) throw new OrgIdError();
        if (!projectId13) throw new ProjectIdError();
        if (!issueId4) throw new IssueIdError();
        if (!filePath3) throw new FilePathError();

        const fileContent3 = readJsonFile(filePath3);
        const createJiraRes = await Project.createJiraIssue(
          { orgId: orgId14, projectId: projectId13, issueId: issueId4 },
          { requestBody: fileContent3 },
        );
        apiSpinnerStop();
        reqDebugLog(createJiraRes);
        prettyPrint(createJiraRes.response);
        return;
      case PROJECTS_API_ENDPOINTS.LIST_PROJECT_SETTINGS:
        const orgId15 = args[COMMAND_ARGS.ORG_ID];
        const projectId14 = args[COMMAND_ARGS.PROJECT_ID];

        if (!orgId15) throw new OrgIdError();
        if (!projectId14) throw new ProjectIdError();

        const projectSettingRes = await Project.listProjectSettings({ orgId: orgId15, projectId: projectId14 });
        apiSpinnerStop();
        reqDebugLog(projectSettingRes);
        prettyPrint(projectSettingRes.response);
        return;
      case PROJECTS_API_ENDPOINTS.UPDATE_PROJECT_SETTINGS:
        const orgId16 = args[COMMAND_ARGS.ORG_ID];
        const projectId15 = args[COMMAND_ARGS.PROJECT_ID];
        const filePath4 = args[COMMAND_ARGS.FILE];

        if (!orgId16) throw new OrgIdError();
        if (!projectId15) throw new ProjectIdError();
        if (!filePath4) throw new FilePathError();

        const fileContent4 = readJsonFile(filePath4);
        const updateSettingsRes = await Project.updateProjectSettings(
          { orgId: orgId16, projectId: projectId15 },
          { requestBody: fileContent4 },
        );
        apiSpinnerStop();
        reqDebugLog(updateSettingsRes);
        prettyPrint(updateSettingsRes.response);
        return;
      case PROJECTS_API_ENDPOINTS.DELETE_PROJECT_SETTINGS:
        const orgId17 = args[COMMAND_ARGS.ORG_ID];
        const projectId16 = args[COMMAND_ARGS.PROJECT_ID];

        if (!orgId17) throw new OrgIdError();
        if (!projectId16) throw new ProjectIdError();

        const delProjSetRes = await Project.deleteProjectSettings({ orgId: orgId17, projectId: projectId16 });
        apiSpinnerStop();
        reqDebugLog(delProjSetRes);
        prettyPrint(delProjSetRes.response);
        return;
      case PROJECTS_API_ENDPOINTS.MOVE_PROJECT:
        const orgId18 = args[COMMAND_ARGS.ORG_ID];
        const projectId17 = args[COMMAND_ARGS.PROJECT_ID];
        const filePath5 = args[COMMAND_ARGS.FILE];

        if (!orgId18) throw new OrgIdError();
        if (!projectId17) throw new ProjectIdError();
        if (!filePath5) throw new FilePathError();

        const fileContent5 = readJsonFile(filePath5);
        const moveProjectRes = await Project.moveProject(
          { orgId: orgId18, projectId: projectId17 },
          { requestBody: fileContent5 },
        );
        apiSpinnerStop();
        reqDebugLog(moveProjectRes);
        prettyPrint(moveProjectRes.response);
        return;
      case PROJECTS_API_ENDPOINTS.ADD_TAG:
        const orgId19 = args[COMMAND_ARGS.ORG_ID];
        const projectId18 = args[COMMAND_ARGS.PROJECT_ID];
        const filePath6 = args[COMMAND_ARGS.FILE];

        if (!orgId19) throw new OrgIdError();
        if (!projectId18) throw new ProjectIdError();
        if (!filePath6) throw new FilePathError();

        const fileContent6 = readJsonFile(filePath6);
        const addTagRes = await Project.addATag(
          { orgId: orgId19, projectId: projectId18 },
          { requestBody: fileContent6 },
        );
        apiSpinnerStop();
        reqDebugLog(addTagRes);
        prettyPrint(addTagRes.response);
        return;
      case PROJECTS_API_ENDPOINTS.REMOVE_PROJECT_TAG:
        const orgId20 = args[COMMAND_ARGS.ORG_ID];
        const projectId19 = args[COMMAND_ARGS.PROJECT_ID];
        const filePath7 = args[COMMAND_ARGS.FILE];

        if (!orgId20) throw new OrgIdError();
        if (!projectId19) throw new ProjectIdError();
        if (!filePath7) throw new FilePathError();

        const fileContent7 = readJsonFile(filePath7);
        const removeTagRes = await Project.removeATag(
          { orgId: orgId20, projectId: projectId19 },
          { requestBody: fileContent7 },
        );
        apiSpinnerStop();
        reqDebugLog(removeTagRes);
        prettyPrint(removeTagRes.response);
        return;
      case PROJECTS_API_ENDPOINTS.APPLY_ATTRIBUTES:
        const orgId21 = args[COMMAND_ARGS.ORG_ID];
        const projectId20 = args[COMMAND_ARGS.PROJECT_ID];
        const filePath8 = args[COMMAND_ARGS.FILE];

        if (!orgId21) throw new OrgIdError();
        if (!projectId20) throw new ProjectIdError();
        if (!filePath8) throw new FilePathError();

        const fileContent8 = readJsonFile(filePath8);
        const applyAttRes = await Project.applyAttributes(
          { orgId: orgId21, projectId: projectId20 },
          { requestBody: fileContent8 },
        );
        apiSpinnerStop();
        reqDebugLog(applyAttRes);
        prettyPrint(applyAttRes.response);
        return;
      default:
        apiSpinnerStop();
        throw new InvalidEndpointError(
          `The --endpoint or -e value passed is not acceptable, select one from [${chalk.greenBright(
            projectsEndpoints,
          )}]`,
        );
    }
  } catch (error) {
    apiSpinnerStop();
    throw error;
  }
};
