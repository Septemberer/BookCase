import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './book.dto';
import { Book } from './book.entity';

@Injectable()
export class BookService {}
