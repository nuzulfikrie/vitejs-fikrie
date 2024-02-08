import { describe, it, expect } from 'vitest';
import { CitationService } from '../../src/services/citationService'; // Update this path to where your CitationService class is located.

describe('CitationService', () => {
  describe('generateInTextCitation', () => {
    it('should generate a citation for a single author', () => {
      const authors = [{ firstName: 'John', lastName: 'Doe' }];
      const year = 2020;
      const citation = CitationService.generateInTextCitation(authors, year);
      expect(citation).toBe('(John Doe, 2020)');
    });

    it('should generate a citation for two authors', () => {
      const authors = [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' },
      ];
      const year = 2021;
      const citation = CitationService.generateInTextCitation(authors, year);
      expect(citation).toBe('(John Doe & Jane Smith, 2021)');
    });

    it('should generate a citation for three or more authors', () => {
      const authors = [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' },
        { firstName: 'Jim', lastName: 'Beam' },
      ];
      const year = 2022;
      const citation = CitationService.generateInTextCitation(authors, year);
      expect(citation).toBe('(John Doe et al., 2022)');
    });

    it('should throw an error when no authors are provided', () => {
      const authors = [];
      const year = 2023;
      const citationCall = () =>
        CitationService.generateInTextCitation(authors, year);
      expect(citationCall).toThrow('No authors provided');
    });
  });

  describe('parseAuthors', () => {
    it('should parse a single author string', () => {
      const authorString = 'John Doe';
      const authors = CitationService.parseAuthors(authorString);
      expect(authors).toEqual([{ firstName: 'John', lastName: 'Doe' }]);
    });

    it('should parse multiple authors string', () => {
      const authorString = 'Dr. John Doe, Jane Smith Jr.';
      const authors = CitationService.parseAuthors(authorString);
      expect(authors).toEqual([
        { firstName: 'John', lastName: 'Doe', prefix: 'Dr' },
        { firstName: 'Jane', lastName: 'Smith', suffix: 'Jr' },
      ]);
    });

    it('should throw an error for empty author string', () => {
      const authorString = '';
      const parseCall = () => CitationService.parseAuthors(authorString);
      expect(parseCall).toThrow(
        'Authors string is empty or only contains whitespace',
      );
    });
  });

  describe('parseAuthors with diverse international names', () => {
    it('should parse an Arabic name', () => {
      const authorString = 'د. محمد الفارسي';
      const authors = CitationService.parseAuthors(authorString);
      expect(authors).toEqual([
        { firstName: 'محمد', lastName: 'الفارسي', prefix: 'د' },
      ]);
    });

    it('should parse a French-sounding name with accents', () => {
      const authorString = 'Dr. Élise Dupont';
      const authors = CitationService.parseAuthors(authorString);
      expect(authors).toEqual([
        { firstName: 'Élise', lastName: 'Dupont', prefix: 'Dr' },
      ]);
    });

    it('should parse a name with an umlaut', () => {
      const authorString = 'Jürgen Müller';
      const authors = CitationService.parseAuthors(authorString);
      expect(authors).toEqual([{ firstName: 'Jürgen', lastName: 'Müller' }]);
    });

    it('should parse a name with a hyphen', () => {
      const authorString = 'Jean-Luc Picard';
      const authors = CitationService.parseAuthors(authorString);
      expect(authors).toEqual([{ firstName: 'Jean-Luc', lastName: 'Picard' }]);
    });

    it('should parse a Spanish name with multiple last names', () => {
      const authorString = 'Gabriela Mistral y Soto';
      const authors = CitationService.parseAuthors(authorString);
      expect(authors).toEqual([
        { firstName: 'Gabriela', lastName: 'Mistral y Soto' },
      ]);
    });
  });
});
