// ==============================================
// Author: Yizheng Yuan
// Assignment: Programming Mobile Systems - Part 2
// Description: Inventory Management Component
// ==============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
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
    popular: false,
    comments: ''
  };

  isEditing = false;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.items$.subscribe((data: InventoryItem[]) => {
      this.items = data;
    });
  }

  saveItem(): void {
    // ✅ Strengthen mandatory verification: Except for Comments, all fields must be non empty/non-zero
    if (
      !this.newItem.id?.trim() || 
      !this.newItem.name?.trim() || 
      !this.newItem.category?.trim() ||
      this.newItem.quantity < 0 || 
      this.newItem.price < 0 || 
      !this.newItem.supplier?.trim()
    ) {
      alert('Error: All fields except Comments are required! Please fill in all mandatory fields.');
      return;
    }

    // ✅ Check ID uniqueness
    //  
    if (this.inventoryService.isIdExists(this.newItem.id) && !this.isEditing) {
      alert('Item ID already exists! ID must be unique!');
      return;
    }

    if (this.isEditing) {
      this.inventoryService.updateItem(this.newItem);
      this.isEditing = false;
    } else {
      this.inventoryService.addItem(this.newItem);
    }

    this.clearForm();
  }

  editItem(item: InventoryItem): void {
    this.newItem = { ...item };
    this.isEditing = true;
  }

  deleteItem(id: string): void {
    if (confirm('Are you sure you want to delete this item?')) {
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
      comments: ''
    };
    this.isEditing = false;
  }
}