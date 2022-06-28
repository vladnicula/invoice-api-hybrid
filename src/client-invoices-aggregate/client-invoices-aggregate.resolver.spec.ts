import { Test, TestingModule } from '@nestjs/testing';
import { ClientInvoicesAggregateResolver } from './client-invoices-aggregate.resolver';

describe('ClientsInvoicesAggregateResolver', () => {
  let resolver: ClientInvoicesAggregateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientInvoicesAggregateResolver],
    }).compile();

    resolver = module.get<ClientInvoicesAggregateResolver>(
      ClientInvoicesAggregateResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
