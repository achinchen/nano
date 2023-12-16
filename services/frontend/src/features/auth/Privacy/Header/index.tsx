import i from './i.json';

export default function PolicyHeader() {
  return (
    <header className="content-header md:flex md:justify-center">
      <h2 className="text-xl">{i.title}</h2>
    </header>
  );
}
