function login() {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        window.location.href = './dashboard.html';
    } else {
        alert('Credenciais inválidas. Por favor, tente novamente.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var table = document.getElementById('itemTable');
    new Tablesort(table);

    // Adiciona funcionalidade de filtro para cada coluna
    var filters = document.querySelectorAll('.filter-input');
    filters.forEach(function (filter) {
        filter.addEventListener('input', function () {
            filterTable(this);
        });
    });
});

function filterTable(input) {
    var table = document.getElementById('itemTable');
    var filterIndex = input.dataset.filterIndex;
    var rows = table.tBodies[0].rows;

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var cell = row.cells[filterIndex];
        var filterValue = input.value.toUpperCase();

        if (cell.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var table = document.getElementById('itemTable');
    new Tablesort(table);

    // Adiciona funcionalidade de filtro para cada coluna
    var filters = document.querySelectorAll('.filter-input');
    filters.forEach(function (filter) {
        filter.addEventListener('input', function () {
            filterTable(this);
            updateSum();
        });
    });
});

function filterTable(input) {
    var table = document.getElementById('itemTable');
    var filterIndex = input.dataset.filterIndex;
    var rows = table.tBodies[0].rows;

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var cell = row.cells[filterIndex];
        var filterValue = input.value.toUpperCase();

        if (cell.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }

    updateSum(); // Atualiza a somatória após o filtro
}

function addItem() {
    var table = document.getElementById('itemTable').getElementsByTagName('tbody')[0];

    var newRow = table.insertRow(table.rows.length);
    // var cell1 = newRow.insertCell(0);
    // var cell2 = newRow.insertCell(1);
    // var cell3 = newRow.insertCell(2);
    // var cell4 = newRow.insertCell(3);

    var typeInput = document.createElement('input');
    typeInput.type = 'text';
    typeInput.setAttribute('readonly', true);
    cell1.appendChild(typeInput);

    var valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.setAttribute('readonly', true);
    cell2.appendChild(valueInput);

    var dateInput = document.createElement('input');
    dateInput.type = 'text';
    dateInput.setAttribute('readonly', true);
    cell3.appendChild(dateInput);

    var removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remover';
    removeButton.onclick = function () {
        removeItem(newRow);
    };
    cell4.appendChild(removeButton);

    toggleEditRow(newRow);
    updateSum(); // Atualiza a somatória após adicionar um item
}

function removeItem(row) {
    var table = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    table.deleteRow(row.rowIndex -1);
    updateSum(); // Atualiza a somatória após remover um item
}

function toggleEditRow(row) {
    var inputs = row.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].readOnly = !inputs[i].readOnly;
    }
}

function toggleEditMode() {
    var table = document.getElementById('itemTable');
    table.classList.toggle('edit-mode');
}

function showAddItemPopup() {
    var popup = document.getElementById('addItemPopup');
    popup.style.display = 'block';
}

function closeAddItemPopup() {
    var popup = document.getElementById('addItemPopup');
    popup.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    var table = document.getElementById('itemTable');
    new Tablesort(table);

    // Adiciona funcionalidade de filtro para cada coluna
    var filters = document.querySelectorAll('.filter-input');
    filters.forEach(function (filter) {
        filter.addEventListener('input', function () {
            filterTable(this);
            updateSum();
        });
    });

    // Aplica a máscara ao campo de valor no popup
    var popupValueInput = document.getElementById('popupValue');
    if (popupValueInput) {
        popupValueInput.addEventListener('input', function () {
            this.value = formatCurrency(this.value);
        });
    }
});

function adicionarItemTabela() {
    var type = document.getElementById('popupType').value;
    var value = document.getElementById('popupValue').value;

    if (type && value) {
        var table = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.rows.length);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);

        var currentDate = new Date();
        var formattedDate = currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        cell1.innerHTML = type;
        cell2.innerHTML = formatCurrency(value);
        cell3.innerHTML = formattedDate;

        var removeButton = document.createElement('button');
        removeButton.innerHTML = 'Remover';
        removeButton.onclick = function () {
            removeItem(newRow);
        };
        cell4.appendChild(removeButton);

        closeAddItemPopup();
        updateSum(); // Atualiza a somatória após adicionar um item
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function formatCurrency(input) {
    var value = input.replace (/\D/g, ''); // Remove caracteres não numéricos
    value = parseFloat(value) / 100; 
    value = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return value;
}


function updateSum() {
    var table = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    var sum = 0;
 
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var typeCell = cells[0].innerText.trim();  // Supondo que o tipo esteja na primeira célula
    
        if (typeCell === "Saída") {
            var valueCell = cells[1];
            if (valueCell) {
                var value = valueCell.innerText.replace(/[^\d,-]/g, '');
                sum -= parseFloat(value.replace(',', '.')) || 0;
            }
        } else {  // Se não for "Saída", assume que é uma entrada
            var valueCell = cells[1];
            if (valueCell) {
                var value = valueCell.innerText.replace(/[^\d,-]/g, '');
                sum += parseFloat(value.replace(',', '.')) || 0;
            }
        }
    }
    

    var sumRow = document.getElementById('sumRow');
        if (!sumRow) {
    sumRow = table.insertRow(rows.length);
    sumRow.id = 'sumRow';
    sumRow.innerHTML = '<td colspan="3">Somatória</td><td id="sumValue"></td>';
    }

    var sumValueCell = sumRow.querySelector('#sumValue');
    sumValueCell.textContent = sum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

}
