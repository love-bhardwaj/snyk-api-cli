import validationObject from '../../types/validationObject';
import {
  FilePathError,
  GroupIdError,
  IntegrationIdError,
  IssueIdError,
  OrgIdError,
  ProjectIdError,
  UserIdError,
  MissingArgumnets,
  IntegrationTypeError,
  JobIdError,
  EntitlementKeyError,
} from '../../errors/errors';

export default (values: validationObject) => {
  const errorMessages = [];
  const args = values['args'];
  if (values.userId && !args.userId) errorMessages.push(new UserIdError().message);

  if (values.orgId && !args.orgId) errorMessages.push(new OrgIdError().message);

  if (values.projectId && !args.projectId) errorMessages.push(new ProjectIdError().message);

  if (values.filePath && !args.file) errorMessages.push(new FilePathError().message);

  if (values.issueId && !args.issueId) errorMessages.push(new IssueIdError().message);

  if (values.integrationId && !args.integrationId) errorMessages.push(new IntegrationIdError().message);

  if (values.groupId && !args.groupId) errorMessages.push(new GroupIdError().message);

  if (values.integType && !args.integrationType) errorMessages.push(new IntegrationTypeError().message);

  if (values.jobId && !args.jobId) errorMessages.push(new JobIdError().message);

  if (values.entitlementKey && !args.entitlementKey) errorMessages.push(new EntitlementKeyError().message);

  if (errorMessages.length > 0) {
    const errMessageString = errorMessages.join(' ');
    throw new MissingArgumnets(errMessageString);
  }
};
