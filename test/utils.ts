import { execSync } from 'child_process';
import { expect } from 'chai';
import {
  FilePathError,
  GroupIdError,
  IssueIdError,
  OrgIdError,
  ProjectIdError,
  IntegrationIdError,
  IntegrationTypeError,
  JobIdError,
  UserIdError,
  EntitlementKeyError,
  ArtifactIdError,
  VersionError,
  PackageNameError,
  GemNameError,
  PackageGroupIdErr,
  ToArgErr,
  FromArgErr,
} from '../src/errors/errors';

export const run = (args: string) => {
  return execSync(`ts-node src/index ${args}`).toString();
};

export const isValidJSON = (args: any) => {
  try {
    JSON.parse(args);
  } catch (e) {
    return false;
  }
  return true;
};

export const expectOrgIdErr = (result: string) => {
  expect(result).to.have.string(new OrgIdError().message);
};

export const expectProjectIdErr = (result: string) => {
  expect(result).to.have.string(new ProjectIdError().message);
};

export const expectIssueIdErr = (result: string) => {
  expect(result).to.have.string(new IssueIdError().message);
};

export const expectGroupIdErr = (result: string) => {
  expect(result).to.have.string(new GroupIdError().message);
};

export const expectIntegIdErr = (result: string) => {
  expect(result).to.have.string(new IntegrationIdError().message);
};

export const expectIntegTypeErr = (result: string) => {
  expect(result).to.have.string(new IntegrationTypeError().message);
};

export const expectJobIdErr = (result: string) => {
  expect(result).to.have.string(new JobIdError().message);
};

export const expectUserIdErr = (result: string) => {
  expect(result).to.have.string(new UserIdError().message);
};

export const expectFilePathErr = (result: string) => {
  expect(result).to.have.string(new FilePathError().message);
};

export const expectOrgNotFound = (result: string) => {
  expect(result).to.have.string(orgNotFoundErrString);
};

export const expectEontErr = (result: string) => {
  expect(result).to.have.string(eontError);
};

export const expectEndpointErr = (result: string) => {
  expect(result).to.have.string(endpointErrString);
};

export const expectEntitlementErr = (result: string) => {
  expect(result).to.have.string(new EntitlementKeyError().message);
};

export const expectArtifactErr = (result: string) => {
  expect(result).to.have.string(new ArtifactIdError().message);
};

export const expectVersionErr = (result: string) => {
  expect(result).to.have.string(new VersionError().message);
};

export const expectPackageNameErr = (result: string) => {
  expect(result).to.have.string(new PackageNameError().message);
};

export const expectGemNameErr = (result: string) => {
  expect(result).to.have.string(new GemNameError().message);
};

export const expectPackageGroupIdErr = (result: string) => {
  expect(result).to.have.string(new PackageGroupIdErr().message);
};

export const expectToArgErr = (result: string) => {
  expect(result).to.have.string(new ToArgErr().message);
};

export const expectFromArgErr = (result: string) => {
  expect(result).to.have.string(new FromArgErr().message);
};

const endpointErrString = 'The --endpoint or -e value passed is not acceptable';
const eontError = 'no such file or directory';
const orgNotFoundErrString = 'do not have permission to access';
