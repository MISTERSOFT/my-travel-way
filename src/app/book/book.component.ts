import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  searchValue: string;
  books;

  constructor(private _api: BookService) { }

  ngOnInit() {
    this.books = [
      { id: 1, name: 'Toronto', image: 'https://picsum.photos/100/100/?random', placesCount: 5 },
      { id: 2, name: 'Mexico City', image: 'https://picsum.photos/100/100/?random', placesCount: 2 },
      { id: 3, name: 'Los Angeles', image: 'https://picsum.photos/100/100/?random', placesCount: 9 },
    ];
  }

}

