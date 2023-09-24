import type { Meta } from '@storybook/react';
import { config } from './constants';

const Story: Meta = {
  title: 'Tag',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <span className={`${config.sm} bg-primary-200 color-primary-500`}>
        熱門
      </span>
      <span className={`${config.base} bg-white color-primary-500 `}>
        medium
      </span>
    </div>
  );
};
