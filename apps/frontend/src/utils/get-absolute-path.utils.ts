const getAbsolutePath = (assetPath: string) =>
  new URL(assetPath, document.URL).toString();

export default getAbsolutePath;  