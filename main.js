//JavaScript
//Arshdeep Singh
//referencing the ul defined in html document here
let ul = document.querySelector('ul');

//this is the main function in which all the elements including li, p, buttons chckboxes are defined here.
//I have also added classes to get them easily
//So after addition it also clears the input field making it user friendly
//ADDED THE PROPER DELETE FUNCTIONALITY AS WELL
function newItem() {
    let input = document.getElementById('inputfield').value;
    let li = document.createElement('li');
    let span = document.createElement('span');

    let delBtn = document.createElement('button');
    let chkbox = document.createElement('input');
    let p = document.createElement('p');
    li.setAttribute('id', 'foodlist');
    delBtn.innerHTML = 'Delete';
    span.className = 'remove';
    span.appendChild(delBtn)
    delBtn.setAttribute('class', 'delete');
    chkbox.setAttribute('type', 'checkbox');
    chkbox.setAttribute('class', 'tickbox');
    chkbox.onclick = styleText;
    chkbox.addEventListener('click', playSound);
    li.appendChild(chkbox);
    p.setAttribute('class', 'junk');
    p.innerHTML = input;
    li.appendChild(p);
    li.appendChild(span);
    ul.appendChild(li);
    document.getElementById('inputfield').value = '';

    let remove = document.getElementsByClassName("remove");
    let i;
    for (i = 0; i < remove.length; i++) {
      remove[i].onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";
        
      };
    }
}



//this button is used to add new list items
let addbtn = document.getElementById('addtask');
addbtn.addEventListener('click', newItem);



//INSTEAD DEFINED A NEW FUNCTIONALITY ON DELETE WHICH IS IN MAIN FUNTION
// function removeItem() {
//     let delBtnClick = document.getElementsByClassName('delete');
//     for (let j = 0; j < delBtnClick.length; j++) {
//         delBtnClick[j].addEventListener('click', function() {
//             let li = this.parentElement;
//             li.style.display = 'none'
//         });
//     }
// }

//BONUS QUESTION FOR THE SOUND
function playSound() {
    var myAudio = new Audio('https://www.freesoundslibrary.com/wp-content/uploads/2018/01/ding-sound-effect.mp3');
    myAudio.play();
}

//selecting the checkboxes and defininf the styling we need to have on the text in the next function
function textCheck() {
    var selectedText = document.getElementsByClassName('tickbox');
    for (let i = 0; i < selectedText.length; i++) {
        selectedText[i].addEventListener('click', styleText);
    }
}

//this function contains the styling part and on clicking the checkbox the list item-:
//GOES TO THE BOTTOM
//MAKES THE SOUND
//ADDS LINE THROUGH 
function styleText(e) {
    let clicked = e.target.parentElement;
    let stylingLi = e.target.nextElementSibling;
    stylingLi.classList.toggle('checked');
    ul.appendChild(clicked);
}


//Integration of WEATHER API using OPENWEATHER
let weatherField = document.getElementById('weather');
let submit = document.getElementById('submit')
let name = document.querySelector('.name');
let desc = document.getElementById('desc');
let temp = document.querySelector('.temp');

submit.addEventListener('click', function() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+weatherField.value+'&appid=5a9276bfd3a21a044a2251db564a92db')
        .then(response => response.json())
        .then(data => {
            let cityName = data['name'];
            let tempValue = data['main']['temp'];
            let description = data['weather'][0]['description'];

            name.innerHTML = cityName;
            temp.innerHTML = tempValue;
            desc.innerHTML = description;
        })
        .catch(err => alert('Incorrect city name..'))
})

//Integration of WEB NOTIFICATIONS API
function showNotification(){
    const notification = new Notification("New message from Arshdeep's TO-DO list", {
        body: 'Hey mate, I hope you are doing the things marked in your to-do list'
    });

    notification.addEventListener('click', function(e){
        window.location.href = 'https://georgiancollege.ca';
    })
}
if(Notification.permission === 'granted'){
    showNotification();
}
else if(Notification.permission !== 'denied'){
    Notification.requestPermission()
    .then(permission => {
        if(permission === 'granted'){
            showNotification();
        }else{
            alert('You will not see the notifications');
        }
    });
}
    