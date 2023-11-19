import { SEVERITIES } from './constants';
export type Severity = (typeof SEVERITIES)[number];

export type NotifyProps = React.PropsWithChildren<{
  onClose: () => void;
  title: string;
  description: string;
  actionVertical?: boolean;
  hasCloseButton?: boolean;
  severity: Severity;
  picture?: React.ReactNode | null;
}>;
