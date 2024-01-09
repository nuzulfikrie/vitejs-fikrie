export class PodDataExtractor {
  static extractPodText(htmlString: string): string[] {
    const podTextRegex = /<span class="pod_text" id="\d+"[^>]*>(.*?)<\/span>/g;
    let matches: RegExpExecArray | null;
    const results: string[] = [];

    while ((matches = podTextRegex.exec(htmlString)) !== null) {
      results.push(matches[0]); // Add the whole matched <span> element
    }

    return results;
  }

  static extractPodTextContent(htmlString: string): string[] {
    const podTextRegex = /<span class="pod_text" id="\d+"[^>]*>(.*?)<\/span>/g;
    let matches: RegExpExecArray | null;
    const results: string[] = [];

    while ((matches = podTextRegex.exec(htmlString)) !== null) {
      results.push(matches[1]); // Add only the captured group content (text inside the span)
    }

    return results;
  }

  static extractTextFromHtml(htmlString: string): string {
    //parse dom from html string
    const parser = new DOMParser();
    const dom = parser.parseFromString(htmlString, 'text/html');
    const textNodes = dom.body.childNodes;
    let text = '';
    for (let i = 0; i < textNodes.length; i++) {
      text += textNodes[i].textContent + ' ';
    }

    return text;
  }
}

// Example usage
// const htmlContent = `<span style="color:#669999">Hohberger,Kruger & Almeida (2020) states that the impact of premature alliance termination on knowledge acquisition and innovation outcomes..</span><span style="color:#3399ff">Hohberger et al., (2020) highlighted on alliance termination reduces innovation performance and that innovation output becomes less technologically diverse, while knowledge acquisition becomes less externally oriented. However, we find no relevant drop in acquisition of knowledge from alliance partners post alliance termination. Our exploration of conditional effects shows that firm-level factors, particularly a firm's alliance portfolio, moderate termination effects, while alliance-specific conditions have little impact..</span><span style="color:#666699">However Hohberger et al., (2020) only focused on the relationship between the alliance termination and the innovation performance..</span><span class="pod_text" id="4409" style="color:#003399">Therefore based on Hohberger et al., (2020) my study will focus on the relationship between the alliance formation and novel invention strength..</span>`;

// const extractedText = PodTextExtractor.extractPodText(htmlContent);
// console.log(extractedText);
