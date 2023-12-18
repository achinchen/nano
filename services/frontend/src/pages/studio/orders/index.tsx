import Orders from '~frontend/features/studio/order/Orders';

export default function Index() {
  return (
    <section className="h-[calc(100dvh-52px)] flex-1 overflow-y-scroll md:h-[calc(100dvh-112px)] md:border-l-1 md:border-l-zinc-200 md:border-l-solid">
      <Orders />
    </section>
  );
}
