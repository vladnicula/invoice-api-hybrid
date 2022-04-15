import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserCompanyEntityType, UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>

    findAll(params?: {selectFields?:(keyof UserEntity)[]}): Promise<UserEntity[]> {
        const { selectFields } = params ?? {}
        const findQueryParams: FindManyOptions<UserEntity> = {}

        if ( selectFields ) {
            findQueryParams.select = selectFields;
        }
        return this.usersRepository.find(findQueryParams);
    }

    findOne(id: string): Promise<UserEntity | undefined> {
        return this.usersRepository.findOne(id);
    }

    findByEmail(email:string) {
        return this.usersRepository.findOne({
            where: {
                email
            }
        })
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async removeByEmail(email: string) {
        await this.usersRepository.delete({
            email
        });
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

    async update(userId: string, userDTO: Partial<UpdateUserDTO>) {
        const existingUser = await this.usersRepository.findOneOrFail(userId)
        Object.keys(userDTO).forEach((key: keyof Partial<UpdateUserDTO>) => {
            const value = userDTO[key];
            existingUser[key] = value as string & UserCompanyEntityType;
        })
        await this.usersRepository.save(existingUser)
        return existingUser;
    }
}
