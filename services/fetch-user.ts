import { getRequest } from './request';
import { User } from '../types/user';

export default async (id: string, token: string): Promise<User> => {
  try {
    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return getRequest<User>(`https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/users/${id}`, config);
  } catch (e: any) {
    throw new Error(`Parsing posts error - ${e.message}`);
  }
};
