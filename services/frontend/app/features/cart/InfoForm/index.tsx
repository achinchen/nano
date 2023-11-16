import { useReducer, useEffect } from 'react';
import StepProgress from '~frontend/components/StepProgress';
import { EVENT, useCartContext } from '~frontend/features/cart/context';
import { Step } from '~frontend/features/cart/constants';
import Input from '~frontend/components/Input';
import InputTel from '~frontend/components/InputTel';
import Textarea from '~frontend/components/Textarea';
import { isPhone } from '~frontend/utils/validator/phone';
import { eventEmitter } from '~frontend/utils/event';
import { setInfo } from '~frontend/features/cart/utils';
import i from './i.json';

const stepsLength = Object.keys(Step).filter((step) =>
  isNaN(Number(step))
).length;

type Field = keyof typeof defaultForm;
type Form = { [key in Field]: string };

const defaultForm = {
  name: '',
  SNSId: '',
  phone: '',
  email: '',
  note: '',
};

const reducer = (state: Form, newState: Partial<Form>) => {
  return { ...state, ...newState };
};

const labelClassName = 'text-base font-normal flex flex-col gap-2';

export default function InfoForm({ className }: { className?: string }) {
  const { currentStep, toPreviousStep, setDisabled } = useCartContext();
  const [form, dispatch] = useReducer(reducer, { ...defaultForm });
  const [errors, dispatchError] = useReducer(reducer, { ...defaultForm });

  const checkRequired = (key: string, value: string) => {
    const isEmpty = value.trim().length === 0;
    dispatchError({ [key]: isEmpty ? i.required : '' });
  };

  const onNameChange = (value: string) => {
    dispatch({ name: value });
    checkRequired('name', value);
  };

  const onPhoneChange = (value: string) => {
    dispatch({ phone: value });
    if (!isPhone(value)) dispatchError({ phone: i.phone.invalid });
    checkRequired('phone', value);
  };

  const onSNSIdChange = (value: string) => {
    dispatch({ SNSId: value });
    checkRequired('SNSId', value);
  };

  const onNoteChange = (value: string) => dispatch({ note: value });

  useEffect(() => {
    const cb = () => setInfo(form);
    eventEmitter.subscribe(EVENT.info, cb);
    return eventEmitter.unsubscribe(EVENT.info, cb);
  }, [form]);

  useEffect(() => {
    setDisabled(Object.values(errors).some(Boolean));
  }, [setDisabled, errors]);

  return (
    <section className={className}>
      <header className="mb-6 mt-3 flex flex-col items-center">
        <StepProgress
          steps={stepsLength}
          currentStep={currentStep + 1}
          onBack={toPreviousStep}
        />
        <h3 className="text-base">{i.title}</h3>
      </header>
      <form className="mb-6 flex flex-col gap-2">
        <label className={labelClassName}>
          {i.name.label}
          <Input
            value={form.name}
            onValueChange={onNameChange}
            placeholder={i.name.placeholder}
            errorMessage={errors.name}
            maxLength={200}
          />
        </label>
        <label className={labelClassName}>
          {i.email.label}
          <Input
            value={form.email}
            placeholder={i.email.placeholder}
            autoComplete="email"
            type="email"
            readOnly
            disabled
          />
        </label>
        <label className={labelClassName}>
          {i.phone.label}
          <InputTel
            value={form.phone}
            placeholder={i.phone.placeholder}
            onValueChange={onPhoneChange}
          />
        </label>
        <label className={labelClassName}>
          {i.SNSId.label}
          <Input
            value={form.SNSId}
            placeholder={i.SNSId.placeholder}
            onValueChange={onSNSIdChange}
          />
        </label>
        <label className={labelClassName}>
          {i.note.label}
          <Textarea
            value={form.note}
            placeholder={i.note.placeholder}
            onValueChange={onNoteChange}
            maxLength={200}
          />
        </label>
      </form>
    </section>
  );
}
