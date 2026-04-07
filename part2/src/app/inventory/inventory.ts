/**
 * inventory.ts
 * @description Angular Component for Inventory CRUD Operations
 * @author Yizheng Yuan
 * @assignment Programming Mobile Systems - Part 2 (Angular Implementation)
 */

// Import necessary Angular modules and Reactive Forms
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
export class InventoryPage implements OnInit {// Component State Properties
  items: InventoryItem[] = [];// // Stores the list of all inventory items from the service

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
    // Subscribe to the inventory service to update local items when they change
    this.inventoryService.items$.subscribe(data => {
      this.items = data;
    });
  }

  saveItem(): void {
    // Validate the form fields
    if (!this.newItem.id || !this.newItem.name) {
      alert('Please fill in Product ID and Product Name!');
      return;
    }


    // Calculate the status based on the quantity
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