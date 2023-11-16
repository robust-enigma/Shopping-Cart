import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://playground-109ee-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app= initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database,"shopping list")
const inputFieldEl= document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

function playMusic()
        {
            let audio= new Audio("Shin-Chan-Title.mp3");
            audio.play();
        }
//this when we click the button
addButtonEl.addEventListener("click",function(){

    let inputValue = inputFieldEl.value;

    if(inputValue == "Chocochips")
    {
        playMusic();
    }
    push(shoppingListInDB,inputValue)
    clearInputFieldEl();

    
    
   
    

})


onValue(shoppingListInDB,function(snapshot){


    if(snapshot.exists())
    {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl();
    
        for(let i=0;i<itemsArray.length;i++)
        {
            let currentItem=itemsArray[i];
    
            let currentItemID= currentItem[0];
            let currentItemValue= currentItem[1];
            
            appendItemToShoppingListEl(currentItem);
        }
    }
    else
    {
        shoppingListEl.innerHTML= "No items here🙂"
    }

   

})

function clearShoppingListEl()
{
    shoppingListEl.innerHTML=""
}
function clearInputFieldEl(){
    inputFieldEl.value="";
}



function appendItemToShoppingListEl(item){
    //shoppingListEl.innerHTML+= `<li>${itemValue}</li>`
    let itemID = item[0];
    let itemValue=item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

newEl.addEventListener("click",function(){
    let exactlocationOfItemInDB = ref(database, `shopping list/${itemID}`)
    remove(exactlocationOfItemInDB)
    

})

shoppingListEl.append(newEl);
    
}