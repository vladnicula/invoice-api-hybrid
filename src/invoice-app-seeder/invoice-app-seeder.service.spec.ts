import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceAppSeederService } from './invoice-app-seeder.service';

describe('InvoiceAppSeederService', () => {
  let service: InvoiceAppSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceAppSeederService],
    }).compile();

    service = module.get<InvoiceAppSeederService>(InvoiceAppSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
