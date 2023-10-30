import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const QUEUE_SERVICE = Symbol('QUEUE_SERVICE');

export const getQueueClient = (): ClientProviderOptions => {
  return {
    name: QUEUE_SERVICE,
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://events-mq:5672'],
      queue: 'events_queue',
      noAck: true,
      queueOptions: {
        durable: true,
      },
    },
  };
};
