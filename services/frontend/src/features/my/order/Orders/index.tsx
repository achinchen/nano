import { Fragment } from 'react';
import Card from '~frontend/features/my/order/Orders/Card';
import Title from '~frontend/features/my/order/Orders/Title';

const orders = {
  request: [
    {
      id: '10',
      name: '聖誕布朗尼蛋糕',
      duration: 120,
      queues: ['2023-12-20T10:00', '2023-12-25T10:00', '2023-12-28T10:00'],
      updatedAt: '2023-12-21T10:00',
    },
  ],
  coming: [
    {
      id: '20',
      name: '聖誕布朗尼蛋糕',
      duration: 120,
      queues: ['2023-12-20T10:00', '2023-12-25T10:00', '2023-12-28T10:00'],
      updatedAt: '2023-12-31T10:00',
    },
    {
      id: '30',
      name: '杯子蛋糕',
      duration: 100,
      queues: ['2023-12-10T10:00'],
      updatedAt: '2023-12-01T10:00',
    },
  ],
  end: [
    {
      id: '21',
      name: '寵物鮮食',
      duration: 45,
      queues: ['2023-12-15T10:00', '2023-12-28T10:00'],
      updatedAt: '2023-12-01T10:00',
    },
    {
      id: '49',
      name: '杯子蛋糕',
      duration: 100,
      queues: ['2023-12-01T10:00'],
      updatedAt: '2023-12-01T10:00',
    },
  ],
};

export default function Orders() {
  return (
    <Fragment>
      {orders.request.length !== 0 && (
        <Fragment>
          <Title status="request" />
          {orders.request.map((order) => (
            <Card key={order.id} {...order} status="request" />
          ))}
        </Fragment>
      )}
      {orders.coming.length !== 0 && (
        <Fragment>
          <Title status="coming" />
          {orders.coming.map((order) => (
            <Card key={order.id} {...order} status="coming" />
          ))}
        </Fragment>
      )}
      {orders.end.length !== 0 && (
        <Fragment>
          <Title status="end" />
          {orders.end.map((order) => (
            <Card key={order.id} {...order} status="end" />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
}
