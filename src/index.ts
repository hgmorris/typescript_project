interface FinancialItem {
    id: number;
    description: string;
    amount: number;
    type: 'income' | 'expense'; 
  }
  
  class BudgetTracker {
    items: FinancialItem[] = [];
  
    constructor() {
      this.loadItems();
      this.renderItems();
      this.attachEventListeners();
    }
  
    addItem(description: string, amount: number, type: 'income' | 'expense'): void {
      const newItem: FinancialItem = { // Corrected type here
        id: Date.now(), // Simple way to generate a unique ID
        description,
        amount,
        type,
      };
      this.items.push(newItem);
      this.saveItems();
      this.renderItems();
    }
  
    deleteItem(id: number): void {
      this.items = this.items.filter(item => item.id !== id);
      this.saveItems();
      this.renderItems();
    }
  
    saveItems(): void {
      localStorage.setItem('budgetItems', JSON.stringify(this.items));
    }
  
    loadItems(): void {
      const items = localStorage.getItem('budgetItems');
      if (items) {
        this.items = JSON.parse(items);
      }
    }
  
    renderItems(): void {
      const itemsList = document.getElementById('itemsList');
      if (!itemsList) return; // Ensure itemsList is not null
  
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
  
    attachEventListeners(): void {
      const form = document.getElementById('budgetForm');
      if (!form) return; // Ensure form is not null
  
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const descriptionInput = document.getElementById('description') as HTMLInputElement;
        const amountInput = document.getElementById('amount') as HTMLInputElement;
        const typeSelect = document.getElementById('type') as HTMLSelectElement;
  
        this.addItem(descriptionInput.value, parseFloat(amountInput.value), typeSelect.value as 'income' | 'expense');
  
        // Reset form fields
        descriptionInput.value = '';
        amountInput.value = '';
        typeSelect.value = 'income';
      });
    }
  }
  
  const budgetTracker = new BudgetTracker();
  
  