import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateBookDto } from './book.dto';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Controller('book')
export class BookController {}
