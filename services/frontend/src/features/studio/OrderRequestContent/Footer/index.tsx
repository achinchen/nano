import Button from '~frontend/components/Button';
import { useRequestOrderContext } from '~frontend/features/studio/OrderRequestContent/context';
import i from './i.json';

export default function Footer() {
  const { selectedTime } = useRequestOrderContext();

  const onReject = () => {
    /** */
  };
  const onAccept = () => {
    /** */
  };
  const disabled = !selectedTime;

  return (
    <footer className="w-full flex gap-2 px-4 py-2 shadow-dialog">
      <Button
        onClick={onReject}
        variant="outline"
        color="primary"
        className="flex-1"
      >
        {i.reject}
      </Button>
      <Button
        onClick={onAccept}
        variant="solid"
        color="primary"
        disabled={disabled}
        className="flex-1"
      >
        {i.accept}
      </Button>
    </footer>
  );
}
