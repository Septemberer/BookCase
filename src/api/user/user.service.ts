import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(id: number): Promise<User> { // Получение юзера (и списка книг) (5)
    return this.repository.findOne(id);
  }

  public deleteUser(id: number): void { // Удаление юзера (3.1)
    this.repository.delete(id);
  }

  public updateUser(id: number, body: CreateUserDto): Promise<User> { // Редактирование пользователя (2)
    const user: User = new User();

    user.name = body.name;

    this.repository.delete(id);
    return this.repository.save(user);
  }

  public createUser(body: CreateUserDto): Promise<User> { // Добавление пользователя (1)
    const user: User = new User();

    user.name = body.name;

    return this.repository.save(user);
  }
}
