import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    @InjectRepository(User)
    private usersRepository: Repository<User>

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async create(userDTO: CreateUserDTO) {
        const newUser = await this.usersRepository.create()
        newUser.firstName = userDTO.firstName;
        newUser.lastName = userDTO.lastName;
        newUser.email = userDTO.email;
        newUser.password = userDTO.password;
        await this.usersRepository.save(newUser)
        return newUser;
    }
}
