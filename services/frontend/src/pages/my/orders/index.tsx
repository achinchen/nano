import Orders from '~frontend/features/my/order/Orders';

export default function Index() {
  return (
    <section className="h-[calc(100dvh-112px)] overflow-y-scroll pa-4 md:max-h-[calc(100dvh-108px)]">
      <Orders />
    </section>
  );
}
