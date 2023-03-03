/* eslint-disable mocha/no-setup-in-describe */
const { readFileSync } = require('fs');

const { expect } = require('chai');

const replacePostmanVariables = require('../src/var-replacer');

describe('replacePostmanVariables specs', function () {
  const VARIABLES_COLLECTION_V2 = readFileSync('./test/resources/input/v2/Variables.json', 'utf8');
  const VARIABLES_COLLECTION_V21 = readFileSync('./test/resources/input/v21/Variables.json', 'utf8');
  const RESULT_V2 = readFileSync('./test/resources/var-replace/VariablesReplacedV2.json', 'utf8');
  const RESULT_V21 = readFileSync('./test/resources/var-replace/VariablesReplacedV21.json', 'utf8');
  const RESULT_ADDITIONAL_V2 = readFileSync('./test/resources/var-replace/VariablesReplacedV2additional.json', 'utf8');
  const RESULT_ADDITIONAL_V21 = readFileSync(
    './test/resources/var-replace/VariablesReplacedV21additional.json',
    'utf8'
  );

  it('should replace all variables successfully v2', function () {
    const output = replacePostmanVariables(VARIABLES_COLLECTION_V2);
    expect(output).to.equal(RESULT_V2);
  });

  it('should replace all variables successfully v2.1', function () {
    const output = replacePostmanVariables(VARIABLES_COLLECTION_V21);
    expect(output).to.equal(RESULT_V21);
  });

  it('should use additional vars', function () {
    const output = replacePostmanVariables(VARIABLES_COLLECTION_V2, {
      company: 'myCompany',
      service: 'myService',
    });
    expect(output).to.equal(RESULT_ADDITIONAL_V2);
  });

  it('should use additional vars v2.1', function () {
    const output = replacePostmanVariables(VARIABLES_COLLECTION_V21, {
      company: 'myCompany',
      service: 'myService',
    });
    expect(output).to.equal(RESULT_ADDITIONAL_V21);
  });
});
