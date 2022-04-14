import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceAppSeederController } from './invoice-app-seeder.controller';

describe('InvoiceAppSeederController', () => {
  let controller: InvoiceAppSeederController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceAppSeederController],
    }).compile();

    controller = module.get<InvoiceAppSeederController>(InvoiceAppSeederController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
