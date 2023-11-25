import sharedI from '~frontend/shared/i.json';
import { getServiceColorById } from '~frontend/shared/get-service-color-by-id';

const mockServiceData = {
  17: [{ name: '提拉米蘇蛋糕課', id: 1, status: 'full' }],
  20: [
    {
      name: '提拉米蘇蛋糕課',
      description: '提拉米蘇蛋糕課的敘述就好似這樣',
      id: 1,
      startTime: '10:00',
      endTime: '20:00',
      status: 'unsold',
    },
    {
      name: '情人節手作',
      id: 2,
      description: '情人節手作的敘述就好似這樣',
      startTime: '10:00',
      endTime: '12:00',
      status: 'has-order',
    },
    {
      name: '3天寫程式就上手不可能',
      description: '3天寫程式就上手不可能的敘述就好似這樣',
      id: 3,
      startTime: '09:00',
      endTime: '15:00',
      status: 'full',
    },
    {
      name: '精油課程妳看不見',
      id: 12,
      startTime: '10:00',
      endTime: '18:00',
      description: '精油課程妳看不見的敘述就好似這樣',
      status: 'has-order',
    },
    {
      name: '提拉米蘇蛋糕課',
      description: '提拉米蘇蛋糕課的敘述就好似這樣',
      startTime: '19:00',
      endTime: '21:00',
      id: 30,
      status: 'has-order',
    },
  ],
  30: [
    {
      name: '提拉米蘇蛋糕課',
      id: 30,
      status: 'has-order',
    },
  ],
};

const TIME = 'w-14 md:w-17 text-xs color-zinc-500 font-normal text-right';

const selectedDateService = mockServiceData['20'];

export default function ServiceNav() {
  return (
    <nav className="flex items-center gap-1 border-y-2 border-y-zinc-200 border-y-solid py-2">
      <h6 className={`flex-shrink-0 ${TIME}`}>{sharedI.service}</h6>
      <ul className="flex flex-1 overflow-y-scroll pr-2">
        {selectedDateService.map(({ id, name }, index) => (
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
