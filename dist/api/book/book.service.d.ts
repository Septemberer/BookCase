import { CreateBookDto } from './book.dto';
import { Book } from './book.entity';
export declare class BookService {
    private readonly repository;
    getBook(id: number): Promise<Book>;
    createBook(body: CreateBookDto): Promise<Book>;
}
