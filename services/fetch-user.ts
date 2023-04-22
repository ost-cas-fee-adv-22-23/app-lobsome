import { getRequest } from './request';
import { User } from '../types/user';
import { cachedUsers } from '../pages/_app';

export default async (id: string, token: string | undefined): Promise<User> => {
  try {
    if (cachedUsers[id]) {
      return cachedUsers[id];
    }

    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const user = await getRequest<User>(`https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/users/${id}`, config);
    cachedUsers[id] = user;
    return user;
  } catch (e: any) {
    throw new Error(`Parsing posts error - ${e.message}`);
  }
};
