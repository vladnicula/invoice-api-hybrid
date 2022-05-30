import { Test, TestingModule } from '@nestjs/testing';
import { ClientsInvoicesAggregateResolver } from './client-invoices-aggregate.resolver';

describe('ClientsInvoicesAggregateResolver', () => {
  let resolver: ClientsInvoicesAggregateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsInvoicesAggregateResolver],
    }).compile();

    resolver = module.get<ClientsInvoicesAggregateResolver>(
      ClientsInvoicesAggregateResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
