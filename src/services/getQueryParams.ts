export function getQueryParams(data: object) {
  const params = new URLSearchParams();
  Object.keys(data).forEach((key) => {
    params.append(key, data[key]);
  });

  return params.toString();
}
