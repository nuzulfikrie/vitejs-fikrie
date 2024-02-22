//import * as fs from 'fs';
//import { parse } from '@fast-csv/parse'; // Import the 'parse' function from the '@fast-csv/parse' package
//import { Cite } from
import { Cite } from '@citation-js/core';

interface Author {
  firstName: string;
  lastName: string;
  prefix?: string;
  suffix?: string;
}

// Formats the author's name by concatenating the prefix, first name, last name, and suffix
function formatAuthorName(author: Author): string {
  const fullName = [
    author.prefix,
    author.firstName,
    author.lastName,
    author.suffix,
  ];

  //name for citiation, we return family name and given name, given name is in initial
  return `${author.lastName}`;
}

function formatAuthorNameCite(author: Author): string {
  const fullName = [
    author.prefix,
    author.firstName,
    author.lastName,
    author.suffix,
  ];

  //just combine first and lastname with a space
  return `${author.firstName} ${author.lastName}`;
}

// Generates an in-text citation based on the provided authors and year
function generateInTextCitation(authors: Author[], year: number): string | Error {
  if (!authors.length) {
    throw new Error('No authors provided');
  }

  console.log('-- authors');
  console.log(authors);

  let citation = '';

  switch (authors.length) {
    case 1:
      citation = formatAuthorName(authors[0]);
      break;
    case 2:
      citation = `${formatAuthorName(authors[0])} & ${formatAuthorName(authors[1])}`;
      break;
    default:
      citation = `${formatAuthorName(authors[0])} et al.`;
      break;
  }

  return `(${citation}, ${year})`;
}

// Parses a string of author names and returns an array of Author objects
export async function parseAuthors(authorsString: string): Promise<Author[]> {
  try {
    const authors: Author[] = [];
    const authorNames = authorsString.split(', ');

    for (const name of authorNames) {
      const parts = name.split(' ');
      const lastName = parts.pop() || '';
      const firstName = parts.join(' ');
      const prefix = parts.length > 1 ? parts.shift() : undefined;
      const suffix = parts.length > 1 ? parts.pop() : undefined;

      authors.push({ firstName, lastName, prefix, suffix });
    }

    return authors;
  } catch (err) {
    throw new Error(`Error parsing authors: ${err}`);
  }
}

// // Parses a CSV file containing author data using the '@fast-csv/parse' package
// async function parseAuthorsFastCSV(filePath: string): Promise<Author[]> {

//   const stream = fs.createReadStream(filePath);
//   const parser = parse({ headers: true}); // Updated to include headers and skip empty lines
//   const records: Author[] = [];

//   return new Promise((resolve, reject) => {
//     stream.pipe(parser)
//       .on('data', (row: Author) => records.push(row))
//       .on('end', () => resolve(records))
//       .on('error', (err) => reject(new Error(`Error parsing CSV: ${err}`)));
//   });
// }

// Generates a citation using the '@citation-js/core' package
function generateCitation(authors: Author[], year: number, title: string, source: string): string {
  const formattedAuthors = authors.reduce((prev, curr) => {
    const formattedAuthor = formatAuthorNameCite(curr);
    return prev ? `${prev}, ${formattedAuthor}` : formattedAuthor;
  }, '');

console.log('---formattedAuthors---');
console.log(formattedAuthors);
  console.log('---formattedAuthors---');

  const data = {
    type: 'article-journal',
    author: formattedAuthors,
    issued: { 'date-parts': [[year]] },
    title,
    'container-title': source,
  };


  const cite = new Cite(data, {
    // Default options: BibTeX JSON
    output: {
      style: 'bibtex'
    }
  });

  return cite;
}

// Generates an APA citation using the '@citation-js/core' package
function generateAPACitation(authors: Author[], year: number, title: string, source: string, volume: number, issue: number, pages: string): string {
  const formattedAuthors = authors.reduce((prev, curr) => {
    const formattedAuthor = formatAuthorNameCite(curr);
    return prev ? `${prev}, ${formattedAuthor}` : formattedAuthor;
  }, '');


  const data = {
    type: 'book-chapter',
    author: formattedAuthors,
    issued: { 'date-parts': [[year]] },
    container_title: '',
    title,
    book_title: source,
    edition: '',
    series: '',
    volume,
    issue,
    pagination: pages,
  };

  const cite = new Cite(data, {
    // Default options: BibTeX JSON
    output: {
      style: 'bibtex'
    }
  })

  console.log('---------------- generateAPACitation -------------------');
  console.log(cite);
  console.log('---------------- generateAPACitation -------------------');

  return cite;
}


/**
 * Generates an APA citation in HTML format using a DOI.
 *
 * @param doi - The DOI (Digital Object Identifier) of the resource.
 * @returns A Promise that resolves to the APA citation in HTML format.
 *
 * @example
 * ```typescript
 * const doi = '10.1234/abcd1234';
 * const citation = await generateApaCitationHtmlFormatUsingDoi(doi);
 * console.log(citation);
 * ```
 */
 function generateApaCitationHtmlFormatUsingDoi(doi: string): Promise<string> {
  let citation =  Cite(doi);

  let output = citation.format('citation', {
    format: 'html',
    template: 'apa',
    lang: 'en-US'
  });
  console.log('###################### outout ######################');
  console.log(output);
  console.log('###################### outout ######################');

  return output;
}

/**
 * Generates a citation in text format using a DOI.
 *
 * @param doi - The DOI (Digital Object Identifier) of the resource.
 * @returns A Promise that resolves to the citation in text format.
 *
 * @example
 * ```typescript
 * const doi = '10.1234/abcd1234';
 * const citation = await generateCitationUsingDoi(doi);
 * console.log(citation);
 * ```
 */

  export async function generateCitationUsingDoi(doi: string): Promise<string> {
    const data = await Cite.async(doi);

    console.log('############################################################ data ##########################################################');

    console.log(data);
    console.log('############################################################ data ##########################################################');


    let output = data.format('bibliography', {
      format: 'text',
      lang: 'en-US'
    });

    console.log('############################################################ generateCitationUsingDoi ##########################################################');

    console.log(output);
    console.log('############################################################ generateCitationUsingDoi ##########################################################');

    return output;
  }





export default {
  generateInTextCitation,
  parseAuthors,
  //parseAuthorsFastCSV,
  generateCitation,
  generateAPACitation,
  generateApaCitationHtmlFormatUsingDoi,
  generateCitationUsingDoi
};
