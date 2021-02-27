export const enum API_SELECTION {
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

export const enum COMMAND_ARGS {
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
  ORDER = 'order',
  CLEAR_TOKEN = 'clear-token',
  AUTH_TOKEN = 'auth-token',
  INCLUDE_GROUP_ADMINS = 'include-group-admins',
  INTEGRATION_ID = 'integration-id',
  INTEGRATION_TYPE = 'integration-type',
  JOB_ID = 'job-id',
  ISSUE_ID = 'issue-id',
}

export const enum GENERAL_API_ENDPOINTS {
  API_DOCS = 'api-docs',
}

export const enum USERS_API_ENDPOINTS {
  GET_USER_DETAILS = 'get-user-details',
  GET_MY_DETAILS = 'get-my-details',
  GET_ORG_NOTI_SETTINGS = 'get-org-noti-settings',
  MODIFY_ORG_NOTI_SETTINGS = 'modify-org-noti-settings',
  GET_PROJECT_NOTI_SETTINGS = 'get-project-noti-settings',
  MODIFY_PROJECT_NOTI_SETTINGS = 'modify-project-noti-settings',
}

export const enum GROUPS_API_ENDPOINTS {
  VIEW_GROUP_SETTINGS = 'view-group-settings',
  UPDATE_GROUP_SETTINGS = 'update-group-settings',
  LIST_ALL_GROUP_MEMBERS = 'list-all-group-members',
  ADD_MEMBER_TO_ORG = 'add-member-to-org',
  LIST_ALL_GROUP_TAGS = 'list-all-group-tags',
  DELETE_TAG_FROM_GROUP = 'delete-tag-from-group',
}

export const enum ORGS_API_ENDPOINTS {
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

export const enum INTEGRATIONS_ENDPOINTS {
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

export const enum PROJECTS_API_ENDPOINTS {
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

export const enum DEPENDENCIES_API_ENDPOINTS {
  LIST_ALL_DEPENDENCIES = 'list-all-dependencies',
}

export const enum LICENSES_API_ENDPOINTS {
  LIST_ALL_LICENSES = 'list-all-licenses',
}
