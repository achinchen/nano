import { Fragment } from 'react';
import Icon from '~frontend/components/Icon';
import sharedI from '~frontend/shared/i.json';
import { formatDuration } from '~frontend/utils/time';

type InfoBlockProps = {
  icon: string;
  title: string;
  content: string;
  className?: string;
};

function InfoBlock({ icon, title, content, className = '' }: InfoBlockProps) {
  return (
    <span className={`flex flex-col md:gap-1 ${className}`}>
      <span className="inline-flex items-center gap-1 color-primary-500">
        <Icon size="2xl" icon={icon} />
        {title}
      </span>
      {content}
    </span>
  );
}

type Props = {
  duration: number;
  supplier: string;
  attendee: number;
  location: {
    name: string;
    address: string;
  };
};

export default function ServiceInfoBlocks({
  duration,
  supplier,
  attendee,
  location,
}: Props) {
  return (
    <Fragment>
      <div className="flex gap-2">
        <InfoBlock
          icon="i-solar-alarm-linear"
          title={sharedI.duration}
          className="flex-1"
          content={formatDuration(duration)}
        />
        <InfoBlock
          icon="i-solar-square-academic-cap-2-outline"
          title={sharedI.supplier}
          content={supplier}
          className="flex-1 border-x-px border-zinc-200 border-x-solid px-2"
        />
        <InfoBlock
          icon="i-solar-chair-linear"
          title={sharedI.attendee}
          className="flex-1"
          content={`${attendee} ${sharedI.unit.attendee}`}
        />
      </div>
      <InfoBlock
        icon="i-solar-map-linear"
        className="mt-3"
        title={sharedI.location}
        content={`${location.name}(${location.address})`}
      />
    </Fragment>
  );
}
