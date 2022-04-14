export class CreateInvoiceDTO {
  clientId: string;
  date: string;
  dueDate: string;
  items: {
    description: string,
    price: number
  }[];
}
