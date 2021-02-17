import { clearScreenDown } from "readline";

class UserIdError extends Error {
  constructor() {
    super(
      "The arg Snyk user ID(--user-id or -u) is required for this endpoint"
    );
  }
}

class OrgIdError extends Error {
  constructor() {
    super(
      "The arg Snyk organization ID(--org-id or -o) is required for this endpoint"
    );
  }
}

class FilePathError extends Error {
  constructor() {
    super("The arg file path(-f or --file) required");
  }
}

class ProjectIdError extends Error {
  constructor() {
    super(
      "The arg Snyk project ID(--project-id or -p) is required for this endpoint"
    );
  }
}

class GroupIdError extends Error {
  constructor() {
    super(
      "The arg Snyk group ID(--group-id or -g) is required for this endpoint"
    );
  }
}

export { UserIdError, OrgIdError, FilePathError, ProjectIdError, GroupIdError };
