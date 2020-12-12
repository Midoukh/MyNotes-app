//All the DOM item
const items = {
    enterBtn: document.querySelector('.front__enter__button'),
    dashboard: document.querySelector('.dashbord'),
    textEditor : document.querySelector('.textEditor'),
    front: document.querySelector('.front'),
    addNoteBtn: document.querySelector('.bi-plus-circle-fill'),
    textEditorTools: document.querySelectorAll('.textEditor__tools >*'),
    textarea: document.querySelector('#textarea'),
    blue: document.querySelector('[data-name=""]'),
    notesList: document.querySelector('.dashbord__notes'),
    noteListState: document.querySelector('.dashbord__notes h1'),
    noteTitle: document.querySelector('#title'),
    saveNoteBtn: document.querySelector('.textEditor__save'),
    loader: document.querySelector('.textEditor__loader'),
    errorSnackBar: document.querySelector('.textEditor__error'),
    viewNote: document.querySelector('.dashbord__view'),
    viewtitle: document.querySelector('.heads h2'),
    viewDate: document.querySelector('.heads h4'),
    viewContent: document.querySelector('.dashbord__view p'), 
    closeNoteBtn: document.querySelector('.dashbord__view button'),
    searchBar: document.querySelector('.dashbord__search__bar #search'),
    searchBtn: document.querySelector('.dashbord__search__bar button'),
    controlPagination: document.querySelector('.dashbord__pagination'),
    leftPage: document.querySelector('.dashbord__pagination div.left'),
    rightPage: document.querySelector('.dashbord__pagination div.right'),
    pageUI: document.querySelector('.dashbord__pagination h3')

}

//vars
const notes = [];
let noteTitlesArr = [];
const pageArrows = [items.leftPage, items.rightPage];
let currentPage = 1;

