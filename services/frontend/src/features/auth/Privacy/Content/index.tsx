import { getLocaleYYYYMMDD } from '~frontend/utils/date';
import i from './i.json';

export default function Content() {
  return (
    <section className="h-[calc(100dvh-112px)] flex-1 overflow-y-scroll bg-white px-4 py-6 font-normal md:h-[calc(100dvh-108px)] md:px-10">
      <h3 className="text-base font-normal">{i.title}</h3>
      {i.startAt} {getLocaleYYYYMMDD(new Date())}
      <p className="my-4">{i.description}</p>
      <article className="flex flex-col gap-6 whitespace-pre-wrap font-normal">
        {i.content.map(({ title, description, items }, index) => (
          <ol key={title}>
            <li>
              {index + 1}.{title}
            </li>
            {description && <li>{description}</li>}
            {items?.length && (
              <li>
                <ol>
                  {items.map((item, itemIndex) => (
                    <li
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${title}-${itemIndex}`}
                    >
                      {index + 1}.{itemIndex + 1} {item}
                    </li>
                  ))}
                </ol>
              </li>
            )}
          </ol>
        ))}
      </article>
    </section>
  );
}
