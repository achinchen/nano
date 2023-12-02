import { TAG_CONFIG } from '~frontend/components/Tag/constants';

type Props = {
  currentAttendee: number;
  attendee: number;
  className?: string;
};

export default function AttendeeTag({
  currentAttendee,
  attendee,
  className = '',
}: Props) {
  return (
    <span
      className={`${TAG_CONFIG.sm} ${className} flex items-center bg-primary-200 color-primary-500 h-6`}
    >
      {currentAttendee} / {attendee}
    </span>
  );
}
