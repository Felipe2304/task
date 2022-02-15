const createTagElement = (tag, className, text) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.textContent = text;

  return element;
};

const getElement = (element) => {
  return document.querySelector(element);
};

const $body = getElement("body");
const $container = createTagElement("section", "container");

const $header = createTagElement("header", "header");
const $iconTask = createTagElement("img", "icon-task");
$iconTask.setAttribute("src", "../img/iconTask.svg");
const $title = createTagElement("h1", "title", "Tasks");

$header.appendChild($iconTask);
$header.appendChild($title);
$container.appendChild($header); 

const $form = createTagElement("form", "form");
const $searchBar = createTagElement('input','search-bar')
$searchBar.setAttribute('typed','text')
$searchBar.setAttribute('placeholder','Digite uma tarefa')
const $buttonAdd = createTagElement('button','button-add','add')

$form.appendChild($searchBar)
$form.appendChild($buttonAdd)
$container.appendChild($form);  

const $taskContainer = createTagElement("section", "task-container"); 

const $infoBar = createTagElement("div", "info-bar")

const $subTitle = createTagElement('span','sub-title','todas tarefas') 
const $list = createTagElement("div", "list"); 

$taskContainer.appendChild($infoBar)
$taskContainer.appendChild($subTitle)
$taskContainer.appendChild($list);
$container.appendChild($taskContainer);

const $homeScreen = createTagElement('div','home-screen')
const $imageAddTask = createTagElement('img','image-add-task')
$imageAddTask.setAttribute('src',"../img/addTask.svg")
const $infoText = createTagElement('p','info-text','Não há tarefas cadastradas ainda')
const $registerTasksButton = createTagElement('button','register-button','Cadastrar uma tarefa agora ')

$homeScreen.appendChild($imageAddTask)
$homeScreen.appendChild($infoText)
$homeScreen.appendChild($registerTasksButton)
$list.appendChild($homeScreen)

$body.appendChild($container);

$registerTasksButton.addEventListener('click', ()=> $searchBar.focus() )


const $boxConclued = createTagElement('div' , 'box-conclued') 
const $concluedText = createTagElement('span','conclued-text','Concluídas')
const $taskQuantitiesText = createTagElement('span','task-quantiti-text')
const teste1 = createTagElement('span' , 'teste1')
const teste2 = createTagElement('span' , 'teste2')
const $progressBar = createTagElement('div','progress-bar')
const $progress = createTagElement('div','progress')

$boxConclued.appendChild($concluedText)
$boxConclued.appendChild($taskQuantitiesText)
$progressBar.appendChild($progress)

const sendTask = (event)=>{
  
  event.preventDefault()
  createTaskItem($searchBar.value)
  $form.reset()
}

$buttonAdd.addEventListener('click', sendTask)

const userProgress = (quantitiItem, quantitiConclued)=>{
  console.log(quantitiItem,quantitiConclued)
  
  const calcProgress = Math.round((100 / quantitiItem) * quantitiConclued) 
  $progress.style.width = `${calcProgress}%`
}

const createTaskItem = (searchBarValue)=>{
  
  const $taskItem = createTagElement('div','task-item') 
  const $iconDelet = createTagElement('img','delet-icon')
  $iconDelet.setAttribute('src',"../img/delete_icon.svg")
  const taskText = createTagElement('p','task-text',`${searchBarValue}`)
  const $concluedIcon = createTagElement('img','conclued-icon')
  $concluedIcon.setAttribute('src','../img/completed_icon.svg')
  
  if(searchBarValue.length > 0){
    
    $taskItem.appendChild($iconDelet)
    $taskItem.appendChild(taskText)
    $list.appendChild($taskItem)
  }
  const quantitiItem = document.querySelectorAll('.task-item').length
  const quantitiItemCoclued = document.querySelectorAll('.conclued-icon').length
  
  userProgress( quantitiItem)
  invertScreens(quantitiItem,quantitiItemCoclued)
  concluedTask($taskItem, $concluedIcon)
  removetaskItem($iconDelet,$taskItem,quantitiItemCoclued)
  
} 


const removetaskItem = ($iconDelet,$taskItem , quantitiItemCoclued )=>{
  
  $iconDelet.addEventListener('click', ()=> {
    
    const quantitiItens = document.querySelectorAll('.task-item').length-1
    $taskItem.remove()
    removeListTasks(quantitiItens)
    invertScreens(quantitiItens,quantitiItemCoclued)
    
  } )
  
}

const invertScreens = (quantitiItem , conclued)=>{

  if(quantitiItem > 0) {

    $homeScreen.classList.add('hide')
    $infoBar.appendChild($boxConclued)
    $infoBar.appendChild($progressBar)
    $taskQuantitiesText.textContent = `${conclued} / ${quantitiItem}` 
  }
  
}

const removeListTasks = (quantitiItem)=>{
  
  if(quantitiItem === 0 ){
    
    $homeScreen.classList.remove('hide')
    $infoBar.removeChild($boxConclued)
    $infoBar.removeChild($progressBar)
    
  }
}

const concluedTask = ($taskItem , $concluedIcon )=>{
  
  let clicked = false
  
  $taskItem.addEventListener('click', ()=> { 
    
    if(!clicked) $taskItem.appendChild($concluedIcon) 
    if(clicked) $taskItem.removeChild($concluedIcon)
    clicked = !clicked
    
    const quantitiConclued = document.querySelectorAll('.conclued-icon').length 
    const quantitiItem = document.querySelectorAll('.task-item').length 
    
    $taskQuantitiesText.textContent = `${quantitiConclued} / ${quantitiItem}` 
    userProgress( quantitiItem , quantitiConclued)
    
  })
  
}


