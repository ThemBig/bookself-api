export class BaseTransformer {
  static transform(data) {
    const array = [];
    data.forEach((element) => {
      this.singleTransform(element);
    });
    return array;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static singleTransform(element) {}
}
