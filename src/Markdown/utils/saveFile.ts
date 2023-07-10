export const saveFile = (response: File, fileName?: string) => {
  const url = window.URL.createObjectURL(response);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName || response.name}`);
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
};
