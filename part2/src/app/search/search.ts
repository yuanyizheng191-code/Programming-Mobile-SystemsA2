/**
 * search.ts
 * @description Angular Component for searching inventory items
 * @author Yizheng Yuan
 * @assignment Programming Mobile Systems - Part 2 (Angular Implementation)
 */

// Import necessary Angular core and common modules
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../inventory.service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  styleUrls: ['search.css'],
  imports: [CommonModule, FormsModule]
})
export class SearchPage {  // Component State Properties
  keyword: string = '';
  results: InventoryItem[] = [];

  constructor(private inventoryService: InventoryService) {}

  doSearch(): void {
    this.results = this.inventoryService.searchItems(this.keyword);
  }
}