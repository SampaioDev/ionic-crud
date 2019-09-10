import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService { 

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewItem(record) {
    return this.firestore.collection('Itens').add(record);
  }

  read_Itens() {
    return this.firestore.collection('Itens').snapshotChanges();
  }

  update_Item(recordID,record){
    this.firestore.doc('Itens/' + recordID).update(record);
  }

  delete_Item(record_id) {
    this.firestore.doc('Itens/' + record_id).delete();
  }
}