//storing the individual note
class Note {
    constructor(title, content, date, id){
        this.content = content;
        this.title = title;
        this.date = date;
        this.id = id;
    }
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Juin', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
//functions

function tempHideTabs(dash, text){
    dash.classList.add('--inactive')
    text.classList.add('--inactive')
}
function tempShow(tab){
    tab.classList.remove('--inactive')
}

function slideToLeft(tab){
    tab.classList.toggle('--slideLeft')
}
function slideToRight(tab){
    tab.classList.add('--slideRigth')
}
function hideFront(front){
    front.classList.add('--inactive')
}
function showDashboard(dash){
    dash.classList.add('--active')
}

//create notes

function createNote(){
    const rand = Math.floor(Math.random() * 5000);
    let id = '';
    id = rand
    const now = new Date()
    const date = days[now.getDay()] + '/' + months[now.getMonth()] + '/' + now.getFullYear();
    const newNote = new Note(items.noteTitle.value, items.textarea.innerText, date, id)
    
    notes.push(newNote)

    //store the note in localStrage so we can render it on page load
    localStorage.setItem(`MyNote${rand}`, JSON.stringify(newNote))
    console.log(newNote.content)
    renderNote(newNote.title, date, newNote.content, id)
}

function renderNote(title = 'First Note', date = 'Dec 2020', content, id){
    //set markup
    const markup = `
<li class="dashbord__notes__note" id="MyNote${id}" title="${title}">
  <div class="dashbord__notes__note__titles">
        <h2 class="dashbord__notes__note__titles__name">${title}</h2>
        <h4 class="dashbord__notes__note__titles__date">${date}</h4>
  </div>
<img class="dashbord__notes__note__image">

<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path class="bi bi-trash-fill" fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
  </svg>

  <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
  </svg>

  <i class="fas fa-eye"></i>
  <p class="content">${content}</p>


</li> 
    
    `
    items.notesList.insertAdjacentHTML('beforeend', markup)

    //hide the empty flag
    if (Array.from(items.notesList.children).length > 1){
        items.noteListState.classList.add('--inactive')
    }

    else if(Array.from(items.notesList.children).length === 0){
        items.noteListState.classList.remove('--inactive')
    }

}


function hideLoader(loader){
   loader.classList.remove('--showLoder')

}

function restoreTextEditor(){
    items.textarea.textContent = ''
    items.noteTitle.value = ''
}

//view the content of the note
function viewNote(e){
    let title = '', body = '', date = null
    const note = Array.from(e.target.parentElement.children)
    note.forEach(el => {
        if (el.classList.contains('dashbord__notes__note__titles')){
            Array.from(el.children).forEach(t => {
                if (t.classList.contains('dashbord__notes__note__titles__name')){
                    title = t.textContent;
                }
                else if (t.classList.contains('dashbord__notes__note__titles__date')){
                    date = t.textContent;
                }
            })
        }
        else if (el.classList.contains('content')){
            body = el.textContent;
        }

    })
    if (Array.from(items.notesList.children).length >= 1){
        //show note
        if (e.target.classList.contains('fa-eye')){
            items.viewNote.classList.add('--showNoteContent')
        }
    }
    renderNoteCard(title, date, body)
}

function renderNoteCard(title, date, body){
    items.viewtitle.textContent = title
    items.viewDate.textContent = date
    items.viewContent.textContent = body
}

function closeNote(e){
    e.target.parentElement.parentElement.classList.remove('--showNoteContent')
}

//delete note

function deleteNote(e){
    let noteKey =  e.target.parentElement.parentElement
    if (e.target.classList.contains('trash') || (e.target.tagName === 'svg' || e.target.tagName === 'path')){
        e.target.parentElement.parentElement.remove()
    }
    console.log(noteKey)
    deleteFromLocalStorage(noteKey)
}

function deleteFromLocalStorage(note){
    localStorage.removeItem(note.id)
}

//Search feature

function searchNotes(searchVal, notesList){
    //check if the note title match the value given in the search input
    //get all the note in one array
    noteTitlesArr  = Array.from(notesList.children)
    noteTitlesArr = noteTitlesArr.slice(1)
    searchVal = searchVal.toUpperCase()

    //check if a note title match the given search input
    noteTitlesArr.forEach(note => {
        
        if (note.title.toUpperCase().indexOf(searchVal) > -1){
            note.style.display = ''
        }
        else{    
            note.style.display = 'none'
        }
    })

}

//pagination

function changePage(e, page = 1, notePerPage = 4){
   //check for the number of existing notes
   noteTitlesArr  = Array.from(items.notesList.children)
   noteTitlesArr = noteTitlesArr.slice(1)

   let numberOfPages = noteTitlesArr.length/4

   const start = (page - 1)* notePerPage
   const end = page * notePerPage

   noteTitlesArr.slice(start, end)

   if (this.classList.contains('left')){
       while(currentPage > 1){
        currentPage--
       }
   }
   else if (this.classList.contains('right')){
       currentPage++
   }
   items.pageUI.textContent = currentPage

    console.log(this)

}

// function pagination(){
//     //
//     noteTitlesArr  = Array.from(notesList.children)
//     noteTitlesArr = noteTitlesArr.slice(1)



// }

//Event Listeners
//When load
window.addEventListener('load', () => {
    tempHideTabs(items.dashboard, items.textEditor)

    //an object that have all the content of our note to be rendered on page load
    let len = Object.values(localStorage).length
    const notes = []

    for (let i = 0; i < len; i++){
        let localNotes = JSON.parse(Object.values(localStorage)[i])
        notes.push(localNotes)
    }

    notes.forEach(note => {

        renderNote(note.title, note.date, note.content, note.id)
    })
    
})

//slide front page on click
items.enterBtn.addEventListener('click', () => {
    slideToLeft(items.front)
    setTimeout(() =>{
        hideFront(items.front)
        tempShow(items.dashboard)
        showDashboard(items.dashboard)
    }, 1100)
})
//adding a new note
items.addNoteBtn.addEventListener('click', (e) => {
    restoreTextEditor()

    slideToLeft(items.dashboard)
    setTimeout(() => {
        hideFront(items.dashboard)
        tempShow(items.textEditor)
        //when activate textEditor hide the dashboard
        if (items.textEditor.classList.contains('--active')){
            hideFront(items.dashboard)
            items.dashboard.classList.remove('--active')
            items.textEditor.classList.remove('--slideRigth')
        }
        showDashboard(items.textEditor)
    }, 1100)
    
})
//user feedback when clicking to use a certain tool
items.textEditorTools.forEach(tool => {
    tool.addEventListener('click', (e) => {
        let t = e.target
        tool.classList.toggle('--inableTool')
        if (t.dataset.name === 'bold'){
            document.execCommand('bold', false, '700');
        }
        if (t.dataset.name === 'italic'){
            document.execCommand('italic', false);
        }
        if (t.dataset.name === 'line'){
            document.execCommand('underline', false)
        }
        if (t.dataset.name === 'red'){
            document.execCommand('foreColor', false, '#ee5253');
        }
        if (t.dataset.name === 'blue'){
            document.execCommand('foreColor', false, '#5f27cd');
        }
        if (t.dataset.name === 'orange'){
            document.execCommand('foreColor', false, '#ff9f43');
        }
    })
    
})
items.saveNoteBtn.addEventListener('click', () => {
    if (items.noteTitle.value && items.textarea.textContent){
        //create and save a new note
    createNote()

    //hide text editor and show dashboard
   setTimeout(slideToRight, 1000, items.textEditor)
    items.loader.classList.add('--showLoder')
    setTimeout(() =>{
        hideFront(items.textEditor)
        tempShow(items.dashboard)
        slideToLeft(items.dashboard)
        hideLoader(items.loader)
    }, 1100)
    }
    else{
        items.errorSnackBar.classList.toggle('--showError')
    }
})

//show note
items.notesList.addEventListener('click', viewNote)

//delet note
items.notesList.addEventListener('click', deleteNote)


//close note
items.closeNoteBtn.addEventListener('click', (e) =>{
    setTimeout(closeNote, 1500, e)
})

//search for a particular note
items.searchBtn.addEventListener('click', () => {
    searchNotes(items.searchBar.value, items.notesList)

})

items.searchBar.addEventListener('input', (e) => {
    searchNotes(items.searchBar.value, items.notesList)
    
})

//pagination
pageArrows.forEach(arrow => arrow.addEventListener('click', changePage))
