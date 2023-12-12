import Avatar from '~frontend/components/Avatar';
import Avocado from '~frontend/assets/avatar.png';
import sharedI from '~frontend/shared/i.json';
import scopedI from './i.json';

const info = {
  email: 'example@example.com',
  no: '123456789',
};

const CONTENT_CLASSNAME = 'color-zinc-600';

export default function Content() {
  return (
    <section className="h-[calc(100dvh-112px)] flex flex-1 flex-col gap-4 overflow-y-scroll bg-white px-4 py-6 font-normal md:h-[calc(100dvh-108px)] md:px-10">
      <Avatar size="lg" className="flex-shrink-0 flex-grow-0" src={Avocado} />
      <div className="flex flex-col">
        {scopedI.no}
        <span className={CONTENT_CLASSNAME}>{info.no}</span>
      </div>
      <div className="flex flex-col">
        {sharedI.info.field.email}
        <span className={CONTENT_CLASSNAME}>{info.email}</span>
      </div>
    </section>
  );
}
