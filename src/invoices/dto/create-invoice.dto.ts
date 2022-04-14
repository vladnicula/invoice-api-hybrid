export class CreateInvoiceItemsDTO  {
  description: string
  price: number
}

export class CreateInvoiceDTO {
  clientId: string;
  dateTS: string;
  dueDateTS: string;
  items: CreateInvoiceItemsDTO[];
}
