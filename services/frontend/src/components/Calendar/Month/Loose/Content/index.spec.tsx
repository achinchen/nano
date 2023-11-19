import { render, screen } from '@testing-library/react';
import { MAX_LENGTH } from '../Status/constants';
import Content from '.';

const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

describe('Content', () => {
  it('renders the correct number of items', () => {
    render(<Content data={data} />);
    for (let i = 0; i < MAX_LENGTH; i++) {
      expect(screen.getByText(data[i])).toBeInTheDocument();
    }
  });

  it('renders the "show more" message when there are more items than the maximum', () => {
    render(<Content data={data} />);
    expect(screen.getByText('還有 1 項服務')).toBeInTheDocument();
  });

  it('does not render the "show more" message when there are fewer items than the maximum', () => {
    render(<Content data={data.slice(0, 2)} />);
    expect(screen.queryByText('還有')).not.toBeInTheDocument();
  });
});
