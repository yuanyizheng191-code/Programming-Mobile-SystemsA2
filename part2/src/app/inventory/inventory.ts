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

  newItem: InventoryItem = {
    id: '',
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    supplier: '',
    popular: false,
    status: 'In Stock'
  };

  isEditing = false;
  editId = '';

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.items$.subscribe(data => {
      this.items = data;
    });
  }

  saveItem(): void {
    if (!this.newItem.id || !this.newItem.name) {
      alert('Please fill in Product ID and Product Name!');
      return;
    }


    this.newItem.status = this.calculateStatus(this.newItem.quantity);

    if (this.isEditing) {
      this.inventoryService.updateItem(this.newItem);
      this.isEditing = false;
      this.editId = '';
    } else {
      this.inventoryService.addItem(this.newItem);
    }
    this.clearForm();
  }

  editItem(item: InventoryItem): void {
    this.newItem = { ...item };
    this.isEditing = true;
    this.editId = item.id;
  }

  deleteItem(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.inventoryService.deleteItem(id);
    }
  }

  clearForm(): void {
    this.newItem = {
      id: '',
      name: '',
      category: '',
      quantity: 0,
      price: 0,
      supplier: '',
      popular: false,
      status: 'In Stock'
    };
    this.isEditing = false;
    this.editId = '';
  }

  private calculateStatus(quantity: number): 'In Stock' | 'Low Stock' | 'Out of Stock' {
    if (quantity <= 0) return 'Out of Stock';
    if (quantity < 5) return 'Low Stock';
    return 'In Stock';
  }
}