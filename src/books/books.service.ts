import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { BookTransformer } from 'src/base/book.transformer';
import { CustomError } from 'src/base/custom.error';
import { getManager } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  private _books: any[];
  constructor() {
    this._books = [];
  }

  async create(data) {
    if (!data.name) {
      throw new CustomError('Gagal menambahkan buku. Mohon isi nama buku');
      return;
    }
    if (data.readPage > data.pageCount) {
      throw new CustomError(
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      );
      return;
    }
    data['id'] = nanoid(16);
    data['finished'] = data.pageCount === data.readPage ? true : false;
    data['insertedAt'] = new Date().toISOString();
    data['updatedAt'] = new Date().toISOString();

    await Book.save(data);

    return data['id'];
  }

  async findAll(QueryParam?: any) {
    const { name, reading, finished } = QueryParam;
    const books = getManager().createQueryBuilder().select().from(Book, 'book');
    if (finished === '1') {
      books.andWhere({ finished: true });
    } else if (finished === '0') {
      books.andWhere({ finished: false });
    }

    if (reading === '1') {
      books.andWhere({ reading: true });
    } else if (reading === '0') {
      books.andWhere({ reading: false });
    }

    if (name !== undefined) {
      books.andWhere('LOWER(book.name) like :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    return BookTransformer.transform(await books.getRawMany());
  }

  async findOne(id) {
    const book = await getManager().getRepository(Book).findOne(id);

    if (book === undefined) {
      throw new CustomError('Buku tidak ditemukan', 404);
      return;
    }
    return book;
  }

  async update(id: string, data) {
    if (!data.name) {
      throw new CustomError('Gagal memperbarui buku. Mohon isi nama buku', 400);
      return;
    }
    if (data.readPage > data.pageCount) {
      throw new CustomError(
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        400,
      );
      return;
    }
    data['finished'] = data.pageCount === data.readPage ? true : false;
    data['updatedAt'] = new Date().toISOString();

    await getManager()
      .createQueryBuilder()
      .update(Book)
      .set({ ...data })
      .where('book.id = :id', { id })
      .execute();

    const book = await getManager().getRepository(Book).findOne(id);
    if (!book) {
      throw new CustomError('Gagal memperbarui buku. Id tidak ditemukan', 404);
    }

    return book;
  }

  async remove(id: string) {
    const deleted = await getManager()
      .createQueryBuilder()
      .delete()
      .from(Book)
      .where('book.id = :id', { id })
      .execute();
    if (deleted.affected) {
      return true;
    }

    throw new CustomError('Buku gagal dihapus. Id tidak ditemukan', 404);
  }
}
