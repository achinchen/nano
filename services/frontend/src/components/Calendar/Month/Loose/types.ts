export type Props = {
  className?: string;
  onSelect: (date: Date) => void;
  selectedDate?: Date;
  data?: {
    [key: string]: unknown;
  };
};
