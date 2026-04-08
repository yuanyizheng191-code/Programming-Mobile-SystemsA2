/**
 * inventory.service.ts
 * @description Service for managing inventory data using RxJS BehaviorSubject
 * @author Yizheng Yuan
 * @assignment Programming Mobile Systems - Part 2 (Angular Implementation)
 */

// Import Angular Injectable decorator and RxJS BehaviorSubject
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
  quantity: number;
  price: number;
  supplier: string;
  popular: boolean;
  comments: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

/**
 * Inventory Service
 * @Injectable with providedIn: 'root' makes this service a singleton available application-wide
 */
@Injectable({ providedIn: 'root' })
export class InventoryService {
  private items = new BehaviorSubject<InventoryItem[]>([]);
  items$ = this.items.asObservable();

  /**
   * Check if an inventory item with the given ID exists
   * @param id The ID to check
   * @returns True if the ID exists, False otherwise
   */
  isIdExists(id: string): boolean {
    return this.items.value.some(item => item.id === id);
  }


addItem(item: InventoryItem) {
    this.items.next([...this.items.value, item]);
  }

  /**
   * Update an existing inventory item
   * @param updated The updated inventory item to be merged
   */
  updateItem(updated: InventoryItem) {
    const newItems = this.items.value.map(i => i.id === updated.id ? updated : i);
    this.items.next(newItems);
  }

  /**
   * Delete an inventory item by ID
   * @param id The ID of the item to be deleted
   */
  deleteItem(id: string) {
    this.items.next(this.items.value.filter(i => i.id !== id));
  }

  searchItems(keyword: string) {
    const low = keyword.toLowerCase();
    return this.items.value.filter(i =>
      i.name.toLowerCase().includes(low) ||
      i.id.toLowerCase().includes(low) ||
      i.category.toLowerCase().includes(low)
    );
  }
}