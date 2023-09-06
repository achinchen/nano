import { render, screen } from '@testing-library/react';
import { LOADING_ICON } from './constants';
import { Button } from '.';

const onClick = () => {
  /* */
};

describe('Button', () => {
  it('renders with the correct custom className', () => {
    render(
      <Button
        prefixIcon="i-solar-magnifer-linear"
        className="custom-class"
        onClick={onClick}
      />
    );
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders with the specified color', () => {
    render(
      <Button
        prefixIcon="i-solar-magnifer-linear"
        color="primary"
        onClick={onClick}
      />
    );
    expect(screen.getByRole('button').className).toMatch(/primary/);
  });

  it('renders with the specified variant', () => {
    render(
      <Button
        prefixIcon="i-solar-magnifer-linear"
        variant="text"
        onClick={onClick}
      />
    );
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });
  it('renders with the disabled prop is true', () => {
    render(
      <Button prefixIcon="i-solar-magnifer-linear" disabled onClick={onClick} />
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders with the loading prop is true', () => {
    render(
      <Button prefixIcon="i-solar-magnifer-linear" loading onClick={onClick} />
    );
    expect(screen.getByRole('img')).toHaveClass(LOADING_ICON);
  });
});
