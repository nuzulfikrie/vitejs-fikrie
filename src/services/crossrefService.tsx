interface crossRefMetadata {
  doi: string;
}

export const fetchCrossRefMetadata = async (
  doi: string,
): Promise<crossRefMetadata> => {
  const response = await fetch(`https://api.crossref.org/works/${doi}`);
  const data = await response.json();
  //response code 404 throw error
  if (response.status === 404) {
    throw new Error(data.message);
  }

  return data.message;
};
