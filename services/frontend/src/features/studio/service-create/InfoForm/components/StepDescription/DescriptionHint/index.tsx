import { Fragment } from 'react';
import Hint, {
  HintTag,
} from '~frontend/features/studio/service-create/InfoForm/components/Hint';
import featureI from '~frontend/features/studio/service-create/InfoForm/i.json';
import scopedI from './i.json';

export default function DescriptionHint() {
  return (
    <Hint title={scopedI.title}>
      <Fragment>
        <div>
          <HintTag>{featureI.example}</HintTag>
        </div>
        {scopedI.content}
      </Fragment>
    </Hint>
  );
}
