const listForm = document.querySelector('.list_form');
const listInput = listForm.querySelector('.list_input');
const unList = document.querySelector('.un_list');

let shoppingArray;
const shoppingList = 'shoppingList';

function removedFromArray(li) {
  shoppingArray = shoppingArray.filter(array => {
    return li.classList[0] !== array.list;
  });
}

function deleBtn(event) {
  const li = event.target.parentNode;
  unList.removeChild(li);
  removedFromArray(li);
  saveList();
}

function paintList(getListObj) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('button');
  li.classList.add(getListObj.list, 'list');
  span.innerHTML = getListObj.list;
  button.classList.add('delete_btn');
  button.addEventListener('click', deleBtn);
  button.innerHTML = '🗑';
  li.append(span, button);
  unList.appendChild(li);
  li.scrollIntoView({ block: 'center' });
}

function saveList() {
  localStorage.setItem(shoppingList, JSON.stringify(shoppingArray));
}

function loadList() {
  shoppingArray = JSON.parse(localStorage.getItem(shoppingList)) || [];
}

function onHandleSubmit(event) {
  event.preventDefault();
  let inputValue = listInput.value;

  const getListObj = {
    list: inputValue,
  };

  if (unList.childElementCount > 20) {
    alert('고마해라마이 무읏따아이가');
    return;
  }

  if (inputValue) {
    paintList(getListObj);
    // unList.scrollBy(0, 100);
    shoppingArray.push(getListObj);
    saveList();
  }
  listInput.value = '';
}

function restoreList() {
  if (shoppingArray) {
    shoppingArray.forEach(shopping => {
      paintList(shopping);
      console.log(shopping);
    });
  }
}

function init() {
  loadList();
  restoreList();
  listForm.addEventListener('submit', event => onHandleSubmit(event));
}

init();
