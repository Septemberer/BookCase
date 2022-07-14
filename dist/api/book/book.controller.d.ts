import { CreateBookDto } from './book.dto';
import { Book } from './book.entity';
export declare class BookController {
    private readonly service;
    getBook(id: number): Promise<Book>;
    createBook(body: CreateBookDto): Promise<Book>;
}
