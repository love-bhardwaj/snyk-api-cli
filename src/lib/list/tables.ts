import chalk from 'chalk';
import Table from 'cli-table';
import {
  API_SELECTION,
  AUDIT_LOGS_API_ENDPOINTS,
  DEPENDENCIES_API_ENDPOINTS,
  ENTITLEMENTS_API_ENDPOINTS,
  GENERAL_API_ENDPOINTS,
  GROUPS_API_ENDPOINTS,
  INTEGRATIONS_ENDPOINTS,
  LICENSES_API_ENDPOINTS,
  MONITOR_API_ENDPOINTS,
  ORGS_API_ENDPOINTS,
  PROJECTS_API_ENDPOINTS,
  REPORTING_API_ENDPOINTS,
  TEST_API_ENDPOINTS,
  USERS_API_ENDPOINTS,
  WEBHOOK_API_ENDPOINTS,
} from '../../enums/enums';

function getGreen(text: string) {
  return chalk.green(text);
}
function getBlue(text: string) {
  return chalk.blue(text);
}

function getBoldWhite(text: string) {
  return chalk.bold.white('API Endpoints');
}

export const getApiTable = () => {
  const apiTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  apiTable.push(
    [`1. ${getGreen(API_SELECTION.GENERAL)}`, getBlue('https://snyk.docs.apiary.io/#reference/general')],
    [`2. ${getGreen(API_SELECTION.USERS)}`, getBlue('https://snyk.docs.apiary.io/#reference/users')],
    [`3. ${getGreen(API_SELECTION.GROUPS)}`, getBlue('https://snyk.docs.apiary.io/#reference/groups')],
    [`4. ${getGreen(API_SELECTION.ORGS)}`, getBlue('https://snyk.docs.apiary.io/#reference/organizations')],
    [`5. ${getGreen(API_SELECTION.INTEGRATIONS)}`, getBlue('https://snyk.docs.apiary.io/#reference/integrations')],
    [`6. ${getGreen(API_SELECTION.PROJECTS)}`, getBlue('https://snyk.docs.apiary.io/#reference/projects')],
    [`7. ${getGreen(API_SELECTION.DEPENDENCIES)}`, getBlue('https://snyk.docs.apiary.io/#reference/dependencies')],
    [`8. ${getGreen(API_SELECTION.LICENSES)}`, getBlue('https://snyk.docs.apiary.io/#reference/licenses')],
    [`9. ${getGreen(API_SELECTION.ENTITLEMENTS)}`, getBlue('https://snyk.docs.apiary.io/#reference/entitlements')],
    [`10. ${getGreen(API_SELECTION.TEST)}`, getBlue('https://snyk.docs.apiary.io/#reference/test')],
    [`11. ${getGreen(API_SELECTION.MONITOR)}`, getBlue('https://snyk.docs.apiary.io/#reference/monitor')],
    [`12. ${getGreen(API_SELECTION.MONITOR)}`, getBlue('https://snyk.docs.apiary.io/#reference/reporting-api')],
    [`13. ${getGreen(API_SELECTION.AUDIT)}`, getBlue('https://snyk.docs.apiary.io/#reference/audit-logs')],
  );
  return `
  The following is the list of API groups that are currently supported

${apiTable.toString()}

  Usage with process command: ${getGreen('snyk-api process --api=[API Group] --endpoint=[API Endpoint]')}

  To check the available endpoint for an API group, run ${getGreen('snyk-api list --api=[API Group]')}
`;
};

export const getGeneralTable = () => {
  const generalTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  generalTable.push([
    `1. ${getGreen(GENERAL_API_ENDPOINTS.API_DOCS)}`,
    getBlue('https://snyk.docs.apiary.io/#reference/general/the-api-details/general-api-documentation'),
  ]);

  return `
  The following are the endpoints currently available under the General API

${generalTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=general --endpoint=[API Endpoint]')}
  `;
};

