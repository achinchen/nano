import type { Severity } from '~frontend/components/Notify/types';
import { Fragment, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServiceCreateContext } from '~frontend/features/studio/service-create/context';
import { clearInfo } from '~frontend/features/studio/service-create/utils';
import { getIsMobile } from '~frontend/utils/device';
import Button from '~frontend/components/Button';
import i from './i.json';

const Modal = lazy(() => import('~frontend/components/Notify/Modal'));
const Sheet = lazy(() => import('~frontend/components/Notify/Sheet'));

const props = {
  title: i.title,
  description: i.description,
  severity: 'warning' as Severity,
  hasClearButton: true,
};

function Actions() {
  const { toggleExit } = useServiceCreateContext();
  const navigate = useNavigate();

  const onExit = () => {
    clearInfo();
    toggleExit();
    navigate(-1);
  };

  return (
    <Fragment>
      <Button color="primary" variant="outline" onClick={onExit}>
        {i.exit}
      </Button>
      <Button color="primary" variant="solid" onClick={toggleExit}>
        {i.continue}
      </Button>
    </Fragment>
  );
}

export default function ExitPrompt() {
  const { openedExitPrompt, toggleExit } = useServiceCreateContext();

  return openedExitPrompt ? (
    getIsMobile() ? (
      <Sheet {...props} onClose={toggleExit}>
        <Actions />
      </Sheet>
    ) : (
      <Modal {...props} onClose={toggleExit}>
        <Actions />
      </Modal>
    )
  ) : null;
}
