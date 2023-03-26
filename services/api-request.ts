type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
const generateRequestConfig = (method: HttpMethods, token?: string | undefined, body?: BodyInit): RequestInit => {
  const config: RequestInit = {
    method: method,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  };

  if (!token) {
    delete (config.headers as any)['Authorization'];
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  return config;
};

async function request<T>(url: string, config: RequestInit, searchParams?: URLSearchParams): Promise<T> {
  try {
    const response = await fetch(searchParams ? `${url}?${searchParams}` : url, config);
    return (await response.json()) as T;
  } catch (e) {
    // TODO handle error
    throw new Error(`Ooops something went wrong!`);
  }
}

export const mumbleApi = {
  getWithoutAuth: <T>(urlPart: string, searchParams?: URLSearchParams) =>
    request<T>(urlPart, generateRequestConfig('GET'), searchParams),

  get: <T>(url: string, token: string | undefined, searchParams?: URLSearchParams) =>
    request<T>(url, generateRequestConfig('GET', token), searchParams),

  post: <T>(url: string, token: string, body: BodyInit) => request<T>(url, generateRequestConfig('POST', token, body)),
};
