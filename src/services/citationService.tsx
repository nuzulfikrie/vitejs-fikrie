interface Author {
  firstName: string;
  lastName: string;
  prefix?: string;
  suffix?: string;
}

class CitationService {
  static generateInTextCitation(authors: Author[], year: number): string {
    if (authors.length === 0) {
      throw new Error('No authors provided');
    }

    let citation = authors.map(this.formatAuthorName).join(', ');

    // Adjusting the format based on the number of authors
    if (authors.length > 2) {
      citation = `${this.formatAuthorName(authors[0])} et al.`;
    } else if (authors.length === 2) {
      citation = citation.replace(', ', ' & ');
    }

    return `(${citation}, ${year})`;
  }

  static formatAuthorName({
    prefix,
    firstName,
    lastName,
    suffix,
  }: Author): string {
    const parts = [prefix, firstName, lastName, suffix]
      .filter(Boolean) // Remove undefined or empty parts
      .map((part) => CitationService.capitalize(part)); // Directly reference the static method

    return parts.join(' ');
  }

  static capitalize(str: string = ''): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  static parseAuthors(authorsString: string): Author[] {
    //remove last  '.' in this string

    if (!authorsString.trim()) {
      throw new Error('Authors string is empty or only contains whitespace');
    }

    authorsString = authorsString.replace(/\.$/, '');

    const knownPrefixes = ['Dr', 'Mr', 'Ms', 'Mrs', 'د'];
    const conjunctionsParticles = [
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

    // Preprocessing to handle prefixes attached directly to names
    knownPrefixes.forEach((prefix) => {
      // Pattern to match prefix followed by a non-space character
      const regex = new RegExp(`(${prefix})\\.(?=[^\\s])`, 'gi');
      authorsString = authorsString.replace(regex, `$1. `);
    });

    return authorsString.split(', ').map((name) => {
      if (this.detectNamePatternSpanish(name)) {
        return this.processNameSpanish(name);
      }

      let parts = name.split(' ');
      let prefix: string | undefined;
      let suffix: string | undefined;

      // Handling known prefixes
      if (parts[0] && knownPrefixes.includes(parts[0].replace(/\./, ''))) {
        prefix = parts.shift()?.replace(/\.$/, ''); // Remove dot for comparison and from the prefix
      }

      // Special handling for conjunctions and particles
      const particleIndex = parts.findIndex((part) =>
        conjunctionsParticles.includes(part),
      );
      let firstName: string;
      let lastName: string;

      if (particleIndex > 0) {
        // Found a particle and it's not at the start
        firstName = parts.slice(0, particleIndex).join(' ');
        lastName = parts.slice(particleIndex).join(' ');
      } else {
        lastName = parts.pop() || ''; // Default to last part as last name
        firstName = parts.join(' ');
      }

      return { firstName, lastName, prefix, suffix };
    });
  }

  static detectNamePatternSpanish(authorString: string): boolean {
    // Regex to detect pattern: "name1 name2 y name3"
    const spanishPattern = /\b\w+\s+\w+\s+y\s+\w+\b/;
    return spanishPattern.test(authorString);
  }
  static processNameSpanish(authorString: string) {
    const parts = authorString.split(' ');
    const yIndex = parts.findIndex(part => part.toLowerCase() === 'y');
    let prefix: string | undefined = undefined;
    let suffix: string | undefined = undefined;

    // Check for prefix in the first part
    if (parts.length > 0) {
      const knownPrefixes = ['Dr', 'Mr', 'Ms', 'Mrs'];
      if (knownPrefixes.includes(parts[0])) {
        prefix = parts.shift(); // Remove and store the prefix
      }
    }

    // Check for suffix in the last part
    if (parts.length > 0) {
      const knownSuffixes = ['Jr', 'Sr', 'II', 'III', 'IV'];
      const lastPart = parts[parts.length - 1];
      if (knownSuffixes.some(suffix => lastPart.endsWith(suffix))) {
        suffix = parts.pop(); // Remove and store the suffix
      }
    }

    let firstName = '';
    let lastName = '';

    if (yIndex > 0 && yIndex < parts.length - 1) { // Ensure 'y' is not at the start or end
      firstName = parts.slice(0, yIndex).join(' ');
      lastName = parts.slice(yIndex).join(' '); // Include 'y' and the rest as last name
    } else {
      // Fallback if 'y' is not properly positioned, treat the entire string as the first name
      firstName = parts.join(' ');
    }

    return { firstName, lastName, prefix, suffix };
  }
}

export { CitationService };
