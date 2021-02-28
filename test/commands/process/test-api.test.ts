import {
  run,
  isValidJSON,
  expectFilePathErr,
  expectEontErr,
  expectGroupIdErr,
  expectArtifactErr,
  expectVersionErr,
} from '../../utils';
import { expect } from 'chai';
import { TEST_API_ENDPOINTS } from '../../../src/enums/enums';

describe('PROCESS: Test API commands', () => {
  describe('Test Maven package', () => {
    it('Should print error for group ID not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_MAVEN_PACKAGE}`);
      expectGroupIdErr(res);
    });
    it('Should print error for artifact ID not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_MAVEN_PACKAGE} --group-id=org.apache.flex.blazeds`);
      expectArtifactErr(res);
    });
    it('Should print error for package-version not provided', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_MAVEN_PACKAGE} --group-id=org.apache.flex.blazeds --artifact-id=blazeds`,
      );
      expectVersionErr(res);
    });

    it('Should return results from API', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_MAVEN_PACKAGE} --group-id=org.apache.flex.blazeds --artifact-id=blazeds --package-version=4.7.2`,
      );
      expect(isValidJSON(res)).to.be.true;
    });

    it('Should return results from API with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_MAVEN_PACKAGE} --group-id=org.apache.flex.blazeds --artifact-id=blazeds --package-version=4.7.2 --repository=https://repo1.maven.org/maven2`,
      );
      expect(isValidJSON(res)).to.be.true;
    });
  });

  describe('Test Maven file', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_MAVEN_FILE}`);
      expectFilePathErr(res);
    });
    it('Should print error for file not valid', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_MAVEN_FILE} --file=mavenFile.json`);
      expectEontErr(res);
    });
    it('Should return results from API', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_MAVEN_FILE} --file=./test/json/test-api/mavenFile.json`,
      );
      expect(isValidJSON(res)).to.be.true;
    });

    it('Should return results from API with query params', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_MAVEN_FILE} --file=./test/json/test-api/mavenFile.json --repository=https://repo1.maven.org/maven2`,
      );
      expect(isValidJSON(res)).to.be.true;
    });
  });
});
