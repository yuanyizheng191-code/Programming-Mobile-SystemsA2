import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../inventory.service';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
  styleUrls: ['inventory.css'],
  imports: [CommonModule, FormsModule]
})
export class InventoryPage implements OnInit {
  items: InventoryItem[] = [];
  newItem: any = {
    id: '',
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    supplier: '',
    popular: false
  };
  isEditing = false;

  constructor(private service: InventoryService) {}

  ngOnInit() {
    this.service.items$.subscribe(data => {
      this.items = data;
    });
  }

  saveItem() {
    if (!this.newItem.id || !this.newItem.name) {
      alert('Please fill ID and Name');
      return;
    }

    if (this.isEditing) {
      this.service.updateItem(this.newItem);
      this.isEditing = false;
    } else {
      this.service.addItem(this.newItem);
    }
    this.clearForm();
  }

  editItem(item: InventoryItem) {
    this.newItem = { ...item };
    this.isEditing = true;
  }

  deleteItem(id: string) {
    if (confirm('Delete this product?')) {
      this.service.deleteItem(id);
    }
  }

  clearForm() {
    this.newItem = {
      id: '',
      name: '',
      category: '',
      quantity: 0,
      price: 0,
      supplier: '',
      popular: false
    };
    this.isEditing = false;
  }
}