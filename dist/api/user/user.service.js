"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("../book/book.entity");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    createUser(body) {
        const user = new user_entity_1.User();
        user.name = body.name;
        return this.userRepository.save(user);
    }
    updateUser(id, body) {
        const user = new user_entity_1.User();
        user.name = body.name;
        this.userRepository.delete(id);
        return this.userRepository.save(user);
    }
    deleteUser(id) {
        this.userRepository.delete(id);
    }
    async addAbonement(id) {
        const user = await this.userRepository.findOne(id);
        this.userRepository
            .createQueryBuilder("user")
            .update(user)
            .set({ abonement: true })
            .where("user.id = :id", { id: id })
            .andWhere("user.abonement = :abonement", { abonement: false })
            .execute();
    }
    getAllUsers() {
        return this.userRepository
            .createQueryBuilder("user")
            .getMany();
    }
    getUser(id) {
        return this.userRepository.findOne(id);
    }
    createBook(body) {
        const book = new book_entity_1.Book();
        book.name = body.name;
        return this.bookRepository.save(book);
    }
    async takeBook(userId, bookId) {
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
    async returnBook(userId, bookId) {
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
    getBook(id) {
        return this.bookRepository.findOne(id);
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.User),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "userRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(book_entity_1.Book),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "bookRepository", void 0);
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map