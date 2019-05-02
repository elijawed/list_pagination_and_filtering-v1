/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Global variables
const studentList = document.querySelectorAll('.student-item');
let pageLength = 10;

// Add a search bar
const headerDiv = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
searchDiv.className = 'student-search';
searchInput.placeholder = 'Search for students..';
searchDiv.appendChild(searchInput);
headerDiv.appendChild(searchDiv);

// Searching student function, returns results array.
const searchStudents = (list, search) => {
  const results = [];
  for (let i = 0; i < list.length; i++) {
    if (
      list[i].children[0].children[1].textContent.includes(search.toLowerCase())
    ) {
      results.push(list[i]);
    } else {
      list[i].style.display = 'none';
    }
  }
  return results;
};

// Hides all students and then only shows students that belong on page.
const showPage = (list, page) => {
  for (let i = 0; i < list.length; i++) {
    list[i].style.display = 'none';
  }

  const startIndex = page * pageLength - pageLength;
  const endIndex = page * pageLength - 1;

  for (let i = startIndex; i <= endIndex; i++) {
    if (i < list.length) list[i].style.display = '';
  }
};

// Appends links to the bottom based off of how many users there are with
// a maximum of PageLength users per page.
const appendPageLinks = list => {
  const mainDiv = document.querySelector('.page');
  const div = document.createElement('div');
  div.className = 'pagination';
  const ul = document.createElement('ul');
  mainDiv.appendChild(div);
  div.appendChild(ul);

  // Inner function to handle creating the actual page links.
  const createPagination = () => {
    for (let i = 1; i <= Math.ceil(list.length / pageLength); i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i;
      if (i === 1) a.className = 'active';
      li.appendChild(a);
      ul.appendChild(li);
    }

    // Adding an event listener that changes active state and invokes the showPage
    //  function according to which page number was clicked.
    ul.addEventListener('click', event => {
      if (event.target.tagName === 'A') {
        showPage(list, event.target.textContent);
        for (let i = 0; i < ul.children.length; i++) {
          ul.querySelectorAll('a')[i].className = '';
        }
        event.target.className = 'active';
      }
    });
  };

  // If there is only a need for one page, don't make pagination links.
  if (list.length > pageLength) {
    createPagination();
  }
};

// Removing pagination links when searching so that we don't append multiple divs
const removePagination = () => {
  const mainDiv = document.querySelector('.page');
  const paginationDiv = document.querySelector('.pagination');
  mainDiv.removeChild(paginationDiv);
};

searchInput.addEventListener('keyup', function() {
  const search = searchStudents(studentList, searchInput.value);
  showPage(search, 1);
  removePagination();
  appendPageLinks(search);
});

showPage(studentList, 1);
appendPageLinks(studentList);
