import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { AppResponse } from 'src/base/response.base';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly BooksService: BooksService) {}

  @Post()
  async create(@Res() res, @Body() book: CreateBookDto) {
    try {
      const bookId = await this.BooksService.create(book);
      return AppResponse.ok(res, { bookId }, 'Buku berhasil ditambahkan', 201);
    } catch (error) {
      return AppResponse.badRequest(res, error.message);
    }
  }

  @Get()
  async findAll(@Res() res, @Query() query) {
    const books = await this.BooksService.findAll(query);
    return AppResponse.ok(res, { books });
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const book = await this.BooksService.findOne(id);
      return AppResponse.ok(res, { book });
    } catch (error) {
      return AppResponse.badRequest(res, error.message, error.HttpCode);
    }
  }

  @Put(':id')
  async update(
    @Res() Res,
    @Param('id') id: string,
    @Body() UpdateBookDto: UpdateBookDto,
  ) {
    try {
      const book = await this.BooksService.update(id, UpdateBookDto);
      return AppResponse.ok(Res, { book }, 'Buku berhasil diperbarui');
    } catch (error) {
      return AppResponse.badRequest(Res, error.message, error.HttpCode);
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id) {
    try {
      const removed = await this.BooksService.remove(id);
      return AppResponse.ok(res, {}, 'Buku berhasil dihapus');
    } catch (error) {
      return AppResponse.badRequest(res, error.message, error.HttpCode);
    }
  }
}
