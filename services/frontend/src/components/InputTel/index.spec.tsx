import { render, screen } from '@testing-library/react';
import InputTel from '.';

describe('InputTel', () => {
  it('render successfully', () => {
    const value = '';
    const onChange = () => console.log('onChange');
    render(<InputTel value={value} onChange={onChange} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
    expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'tel');
  });
});
