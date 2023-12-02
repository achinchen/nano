import { usePreviewOrdersContext } from '~frontend/features/cart/PreviewOrders/context';
import { SECTION_CLASSNAMES } from '~frontend/features/cart/PreviewOrders/constants';
import Separator from '~frontend/components/Separator';
import Field from '~frontend/features/cart/PreviewOrders/components/Field';
import sharedI from '~frontend/shared/i.json';

const i = sharedI.info;

export function Info() {
  const { info } = usePreviewOrdersContext();

  return (
    <section className="mb-8">
      <h3 className="mb-4">{i.title}</h3>
      <section className={`${SECTION_CLASSNAMES} text-sm`}>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center">
            <Field icon="i-solar-user-circle-linear">{i.field.name}</Field>
            {info.name}
          </li>
          <li className="flex items-center">
            <Field icon="i-solar-letter-linear">{i.field.email}</Field>
            {info.email}
          </li>
          <li className="flex items-center">
            <Field icon="i-solar-phone-calling-outline">{i.field.phone}</Field>
            {info.phone}
          </li>
          <li className="flex items-center">
            <Field icon="i-custom-sns-instagram">{i.field.SNSId}</Field>
            {info.SNSId}
          </li>
        </ul>
        <Separator />
        <div>
          <Field icon="i-solar-chat-line-linear">{i.field.note}</Field>
          <p className="my-0 ml-8 mr-0">{info.note}</p>
        </div>
      </section>
    </section>
  );
}

export default Info;
