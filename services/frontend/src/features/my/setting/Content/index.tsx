import { Fragment } from 'react';
import Avatar from '~frontend/components/Avatar';
import sharedI from '~frontend/shared/i.json';
import IconLoading from '~frontend/components/IconLoading';
import getAvatarById from '~frontend/shared/get-avatar-by-id';
import scopedI from './i.json';
import useProfile from './hooks/use-profile';

const CONTENT_CLASSNAME = 'color-zinc-500';

export default function Content() {
  const { loading, profile } = useProfile();

  return (
    <section className="h-[calc(100dvh-112px)] flex flex-1 flex-col gap-4 overflow-y-scroll bg-white px-4 py-6 font-normal md:h-[calc(100dvh-108px)] md:px-10">
      {loading ? (
        <IconLoading />
      ) : profile ? (
        <Fragment>
          <Avatar
            size="lg"
            className="flex-shrink-0 flex-grow-0"
            src={getAvatarById(profile.id)}
          />
          <div className="flex flex-col">
            {scopedI.no}
            <span className={CONTENT_CLASSNAME}>{profile.id}</span>
          </div>
          <div className="flex flex-col">
            {sharedI.info.field.email}
            <span className={CONTENT_CLASSNAME}>{profile.email}</span>
          </div>
        </Fragment>
      ) : (
        <div>{scopedI.error}</div>
      )}
    </section>
  );
}
