async function http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(path, config);
  const response = await fetch(request);

  if (!response.ok) {
    throw new Error(`Ooops something went wrong! - ${response.statusText}`);
  }

  // may error if there is no body, return empty array
  return response.json().catch(() => ({}));
}

export async function getRequest<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: 'get', ...config };
  return await http<T>(path, init);
}

export async function postRequest<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
  const init = { method: 'post', body: body instanceof FormData ? body : JSON.stringify(body), ...config };

  return await http<U>(path, init);
}

export async function putRequest<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
  const init = { method: 'put', body: JSON.stringify(body), ...config };
  return await http<U>(path, init);
}
