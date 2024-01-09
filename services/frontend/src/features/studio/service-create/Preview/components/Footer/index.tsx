import Button from '~frontend/components/Button';
import {
  getInfo,
  clearInfo,
} from '~frontend/features/studio/service-create/utils';
import { getStartAtAndEndAt } from '~frontend/features/studio/service-create/Preview/utils';
import { useServiceCreateContext } from '~frontend/features/studio/service-create/context';
import useCreateService from './hooks/use-create-service';
import i from './i.json';

export function Footer() {
  const { toPreviousStep, disabled, setting } = useServiceCreateContext();
  const { loading, createService } = useCreateService();

  const onSubmit = async () => {
    const info = getInfo();

    const { startAt, endAt } = getStartAtAndEndAt({
      startAt: info.startAt,
      endAt: info.endAt,
      startTime: info.startTime,
      endTime: info.endTime,
      allday: info.allday,
      studioOpenAt: setting?.openAt as Date,
      studioOpenDuration: setting?.openDuration as number,
    });

    await createService({
      name: info.name,
      description: info.description,
      duration: info.duration,
      attendee: info.attendee,
      supplierId: info.supplierId,
      locationId: info.locationId,
      allday: info.allday,
      queue: info.queue,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      providerId: setting?.id as number,
    });

    clearInfo();
  };

  return (
    <footer className="footer justify-between">
      <Button
        color="dark"
        className="flex-shrink-0 flex-grow-0 flex-basis-30"
        variant="text"
        size="md"
        onClick={toPreviousStep}
      >
        {i.previous}
      </Button>
      <Button
        color="primary"
        className="ml-auto flex-shrink-0 flex-grow-0 flex-basis-30"
        variant="solid"
        size="md"
        onClick={onSubmit}
        disabled={disabled}
        loading={loading}
      >
        {i.submit}
      </Button>
    </footer>
  );
}

export default Footer;
