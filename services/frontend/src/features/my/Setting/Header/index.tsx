import i from './i.json';

export default function SettingHeader() {
  return (
    <header className="flex content-header">
      <h2 className="text-lg md:text-xl">{i.title}</h2>
    </header>
  );
}
