import { useNavigate } from 'react-router-dom';
import IconButton from '~frontend/components/IconButton';
import i from './i.json';

export default function Header() {
  const navigate = useNavigate();
  const onClick = () => navigate(-1);

  return (
    <header className="justify-between content-header md:flex lt-md:border-transparent">
      <IconButton
        icon="i-solar-alt-arrow-left-linear"
        color="dark"
        variant="text"
        size="sm"
        className="hidden md:block"
        onClick={onClick}
      />
      <h2 className="hidden text-xl md:block">{i.title}</h2>
      <IconButton
        icon="i-custom-close"
        color="dark"
        variant="text"
        size="sm"
        className="ml-auto block md:invisible md:ml-0"
        onClick={onClick}
      />
    </header>
  );
}
