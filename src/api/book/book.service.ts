import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './book.dto';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  @InjectRepository(Book)
  private readonly repository: Repository<Book>;

  public getBook(id: number): Promise<Book> { // Получить книгу (9)
    return this.repository.findOne(id);
  }

  public createBook(body: CreateBookDto): Promise<Book> { // Создать книгу (6)
    const book: Book = new Book();

    book.name = body.name;

    return this.repository.save(book);
  }
}
