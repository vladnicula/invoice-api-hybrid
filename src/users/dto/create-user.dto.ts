export class CreateUserDTO {
    constructor (params?: { 
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        params ? Object.assign(this, params) : null
    }

    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
    