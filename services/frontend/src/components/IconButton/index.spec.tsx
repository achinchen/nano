import { render, screen } from '@testing-library/react';
import { LOADING_ICON } from './constants';
import IconButton from '.';

describe('IconButton', () => {
  it('renders with the correct custom className', () => {
    render(
      <IconButton icon="i-solar-magnifer-linear" className="custom-class" />
    );
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders with the specified color', () => {
    render(<IconButton icon="i-solar-magnifer-linear" color="primary" />);
    expect(screen.getByRole('button').className).toMatch(/primary/);
  });

  it('renders with the specified variant', () => {
    render(<IconButton icon="i-solar-magnifer-linear" variant="text" />);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });

  it('renders with the rounded prop is true', () => {
    render(<IconButton icon="i-solar-magnifer-linear" rounded />);
    expect(screen.getByRole('button').className).toMatch(/rounded-/);
  });

  it('renders with the disabled prop is true', () => {
    render(<IconButton icon="i-solar-magnifer-linear" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders with the loading prop is true', () => {
    render(<IconButton icon="i-solar-magnifer-linear" loading />);
    expect(screen.getByRole('img')).toHaveClass(LOADING_ICON);
  });
});
