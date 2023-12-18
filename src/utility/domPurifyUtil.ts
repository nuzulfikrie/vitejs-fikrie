import DOMPurify from "dompurify";

export const purifyDom = (html: any) => {
  return DOMPurify.sanitize(html);
};


