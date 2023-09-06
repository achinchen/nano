import type { MessageSeverity } from '~frontend/components/Message/types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { REMAIN_TIME, AUTOMATICALLY_CLOSE_SEVERITIES } from './constants';
import { Message } from '.';

const mockChildren = 'mockChildren';

describe('Message: render', () => {
  const setup = () => {
    render(
      <Message severity="error" title="title">
        {mockChildren}
      </Message>
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

describe('Message: automatically dismiss', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'clearTimeout');
  });

  const setup = (severity: MessageSeverity) => {
    return render(<Message severity={severity}>{mockChildren}</Message>);
  };

  const notAutomaticallyCloseSeverity: MessageSeverity[] = ['error', 'warning'];
  test.each(notAutomaticallyCloseSeverity)(
    'not automatically close when severity is %s',
    (severity) => {
      const { unmount } = setup(severity);
      expect(global.setTimeout).not.toHaveBeenCalled();
      unmount();
      expect(global.clearTimeout).not.toHaveBeenCalledWith(expect.any(Number));
    }
  );

  test.each(AUTOMATICALLY_CLOSE_SEVERITIES)(
    'automatically close when severity is %s',
    (severity) => {
      const { unmount } = setup(severity);
      expect(global.setTimeout).toHaveBeenCalledWith(
        expect.any(Function),
        REMAIN_TIME
      );
      unmount();
      expect(global.clearTimeout).toHaveBeenCalledWith(expect.any(Number));
    }
  );
});

describe('Message: interaction', () => {
  jest.useFakeTimers();
  const onClose = jest.fn();
  const onClick = jest.fn();

  const setup = () => {
    render(
      <Message severity="error" onClick={onClick} onClose={onClose}>
        {mockChildren}
      </Message>
    );
  };

  it('tick props.onClose when clicking close button', async () => {
    setup();
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('click props.onClick when clicking message', async () => {
    setup();
    userEvent.click(screen.getByRole('alert'));
    await waitFor(() => {
      expect(onClick).toHaveBeenCalled();
    });
  });
});
