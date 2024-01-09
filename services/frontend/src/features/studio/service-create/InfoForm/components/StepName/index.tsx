import { Fragment, useEffect } from 'react';
import Input from '~frontend/components/Input';
import Select from '~frontend/components/Select';
import { CheckRequired } from '~frontend/features/studio/service-create/InfoForm/types';
import { LABEL_CLASSNAME } from '~frontend/features/studio/service-create/InfoForm/constants';
import scopedI from '~frontend/features/studio/service-create/InfoForm/i.json';
import { useServiceCreateContext } from '~frontend/features/studio/service-create/context';
import { useServiceCreateInfoFormContext } from '~frontend/features/studio/service-create/InfoForm/context';
import { isEmpty } from '~frontend/features/studio/service-create/InfoForm/utils';

export default function StepName({
  checkRequired,
}: {
  checkRequired: CheckRequired;
}) {
  const { form, dispatch, errors, setEmpty } =
    useServiceCreateInfoFormContext();

  const { setting } = useServiceCreateContext();

  const { suppliers, location } = setting || {};

  const supplierOptions = suppliers
    ? suppliers.map(({ id, name }) => ({
        value: String(id),
        label: name,
      }))
    : [];

  const locationOptions = location
    ? [
        {
          value: String(location?.id),
          label: location?.name,
        },
      ]
    : [];

  const onNameChange = (value: string) => {
    dispatch({ name: value });
    checkRequired('name', value);
  };

  useEffect(() => {
    dispatch({ supplierId: suppliers?.[0].id, locationId: location?.id });
  }, [dispatch, suppliers, location]);

  useEffect(() => {
    setEmpty(isEmpty(form.name));
  }, [form.name, setEmpty]);

  return (
    <Fragment>
      <label className={LABEL_CLASSNAME}>
        {scopedI.name.label}
        <Input
          value={form.name}
          onValueChange={onNameChange}
          placeholder={scopedI.name.placeholder}
          errorMessage={errors.name}
          maxLength={32}
        />
      </label>
      <label className={LABEL_CLASSNAME}>
        {scopedI.supplier.label}
        <Select
          value={String(form.supplierId)}
          options={supplierOptions}
          disabled
        />
      </label>
      <label className={LABEL_CLASSNAME}>
        {scopedI.location.label}
        <Select
          value={String(form.locationId)}
          options={locationOptions}
          disabled
        />
      </label>
    </Fragment>
  );
}