export const getUserTable = () => {
  const userTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  userTable.push(
    [
      `1. ${getGreen(USERS_API_ENDPOINTS.GET_USER_DETAILS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/users/get-user-details'),
    ],
    [
      `2. ${getGreen(USERS_API_ENDPOINTS.GET_MY_DETAILS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/users/my-user-details/get-my-details'),
    ],
    [
      `3. ${getGreen(USERS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/users/user-organization-notification-settings/get-org-notification-settings',
      ),
    ],
    [
      `4. ${getGreen(USERS_API_ENDPOINTS.MODIFY_ORG_NOTI_SETTINGS)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/users/user-organization-notification-settings/modify-org-notification-settings',
      ),
    ],
    [
      `5. ${getGreen(USERS_API_ENDPOINTS.GET_PROJECT_NOTI_SETTINGS)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/users/user-project-notification-settings/get-project-notification-settings',
      ),
    ],
    [
      `6. ${getGreen(USERS_API_ENDPOINTS.MODIFY_PROJECT_NOTI_SETTINGS)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/users/user-project-notification-settings/modify-project-notification-settings',
      ),
    ],
  );

  return `
  The following are the endpoints currently available under the Users API

${userTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=users --endpoint=[API Endpoint]')}
  `;
};

export const getGroupsTable = () => {
  const groupTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  groupTable.push(
    [
      `1. ${getGreen(GROUPS_API_ENDPOINTS.VIEW_GROUP_SETTINGS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/groups/group-settings/view-group-settings'),
    ],
    [
      `2. ${getGreen(GROUPS_API_ENDPOINTS.UPDATE_GROUP_SETTINGS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/groups/group-settings/update-group-settings'),
    ],
    [
      `3. ${getGreen(GROUPS_API_ENDPOINTS.LIST_ALL_GROUP_MEMBERS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/groups/list-members-in-a-group/list-all-members-in-a-group'),
    ],
    [
      `4. ${getGreen(GROUPS_API_ENDPOINTS.ADD_MEMBER_TO_ORG)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/groups/members-in-an-organization-of-a-group/add-a-member-to-an-organization-within-a-group',
      ),
    ],
    [
      `5. ${getGreen(GROUPS_API_ENDPOINTS.LIST_ALL_GROUP_TAGS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/groups/list-all-tags-in-a-group/list-all-tags-in-a-group'),
    ],
    [
      `6. ${getGreen(GROUPS_API_ENDPOINTS.DELETE_TAG_FROM_GROUP)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/groups/delete-tag-from-group/delete-tag-from-group'),
    ],
  );

  return `
  The following are the endpoints currently available under the Groups API

${groupTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=groups --endpoint=[API Endpoint]')}
  `;
};

export const getOrgTable = () => {
  const orgTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  orgTable.push(
    [
      `1. ${getGreen(ORGS_API_ENDPOINTS.LIST_USER_ORGS)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/organizations/the-snyk-organization-for-a-request/list-all-the-organizations-a-user-belongs-to',
      ),
    ],
    [
      `2. ${getGreen(ORGS_API_ENDPOINTS.CREATE_NEW_ORG)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/organizations/create-organization/create-a-new-organization'),
    ],
    [
      `3. ${getGreen(ORGS_API_ENDPOINTS.GET_ORG_NOTI_SETTINGS)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/organizations/notification-settings/get-org-notification-settings',
      ),
    ],
    [
      `4. ${getGreen(ORGS_API_ENDPOINTS.SET_ORG_NOTI_SETTINGS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/organizations/notification-settings/set-notification-settings'),
    ],
    [
      `5. ${getGreen(ORGS_API_ENDPOINTS.INVITE_USER)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/organizations/user-invitation-to-organization/invite-users'),
    ],
    [
      `6. ${getGreen(ORGS_API_ENDPOINTS.LIST_ORG_MEMBERS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/organizations/members-in-organization/list-members'),
    ],
    [
      `7. ${getGreen(ORGS_API_ENDPOINTS.VIEW_ORG_SETTINGS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/organizations/organization-settings/view-organization-settings'),
    ],
    [
      `8. ${getGreen(ORGS_API_ENDPOINTS.UPDATE_ORG_SETTINGS)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/organizations/organization-settings/update-organization-settings',
      ),
    ],
    [
      `9. ${getGreen(ORGS_API_ENDPOINTS.UPDATE_MEMBER_ROLE)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/organizations/manage-roles-in-organization/update-a-member-in-the-organization',
      ),
    ],
    [
      `10. ${getGreen(ORGS_API_ENDPOINTS.REMOVE_MEMBER)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/organizations/manage-roles-in-organization/remove-a-member-from-the-organization',
      ),
    ],
    [
      `11. ${getGreen(ORGS_API_ENDPOINTS.REMOVE_ORG)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/organizations/manage-organization/remove-organization'),
    ],
  );

  return `
  The following are the endpoints currently available under the Orgs API

${orgTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=orgs --endpoint=[API Endpoint]')}
  `;
};

export const getIntegrationTable = () => {
  const integTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  integTable.push(
    [
      `1. ${getGreen(INTEGRATIONS_ENDPOINTS.LIST_INTEGRATIONS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/integrations/integrations/list'),
    ],
    [
      `2. ${getGreen(INTEGRATIONS_ENDPOINTS.ADD_NEW_INTEGRATION)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/integrations/integrations/add-new-integration'),
    ],
    [
      `3. ${getGreen(INTEGRATIONS_ENDPOINTS.UPDATE_EXISTING_INTEGRATION)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/integrations/integration/update-existing-integration'),
    ],
    [
      `4. ${getGreen(INTEGRATIONS_ENDPOINTS.DELETE_CREDENTIALS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/integrations/integration-authentication/delete-credentials'),
    ],
    [
      `5. ${getGreen(INTEGRATIONS_ENDPOINTS.PROVISION_NEW_BROKER_TOKEN)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/integrations/integration-broker-token-provisioning/provision-new-broker-token',
      ),
    ],
    [
      `6. ${getGreen(INTEGRATIONS_ENDPOINTS.SWITCH_BROKER_TOKEN)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/integrations/integration-broker-token-switching/switch-between-broker-tokens',
      ),
    ],
    [
      `7. ${getGreen(INTEGRATIONS_ENDPOINTS.CLONE_INTEGRATION)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/integrations/integration-cloning/clone-an-integration-(with-settings-and-credentials)',
      ),
    ],
    [
      `8. ${getGreen(INTEGRATIONS_ENDPOINTS.GET_INTEGRATION_BY_TYPE)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/integrations/integration-by-type/get-existing-integration-by-type',
      ),
    ],
    [
      `9. ${getGreen(INTEGRATIONS_ENDPOINTS.IMPORT_PROJECT)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/integrations/import-projects/import'),
    ],
    [
      `10. ${getGreen(INTEGRATIONS_ENDPOINTS.GET_IMPORT_JOB_DETAILS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/integrations/import-job-details/get-import-job-details'),
    ],
    [
      `11. ${getGreen(INTEGRATIONS_ENDPOINTS.GET_INTEGRATION_SETTINGS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/integrations/integration-settings/retrieve'),
    ],
    [
      `12. ${getGreen(INTEGRATIONS_ENDPOINTS.UPDATE_INTEGRATION_SETTINGS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/integrations/integration-settings/update'),
    ],
  );

  return `
  The following are the endpoints currently available under the Integrations API

${integTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=integrations --endpoint=[API Endpoint]')}
  `;
};

export const getProjectTable = () => {
  const projectTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  projectTable.push(
    [
      `1. ${getGreen(PROJECTS_API_ENDPOINTS.LIST_ALL_PROJECTS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/all-projects/list-all-projects'),
    ],
    [
      `2. ${getGreen(PROJECTS_API_ENDPOINTS.RETRIEVE_SINGLE_PROJECT)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/individual-project/retrieve-a-single-project'),
    ],
    [
      `3. ${getGreen(PROJECTS_API_ENDPOINTS.UPDATE_PROJECT)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/individual-project/update-a-project'),
    ],
    [
      `4. ${getGreen(PROJECTS_API_ENDPOINTS.DELETE_PROJECT)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/individual-project/delete-a-project'),
    ],
    [
      `5. ${getGreen(PROJECTS_API_ENDPOINTS.DEACTIVATE_PROJECT)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/deactivate-an-individual-project/deactivate'),
    ],
    [
      `6. ${getGreen(PROJECTS_API_ENDPOINTS.ACTIVATE_PROJECT)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/activate-an-individual-project/activate'),
    ],
    [
      `7. ${getGreen(PROJECTS_API_ENDPOINTS.LIST_ALL_AGGREGATE_ISSUES)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/aggregated-project-issues/list-all-aggregated-issues'),
    ],
    [
      `8. ${getGreen(PROJECTS_API_ENDPOINTS.GET_PROJECT_DEP_GRAPH)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/project-dependency-graph/get-project-dependency-graph'),
    ],
    [
      `9. ${getGreen(PROJECTS_API_ENDPOINTS.LIST_ALL_IGNORES)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/project-ignores/list-all-ignores'),
    ],
    [
      `10. ${getGreen(PROJECTS_API_ENDPOINTS.RETRIEVE_IGNORE)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/project-ignores-by-issue/retrieve-ignore'),
    ],
    [
      `11. ${getGreen(PROJECTS_API_ENDPOINTS.ADD_IGNORE)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/project-ignores-by-issue/add-ignore'),
    ],
    [
      `12. ${getGreen(PROJECTS_API_ENDPOINTS.REPLACE_IGNORES)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/project-ignores-by-issue'),
    ],
    [
      `13. ${getGreen(PROJECTS_API_ENDPOINTS.DELETE_IGNORES)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/project-ignores-by-issue/delete-ignores'),
    ],
    [
      `14. ${getGreen(PROJECTS_API_ENDPOINTS.LIST_ALL_JIRA_ISSUES)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/project-jira-issues/list-all-jira-issues'),
    ],
    [
      `15. ${getGreen(PROJECTS_API_ENDPOINTS.CREATE_JIRA_ISSUE)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/project-jira-issues/create-jira-issue'),
    ],
    [
      `16. ${getGreen(PROJECTS_API_ENDPOINTS.LIST_PROJECT_SETTINGS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/project-settings/list-project-settings'),
    ],
    [
      `17. ${getGreen(PROJECTS_API_ENDPOINTS.UPDATE_PROJECT_SETTINGS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/project-settings/update-project-settings'),
    ],
    [
      `18. ${getGreen(PROJECTS_API_ENDPOINTS.DELETE_PROJECT_SETTINGS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/project-settings/delete-project-settings'),
    ],
    [
      `19. ${getGreen(PROJECTS_API_ENDPOINTS.MOVE_PROJECT)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/move-project/move-project-to-a-different-org'),
    ],
    [
      `20. ${getGreen(PROJECTS_API_ENDPOINTS.ADD_TAG)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/project-tags/add-a-tag-to-a-project'),
    ],
    [
      `21. ${getGreen(PROJECTS_API_ENDPOINTS.REMOVE_PROJECT_TAG)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/remove-project-tag/remove-a-tag-from-a-project'),
    ],
    [
      `22. ${getGreen(PROJECTS_API_ENDPOINTS.APPLY_ATTRIBUTES)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/projects/project-attributes/applying-attributes'),
    ],
  );

  return `
  The following are the endpoints currently available under the Projects API

${projectTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=projects --endpoint=[API Endpoint]')}
  `;
};

export const getDependencyTable = () => {
  const depTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  depTable.push([
    `1. ${getGreen(DEPENDENCIES_API_ENDPOINTS.LIST_ALL_DEPENDENCIES)}`,
    getBlue('https://snyk.docs.apiary.io/#reference/dependencies/dependencies-by-organization/list-all-dependencies'),
  ]);

  return `
  The following are the endpoints currently available under the Dependencies API

${depTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=dependencies --endpoint=[API Endpoint]')}
  `;
};

export const getLicenseTable = () => {
  const licenseTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  licenseTable.push([
    `1. ${getGreen(LICENSES_API_ENDPOINTS.LIST_ALL_LICENSES)}`,
    getBlue('https://snyk.docs.apiary.io/#reference/licenses/licenses-by-organization/list-all-licenses'),
  ]);

  return `
  The following are the endpoints currently available under the Licenses API

${licenseTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=licenses --endpoint=[API Endpoint]')}
  `;
};

export const getEntitlementsTable = () => {
  const entitlementTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  entitlementTable.push(
    [
      `1. ${getGreen(ENTITLEMENTS_API_ENDPOINTS.LIST_ALL_ENTITLEMENTS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/entitlements/entitlements-by-organization/list-all-entitlements'),
    ],
    [
      `2. ${getGreen(ENTITLEMENTS_API_ENDPOINTS.GET_ENTITLEMENT_VALUE)}`,
      getBlue(
        "https://snyk.docs.apiary.io/#reference/entitlements/a-specific-entitlement-by-organization/get-an-organization's-entitlement-value",
      ),
    ],
  );

  return `
  The following are the endpoints currently available under the Users API

${entitlementTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=licenses --endpoint=[API Endpoint]')}
  `;
};

export const getTestTable = () => {
  const testTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  testTable.push(
    [
      `1. ${getGreen(TEST_API_ENDPOINTS.TEST_MAVEN_PACKAGE)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/test/maven/test-for-issues-in-a-public-package-by-group-id,-artifact-id-and-version',
      ),
    ],
    [
      `2. ${getGreen(TEST_API_ENDPOINTS.TEST_MAVEN_FILE)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/test/maven/test-maven-file'),
    ],
    [
      `3. ${getGreen(TEST_API_ENDPOINTS.TEST_NPM_PACKAGE)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/test/npm/test-for-issues-in-a-public-package-by-name-and-version',
      ),
    ],
    [
      `4. ${getGreen(TEST_API_ENDPOINTS.TEST_NPM_FILE)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/test/npm/test-package.json-&-package-lock.json-file'),
    ],
    [
      `5. ${getGreen(TEST_API_ENDPOINTS.TEST_GOPKG_FILE)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/test/dep/test-gopkg.toml-&-gopkg.lock-file'),
    ],
    [
      `6. ${getGreen(TEST_API_ENDPOINTS.TEST_VENDOR_FILE)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/test/vendor/test-vendor.json-file'),
    ],
    [
      `7. ${getGreen(TEST_API_ENDPOINTS.TEST_YARN_FILE)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/test/yarn/test-package.json-&-yarn.lock-file'),
    ],
    [
      `8. ${getGreen(TEST_API_ENDPOINTS.TEST_GEM_PACKAGE)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/test/rubygems/test-for-issues-in-a-public-gem-by-name-and-version',
      ),
    ],
    [
      `9. ${getGreen(TEST_API_ENDPOINTS.TEST_GEM_FILE)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/test/rubygems/test-gemfile.lock-file'),
    ],
    [
      `10. ${getGreen(TEST_API_ENDPOINTS.TEST_GRADLE_PACKAGE)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/test/gradle/test-for-issues-in-a-public-package-by-group,-name-and-version',
      ),
    ],
    [
      `11. ${getGreen(TEST_API_ENDPOINTS.TEST_GRADLE_FILE)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/test/gradle/test-gradle-file'),
    ],
    [
      `12. ${getGreen(TEST_API_ENDPOINTS.TEST_SBT_PACAKGE)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/test/sbt/test-for-issues-in-a-public-package-by-group-id,-artifact-id-and-version',
      ),
    ],
    [
      `13. ${getGreen(TEST_API_ENDPOINTS.TEST_SBT_FILE)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/test/sbt/test-sbt-file'),
    ],
    [
      `14. ${getGreen(TEST_API_ENDPOINTS.TEST_PIP_PACKAGE)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/test/pip/test-for-issues-in-a-public-package-by-name-and-version',
      ),
    ],
    [
      `15. ${getGreen(TEST_API_ENDPOINTS.TEST_PIP_FILE)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/test/pip/test-requirements.txt-file'),
    ],
    [
      `16. ${getGreen(TEST_API_ENDPOINTS.TEST_COMPOSER_FILE)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/test/composer/test-composer.json-&-composer.lock-file'),
    ],
    [
      `17. ${getGreen(TEST_API_ENDPOINTS.TEST_DEP_GRAPH)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/test/dep-graph/test-dep-graph'),
    ],
  );

  return `
  The following are the endpoints currently available under the Test API

${testTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=test --endpoint=[API Endpoint]')}
  `;
};

export const getMonitorTable = () => {
  const testTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  testTable.push([
    `1. ${getGreen(MONITOR_API_ENDPOINTS.MONITOR_DEP_GRAPH)}`,
    getBlue('https://snyk.docs.apiary.io/#reference/monitor/depgraph/monitor-dep-graph'),
  ]);

  return `
  The following are the endpoints currently available under the Monitor API

${testTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=monitor --endpoint=[API Endpoint]')}
  `;
};

export const getReportingTable = () => {
  const testTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  testTable.push(
    [
      `1. ${getGreen(REPORTING_API_ENDPOINTS.LIST_LATEST_ISSUES)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/reporting-api/latest-issues/get-list-of-latest-issues'),
    ],
    [
      `2. ${getGreen(REPORTING_API_ENDPOINTS.LIST_ISSUES)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/reporting-api/issues/get-list-of-issues'),
    ],
    [
      `3. ${getGreen(REPORTING_API_ENDPOINTS.LATEST_ISSUE_COUNTS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/reporting-api/latest-issue-counts/get-latest-issue-counts'),
    ],
    [
      `4. ${getGreen(REPORTING_API_ENDPOINTS.ISSUE_COUNTS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/reporting-api/issue-counts-over-time/get-issue-counts'),
    ],
    [
      `5. ${getGreen(REPORTING_API_ENDPOINTS.LATEST_PROJECT_COUNTS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/reporting-api/latest-project-counts/get-latest-project-counts'),
    ],
    [
      `6. ${getGreen(REPORTING_API_ENDPOINTS.PROJECT_COUNTS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/reporting-api/project-counts-over-time/get-project-counts'),
    ],
    [
      `7. ${getGreen(REPORTING_API_ENDPOINTS.TEST_COUNTS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/reporting-api/test-counts/get-test-counts'),
    ],
  );

  return `
  The following are the endpoints currently available under the Reporting API

${testTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=reporting --endpoint=[API Endpoint]')}
  `;
};

export const getAuditLogsTable = () => {
  const testTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  testTable.push(
    [
      `1. ${getGreen(AUDIT_LOGS_API_ENDPOINTS.GROUP_LEVEL_LOGS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/audit-logs/group-level-audit-logs/get-group-level-audit-logs'),
    ],
    [
      `2. ${getGreen(AUDIT_LOGS_API_ENDPOINTS.ORG_LEVEL_LOGS)}`,
      getBlue(
        'https://snyk.docs.apiary.io/#reference/audit-logs/organization-level-audit-logs/get-organization-level-audit-logs',
      ),
    ],
  );

  return `
  The following are the endpoints currently available under the Audit Logs API

${testTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=audit-logs --endpoint=[API Endpoint]')}
  `;
};

export const getWebhooksTable = () => {
  const webhooksTable = new Table({
    head: [getBoldWhite('API Endpoints'), getBoldWhite('Docs')],
    style: { 'padding-left': 1, 'padding-right': 1 },
  });

  webhooksTable.push(
    [
      `1. ${getGreen(WEBHOOK_API_ENDPOINTS.CREATE_WEBHOOK)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/webhooks/webhook-collection/create-a-webhook'),
    ],
    [
      `2. ${getGreen(WEBHOOK_API_ENDPOINTS.LIST_WEBHOOKS)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/webhooks/webhook-collection/list-webhooks'),
    ],
    [
      `3. ${getGreen(WEBHOOK_API_ENDPOINTS.RETRIEVE_WEBHOOK)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/webhooks/webhook/retrieve-a-webhook'),
    ],
    [
      `4. ${getGreen(WEBHOOK_API_ENDPOINTS.DELETE_WEBHOOK)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/webhooks/webhook/delete-a-webhook'),
    ],
    [
      `5. ${getGreen(WEBHOOK_API_ENDPOINTS.PING_WEBHOOK)}`,
      getBlue('https://snyk.docs.apiary.io/#reference/webhooks/ping-a-webhook'),
    ],
  );

  return `
  The following are the endpoints currently available under the Audit Logs API

${webhooksTable.toString()}

  Usage with process command: ${chalk.green('snyk-api process --api=webhooks --endpoint=[API Endpoint]')}
  `;
};
