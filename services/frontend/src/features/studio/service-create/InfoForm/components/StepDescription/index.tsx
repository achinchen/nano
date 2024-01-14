import { Fragment, useEffect } from 'react';
import Separator from '~frontend/components/Separator';
import Textarea from '~frontend/components/Textarea';
import { CheckRequired } from '~frontend/features/studio/service-create/InfoForm/types';
import { LABEL_CLASSNAME } from '~frontend/features/studio/service-create/InfoForm/constants';
import scopedI from '~frontend/features/studio/service-create/InfoForm/i.json';
import { useServiceCreateInfoFormContext } from '~frontend/features/studio/service-create/InfoForm/context';
import { isEmpty } from '~frontend/features/studio/service-create/InfoForm/utils';
import DescriptionHint from './DescriptionHint';

export default function StepDescription({
  checkRequired,
}: {
  checkRequired: CheckRequired;
}) {
  const { form, setEmpty, errors, dispatch } =
    useServiceCreateInfoFormContext();

  const onDescriptionChange = (value: string) => {
    dispatch({ description: value });
    checkRequired('description', value);
  };

  useEffect(() => {
    setEmpty(isEmpty(form.description));
  }, [form.description, setEmpty]);

  return (
    <Fragment>
      <label className={LABEL_CLASSNAME}>
        <Textarea
          value={form.description}
          placeholder={scopedI.description.placeholder}
          onValueChange={onDescriptionChange}
          minRows={12}
          maxRows={12}
          errorMessage={errors.description}
        />
      </label>
      <div>
        <Separator />
        <DescriptionHint />
      </div>
    </Fragment>
  );
}
