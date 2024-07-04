document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const createBtn = document.getElementById('createBtn');

    let selectedIndex = null;
    let isEditMode = false;
    let currentEditBtn = null;

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;
        const enrollment = document.getElementById('enrollment').value;
        const branch = document.getElementById('branch').value;

        if (isEditMode) {
            updateEntryInTable(selectedIndex, fullName, email, contact, enrollment, branch);
            isEditMode = false;
            createBtn.innerText = 'Add Entry';
            if (currentEditBtn) currentEditBtn.style.display = 'inline'; // Show the edit button
        } else {
            addEntryToTable(fullName, email, contact, enrollment, branch);
        }
        userForm.reset();
    });

    function addEntryToTable(fullName, email, contact, enrollment, branch) {
        const row = createTableRow(fullName, email, contact, enrollment, branch);
        userList.appendChild(row);
    }

    function updateEntryInTable(index, fullName, email, contact, enrollment, branch) {
        const row = userList.children[index];
        updateTableRow(row, fullName, email, contact, enrollment, branch);
    }

    function createTableRow(fullName, email, contact, enrollment, branch) {
        const row = document.createElement('tr');
        updateTableRow(row, fullName, email, contact, enrollment, branch);
        return row;
    }

    function updateTableRow(row, fullName, email, contact, enrollment, branch) {
        row.innerHTML = `
            <td>${fullName}</td>
            <td>${email}</td>
            <td>${contact}</td>
            <td>${enrollment}</td>
            <td>${branch}</td>
            <td>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </td>
        `;

        row.querySelector('.deleteBtn').addEventListener('click', () => row.remove());

        const editBtn = row.querySelector('.editBtn');
        editBtn.addEventListener('click', () => {
            isEditMode = true;
            selectedIndex = Array.from(userList.children).indexOf(row);
            document.getElementById('fullName').value = fullName;
            document.getElementById('email').value = email;
            document.getElementById('contact').value = contact;
            document.getElementById('enrollment').value = enrollment;
            document.getElementById('branch').value = branch;
            createBtn.innerText = 'Update Entry';
            currentEditBtn = editBtn;
            currentEditBtn.style.display = 'none'; 
        });
    }
});
