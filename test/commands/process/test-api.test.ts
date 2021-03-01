import {
  run,
  isValidJSON,
  expectFilePathErr,
  expectEontErr,
  expectArtifactErr,
  expectVersionErr,
  expectPackageNameErr,
  expectOrgNotFound,
  expectGemNameErr,
  expectPackageGroupIdErr,
} from '../../utils';
import { expect } from 'chai';
import { TEST_API_ENDPOINTS } from '../../../src/enums/enums';

describe('PROCESS: Test API commands', () => {
  describe('Test Maven package', () => {
    it('Should print error for group ID not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_MAVEN_PACKAGE}`);
      expectPackageGroupIdErr(res);
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

  describe('Test NPM public package', () => {
    it('Should print error for package name not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_NPM_PACKAGE}`);
      expectPackageNameErr(res);
    });
    it('Should print error for package version not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_NPM_PACKAGE} --package-name=express`);
      expectVersionErr(res);
    });
    it('Should return the result from the API', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_NPM_PACKAGE} --package-name=express --package-version=4.17.20`,
      );
      expect(isValidJSON(res)).to.be.true;
    });
    it('Should return the results from API with the query paramter', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_NPM_PACKAGE} --package-name=express --package-version=4.17.20 --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Test NPM project file', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_NPM_FILE}`);
      expectFilePathErr(res);
    });
    it('Should print error for file not found', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_NPM_FILE} --file=test.json`);
      expectEontErr(res);
    });
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_NPM_FILE} --file=./test/json/test-api/npmFile.json`,
      );
      expect(isValidJSON(res)).to.be.true;
    });
    it('Should return results with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_NPM_FILE} --file=./test/json/test-api/npmFile.json --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Test Gopkg project file', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_GOPKG_FILE}`);
      expectFilePathErr(res);
    });
    it('Should print error for file not found', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_GOPKG_FILE} --file=test.json`);
      expectEontErr(res);
    });
    /*
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_GOPKG_FILE} --file=./test/json/test-api/gopkgFile.json`,
      );
      expect(isValidJSON(res)).to.be.true;
    });
    */
    it('Should return results with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_GOPKG_FILE} --file=./test/json/test-api/gopkgFile.json --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Test Vendor project file', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_VENDOR_FILE}`);
      expectFilePathErr(res);
    });
    it('Should print error for file not found', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_VENDOR_FILE} --file=test.json`);
      expectEontErr(res);
    });
    /*
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_VENDOR_FILE} --file=./test/json/test-api/vendorFile.json`,
      );
      expect(isValidJSON(res)).to.be.true;
    });
    */
    it('Should return results with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_VENDOR_FILE} --file=./test/json/test-api/vendorFile.json --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Test Yarn project file', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_YARN_FILE}`);
      expectFilePathErr(res);
    });
    it('Should print error for file not found', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_YARN_FILE} --file=test.json`);
      expectEontErr(res);
    });
    /*
    it('Should return the results from the API', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_YARN_FILE} --file=./test/json/test-api/yarnFile.json`,
      );
      expect(isValidJSON(res)).to.be.true;
    });
    */
    it('Should return results with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_YARN_FILE} --file=./test/json/test-api/yarnFile.json --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Test public gem package by name and version', () => {
    it('Should print error for gem name not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_GEM_PACKAGE}`);
      expectGemNameErr(res);
    });
    it('Should print error for version not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_GEM_PACKAGE} --gem-name=rails-html-sanitizer`);
      expectVersionErr(res);
    });
    it('Should return result with query parameter', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_GEM_PACKAGE} --gem-name=rails-html-sanitizer --package-version=1.0.3 --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Test Gemfile project file', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_GEM_FILE}`);
      expectFilePathErr(res);
    });
    it('Should print error for file not found', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_GEM_FILE} --file=test.json`);
      expectEontErr(res);
    });
    it('Should return results with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_GEM_FILE} --file=./test/json/test-api/gemFile.json --org-id=test`,
      );
    });
  });

  describe('Test gradle public package', () => {
    it('Should print error for group not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_GRADLE_PACKAGE}`);
      expectPackageGroupIdErr(res);
    });
    it('Should print error for name not provided', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_GRADLE_PACKAGE} --group-id=org.apache.flex.blazeds`,
      );
      expectPackageNameErr(res);
    });
    it('Should print error for version not provided', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_GRADLE_PACKAGE} --group-id=org.apache.flex.blazeds --package-name=blazeds`,
      );
      expectVersionErr(res);
    });
    it('Should return the results with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_GRADLE_PACKAGE} --group-id=org.apache.flex.blazeds --package-name=blazeds --package-version=4.7.2 --repository=https://repo1.maven.org/maven2`,
      );
      expect(isValidJSON(res)).to.be.true;
    });
  });

  describe('Test Gradle project file', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_GRADLE_FILE}`);
      expectFilePathErr(res);
    });
    it('Should print error for file not found', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_GRADLE_FILE} --file=test.json`);
      expectEontErr(res);
    });
    it('Should return results with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_GRADLE_FILE} --file=./test/json/test-api/gradleFile.json --repository=https://repo1.maven.org/maven2 --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Test SBT public package', () => {
    it('Should print error for group ID not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_SBT_PACAKGE}`);
      expectPackageGroupIdErr(res);
    });
    it('Should print error for artifact ID not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_SBT_PACAKGE} --group-id=org.apache.flex.blazeds`);
      expectArtifactErr(res);
    });
    it('Should print error for version not provided', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_SBT_PACAKGE} --group-id=org.apache.flex.blazeds --artifact-id=blazeds`,
      );
      expectVersionErr(res);
    });
    it('Should return the results with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_SBT_PACAKGE} --group-id=org.apache.flex.blazeds --package-version=4.7.2 --artifact-id=blazeds --repository=https://repo1.maven.org/maven2 --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Test SBT file', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_SBT_FILE}`);
      expectFilePathErr(res);
    });
    it('Should print error for file not valid', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_SBT_FILE} --file=test.json`);
      expectEontErr(res);
    });
    it('Should return results from API with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_SBT_FILE} --file=./test/json/test-api/sbtFile.json --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Test Pip public package', () => {
    it('Should print error for package name not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_PIP_PACKAGE}`);
      expectPackageNameErr(res);
    });
    it('Should print error for package version not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_PIP_PACKAGE} --package-name=rsa`);
      expectVersionErr(res);
    });
    it('Should return results with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_PIP_PACKAGE} --package-name=rsa --package-version=3.3 --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Test requirements.txt file', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_PIP_FILE}`);
      expectFilePathErr(res);
    });
    it('Should print error for file not valid', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_PIP_FILE} --file=test.json`);
      expectEontErr(res);
    });
    it('Should return result with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_PIP_FILE} --file=./test/json/test-api/pipFile.json --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Test Composer file', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_COMPOSER_FILE}`);
      expectFilePathErr(res);
    });
    it('Should print error for file not valid', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_COMPOSER_FILE} --file=test.json`);
      expectEontErr(res);
    });
    it('Should return result with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_PIP_FILE} --file=./test/json/test-api/composerFile.json --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });

  describe('Test Dep graph file', () => {
    it('Should print error for file path not provided', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_DEP_GRAPH}`);
      expectFilePathErr(res);
    });
    it('Should print error for file not valid', () => {
      const res = run(`process -a=test -e=${TEST_API_ENDPOINTS.TEST_DEP_GRAPH} --file=test.json`);
      expectEontErr(res);
    });
    it('Should return result with query parameters', () => {
      const res = run(
        `process -a=test -e=${TEST_API_ENDPOINTS.TEST_DEP_GRAPH} --file=./test/json/test-api/depGraph.json --org-id=test`,
      );
      expectOrgNotFound(res);
    });
  });
});
