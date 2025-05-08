export interface Book {
    title: string;
    subtitle: string;
    isbn13: string;
    price: string;
    image: string;
    url: string;
  }
  export interface Books{
    books: Book[]
    price:string
  }
  
  export interface BookApiResponse {
    error: string;
    total: string;
    books: Book[];
  }
  
  export interface BookDetails {
    authors: string,
    desc: string,
    error: string,
    image: string,
    isbn10: string,
    isbn13: string,
    language: string,
    pages: string,
    pdf: {[chapter:string]:string},
    price: string,
    publisher: string,
    rating: string,
    subtitle: string,
    title: string,
    url: string,
    year: string,
  }