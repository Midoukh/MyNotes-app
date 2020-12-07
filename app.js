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
    noteListState: document.querySelector('.dashbord__notes h1')
}

//vars
const notes = []

//functions

function tempHideTabs(dash, text){
    dash.classList.add('--inactive')
    text.classList.add('--inactive')
}
function tempShow(tab){
    tab.classList.remove('--inactive')
}

function slideToLeft(tab){
    tab.classList.add('--slideLeft')
}
function hideFront(front){
    front.classList.add('--inactive')
}
function showDashboard(dash){
    dash.classList.add('--active')
}
//text editor tools
// function format(command, value) {
//     document.execCommand(command, false, value);
// }
function format(command, value) {
    document.execCommand(command, false, value)
}
function choseColor(){
    if (blue){
    }
}


//create notes
function createNote(title){
    //set markup
    const markup = `
<li class="dashbord__notes__note">
  <div class="dashbord__notes__note__titles">
        <h2 class="dashbord__notes__note__titles__name">First Note</h2>
        <h4 class="dashbord__notes__note__titles__date">Dec 2020</h4>
  </div>
<img class="dashbord__notes__note__image">

<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
  </svg>

  <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
  </svg>

</li> 
    
    `
    items.notesList.insertAdjacentHTML('beforeend', markup)

    //hide the empty flag
    if (Array.from(items.notesList.children).length > 1){
        items.noteListState.classList.add('--inactive')
    }

    else if(Array.from(items.notesList.children).length <= 1){
        items.noteListState.classList.remove('--inactive')
    }

}
createNote()
//Event Listeners
//When load
window.addEventListener('load', () => {
    tempHideTabs(items.dashboard, items.textEditor)
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
    slideToLeft(items.dashboard)
    setTimeout(() => {
        hideFront(items.dashboard)
        tempShow(items.textEditor)
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

