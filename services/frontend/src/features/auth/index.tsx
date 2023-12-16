import { Link, useNavigate } from 'react-router-dom';
import ExampleStudio from '~frontend/assets/example-studio.png';
import Brand from '~frontend/assets/brand.jpg';
import Button from '~frontend/components/Button';
import i from './Privacy/Content/i.json';

const studio = {
  name: '阿狗狗快樂工作室',
  avatar: ExampleStudio,
};

const WIDTH = 'md:w-sm';
const LINK = 'px-0.5 mx-0.5 border-b border-zinc-700 border-b-solid';

export default function Auth() {
  const navigator = useNavigate();
  const onLogin = () => {
    navigator(-1);
  };

  return (
    <section className="h-[calc(100dvh-112px)] flex flex-1 flex-col items-center gap-4 bg-white px-4 py-6 font-normal md:h-[calc(100dvh-108px)] md:px-10">
      <div className={`mt-26 flex justify-center items-center gap-2 ${WIDTH}`}>
        <img src={studio.avatar} alt="logo" className="h-6 w-6" />
        <h2 className="text-2xl">{studio.name}</h2>
      </div>
      <Button
        prefixIcon="i-custom-brand-google"
        variant="solid"
        color="primary"
        size="md"
        className={`${WIDTH} mt-10`}
        onClick={onLogin}
      >
        {i.auth}
      </Button>
      <p className="my-0 text-center">
        {i.agreement}
        <Link to="/privacy" className={LINK}>
          {i.privacy}
        </Link>
        {i.and}
        <Link to="/terms" className={LINK}>
          {i.terms}
        </Link>
      </p>
      <img src={Brand} alt="example" className="mt-auto h-6 md:mb-4" />
    </section>
  );
}
