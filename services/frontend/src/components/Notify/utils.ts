import type { Severity } from '~frontend/components/Notify/types';
export const getPassiveClose = (severity: Severity) => severity !== 'info';
