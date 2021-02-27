class AuthTokenError extends Error {
  constructor() {
    super('Error: Auth token not provided. Pass it using --auth-token');
  }
}

class InvalidArgument extends Error {
  constructor() {
    super('Error: Not a valid argument');
  }
}

class MissingArgumnets extends Error {
  constructor(errMessage: string) {
    super(errMessage);
  }
}

class InvalidEndpointError extends Error {
  constructor(message: string) {
    super(message);
  }
}
class UserIdError extends Error {
  constructor() {
    super('Error: The arg Snyk user ID(--user-id or -u) is required for this endpoint');
  }
}

class OrgIdError extends Error {
  constructor() {
    super('Error: The arg Snyk organization ID(--org-id or -o) is required for this endpoint');
  }
}

class FilePathError extends Error {
  constructor() {
    super('Error: The arg file path(-f or --file) required');
  }
}

class ProjectIdError extends Error {
  constructor() {
    super('Error: The arg Snyk project ID(--project-id or -p) is required for this endpoint');
  }
}

class GroupIdError extends Error {
  constructor() {
    super('Error: The arg Snyk group ID(--group-id or -g) is required for this endpoint');
  }
}

class IntegrationIdError extends Error {
  constructor() {
    super('Error: The arg Snyk integration ID(--integration-id) is required for this endpoint');
  }
}

class IntegrationTypeError extends Error {
  constructor() {
    super('Error: The arg Snyk integration type(--integration-type) is required for this endpoint');
  }
}

class JobIdError extends Error {
  constructor() {
    super('Error: The arg Snyk job ID(--job-id) is required for this endpoint');
  }
}

class IssueIdError extends Error {
  constructor() {
    super('Error: The arg Snyk issue ID(--issue-id) is required for this endpoint');
  }
}

export {
  AuthTokenError,
  InvalidArgument,
  MissingArgumnets,
  InvalidEndpointError,
  UserIdError,
  OrgIdError,
  FilePathError,
  ProjectIdError,
  GroupIdError,
  IntegrationIdError,
  IntegrationTypeError,
  JobIdError,
  IssueIdError,
};
