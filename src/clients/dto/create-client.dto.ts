export class CreateClientDTO {
  constructor (params?: {
    name: string;
    contactName: string;
    contactEmail: string;
    taxCode: string;
    iban: string;
    address: string;
  }) {
    params ? Object.assign(this, params) : null;
  }
  
  name: string;
  contactName: string;
  contactEmail: string;
  taxCode: string;
  iban: string;
  address: string;
}
