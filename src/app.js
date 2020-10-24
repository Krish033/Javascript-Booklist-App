// constructor class
class Book {

  // constructor
  constructor(title, author, isbn) {

    // getting values
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}




// UserInterface class
class UserInterface {

  // Dipslay Saved books 
  static displayBooks() {

    // looping through books array
    let books = SaveLocalBooks.getLocalBooks();
    books.forEach(book => UserInterface.createBooks(book));
  }



  // create Books
  static createBooks(book) {
    // getting parent
    const bookList = document.querySelector('#books');

    // creating a tr
    const list = document.createElement("tr");

    // lists innerHTML
    list.innerHTML = `
      <td>${book.title}</td> 
      <td>${book.author}</td> 
      <td>${book.isbn}</td> 
      <td><a class="btn btn-danger btn-sm delete-btn">X</a></td> 
    `;
    // appending tr to parent
    bookList.appendChild(list);

  }

  // Adding input values
  static addBooksToList(e) {

    // Preventing Default behavior
    e.preventDefault();

    // select DOM 
    let title = document.querySelector("#book").value;
    let author = document.querySelector("#author").value;
    let isbn = document.querySelector("#isbn").value;

    // Checking for Empty values
    if (title === '' || author === '' || isbn === '') {

      // alerting hey fill the fields
      UserInterface.alertUser('Field required', "danger");

      // returning from contineuing
      return;
    }

    // instansiating book
    let book = new Book(title, author, isbn);


    // updating the UI
    UserInterface.createBooks(book);

    // alerting user that book have been added
    UserInterface.alertUser('Book Added', "success");

    // adding book to localStorage
    SaveLocalBooks.addLocalBooks(book);

    // Clearing values
    UserInterface.clearFields();

  }

  // Clearing Fields
  static clearFields() {

    // Clearing Values;
    document.querySelector("#book").value = '';
    document.querySelector("#author").value = '';
    document.querySelector("#isbn").value = '';
  }


  // remove Books
  static removeBooks(e) {

    // getting e.target
    let el = e.target;

    // if delete button is clicked
    if (el.classList.contains("delete-btn")) {

      // getting parent element
      let parents = el.parentElement.parentElement;

      // adding animation
      parents.style.opacity = "0";

      // alerting book removed
      UserInterface.alertUser("Book Removed", "success")

      // removing after 3 seconds
      setTimeout(_ => parents.remove(), 1000);

      SaveLocalBooks.removeLocalBooks()
    }

  }



  // Alerting user for empty fields
  static alertUser(message, className) {

    // creating a div
    const div = document.createElement('div');

    // adding innerHTML
    div.innerHTML = `
      <h1>${message}</h1>
    `;

    // Adding classList to div
    div.classList.add(`alert`);
    div.classList.add(`alert-${className}`);

    // Getting parent
    const main = document.querySelector(".main-content");

    // append child before
    main.insertBefore(div, document.querySelector('.form-div'));

    // removing the alert
    setTimeout(_ => div.remove(), 3000)
  }

}


// setLocalBooks class
class SaveLocalBooks {


  // Getting books from localStorage
  static getLocalBooks() {

    // creating a variable
    let books;

    // checking for books in localStorage
    if (localStorage.getItem('books') === null) {

      // if null books
      books = [];

    } else {

      // if exists get books from localStorage
      books = JSON.parse(localStorage.getItem('books'));
    }

    // return books;
    return books;
  }

  // Adding books to localStorage
  static addLocalBooks(book) {

    // pushing books 
    let books = SaveLocalBooks.getLocalBooks();

    books.push(book);

    // adding books to localStorage
    localStorage.setItem('books', JSON.stringify(books));
  }

  // remove book from localStorage
  static removeLocalBooks() {
    
    let books = SaveLocalBooks.getLocalBooks();
    
    // get the splicing item;
    books.forEach(book => {
      books.splice(book, 1);
    })
    
    // updating the spliced todos to the localStorage;
    localStorage.setItem("books", JSON.stringify(books));

  }

}








/* EVENTS */


// set books
document.addEventListener('DOMContentLoaded', UserInterface.displayBooks);

// Add Book 
document.getElementById('form').addEventListener("submit", UserInterface.addBooksToList);

// remove Book
document.addEventListener("click", UserInterface.removeBooks);