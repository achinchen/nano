import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Hint, {
  HintTag,
} from '~frontend/features/studio/service-create/InfoForm/components/Hint';
import scopedI from './i.json';

export default function DescriptionHint() {
  return (
    <Hint title={scopedI.title}>
      <Fragment>
        <div className="mb-6">
          {scopedI.description}
          <Link className="font-bold underline" to="/studio/setting">
            {scopedI.link}
          </Link>
          。
        </div>
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
