import {
  generateInTextCitation,
  parseAuthors,
} from '../../../src/functions/app/Citations';

describe('generateInTextCitation', () => {
  it('should return empty string if no authors provided', () => {
    const authors = [];
    const year = 2022;

    const result = generateInTextCitation(authors, year);

    expect(result).toBe('');
  });

  it('should generate in-text citation for a single author', () => {
    const authors = [{ firstName: 'John', lastName: 'Doe' }];
    const year = 2022;

    const result = generateInTextCitation(authors, year);

    expect(result).toBe('(John Doe, 2022)');
  });

  it('should generate in-text citation for two authors', () => {
    const authors = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Smith' },
    ];
    const year = 2022;

    const result = generateInTextCitation(authors, year);

    expect(result).toBe('(John Doe & Jane Smith, 2022)');
  });

  it('should generate in-text citation for more than two authors', () => {
    const authors = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Smith' },
      { firstName: 'Michael', lastName: 'Johnson' },
    ];
    const year = 2022;

    const result = generateInTextCitation(authors, year);

    expect(result).toBe('(John Doe et al., 2022)');
  });
});

describe('parseAuthors', () => {
  it('should parse author names from string and return an array of Author objects', () => {
    const authorsString = 'John Doe, Jane Smith, Michael Johnson';

    const result = parseAuthors(authorsString);

    expect(result).toEqual([
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Smith' },
      { firstName: 'Michael', lastName: 'Johnson' },
    ]);
  });
});
