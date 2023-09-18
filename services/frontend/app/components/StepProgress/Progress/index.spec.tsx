import { render, screen } from '@testing-library/react';
import { MAX, PERCENTAGE_CLASS } from './constants';
import Progress from './index';

describe('Progress', () => {
  it('renders a progress bar with default value', () => {
    render(<Progress />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', `${MAX}`);
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', `${MAX}`);
  });

  it('renders a progress bar with custom value', () => {
    const value = 5;
    render(<Progress value={value} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', `${value}`);
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', `${MAX}`);
  });

  it('renders a progress bar with percentage class based on value', () => {
    const value = 5;
    render(<Progress value={value} />);
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.getElementsByClassName(PERCENTAGE_CLASS[value])[0]
    ).toBeInTheDocument();
  });
});
