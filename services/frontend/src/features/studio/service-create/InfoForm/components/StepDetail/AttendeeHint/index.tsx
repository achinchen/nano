import { Fragment } from 'react';
import Hint, {
  HintTag,
} from '~frontend/features/studio/service-create/InfoForm/components/Hint';
import scopedI from './i.json';

export default function DescriptionHint() {
  return (
    <Hint title={scopedI.title}>
      <Fragment>
        <div className="mb-6">{scopedI.description}</div>
        {scopedI.case.map(({ title, content }) => (
          <Fragment key={title}>
            <HintTag>{title}</HintTag>
            <div className="mb-6">{content}</div>
          </Fragment>
        ))}
      </Fragment>
    </Hint>
  );
}
