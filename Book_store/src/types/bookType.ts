export interface Book {
    title: string;
    subtitle: string;
    isbn13: string;
    price: string;
    image: string;
    url: string;
    books:[]
  }
  export interface Books{
    books: Book[]
  }
  
  export interface BookApiResponse {
    error: string;
    total: string;
    books: Book[];
  }
  