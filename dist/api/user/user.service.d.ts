import { CreateBookDto } from '../book/book.dto';
import { Book } from '../book/book.entity';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly bookRepository;
    createUser(body: CreateUserDto): Promise<User>;
    updateUser(id: number, body: CreateUserDto): Promise<User>;
    deleteUser(id: number): void;
    addAbonement(id: number): Promise<void>;
    getAllUsers(): Promise<User[]>;
    getUser(id: number): Promise<User>;
    createBook(body: CreateBookDto): Promise<Book>;
    takeBook(userId: number, bookId: number): Promise<boolean>;
    returnBook(userId: number, bookId: number): Promise<boolean>;
    getBook(id: number): Promise<Book>;
}
