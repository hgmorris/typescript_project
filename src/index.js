"use strict";
class BudgetTracker {
    constructor() {
        this.items = [];
        this.loadItems();
        this.renderItems();
        this.attachEventListeners();
    }
    addItem(description, amount, type) {
        const newItem = {
            id: Date.now(), // Simple way to generate a unique ID
            description,
            amount,
            type,
        };
        this.items.push(newItem);
        this.saveItems();
        this.renderItems();
    }
    deleteItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveItems();
        this.renderItems();
    }
    saveItems() {
        localStorage.setItem('budgetItems', JSON.stringify(this.items));
    }
    loadItems() {
        const items = localStorage.getItem('budgetItems');
        if (items) {
            this.items = JSON.parse(items);
        }
    }
    renderItems() {
        const itemsList = document.getElementById('itemsList');
        if (!itemsList)
            return; // Ensure itemsList is not null
        itemsList.innerHTML = ''; // Clear the list before rendering
        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
          <span>${item.description} - ${item.amount} (${item.type})</span>
          <button onclick="budgetTracker.deleteItem(${item.id})">Delete</button>
        `;
            itemsList.appendChild(itemElement);
        });
    }
    attachEventListeners() {
        const form = document.getElementById('budgetForm');
        if (!form)
            return; // Ensure form is not null
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const descriptionInput = document.getElementById('description');
            const amountInput = document.getElementById('amount');
            const typeSelect = document.getElementById('type');
            this.addItem(descriptionInput.value, parseFloat(amountInput.value), typeSelect.value);
            // Reset form fields
            descriptionInput.value = '';
            amountInput.value = '';
            typeSelect.value = 'income';
        });
    }
}
const budgetTracker = new BudgetTracker();
