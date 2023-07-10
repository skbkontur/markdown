import { v4 as uuid } from 'uuid';

export class Guid {
  private _generated: string;

  constructor() {
    this._generated = uuid();
  }

  public get generated() {
    if (this._generated) {
      return this._generated;
    }

    return this.generate();
  }

  public generate(): string {
    const id = uuid();
    this._generated = id;

    return id;
  }
}
