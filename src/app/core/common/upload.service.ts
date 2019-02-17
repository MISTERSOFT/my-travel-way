import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private baseImageUrl = '/images';

  constructor(private af: AngularFirestore, private db: AngularFireStorage) { }

  uploadImage(file: File): Promise<string> {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.baseImageUrl}/${file.name}`).put(file);
    return new Promise((resolve, reject) => {
      // Listen changes on upload
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, null, (err) => reject(err), async () => {
        const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
        resolve(downloadUrl);
        // upload.url = await uploadTask.snapshot.ref.getDownloadURL();
        // upload.name = upload.file.name;
        // resolve(upload);
      });
    });
  }
}
