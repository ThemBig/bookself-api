import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { BookTransformer } from 'src/base/book.transformer';
import { CustomError } from 'src/base/custom.error';

@Injectable()
export class BooksService {
  private _books: any[];
  constructor() {
    this._books = [];
  }

  async create(book) {
    if (!book.name) {
      throw new CustomError('Gagal menambahkan buku. Mohon isi nama buku');
      return;
    }
    if (book.readPage > book.pageCount) {
      throw new CustomError(
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      );
      return;
    }
    book['id'] = nanoid(16);
    book['finished'] = book.pageCount === book.readPage ? true : false;
    book['insertedAt'] = new Date().toISOString();
    book['updatedAt'] = new Date().toISOString();

    this._books.push(book);
    return book['id'];
  }

  async findAll(QueryParam?: any) {
    const { name, reading, finished } = QueryParam;
    let books = this._books;

    if (finished === '1') {
      books = books.filter((book) => book.finished === true);
    } else if (finished === '0') {
      books = books.filter((book) => book.finished === false);
    }

    if (reading === '1') {
      books = books.filter((book) => book.reading === true);
    } else if (reading === '0') {
      books = books.filter((book) => book.reading === false);
    }

    if (name !== undefined) {
      books = books.filter((book) => {
        const search = new RegExp(name.toLowerCase(), 'gi');
        return search.test(book.name.toLowerCase());
      });
    }
    return BookTransformer.transform(books);
  }

  async findOne(id) {
    const book = this._books.filter((n) => n.id === id)[0];

    if (book === undefined) {
      throw new CustomError('Buku tidak ditemukan', 404);
      return;
    }
    return book;
  }

  async update(id: string, book) {
    if (!book.name) {
      throw new CustomError('Gagal memperbarui buku. Mohon isi nama buku', 400);
      return;
    }
    if (book.readPage > book.pageCount) {
      throw new CustomError(
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        400,
      );
      return;
    }
    const index = this._books.findIndex((n) => n.id === id);

    book['finished'] = book.pageCount === book.readPage ? true : false;
    book['insertedAt'] = new Date().toISOString();
    book['updatedAt'] = new Date().toISOString();

    if (index !== -1) {
      this._books[index] = {
        ...this._books[index],
        ...book,
      };
      return this._books[index];
    }

    throw new CustomError('Gagal memperbarui buku. Id tidak ditemukan', 404);
    return;
  }

  async remove(id: string) {
    const index = this._books.findIndex((n) => n.id === id);
    if (index !== -1) {
      this._books.splice(index, 1);
      return true;
    }

    throw new CustomError('Buku gagal dihapus. Id tidak ditemukan', 404);
  }
}
