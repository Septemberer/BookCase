import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../book/book.dto';
import { Book } from '../book/book.entity';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(Book)
  private readonly bookRepository: Repository<Book>;

  public createUser(body: CreateUserDto): Promise<User> { // Добавление пользователя (1)
    const user: User = new User();

    user.name = body.name;

    return this.userRepository.save(user);
  }

  public updateUser(id: number, body: CreateUserDto): Promise<User> { // Редактирование пользователя (2)
    const user: User = new User();

    user.name = body.name;

    this.userRepository.delete(id);
    return this.userRepository.save(user);
  }

  public deleteUser(id: number): void { // Удаление юзера (3.1)
    this.userRepository.delete(id);
  }

  public async addAbonement(id: number): Promise<void> { // Добавление абонемента, если нету (3.2)
    const user = await this.userRepository.findOne(id);
    this.userRepository
      .createQueryBuilder("user")
      .update(user)
      .set({ abonement: true })
      .where("user.id = :id", { id: id })
      .andWhere("user.abonement = :abonement", { abonement: false })
      .execute();
  }

  public getAllUsers(): Promise<User[]> { // Получение всех юзеров (4)
    return this.userRepository
      .createQueryBuilder("user")
      .getMany();
  }

  public getUser(id: number): Promise<User> { // Получение юзера (и списка книг) (5)
    return this.userRepository.findOne(id);
  }

  public createBook(body: CreateBookDto): Promise<Book> { // Создать книгу (6)
    const book: Book = new Book();

    book.name = body.name;

    return this.bookRepository.save(book);
  }

  public async takeBook(userId: number, bookId: number): Promise<boolean> { // Взять книгу для пользователя (7)

    const user = await this.userRepository.findOne(userId);
    const book = await this.bookRepository.findOne(bookId);

    if (user.abonement == true && user.books.length < 5 && book.owner == 0) {
      user.books.push(book.id);
      book.owner = user.id;

      this.userRepository
        .createQueryBuilder("user")
        .update(user)
        .execute();

      this.bookRepository
        .createQueryBuilder("book")
        .update(book)
        .execute();

      return true;
    }
    return false;
  }

  public async returnBook(userId: number, bookId: number): Promise<boolean> { // Вернуть книгу от пользователя в библиотеку (8)
    const user = await this.userRepository.findOne(userId);
    const book = await this.bookRepository.findOne(bookId);

    if (book.id in user.books && book.owner == user.id) {
      book.owner = 0;
      const index = user.books.indexOf(book.id);
      if (index !== -1) {
        user.books.splice(index, 1);
      }

      this.userRepository
        .createQueryBuilder("user")
        .update(user)
        .execute();

      this.bookRepository
        .createQueryBuilder("book")
        .update(book)
        .execute();

      return true;
    }

    return false;
  }


  public getBook(id: number): Promise<Book> { // Получить книгу (9)
    return this.bookRepository.findOne(id);
  }
}
