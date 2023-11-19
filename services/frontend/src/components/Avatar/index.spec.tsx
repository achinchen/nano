import { render, screen } from '@testing-library/react';
import Avatar from '.';

describe('Avatar', () => {
  it('render successfully', () => {
    render(<Avatar src="i-mdi-paperclip" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
