import { useNavigate } from 'react-router-dom';
import Button from '~frontend/components/Button';
import i from './i.json';

export default function Footer() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/booking/QQ');
  };

  return (
    <footer className="my--4 w-100% flex bg-white pa-2 shadow-dialog">
      <Button
        color="primary"
        className="flex-1"
        variant="solid"
        size="md"
        onClick={onClick}
      >
        {i.rebook}
      </Button>
    </footer>
  );
}
