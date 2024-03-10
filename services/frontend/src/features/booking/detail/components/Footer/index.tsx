import { useNavigate } from 'react-router-dom';
import Button from '~frontend/components/Button';
import { useAppContext } from '~frontend/context';
import { useMessage } from '~frontend/components/Message';
import i from './i.json';

type Props = {
  disabled: boolean;
};

const ADD_CART_REMINDER_PAYLOAD = {
  severity: 'success',
  title: i.reminder.title,
  children: i.reminder.content,
} as const;

export function Footer({ disabled }: Props) {
  const { addMessage } = useMessage();
  const { setIsEmptyCart } = useAppContext();
  const navigate = useNavigate();

  const onAddCartClick = () => {
    addMessage(ADD_CART_REMINDER_PAYLOAD);
    setIsEmptyCart(false);
  };

  const toCart = () => {
    navigate('/cart');
  };

  return (
    <footer className="footer">
      <Button
        color="primary"
        className="flex-1 md:flex-none"
        variant="outline"
        size="md"
        onClick={onAddCartClick}
        disabled={disabled}
      >
        {i.cart}
      </Button>
      <Button
        color="primary"
        className="flex-1 md:flex-none"
        variant="solid"
        size="md"
        onClick={toCart}
        disabled={disabled}
      >
        {i.book}
      </Button>
    </footer>
  );
}

export default Footer;
