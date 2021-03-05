export class AuthTokenError extends Error {
  constructor() {
    super('Error: Auth token not provided. Pass it using --auth-token');
  }
}

export class InvalidArgumentErr extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class MissingArgumnets extends Error {
  constructor(errMessage: string) {
    super(errMessage);
  }
}

export class InvalidEndpointError extends Error {
  constructor(message: string) {
    super(message);
  }
}
export class UserIdError extends Error {
  constructor() {
    super('Error: The arg Snyk user ID(--user-id or -u) is required for this endpoint');
  }
}

export class OrgIdError extends Error {
  constructor() {
    super('Error: The arg Snyk organization ID(--org-id or -o) is required for this endpoint');
  }
}

export class FilePathError extends Error {
  constructor() {
    super('Error: The arg file path(-f or --file) required');
  }
}

export class ProjectIdError extends Error {
  constructor() {
    super('Error: The arg Snyk project ID(--project-id or -p) is required for this endpoint');
  }
}

export class GroupIdError extends Error {
  constructor() {
    super('Error: The arg Snyk group ID(--group-id or -g) is required for this endpoint');
  }
}

export class IntegrationIdError extends Error {
  constructor() {
    super('Error: The arg Snyk integration ID(--integration-id) is required for this endpoint');
  }
}

export class IntegrationTypeError extends Error {
  constructor() {
    super('Error: The arg Snyk integration type(--integration-type) is required for this endpoint');
  }
}

export class JobIdError extends Error {
  constructor() {
    super('Error: The arg Snyk job ID(--job-id) is required for this endpoint');
  }
}

export class IssueIdError extends Error {
  constructor() {
    super('Error: The arg Snyk issue ID(--issue-id) is required for this endpoint');
  }
}

export class EntitlementKeyError extends Error {
  constructor() {
    super('Error: The arg entitlement key(--entitlement-key) is required');
  }
}

export class ArtifactIdError extends Error {
  constructor() {
    super('Error: The arg artifactory ID(--artifactory-id) is required');
  }
}

export class VersionError extends Error {
  constructor() {
    super('Error: The arg package version(--package-version) is required');
  }
}

export class PackageNameError extends Error {
  constructor() {
    super('Error: The arg pacakge name(--package-name) is required');
  }
}

export class GemNameError extends Error {
  constructor() {
    super('Error: The arg gem name(--gem-name) is required');
  }
}

export class PackageGroupIdErr extends Error {
  constructor() {
    super('Error: The arg package group ID(--group-id or -g) is required');
  }
}

export class FromArgErr extends Error {
  constructor() {
    super('Error: The arg from(--from) is required');
  }
}

export class ToArgErr extends Error {
  constructor() {
    super('Error: The arg to(--to) is required');
  }
}
