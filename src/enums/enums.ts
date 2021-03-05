export enum API_SELECTION {
  GENERAL = 'general',
  USERS = 'users',
  GROUPS = 'groups',
  ORGS = 'orgs',
  INTEGRATIONS = 'integrations',
  PROJECTS = 'projects',
  DEPENDENCIES = 'dependencies',
  LICENSES = 'licenses',
  ENTITLEMENTS = 'entitlements',
  TEST = 'test',
  MONITOR = 'monitor',
  REPORTING = 'reporting',
  AUDIT = 'audit-logs',
}

export enum COMMAND_ARGS {
  PROJECT_ID = 'p',
  ORG_ID = 'o',
  GROUP_ID = 'g',
  USER_ID = 'u',
  ENDPOINT = 'e',
  API = 'a',
  FILE = 'f',
  PER_PAGE = 'per-page',
  PAGE = 'page',
  SORT_BY = 'sort-by',
  SORT_ORDER = 'sort-order',
  ORDER = 'order',
  GROUP_BY = 'group-by',
  FROM = 'from',
  TO = 'to',
  CLEAR_TOKEN = 'clear-token',
  AUTH_TOKEN = 'auth-token',
  INCLUDE_GROUP_ADMINS = 'include-group-admins',
  INTEGRATION_ID = 'integration-id',
  INTEGRATION_TYPE = 'integration-type',
  JOB_ID = 'job-id',
  ISSUE_ID = 'issue-id',
  ENTITLEMENT_KEY = 'entitlement-key',
  ARTIFACT_ID = 'artifact-id',
  PACKAGE_VERSION = 'package-version',
  REPOSITORY = 'repository',
  PACKAGE_NAME = 'package-name',
  GEM_NAME = 'gem-name',
}

export enum GENERAL_API_ENDPOINTS {
  API_DOCS = 'api-docs',
}

export enum USERS_API_ENDPOINTS {
  GET_USER_DETAILS = 'get-user-details',
  GET_MY_DETAILS = 'get-my-details',
  GET_ORG_NOTI_SETTINGS = 'get-org-noti-settings',
  MODIFY_ORG_NOTI_SETTINGS = 'modify-org-noti-settings',
  GET_PROJECT_NOTI_SETTINGS = 'get-project-noti-settings',
  MODIFY_PROJECT_NOTI_SETTINGS = 'modify-project-noti-settings',
}

export enum GROUPS_API_ENDPOINTS {
  VIEW_GROUP_SETTINGS = 'view-group-settings',
  UPDATE_GROUP_SETTINGS = 'update-group-settings',
  LIST_ALL_GROUP_MEMBERS = 'list-all-group-members',
  ADD_MEMBER_TO_ORG = 'add-member-to-org',
  LIST_ALL_GROUP_TAGS = 'list-all-group-tags',
  DELETE_TAG_FROM_GROUP = 'delete-tag-from-group',
}

export enum ORGS_API_ENDPOINTS {
  LIST_USER_ORGS = 'list-user-orgs',
  CREATE_NEW_ORG = 'create-new-org',
  GET_ORG_NOTI_SETTINGS = 'get-org-noti-settings',
  SET_ORG_NOTI_SETTINGS = 'set-org-noti-settings',
  INVITE_USER = 'invite-user',
  LIST_ORG_MEMBERS = 'list-org-members',
  VIEW_ORG_SETTINGS = 'view-org-settings',
  UPDATE_ORG_SETTINGS = 'update-org-settings',
  UPDATE_MEMBER_ROLE = 'update-member-role',
  REMOVE_MEMBER = 'remove-member',
  REMOVE_ORG = 'remove-org',
}

export enum INTEGRATIONS_ENDPOINTS {
  LIST_INTEGRATIONS = 'list-integrations',
  ADD_NEW_INTEGRATION = 'add-new-integration',
  UPDATE_EXISTING_INTEGRATION = 'update-existing-integration',
  DELETE_CREDENTIALS = 'delete-credentials',
  PROVISION_NEW_BROKER_TOKEN = 'provision-new-broker-token',
  SWITCH_BROKER_TOKEN = 'switch-broker-token',
  CLONE_INTEGRATION = 'clone-integration',
  GET_INTEGRATION_BY_TYPE = 'get-integration-by-type',
  IMPORT_PROJECT = 'import-project',
  GET_IMPORT_JOB_DETAILS = 'get-import-job-details',
  GET_INTEGRATION_SETTINGS = 'get-integration-settings',
  UPDATE_INTEGRATION_SETTINGS = 'update-integration-settings',
}

