import { BaseTransformer } from './transformer.base';

export class BookTransformer extends BaseTransformer {
  static transform(data) {
    const array = [];
    data.forEach((element) => {
      array.push({
        id: element.id,
        name: element.name,
        publisher: element.publisher,
      });
    });
    return array;
  }
}
