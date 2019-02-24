import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { AuthService } from '@app/core/auth';
import { BookModel, PlaceForwardGeocodingModel } from '@app/shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookService {
  private _userId: string;

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this._userId = auth.user.uid;
  }

  getUserBooks$(): Observable<BookModel[]> {
    const queryFn: QueryFn = (ref) => ref.where('ownerId', '==', this._userId);
    return this.afs.collection<BookModel>('books', queryFn).snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const doc = action.payload.doc;
          const data = doc.data();
          const id = doc.id;
          return <BookModel>{ id, ...data };
        }))
      );
  }

  createBook(data: BookModel) {
    const id = this.afs.createId();
    this.afs.collection('books').doc(id).set(data);
  }

  deleteBook(id: string) {
    // TODO: When express api set up with firebase admin sdk => delete the image stored
    this.afs.collection('books').doc(id).delete();
  }

  getBookPlaces$(bookId: string): Observable<PlaceForwardGeocodingModel[]> {
    // const queryFn: QueryFn = (ref) => ref.where('ownerId', '==', this._userId);
    return this.afs.collection<PlaceForwardGeocodingModel>(`books/${bookId}/places`).snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const doc = action.payload.doc;
          const data = doc.data();
          const id = doc.id;
          return new PlaceForwardGeocodingModel(<any>{ id, ...data });
        }))
      );
  }

  async addPlace(bookId: string, place: PlaceForwardGeocodingModel) {
    const docRef = this.afs.collection('books').doc(bookId);
    const doc = await docRef.get().toPromise();
    // Document doesn't exist so do nothing
    if (!doc.exists) {
      return;
    }
    // Save the place in existing book into the nested places collection
    const placeId = this.afs.createId();
    docRef.collection('places').doc(placeId).set({...place});
  }
}
