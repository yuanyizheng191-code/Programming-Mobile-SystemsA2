import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Item {
  itemId: string;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  supplier: string;
  status: string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.html'
})
export class Inventory {
  items: Item[] = [];

  itemId = '';
  itemName = '';
  category = '';
  quantity = 0;
  price = 0;
  supplier = '';

  addItem() {
    if (!this.itemId || !this.itemName) {
      alert('ID and Name are required!');
      return;
    }
    let status = 'In Stock';
    if (this.quantity === 0) status = 'Out of Stock';
    else if (this.quantity <= 5) status = 'Low Stock';

    this.items.push({
      itemId: this.itemId,
      itemName: this.itemName,
      category: this.category,
      quantity: this.quantity,
      price: this.price,
      supplier: this.supplier,
      status: status
    });
    this.clear();
  }

  editItem(item: Item) {
    this.itemId = item.itemId;
    this.itemName = item.itemName;
    this.category = item.category;
    this.quantity = item.quantity;
    this.price = item.price;
    this.supplier = item.supplier;
    this.deleteItem(item.itemId, true);
  }

  deleteItem(id: string, silent = false) {
    if (!silent && !confirm('Delete this item?')) return;
    this.items = this.items.filter(i => i.itemId !== id);
  }

  clear() {
    this.itemId = '';
    this.itemName = '';
    this.category = '';
    this.quantity = 0;
    this.price = 0;
    this.supplier = '';
  }
}