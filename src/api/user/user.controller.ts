import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateBookDto } from '../book/book.dto';
import { Book } from '../book/book.entity';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Post() // 1. Добавление пользователя
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Put(':id') // 2. Редактирование пользователя
  public updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: CreateUserDto): void {
    this.userService.updateUser(id, body);
  }

  @Delete(':id') // 3.1 Удаление пользователя
  public deleteUser(@Param('id', ParseIntPipe) id: number): void {
    return this.userService.deleteUser(id);
  }

  @Put(':id') // 3.2 Добавить абонемент
  public addAbonement(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.addAbonement(id);
  }

  @Get() // 4. Получить всех пользователей
  public getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id') // 5. Получить юзера (и список книг)
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post() // 6. Добавление книги
  public createBook(@Body() body: CreateBookDto): Promise<Book> {
    return this.userService.createBook(body);
  }

  @Post(':userid :bookid') // 7. Взять книгу пользователю
  public takeBook(@Param('userid', ParseIntPipe) userid: number, @Param('bookid', ParseIntPipe) bookid: number): Promise<boolean> {
    return this.userService.takeBook(userid, bookid);
  }

  @Post(':userid :bookid') // 8. Вернуть книгу в библиотеку
  public returnBook(@Param('userid', ParseIntPipe) userid: number, @Param('bookid', ParseIntPipe) bookid: number): Promise<boolean> {
    return this.userService.returnBook(userid, bookid);
  }


  @Get(':id') // 9. Получить книгу по id
  public getBook(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.userService.getBook(id);
  }
}
