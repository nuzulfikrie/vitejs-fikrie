import { fetchCrossRefMetadata } from './crossrefService';

interface authorCrossrefData {
  given: string;
  family: string;
  sequence: string;
  affiliation: [];
}

interface Author {
  firstName: string;
  lastName: string;
  prefix?: string;
  suffix?: string;
}
class CitationService {
  private static knownPrefixes = ['Dr', 'Mr', 'Ms', 'Mrs', 'د'];
  private static knownSuffixes = ['Jr', 'Sr', 'II', 'III', 'IV'];
  private static conjunctionsParticles = [
    'y',
    'et',
    'en',
    'und',
    'e',
    'wa',
    'и',
    'van',
    'Le',
  ];

  static formatAuthorName({
    prefix,
    firstName,
    lastName,
    suffix,
  }: Author): string {
    return [prefix, firstName, lastName, suffix]
      .filter(Boolean)
      .map((part) => this.capitalize(part as string))
      .join(' ');
  }

  static capitalize(str: string = ''): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  static parseAuthors(authorsString: string): Author[] {
    if (!authorsString.trim()) {
      throw new Error('Authors string is empty or only contains whitespace.');
    }

    authorsString = authorsString.replace(/\.$/, ''); // Remove trailing dot

    return authorsString
      .split(',')
      .map((name) => this.processAuthorName(name.trim()));
  }

  private static processAuthorName(name: string): Author {
    const parts = name.split(' ');
    let prefix: string | undefined;
    let suffix: string | undefined;

    prefix = this.extractPrefix(parts);
    suffix = this.extractSuffix(parts);

    const { firstName, lastName } = this.extractNames(parts);

    return { firstName, lastName, prefix, suffix };
  }

  private static extractPrefix(parts: string[]): string | undefined {
    if (this.knownPrefixes.includes(parts[0].replace(/\./, ''))) {
      return parts.shift()?.replace(/\.$/, ''); // Remove and return prefix
    }
    return undefined;
  }

  private static extractSuffix(parts: string[]): string | undefined {
    const lastPart = parts[parts.length - 1];
    if (this.knownSuffixes.some((suffix) => lastPart.endsWith(suffix))) {
      return parts.pop(); // Remove and return suffix
    }
    return undefined;
  }

  private static extractNames(parts: string[]): {
    firstName: string;
    lastName: string;
  } {
    const particleIndex = parts.findIndex((part) =>
      this.conjunctionsParticles.includes(part),
    );
    let firstName, lastName;

    if (particleIndex > 0) {
      // Found a particle not at the start
      firstName = parts.slice(0, particleIndex).join(' ');
      lastName = parts.slice(particleIndex).join(' ');
    } else {
      lastName = parts.pop() || ''; // Default to last part as last name
      firstName = parts.join(' ');
    }

    return { firstName, lastName };
  }

  static generateInTextCitation(
    authors: Author[],
    year: number,
    doi: string | null,
  ): string {
    if (authors.length === 0) {
      throw new Error('No authors provided for citation.');
    }

    if (!year) {
      throw new Error('No year provided for citation.');
    }

    if (doi) {
      try {

        console.log('-- doi --');

        console.log(doi);

        console.log('--- doi--');

        let { title, authorsCrossRef, year } = this.useDataFromCrossRef(doi);




        let citationCrossref: string;

        if (authorsCrossRef.length > 2) {
          citationCrossref = `${this.formatAuthorFamilyName(
            authorsCrossRef[0],
          )} et al.`;
        } else if (authorsCrossRef.length === 2) {
          citationCrossref = `${this.formatAuthorFamilyName(
            authorsCrossRef[0],
          )} & ${this.formatAuthorFamilyName(authorsCrossRef[1])}`;
        } else {
          citationCrossref = this.formatAuthorFamilyName(authorsCrossRef[0]);
        }

        return `(${citationCrossref}, ${year})`;
      } catch (error) {
        console.error('Error while fetching Crossref data:', error);

        throw new Error('Error processing crossref');
      }
    }

    let citation: string;

    if (authors.length > 2) {
      citation = `${this.formatAuthorLastName(authors[0])} et al.`;
    } else if (authors.length === 2) {
      citation = `${this.formatAuthorLastName(
        authors[0],
      )} & ${this.formatAuthorLastName(authors[1])}`;
    } else {
      citation = this.formatAuthorLastName(authors[0]);
    }

    return `(${citation}, ${year})`;
  }

  static formatAuthorLastName({ lastName }: Author): string {
    return lastName
      .split(' ')
      .map((part) => this.capitalize(part))
      .join(' ');
  }

  static formatAuthorFamilyName({ family }: authorCrossrefData): string {
    return family;
  }

  static useDataFromCrossRef(doi: string) {
    return fetchCrossRefMetadata(doi).then((data) => {
      return {
        title: data.title[0],
        authorsCrossRef: data.author,
        year: data.created['date-parts'][0][0],
      };
    });
  }
}

export { CitationService };
