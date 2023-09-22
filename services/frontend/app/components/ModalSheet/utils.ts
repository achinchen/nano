import { Severity } from '~frontend/components/ModalSheet/types';
export const getPassiveClose = (severity: Severity) => severity !== 'info';
