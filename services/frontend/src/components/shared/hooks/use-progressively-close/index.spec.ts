import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useProgressivelyClose } from '.';

function createElement(targetId?: string) {
  const element = document.createElement('div');
  if (targetId) {
    element.id = targetId;
  }
  document.body.appendChild(element);
  return element;
}

describe('useProgressivelyClose', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('close on Escape key press', async () => {
    const onClose = jest.fn();
    renderHook(() =>
      useProgressivelyClose({
        onClose,
      })
    );
    await userEvent.keyboard('{escape}');
    expect(onClose).toHaveBeenCalled();
  });

  test('close on other key press', async () => {
    const onClose = jest.fn();
    renderHook(() =>
      useProgressivelyClose({
        onClose,
      })
    );
    await userEvent.keyboard('{enter}');

    expect(onClose).not.toHaveBeenCalled();
  });

  test('close when clicking other element', async () => {
    const onClose = jest.fn();
    const targetElement = createElement();
    const targetRef = { current: targetElement };
    renderHook(() =>
      useProgressivelyClose({
        onClose,
        targetRef,
      })
    );
    const otherElement = createElement();
    await userEvent.click(otherElement);
    expect(onClose).toHaveBeenCalled();
  });

  test('not close when clicking the target element', async () => {
    const onClose = jest.fn();
    const targetElement = createElement();
    const targetRef = { current: targetElement };
    renderHook(() =>
      useProgressivelyClose({
        onClose,
        targetRef,
      })
    );
    await userEvent.click(targetElement);
    expect(onClose).not.toHaveBeenCalled();
  });

  test('not close when disableClose is true', async () => {
    const onClose = jest.fn();
    renderHook(() =>
      useProgressivelyClose({
        onClose,
        disableClose: true,
      })
    );
    await Promise.all([
      userEvent.keyboard('{escape}'),
      userEvent.click(document.body),
    ]);
    expect(onClose).not.toHaveBeenCalled();
  });
});
