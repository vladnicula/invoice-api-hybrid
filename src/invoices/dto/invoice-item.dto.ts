export class InvoiceItemsDTO {
  constructor(params?: { description: string; price: number }) {
    params ? Object.assign(this, params) : null;
  }

  description: string;
  price: number;
}
