import sharedI from '~frontend/shared/i.json';
import { getServiceColorById } from '~frontend/shared/utils/get-service-color-by-id';
import { SERVICE } from '~frontend/shared/mock';

const TIME = 'w-14 md:w-17 text-xs color-zinc-500 font-normal text-right';

const services = SERVICE.IN_PROGRESS.map(({ name, serviceId }) => ({
  name,
  id: serviceId,
}));

export default function ServiceNav() {
  return (
    <nav className="flex items-center gap-1 border-y-2 border-y-zinc-200 border-y-solid py-2">
      <h6 className={`flex-shrink-0 ${TIME}`}>{sharedI.service}</h6>
      <ul className="flex flex-1 overflow-y-scroll pr-2">
        {services.map(({ id, name }, index) => (
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={`service-${id}-${index}`}
            className={`${
              getServiceColorById(id).ITEM
            } flex-shrink-0 flex rounded-2 overflow-hidden text-sm min-w-20 max-w-60 border-1 border-color-zinc-200 hover:border-color-zinc-300 border-solid ml-2 border-solid
          `}
          >
            <span
              className={`flex-shrink-0 inline-block w-1 ${
                getServiceColorById(id).BG.DEFAULT
              }`}
            />
            <span className="truncate px-2 py-1">{name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
