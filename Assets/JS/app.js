const library = [];
const form = document.querySelector('form');
const libWrap = document.querySelector('.lib-wrap');
const tinput = document.querySelector('.b-title');
const ainput = document.querySelector('.b-author');
const ninput = document.querySelector('.b-pages');

const bookCreate = (bookTitle, bookAuthor, bookNumOfPages, bookRead) => {
  let title = bookTitle;
  let author = bookAuthor;
  let numOfPages = bookNumOfPages;
  let read = bookRead;

  return { title, author, numOfPages, read };
};

// Tests -------------------------
const book1 = bookCreate('may', 'sunday', '500', 'Not Read');
const book2 = bookCreate('december', 'jurgen', '300', 'Read');

library.push(book1);
library.push(book2);

function showForm() {
  form.className = 'show';
}

const myModule = (() => {
  const appendContent = (wrap, children) => {
    children.forEach(child => {
      wrap.appendChild(child);
    });
  }

  const showLibrary = () => {
    libWrap.innerHTML = '';
    for (let i = 0; i < library.length; i += 1) {
      const bookCard = document.createElement('div');
      const btitle = document.createElement('h2');
      const asubtitle = document.createElement('h3');
      const content = document.createElement('p');
      btitle.innerText = library[i].title;
      asubtitle.innerText = `Author: ${library[i].author.toUpperCase()}`;
      content.innerHTML = `Pages: ${library[i].numOfPages} ${library[i].read}`;
  
      bookCard.setAttribute('class', 'book-card');
      btitle.setAttribute('class', 'card-title');
      asubtitle.setAttribute('class', 'card-author');
      content.classList = 'card-content';
  
      const rbtn = document.createElement('button');
      rbtn.innerHTML = 'Delete Book';
      rbtn.id = `remove-${i}`;
      rbtn.className = 'btn';
      rbtn.setAttribute('onclick', `deleteBook(${i})`);
      const sbtn = document.createElement('button');
      sbtn.innerHTML = 'Status';
      sbtn.id = `status-${i}`;
      sbtn.className = 'btn';
      sbtn.setAttribute('onclick', `readStatus(${i})`);
      appendContent(bookCard, [ btitle, asubtitle, content, rbtn, sbtn ]);
      libWrap.appendChild(bookCard);
    }
  }
  return { showLibrary };
})();

function addBookToLibrary() {
  if (tinput.value === '' || ainput.value === '' || ninput.value === '') {
    alert('All form fields must be filled!');
  } else {
    const book = bookCreate(tinput.value, ainput.value, ninput.value);
    library.push(book);
    form.className = 'hide';
    myModule.showLibrary();
  }
}

function readStatus(b) {
  if (library[b].read === 'Read') {
    library[b].read = 'Not Read';
  } else {
    library[b].read = 'Read';
  }
  myModule.showLibrary();
}

function deleteBook(idx) {
  library.splice(idx, 1);
  myModule.showLibrary();
}

myModule.showLibrary();
