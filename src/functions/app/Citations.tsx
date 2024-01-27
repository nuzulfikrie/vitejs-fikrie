// Define the interface for author details

interface Author {
  firstName: string;
  lastName: string;
  prefix?: string;
  suffix?: string;
}

function generateInTextCitation(authors: Author[], year: number): string {
  if (authors.length === 0) {
    console.error('No authors provided');
    return '';
  }

  let citation = '';

  switch (authors.length) {
    case 1:
      // Single author
      citation = formatAuthorName(authors[0]);
      break;
    case 2:
      // Two authors
      citation = `${formatAuthorName(authors[0])} & ${formatAuthorName(
        authors[1],
      )}`;
      break;
    default:
      // More than two authors
      citation = `${formatAuthorName(authors[0])} et al.`;
      break;
  }

  return `(${citation}, ${year})`;
}

function formatAuthorName(author: Author): string {
  // Format name with prefix and suffix if present
  const fullName = [
    author.prefix,
    author.firstName,
    author.lastName,
    author.suffix,
  ]
    .filter(Boolean)
    .join(' ');

  return fullName;
}

// Function that parses author names from the string and returns an array of Author objects
function parseAuthors(authorsString: string): Author[] {
  const authors: Author[] = [];
  const authorNames = authorsString.split(', ');

  authorNames.forEach((name) => {
    const parts = name.split(' ');
    const lastName = parts.pop() || ''; // Assumes the last part is the last name
    const firstName = parts.join(' '); // Rest is considered as the first name
    const prefix = parts.length > 1 ? parts.shift() : undefined;
    const suffix = parts.length > 1 ? parts.pop() : undefined;

    authors.push({ firstName, lastName, prefix, suffix });
  });

  return authors;
}

//EXPORT
export { generateInTextCitation, parseAuthors };
