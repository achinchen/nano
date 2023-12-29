import { getBasePath } from '~frontend/utils/env/get-base-path';
import { fetcher } from '~frontend/utils/fetcher';

export default async function logout() {
  try {
    await fetcher(getBasePath(), '/logout');
    window.location.reload();
  } catch (e) {
    console.error(e);
    /** */
  }
}