export enum PROJECTS_API_ENDPOINTS {
  LIST_ALL_PROJECTS = 'list-all-projects',
  RETRIEVE_SINGLE_PROJECT = 'list-single-project',
  UPDATE_PROJECT = 'udpate-project',
  DELETE_PROJECT = 'delete-project',
  DEACTIVATE_PROJECT = 'deactivate-project',
  ACTIVATE_PROJECT = 'activate-project',
  LIST_ALL_AGGREGATE_ISSUES = 'list-all-aggregate-issues',
  GET_PROJECT_DEP_GRAPH = 'get-project-dep-graph',
  LIST_ALL_IGNORES = 'list-all-ignores',
  RETRIEVE_IGNORE = 'retrieve-ignore',
  ADD_IGNORE = 'add-ignore',
  REPLACE_IGNORES = 'replace-ignores',
  DELETE_IGNORES = 'delete-ignores',
  LIST_ALL_JIRA_ISSUES = 'list-all-jira-issues',
  CREATE_JIRA_ISSUE = 'create-jira-issue',
  LIST_PROJECT_SETTINGS = 'list-project-settings',
  UPDATE_PROJECT_SETTINGS = 'update-project-settings',
  DELETE_PROJECT_SETTINGS = 'delete-project-settings',
  MOVE_PROJECT = 'move-project',
  ADD_TAG = 'add-tag',
  REMOVE_PROJECT_TAG = 'remove-project-tag',
  APPLY_ATTRIBUTES = 'apply-attributes',
}

export enum DEPENDENCIES_API_ENDPOINTS {
  LIST_ALL_DEPENDENCIES = 'list-all-dependencies',
}

export enum LICENSES_API_ENDPOINTS {
  LIST_ALL_LICENSES = 'list-all-licenses',
}

export enum ENTITLEMENTS_API_ENDPOINTS {
  LIST_ALL_ENTITLEMENTS = 'list-all-entitlements',
  GET_ENTITLEMENT_VALUE = 'get-entitlement-value',
}

export enum TEST_API_ENDPOINTS {
  TEST_MAVEN_PACKAGE = 'test-maven-package',
  TEST_MAVEN_FILE = 'test-maven-file',
  TEST_NPM_PACKAGE = 'test-npm-package',
  TEST_NPM_FILE = 'test-npm-file',
  TEST_GOPKG_FILE = 'test-gopkg-file',
  TEST_VENDOR_FILE = 'test-vendor-file',
  TEST_YARN_FILE = 'test-yarn-file',
  TEST_GEM_PACKAGE = 'test-gem-package',
  TEST_GEM_FILE = 'test-gem-file',
  TEST_GRADLE_PACKAGE = 'test-gradle-package',
  TEST_GRADLE_FILE = 'test-gradle-file',
  TEST_SBT_PACAKGE = 'test-sbt-package',
  TEST_SBT_FILE = 'test-sbt-file',
  TEST_PIP_PACKAGE = 'test-pip-pacakge',
  TEST_PIP_FILE = 'test-pip-file',
  TEST_COMPOSER_FILE = 'test-composer-file',
  TEST_DEP_GRAPH = 'test-dep-graph',
}

export enum MONITOR_API_ENDPOINTS {
  MONITOR_DEP_GRAPH = 'monitor-dep-graph',
}

export enum REPORTING_API_ENDPOINTS {
  LIST_LATEST_ISSUES = 'list-latest-issues',
  LIST_ISSUES = 'list-issues',
  LATEST_ISSUE_COUNTS = 'latest-issue-counts',
  ISSUE_COUNTS = 'issue-counts',
  LATEST_PROJECT_COUNTS = 'latest-project-counts',
  PROJECT_COUNTS = 'project-counts',
  TEST_COUNTS = 'test-counts',
}

export enum AUDIT_LOGS_API_ENDPOINTS {
  GROUP_LEVEL_LOGS = 'group-level-logs',
  ORG_LEVEL_LOGS = 'org-level-logs',
}
