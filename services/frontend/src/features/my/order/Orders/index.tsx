import { Fragment } from 'react';
import Card from '~frontend/features/my/order/Orders/Card';
import Title from '~frontend/features/my/order/Orders/Title';
import { ORDER } from '~frontend/features/my/order/mock';

export default function Orders() {
  return (
    <Fragment>
      {ORDER.request.length !== 0 && (
        <Fragment>
          <Title status="request" />
          {ORDER.request.map((order) => (
            <Card key={order.id} {...order} status="request" />
          ))}
        </Fragment>
      )}
      {ORDER.coming.length !== 0 && (
        <Fragment>
          <Title status="coming" />
          {ORDER.coming.map((order) => (
            <Card key={order.id} {...order} status="coming" />
          ))}
        </Fragment>
      )}
      {ORDER.end.length !== 0 && (
        <Fragment>
          <Title status="end" />
          {ORDER.end.map((order) => (
            <Card key={order.id} {...order} status="end" />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
}
