import { CreateClientDTO } from './create-client.dto';

export class UpdateClientDTO extends CreateClientDTO {
  constructor(params?: {
    id: string;
    name: string;
    contactName: string;
    contactEmail: string;
    taxCode: string;
    iban: string;
    address: string;
  }) {
    super(params);
    if (params?.id) {
      this.id = params.id;
    }
  }

  id: string;
}
