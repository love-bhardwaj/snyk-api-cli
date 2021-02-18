export const enum API_SELECTION {
  GENERAL = "general",
  USERS = "users",
  GROUPS = "groups",
  ORGS = "orgs",
  INTEGRATIONS = "integrations",
  PROJECTS = "projects",
  DEPENDENCIES = "dependencies",
  LICENSES = "licenses",
  ENTITLEMENTS = "entitlements",
  TEST = "test",
  MONITOR = "monitor",
  REPORTING = "reporting",
  AUDIT = "audit-logs",
}

export const enum GENERAL_API_ENDPOINTS {
  API_DOCS = "api-docs",
}

export const enum USERS_API_ENDPOINTS {
  GET_USER_DETAILS = "get-user-details",
  GET_MY_DETAILS = "get-my-details",
  GET_ORG_NOTI_SETTINGS = "get-org-noti-settings",
  MODIFY_ORG_NOTI_SETTINGS = "modify-org-noti-settings",
  GET_PROJECT_NOTI_SETTINGS = "get-project-noti-settings",
  MODIFY_PROJECT_NOTI_SETTINGS = "modify-project-noti-settings",
}

export const enum GROUPS_API_ENDPOINTS {
  VIEW_GROUP_SETTINGS = "view-group-settings",
  UPDATE_GROUP_SETTINGS = "update-group-settings",
  LIST_ALL_GROUP_MEMBERS = "list-all-group-members",
  ADD_MEMBER_TO_ORG = "add-member-to-org",
  LIST_ALL_GROUP_TAGS = "list-all-group-tags",
  DELETE_TAG_FROM_GROUP = "delete-tag-from-group",
}
