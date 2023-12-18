import { useNavigate } from 'react-router-dom';
import IconButton from '~frontend/components/IconButton';

const service = {
  name: '創業諮詢',
};

export default function Header() {
  const navigate = useNavigate();
  const onBack = () => navigate(-1);

  return (
    <h2 className="my-0 flex items-center border-b-px border-b-zinc-200 border-b-solid text-xl font-bold">
      <IconButton
        variant="text"
        icon="i-solar-alt-arrow-left-linear"
        color="dark"
        onClick={onBack}
      />
      {service.name}
    </h2>
  );
}
