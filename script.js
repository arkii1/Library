const nameInput = document.getElementById('name');
const authorInput = document.getElementById('author');
const readInput = document.getElementById('read');
const addButton = document.getElementById('add');
const tableBody = document.querySelector("#table-body")

let myLibrary = [];

addButton.onclick = () => {
    addBookToLibrary();
    renderTable();
}

function getTableIndex(element){
    return element.closest('tr').rowIndex;
}

function deleteRow(element) {
    const index = getTableIndex(element) - 1;
    console.log(index);
    myLibrary.splice(index, 1); 
}

function changeReadStatus(element) {
    const index = getTableIndex(element) - 1;
    console.log(index);
    myLibrary[index].read = myLibrary[index].read == "read" ? "not read" : "read";
}


function Book(name, author, read) {
    this.name = name;
    this.author = author;
    this.read = read;
}

function addBookToLibrary() {
    const book = new Book
                        (  
                            nameInput.value,
                            authorInput.value,
                            readInput.value
                        );

    myLibrary.push(book);
}

function renderTable() {
    tableBody.innerHTML = "";
    for (let i = myLibrary.length - 1; i > -1; i--){
        const book = myLibrary[i];
        console.log(book.name + " index: " + myLibrary.indexOf(book));
        const htmlBook = `
            <tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td><button class="read-button" onclick="changeReadStatus(this); renderTable();">${book.read}</button></td>
                <td><button class="delete" onclick="deleteRow(this); renderTable();">Delete</button></td>
            </tr>
            `;
        tableBody.insertAdjacentHTML("afterbegin", htmlBook);
    }
}

function addInitialBooks() {
    const book1 = new Book("Wheel Of Time: Eye of The World", "Robert Jordan", "not read");
    const book2 = new Book("Captain Underpants", "Dav Pilkey", "read");
    myLibrary.push(book1);
    myLibrary.push(book2);
}

window.onload = () => {
    addInitialBooks();
    renderTable();
}