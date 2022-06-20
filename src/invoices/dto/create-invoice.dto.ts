import { InvoiceItemsDTO } from './invoice-item.dto';

export class CreateInvoiceDTO {
  constructor(params?: {
    clientId: string;
    dateTS: string;
    dueDateTS: string;
    items: InvoiceItemsDTO[];
  }) {
    params ? Object.assign(this, params) : null;
  }

  clientId: string;
  dateTS: string;
  dueDateTS: string;
  items: InvoiceItemsDTO[];
}
