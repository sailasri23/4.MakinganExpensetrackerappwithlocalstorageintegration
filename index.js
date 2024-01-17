function handleFormSubmit(event) {
    event.preventDefault();
    const expense = event.target.expense.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    // Create expense object
    const expenseData = {
        expense,
        description,
        category
    };

    // Store the expense details in local storage with a unique key
    const key = new Date().getTime().toString(); // Using timestamp as a key
    localStorage.setItem(key, JSON.stringify(expenseData));
    
    // Display the expense details on the screen
    showscreen(key, expenseData);
}
function showscreen(key, expenseData) {
    const parentele = document.getElementById("userList");
    const childele = document.createElement('li');
    childele.className = 'list-group-item d-flex justify-content-between align-items-center';
    const expenseDetails = document.createElement('div');
    expenseDetails.innerHTML = `<strong>Expense:</strong> ${expenseData.expense} - <strong>Description:</strong> ${expenseData.description} - <strong>Category:</strong> ${expenseData.category}`;

   const buttonsContainer = document.createElement('div');

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-danger';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        localStorage.removeItem(key);
        parentele.removeChild(childele);
    };

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'btn btn-warning ms-2';
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
        editExpense(key, expenseData);
        parentele.removeChild(childele);
    };

    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(editButton);

    childele.appendChild(expenseDetails);
    childele.appendChild(buttonsContainer);

    // Insert the new expense item at the beginning of the list
    parentele.insertBefore(childele, parentele.firstChild);
}

function editExpense(key, expenseData) {
    // Remove expense from local storage
    localStorage.removeItem(key);
    // Populate form fields with existing values
    document.getElementById('expense').value = expenseData.expense;
    document.getElementById('description').value = expenseData.description;
    document.getElementById('category').value = expenseData.category;
}
