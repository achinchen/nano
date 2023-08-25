import { STATES } from '~backend/domain/order/entity';
import { Order as DBOrder } from '~backend/domain/order/infra/db/order';

const mockDBOrderRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findBy: jest.fn(),
  findOneBy: jest.fn(),
  softDelete: jest.fn(),
  update: jest.fn(),
};

const mockTransactionalEntityManager = {
  softDelete: jest.fn(),
  save: jest.fn(),
};

jest.mock('~backend/data-source', () => ({
  dataSource: {
    getRepository: jest.fn().mockReturnValueOnce(mockDBOrderRepository),
    manager: {
      transaction: jest
        .fn()
        .mockImplementation((callback) =>
          callback(mockTransactionalEntityManager)
        ),
    },
  },
}));

import { OrderRepository } from './implementation';

const orderRepository = new OrderRepository();

describe('OrderRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockOrder = {
    providerId: 1,
    serviceHistoryId: 10,
    userId: 20,
    serviceId: 30,
    field: {
      name: '螞蟻怪',
    },
    note: '',
    attendee: 10,
    startAt: new Date('2021-09-01T10:00:00'),
    queueDateTime: [],
    state: STATES[1],
    id: 1,
  };

  const mockOrders = [
    mockOrder,
    {
      ...mockOrder,
      id: 2,
    },
  ];

  describe('create', () => {
    it('should create a new order', async () => {
      const { id: _, ...payload } = mockOrder;

      mockDBOrderRepository.create.mockReturnValueOnce(payload);
      mockDBOrderRepository.save.mockReturnValueOnce(mockOrder);

      const result = await orderRepository.create(payload);

      expect(mockDBOrderRepository.create).toHaveBeenCalledWith(payload);
      expect(mockDBOrderRepository.save).toHaveBeenCalledWith(payload);

      expect(result).toEqual(mockOrder);
    });
  });

  describe('getById', () => {
    it('should get an order by id', async () => {
      const id = mockOrder.id;

      mockDBOrderRepository.findOneBy.mockReturnValueOnce(mockOrder);

      const result = await orderRepository.getById(id);

      expect(mockDBOrderRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toBe(mockOrder);
    });
  });

  describe('getByIdAndProvider', () => {
    it('should get an order by id and provider', async () => {
      const { id, providerId } = mockOrder;

      mockDBOrderRepository.findOneBy.mockReturnValueOnce(mockOrder);

      const result = await orderRepository.getByIdAndProviderId(id, providerId);

      expect(mockDBOrderRepository.findOneBy).toHaveBeenCalledWith({
        id,
        providerId,
      });
      expect(result).toBe(mockOrder);
    });
  });

  describe('getAllByUserId', () => {
    it('should get orders by userId', async () => {
      const { userId } = mockOrder;

      mockDBOrderRepository.findBy.mockReturnValueOnce(mockOrders);

      const result = await orderRepository.getAllByUserId(userId);

      expect(mockDBOrderRepository.findBy).toHaveBeenCalledWith({ userId });
      expect(result).toBe(mockOrders);
    });
  });

  describe('getAllByProviderId', () => {
    it('should get orders by providerId', async () => {
      const { providerId } = mockOrder;

      mockDBOrderRepository.findBy.mockReturnValueOnce(mockOrders);

      const result = await orderRepository.getAllByProviderId(providerId);

      expect(mockDBOrderRepository.findBy).toHaveBeenCalledWith({ providerId });
      expect(result).toBe(mockOrders);
    });
  });

  describe('merge', () => {
    it('should merge', async () => {
      const { id, ...restPayload } = mockOrder;
      const payload = {
        id: id,
        payload: {
          ...restPayload,
          serviceHistoryId: 300,
        },
      };

      const order = {
        ...payload.payload,
        id: 300,
      };

      mockDBOrderRepository.create.mockReturnValueOnce(payload.payload);
      mockTransactionalEntityManager.save.mockResolvedValueOnce(order);

      const result = await orderRepository.merge(payload);

      expect(mockTransactionalEntityManager.softDelete).toHaveBeenCalledWith(
        DBOrder,
        { id: payload.id }
      );
      expect(mockTransactionalEntityManager.save).toHaveBeenCalledWith(
        payload.payload
      );
      expect(mockTransactionalEntityManager.save).toHaveBeenCalledWith(
        payload.payload
      );
      expect(result).toBe(order);
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const payload = {
        id: mockOrder.id,
        note: 'new note',
      };

      mockDBOrderRepository.update.mockReturnValueOnce(payload);

      const result = await orderRepository.update(payload);

      const { id, ...restPayload } = payload;
      expect(mockDBOrderRepository.update).toHaveBeenCalledWith(
        { id },
        restPayload
      );
      expect(result).toBe(true);
    });
  });

  describe('deleteById', () => {
    it('should delete an order by id', async () => {
      const id = 1;

      mockDBOrderRepository.softDelete.mockReturnValueOnce({ id });

      const result = await orderRepository.deleteById(id);

      expect(mockDBOrderRepository.softDelete).toHaveBeenCalledWith({ id });
      expect(result).toBe(true);
    });
  });
});
