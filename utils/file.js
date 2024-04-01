export function createFiles(fileInfos) {
  const files = [];

  fileInfos.forEach((fileInfo) => {
    const file = new File([fileInfo], fileInfo.name, {
      lastModified: fileInfo.lastModified,
      type: fileInfo.type,
    });
    files.push(file);
  });

  return files;
}
export function base64toBlob(base64Data, contentType) {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

export function fixBase64Format(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  return (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
}
