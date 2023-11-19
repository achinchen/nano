import { render, screen } from '@testing-library/react';
import Badge from '.';

describe('Badge', () => {
  const childrenText = 'Test';
  const label = 'New';

  it('renders the children and label', () => {
    render(
      <Badge label={label}>
        <div>{childrenText}</div>
      </Badge>
    );
    expect(screen.getByText(childrenText)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders only the children when label is not provided', () => {
    render(
      <Badge>
        <div>{childrenText}</div>
      </Badge>
    );
    expect(screen.getByText(childrenText)).toBeInTheDocument();
    expect(screen.queryByText(label)).not.toBeInTheDocument();
  });
});
