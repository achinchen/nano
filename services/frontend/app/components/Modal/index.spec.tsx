import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '.';

const CHILDREN = 'content';
const onClose = jest.fn();

const setup = ({
  hasCloseButton = true,
}: {
  hasCloseButton?: boolean;
} = {}) => {
  render(
    <Modal onClose={onClose} hasCloseButton={hasCloseButton}>
      <div>{CHILDREN}</div>
    </Modal>
  );
};

describe('rendering', () => {
  test('render dialog backdrop', () => {
    setup();
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  test('render dialog', async () => {
    setup();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('render children', () => {
    setup();
    expect(screen.getByText(CHILDREN)).toBeInTheDocument();
  });

  test('render close button', () => {
    setup();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('not render close button', () => {
    setup({ hasCloseButton: false });
    expect(() => screen.getByRole('button')).toThrow();
  });
});

describe('interaction', () => {
  beforeEach(() => {
    setup();
    onClose.mockReset();
  });

  test('trigger onClose when click backdrop', async () => {
    await userEvent.click(screen.getByRole('presentation'));
    expect(onClose).toHaveBeenCalled();
  });

  test('not trigger onClose when click dialog', async () => {
    await userEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
