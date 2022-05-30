import { UserCompanyEntityType } from '../user.entity';

export class UpdateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: UserCompanyEntityType;
}
