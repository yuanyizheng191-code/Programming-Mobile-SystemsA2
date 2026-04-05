"use strict";
let inventory = [];
const tableBody = document.getElementById('tableBody');
const itemIdInput = document.getElementById('itemId');
const itemNameInput = document.getElementById('itemName');
const categoryInput = document.getElementById('category');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const supplierInput = document.getElementById('supplierName');
const isPopularInput = document.getElementById('isPopular');
const commentInput = document.getElementById('comment');
function getStockStatus(qty) {
    if (qty === 0)
        return 'Out of Stock';
    if (qty <= 5)
        return 'Low Stock';
    return 'In Stock';
}
function addItem() {
    const id = itemIdInput.value.trim();
    const name = itemNameInput.value.trim();
    if (!id || !name) {
        alert('ID and Name are required!');
        return;
    }
    if (inventory.some(i => i.itemId === id)) {
        alert('Item ID already exists!');
        return;
    }
    if (inventory.some(i => i.itemName.toLowerCase() === name.toLowerCase())) {
        alert('Item Name already exists!');
        return;
    }
    const qty = parseInt(quantityInput.value) || 0;
    const priceVal = parseFloat(priceInput.value) || 0;
    const newItem = {
        itemId: id,
        itemName: name,
        category: categoryInput.value,
        quantity: qty,
        price: priceVal,
        supplierName: supplierInput.value,
        stockStatus: getStockStatus(qty),
        isPopular: isPopularInput.value === 'true',
        comment: commentInput.value || undefined
    };
    inventory.push(newItem);
    clearForm();
    renderTable(inventory);
}
function renderTable(items) {
    tableBody.innerHTML = '';
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${item.itemId}</td>
      <td>${item.itemName}</td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.supplierName}</td>
      <td class="${item.stockStatus === 'In Stock' ? 'status-in' : item.stockStatus === 'Low Stock' ? 'status-low' : 'status-out'}">${item.stockStatus}</td>
      <td>${item.isPopular ? '✅ Yes' : '❌ No'}</td>
      <td>${item.comment || '-'}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editItem('${item.itemId}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteItem('${item.itemId}')">Delete</button>
      </td>
    `;
        tableBody.appendChild(row);
    });
}
function searchItems() {
    const keyword = document.getElementById('searchName').value.toLowerCase();
    const filtered = inventory.filter(i => i.itemName.toLowerCase().includes(keyword));
    renderTable(filtered);
}
function showPopularItems() {
    renderTable(inventory.filter(i => i.isPopular));
}
function editItem(id) {
    const item = inventory.find(i => i.itemId === id);
    if (!item)
        return;
    itemIdInput.value = item.itemId;
    itemNameInput.value = item.itemName;
    categoryInput.value = item.category;
    quantityInput.value = item.quantity.toString();
    priceInput.value = item.price.toString();
    supplierInput.value = item.supplierName;
    isPopularInput.value = item.isPopular.toString();
    commentInput.value = item.comment || '';
    deleteItem(id, true);
}
function deleteItem(id, silent = false) {
    if (!silent && !confirm('Delete this item?'))
        return;
    inventory = inventory.filter(i => i.itemId !== id);
    renderTable(inventory);
}
function clearForm() {
    itemIdInput.value = '';
    itemNameInput.value = '';
    categoryInput.value = '';
    quantityInput.value = '';
    priceInput.value = '';
    supplierInput.value = '';
    isPopularInput.value = 'true';
    commentInput.value = '';
}
function showAllItems() {
    renderTable(inventory);
}
window.addItem = addItem;
window.searchItems = searchItems;
window.showPopularItems = showPopularItems;
window.editItem = editItem;
window.deleteItem = deleteItem;
window.clearForm = clearForm;
window.showAllItems = showAllItems;
