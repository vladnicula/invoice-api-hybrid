import { UserCompanyEntityType } from "../user.entity";

export class UpdateUserDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company?: UserCompanyEntityType
}
    