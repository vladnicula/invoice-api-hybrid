export class CreateInvoiceItemsDTO {
  constructor(params?: { description: string; price: number }) {
    params ? Object.assign(this, params) : null;
  }

  description: string;
  price: number;
}

export class CreateInvoiceDTO {
  constructor(params?: {
    clientId: string;
    dateTS: string;
    dueDateTS: string;
    items: CreateInvoiceItemsDTO[];
  }) {
    params ? Object.assign(this, params) : null;
  }

  clientId: string;
  dateTS: string;
  dueDateTS: string;
  items: CreateInvoiceItemsDTO[];
}
