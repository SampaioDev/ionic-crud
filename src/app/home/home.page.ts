import { Component, OnInit } from '@angular/core';

import { CrudService } from './../services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  itens: any;
  itemName: string;
  itemDescription: string;
  itemQuantity: number;
  itemPrice: string;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.read_Itens().subscribe(data => {

      this.itens = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Quantity: e.payload.doc.data()['Quantity'],
          Description: e.payload.doc.data()['Description'],
          Price: e.payload.doc.data()['Price'],
        };
      })
      console.log(this.itens);

    });
  }

  CreateRecord() {
    let record = {};
    record['Name'] = this.itemName;
    record['Quantity'] = this.itemQuantity;
    record['Description'] = this.itemDescription;
    record['Price'] = this.itemPrice;
    this.crudService.create_NewItem(record).then(resp => {
      this.itemName = "";
      this.itemDescription = "";
      this.itemQuantity = undefined;
      this.itemPrice = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.crudService.delete_Item(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditDescription = record.Description;
    record.EditQuantity = record.Quantity;
    record.EditPrice = record.Price;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Quantity'] = recordRow.EditQuantity;
    record['Description'] = recordRow.EditDescription;
    record['Price'] = recordRow.EditPrice;
    this.crudService.update_Item(recordRow.id, record);
    recordRow.isEdit = false;
  }

}