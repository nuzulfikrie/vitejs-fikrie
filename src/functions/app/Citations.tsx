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
      .map(this.capitalize); // Capitalize each part

    return parts.join(' ');
  }

  static capitalize(str: string = ''): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  static parseAuthors(authorsString: string): Author[] {
    if (!authorsString.trim()) {
      throw new Error('Authors string is empty or only contains whitespace');
    }

    return authorsString.split(', ').map((name) => {
      const parts = name.split(' ');
      let [firstName, lastName] = ['', ''];
      let prefix, suffix;

      // Assuming the last part is always the last name
      lastName = parts.pop() || '';

      // Checking for common prefixes and suffixes
      if (parts.length > 0) {
        prefix = parts[0].match(/^(Dr|Mr|Ms|Mrs)$/i)
          ? parts.shift()
          : undefined;
        suffix = parts[parts.length - 1].match(/^(Jr|Sr|II|III|IV)$/i)
          ? parts.pop()
          : undefined;
      }

      firstName = parts.join(' ');
      return { firstName, lastName, prefix, suffix };
    });
  }
}

export { CitationService };
