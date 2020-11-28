export interface APIheader {
    Key: string;
    value : string;
}

export class HeaderMaker {
    static create(event: APIheader) {
      return { Key: event.Key, Value: event.value };
    }
}