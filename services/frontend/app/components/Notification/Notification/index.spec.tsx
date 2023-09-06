import type { NotificationSeverity } from '~frontend/components/Notification/types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Notification } from '.';

const mockChildren = 'mockChildren';

describe('Notification: render', () => {
  const setup = () => {
    render(
      <Notification severity="error" title="title">
        {mockChildren}
      </Notification>
    );
  };

  it('render successfully', () => {
    setup();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('render children successfully', () => {
    setup();
    expect(screen.getByText(mockChildren)).toBeInTheDocument();
  });

  it('render close button successfully', () => {
    setup();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('render icon successfully', () => {
    setup();
    expect(screen.getAllByLabelText('icon-label').length).toBe(2);
  });
});

describe('Notification: automatically dismiss', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'clearTimeout');
  });

  const setup = (severity: NotificationSeverity) => {
    return render(
      <Notification severity={severity}>{mockChildren}</Notification>
    );
  };

  const notAutomaticallyCloseSeverity: NotificationSeverity[] = [
    'error',
    'warning',
  ];
  test.each(notAutomaticallyCloseSeverity)(
    'not automatically close when severity is %s',
    (severity) => {
      const { unmount } = setup(severity);
      expect(global.setTimeout).not.toHaveBeenCalled();
      unmount();
      expect(global.clearTimeout).not.toHaveBeenCalledWith(expect.any(Number));
    }
  );
});

describe('Notification: interaction', () => {
  jest.useFakeTimers();
  const onClose = jest.fn();
  const onClick = jest.fn();

  const setup = () => {
    render(
      <Notification severity="error" onClick={onClick} onClose={onClose}>
        {mockChildren}
      </Notification>
    );
  };

  it('tick props.onClose when clicking close button', async () => {
    setup();
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('click props.onClick when clicking Notification', async () => {
    setup();
    userEvent.click(screen.getByRole('alert'));
    await waitFor(() => {
      expect(onClick).toHaveBeenCalled();
    });
  });
});
