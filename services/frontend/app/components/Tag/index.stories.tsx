import type { Meta } from '@storybook/react';
import { TAG_CONFIG } from './constants';

const Story: Meta = {
  title: 'Tag',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <span className={`${TAG_CONFIG.sm} bg-primary-200 color-primary-500`}>
        熱門
      </span>
      <span className={`${TAG_CONFIG.base} bg-white color-primary-500 `}>
        medium
      </span>
    </div>
  );
};
