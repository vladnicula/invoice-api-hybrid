import { CreateInvoiceDTO } from './create-invoice.dto';
import { InvoiceItemsDTO } from './invoice-item.dto';

export class UpdateInvoiceDTO extends CreateInvoiceDTO {
  constructor(params?: {
    id: string;
    clientId: string;
    dateTS: string;
    dueDateTS: string;
    items: InvoiceItemsDTO[];
  }) {
    super(params);
    if (params && params.id) {
      this.id = params.id;
    }
  }

  id: string;
}
