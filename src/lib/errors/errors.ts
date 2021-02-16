import { clearScreenDown } from "readline";

class UserIdError extends Error {
  constructor() {
    super("--user-id or -u is required for this endpoint");
  }
}

class OrgIdError extends Error {
  constructor() {
    super("--org-id or -ois required for this endpoint");
  }
}

class FilePathError extends Error {
  constructor() {
    super("file path(-f or --file) required");
  }
}

class ProjectIdError extends Error {
  constructor() {
    super("--project-id or -p is required for this endpoint");
  }
}

class GroupIdError extends Error {
  constructor() {
    super("--group-id or -g is required for this endpoint");
  }
}

export { UserIdError, OrgIdError, FilePathError, ProjectIdError, GroupIdError };
