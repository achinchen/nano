import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '.';

const TITLE = 'title';
const CHILDREN = 'content';
const FOOTER = <p>footer</p>;
const onClose = jest.fn();

const setup = ({
  title = '',
  hasCloseButton = true,
}: {
  title?: string;
  hasCloseButton?: boolean;
} = {}) => {
  render(
    <Modal
      onClose={onClose}
      title={title}
      hasCloseButton={hasCloseButton}
      footer={FOOTER}
    >
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

  test('render title', async () => {
    setup({ title: TITLE });
    expect(screen.getByText(TITLE)).toBeInTheDocument();
  });

  test('not render title', () => {
    setup();
    expect(() => screen.getByRole('heading')).toThrow();
  });

  test('render children', () => {
    setup();
    expect(screen.getByText(CHILDREN)).toBeInTheDocument();
  });
  test('render footer', () => {
    setup();
    expect(screen.getByText('footer')).toBeInTheDocument();
  });

  test('render close icon', () => {
    setup();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  test('not render close icon', () => {
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