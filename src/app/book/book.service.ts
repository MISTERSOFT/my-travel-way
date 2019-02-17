import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '@app/core/auth';
import { BookModel } from '@app/shared/models';

@Injectable({ providedIn: 'root' })
export class BookService {
  private _userId: string;
  books: AngularFirestoreCollection<any>;

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this._userId = auth.user.uid;
    this.books = this.afs.collection('books');
  }

  getBooks(): Promise<BookModel[]> {
    const ref = this.books.ref;
    const query = ref.where('ownerId', '==', this._userId);
    return query.get().then(result => result.docs.map(doc => <BookModel>({ id: doc.id, ...doc.data() })));
  }

  createBook(data: BookModel) {
    const id = this.afs.createId();
    this.books.doc(id).set(data);
  }

}
