const { expect } = require('chai');

const { parseMdTable } = require('../lib/md-utils');

describe('MD table to JSON specs', function () {
  const MD_WITH_ADDITIONS =
    '| object | name  | description  | required | type   | example |\n' +
    '|--------------|------|----------|-----|-------|-----|\n' +
    '| path | user_id | This is just a user identifier     | true    | string | 476587598 |\n' +
    '| path | group_id | Group of the user | true | string  | RETAIL |\n' +
    '# hola';
  const MD_ADDITIONAL_HEADER =
    '| object | name  | description  | required | type  | additional | example |\n' +
    '|--------------|------|----------|-----|-------|-----|-----|\n' +
    '| path | user_id | This is just a user identifier | true | string | add field 1 | 476587598 |\n' +
    '| path | group_id | Group of the user | true | string | add field 2 | RETAIL |\n' +
    '# hola';
  const MD_NO_OBJECT =
    '| name  | description  | required | type  | additional | example |\n' +
    '|------|----------|-----|-------|-----|-----|\n' +
    '| user_id | This is just a user identifier | true | string | add field 1 | 476587598 |\n';
  const MD_NO_NAME =
    '| object  | description  | required | type  | additional | example |\n' +
    '|------|----------|-----|-------|-----|-----|\n' +
    '| user_id | This is just a user identifier | true | string | add field 1 | 476587598 |\n';
  const MD_MISS_COLUMN =
    '| object | name  | description  | type  | additional | example |\n' +
    '|--------------|------|----------|-----|-------|-----|\n' +
    '| path | user_id | This is just a user identifier | string | add field 1 | 476587598 |\n' +
    '# hola';
  const MD_INCORRECT =
    '| object | name  | description  | required | type   | example |\n' +
    '|--------------|------|----------|-----|-----|\n' +
    '| path | user_id | This is just a user identifier | true | string | 476587598 |\n' +
    '| path | group_id | Group of the user | true | string  | RETAIL | RETAIL |\n' +
    '# hola';
  const PARSED_TABLE = {
    user_id: {
      object: 'path',
      name: 'user_id',
      description: 'This is just a user identifier',
      required: 'true',
      type: 'string',
      example: '476587598',
    },
    group_id: {
      object: 'path',
      name: 'group_id',
      description: 'Group of the user',
      required: 'true',
      type: 'string',
      example: 'RETAIL',
    },
  };
  const PARSED_NO_REQUIRED_TABLE = {
    user_id: {
      object: 'path',
      name: 'user_id',
      description: 'This is just a user identifier',
      type: 'string',
      example: '476587598',
    },
  };

  it('should return a json object with parsed md table', function () {
    const parsed = parseMdTable(MD_WITH_ADDITIONS);
    expect(parsed).to.deep.equal(PARSED_TABLE);
  });

  it('should return empty if not a markdown string', function () {
    expect(parseMdTable('')).to.deep.equal({});
  });

  it('should return empty if not a table in the markdown', function () {
    expect(parseMdTable('# headers')).to.deep.equal({});
  });

  it('should not parse not allowed headers', function () {
    expect(parseMdTable(MD_ADDITIONAL_HEADER)).to.deep.equal(PARSED_TABLE);
  });

  it('should return empty if no "name" column', function () {
    expect(parseMdTable(MD_NO_NAME)).to.deep.equal({});
  });

  it('should return empty if no "object" column', function () {
    expect(parseMdTable(MD_NO_OBJECT)).to.deep.equal({});
  });

  it('should not fail if column as "required" not exist in md table', function () {
    const parsed = parseMdTable(MD_MISS_COLUMN);
    expect(parsed).to.deep.equal(PARSED_NO_REQUIRED_TABLE);
  });

  it('should return empty if incorrect md table', function () {
    expect(parseMdTable(MD_INCORRECT)).to.deep.equal({});
  });
});
