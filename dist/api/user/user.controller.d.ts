import { CreateBookDto } from '../book/book.dto';
import { Book } from '../book/book.entity';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    createUser(body: CreateUserDto): Promise<User>;
    updateUser(id: number, body: CreateUserDto): void;
    deleteUser(id: number): void;
    addAbonement(id: number): Promise<void>;
    getAllUsers(): Promise<User[]>;
    getUser(id: number): Promise<User>;
    createBook(body: CreateBookDto): Promise<Book>;
    takeBook(userid: number, bookid: number): Promise<boolean>;
    returnBook(userid: number, bookid: number): Promise<boolean>;
    getBook(id: number): Promise<Book>;
}
