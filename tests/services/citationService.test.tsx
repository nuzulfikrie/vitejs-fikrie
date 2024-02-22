import { describe, it, expect, vi } from "vitest";
import citationService from "../../src/services/citationService";
import  generateApaCitationHtmlFormatUsingDoi from "../../src/services/citationService";
import  generateCitationUsingDoi  from "../../src/services/citationService";

import { Cite } from "@citation-js/core";

describe("Citation Service", () => {
  it("should generate in-text citation for single author", () => {
    const authors = [{ firstName: "John", lastName: "Doe" }];
    const year = 2022;
    const result = citationService.generateInTextCitation(authors, year);
    expect(result).toBe("(Doe, 2022)");
  });

  it("should generate in-text citation for two authors", () => {
    const authors = [
      { firstName: "John", lastName: "Doe" },
      { firstName: "Jane", lastName: "Smith" },
    ];
    const year = 2022;
    const result = citationService.generateInTextCitation(authors, year);
    expect(result).toBe("(Doe & Smith, 2022)");
  });

  it("should generate in-text citation for multiple authors", () => {
    const authors = [
      { firstName: "John", lastName: "Doe" },
      { firstName: "Jane", lastName: "Smith" },
      { firstName: "Michael", lastName: "Johnson" },
    ];
    const year = 2022;
    const result = citationService.generateInTextCitation(authors, year);
    expect(result).toBe("(Doe et al., 2022)");
  });

  it("should parse authors from a string", async () => {
    const authorsString = "John Doe, Jane Smith";
    const result = await citationService.parseAuthors(authorsString);
    expect(result).toEqual([
      { firstName: "John", lastName: "Doe" },
      { firstName: "Jane", lastName: "Smith" },
    ]);
  });
  it("should correctly parse authors from a CSV file", async () => {
    // This test assumes you have a CSV file named 'authors.csv' with author details
    const filePath = "./tests/services/citationService.test.tsx";
    const result = await citationService.parseAuthorsFastCSV(filePath);
    expect(result).toEqual([
      {
        firstName: "John",
        lastName: "Doe",
        prefix: undefined,
        suffix: undefined,
      },
      // Add more expected authors as per your CSV content
    ]);
  });

  it("should generate a standard citation", () => {
    const authors = [{ firstName: "John", lastName: "Doe" }];
    const year = 2022;
    const title = "Sample Article";
    const source = "Journal of Testing";
    const result = citationService.generateCitation(
      authors,
      year,
      title,
      source
    );
    // The expected result will depend on how Citation.js formats the citation
    // This is a simplified example; adjust according to your actual expected output
    expect(result).toBeTypeOf("object");
  });

  it("should generate an APA citation", () => {
    const authors = [{ firstName: "John", lastName: "Doe" }];
    const year = 2022;
    const title = "Sample Book Chapter";
    const source = "Handbook of Testing";
    const volume = 1;
    const issue = 1;
    const pages = "10-20";
    const result = citationService.generateAPACitation(
      authors,
      year,
      title,
      source,
      volume,
      issue,
      pages
    );
    // The expected APA citation format; adjust as needed based on your setup and Citation.js output
    expect(result).toBeTypeOf("object");
  });

  // Mock the @citation-js/core module
  vi.mock("@citation-js/core", () => ({
    Cite: vi.fn().mockImplementation((doi) => ({
      format: vi
        .fn()
        .mockReturnValue("<p>Mocked Citation for DOI: " + doi + "</p>"),
    })),
  }));

  describe("Citation Service", () => {
    it("should generate APA citation in HTML format using DOI", async () => {
      const doi = "10.7717/peerj-cs.214";
      const expectedCitationHtml =
        "<p>Mocked Citation for DOI: 10.7717/peerj-cs.214</p>";

      const citationHtml =  citationService.generateApaCitationHtmlFormatUsingDoi(doi);

      console.log('############################################################ citationHtml ##########################################################');

      console.log(citationHtml);
      console.log('############################################################ citationHtml ##########################################################');

      expect(citationHtml).toBe(expectedCitationHtml);
    });

    it("should generate text citation in format using DOI", async () => {
      const doi2 = "10.1016/j.arabjc.2017.05.011";
      const expectedT =
        "Mocked Citation for DOI: 10.1016/j.arabjc.2017.05.011";

      const expected = await citationService.generateCitationUsingDoi(doi2);

      console.log('############################################################ citationHtml ##########################################################');

      console.log(expected);
      console.log('############################################################ citationHtml ##########################################################');

      expect(expected).toBe(expectedT);
    });
  });

  it("should generate text citation in format using DOI ####################################", async () => {
    const doi2 = "10.1016/j.arabjc.2017.05.011";

    const result =  await citationService.generateCitationUsingDoi(doi2);

    console.log('############################################################ citationService  generateCitationUsingDoi ##########################################################');

    console.log(result);
    console.log('############################################################ citationService generateCitationUsingDoi ##########################################################');

  });
});
