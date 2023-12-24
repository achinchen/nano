import { getBasePath } from '~frontend/utils/env/get-base-path';
import { fetcher } from '~frontend/utils/fetcher';

export default async function logout() {
  try {
    await fetcher(getBasePath(), '/logout');
    window.location.href = '/';
  } catch (e) {
    /** */
  }
}
