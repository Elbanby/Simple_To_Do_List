function Reminder() {
  //Creates a Reminder Object
  let reminderObj = {};

  let arrayOfObj = [];

  reminderObj.id = "ul" + (objCounter + 1);

  //Add num inputs property to reminder Object
  reminderObj.numInputs = 5;

  reminderObj.dataContainer = [];


  reminderObj.doneUndone = function(e) {
    let input = e.target.nextSibling;
    if (input.getAttribute("class") === "done") {
      input.setAttribute("class", "undone");
      input.previousSibling.checked = false;
    } else {
      input.setAttribute("class", "done");
    }
  };

  //A function to delete the reminder dom elemnt
  reminderObj.delete = function() {
    document.getElementById(reminderObj.id).remove();
  };



  reminderObj.getLastElement = function() {
    let ul = document.getElementById(reminderObj.id);
    let ulChildren = ul.getElementsByTagName("input");
    let returnedInput = "";

    for (let i = 0; i < ulChildren.length; i++) {
      if (ulChildren[i].getAttribute("class") === "inputFields") {
        returnedInput = ulChildren[ulChildren.length - 1];
        break;
      }
    }
    return returnedInput;
  };

  reminderObj.addInput = function() {

    //Get the last elemnt before adding a new one
    let rmEvent = reminderObj.getLastElement(reminderObj.id);
    //Remove the listners so that we only have  a listner on the last one
    rmEvent.onclick = false;
    rmEvent.onfocus = false;

    //Then get the Ul needed to append an input to it.
    let ul = document.getElementById(reminderObj.id);

    //Create an input tag
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    //The class associated with the Display *** bootstrab
    input.setAttribute("class", "inputFields");
    //Then add listner to the newly created input field
    input.onfocus = reminderObj.addInput;
    input.onclick = reminderObj.addInput;



    let inputid = "" + objCounter + "obj" + reminderObj.numInputs;
    input.setAttribute("id", inputid);

    //Creates a check box
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkBox");
    checkBox.onclick = reminderObj.doneUndone;

    //Add a line break
    let lineBr = document.createElement("br");

    //Append the check box to the ul
    ul.appendChild(checkBox);
    //Append the input field to the ul
    ul.appendChild(input);
    //Append the line break to the ul
    ul.appendChild(lineBr);
  };



  reminderObj.storeData = function() {
    let allInputs = document.getElementById(reminderObj.id).getElementsByTagName("input");

    for (let i = 0; i < allInputs.length; i++) {
      if ((allInputs[i].getAttribute("class") === "inputFields" || allInputs[i].getAttribute("class") === "reminderTitle") &&
        (allInputs[i].value !== "" || allInputs[i].value !== " ")
      ) {
        console.log(allInputs[i].value);
      }
    }
  };

  reminderObj.getData = function() {
    return reminderObj.dataContainer
  };


  //Function to create initial reminder template IEFE
  reminderObj.createDomeElement = (function() {
    //Locate the dom elemnt required
    let allReminders = document.getElementById("AllReminders");
    let ul = document.createElement("ul");
    ul.setAttribute("id", reminderObj.id);

    //Creates the X button
    let deleteBtn = document.createElement("input");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("value", "X");
    deleteBtn.setAttribute("class", "deleteReminder");
    //The onclick funciton to delete the reminder
    deleteBtn.onclick = reminderObj.delete;

    //Sets the input field for the Title
    let reminderTitle = document.createElement("input");
    reminderTitle.setAttribute("placeholder", "Set title");
    //Here is the class associated with the reminder header****Can use bootstrab
    reminderTitle.setAttribute("class", "reminderTitle");
    let titleId = "title" + (objCounter + 1);
    reminderTitle.setAttribute("id", titleId);


    //Append everything to the ul tag
    ul.appendChild(deleteBtn);
    ul.appendChild(reminderTitle);


    //Creating the initial input fields
    for (let i = 0; i < reminderObj.numInputs; i++) {
      //First creating a line break tag
      let lineBr = document.createElement("br");
      //Create a String called input and concat with i to be used as a variable
      let inputName = "input" + i;
      //For each new input name create an input tag
      inputName = document.createElement("input");
      inputName.setAttribute("type", "text");
      //Here is the class associated with the input field****Can use bootstrab
      inputName.setAttribute("class", "inputFields");
      //Creating a unique id for each input tag (Not sure if needed yet)
      let inputId = "" + (objCounter + 1) + "obj" + i;
      inputName.setAttribute("id", inputId);
      //Create a chekbox tag using a new String name on every iteration
      let checkBox = "checkBox" + i;
      checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkBox");
      //Here is the class associated with the check box****Can use bootstrab
      checkBox.setAttribute("class", "checkBox");
      checkBox.onclick = reminderObj.doneUndone;

      //Append the check box to UL
      ul.appendChild(checkBox);
      //Append the inputfields to the UL
      ul.appendChild(inputName);
      //Append the line break to seprate the list vertically
      ul.appendChild(lineBr);
    }

    //Append the ul created to the location specified for the ul tags
    allReminders.appendChild(ul);

    //Add listner to the latest input. This way user has limtless reminder
    let lastElement = reminderObj.getLastElement();
    lastElement.onclick = reminderObj.addInput;
    lastElement.onfocus = reminderObj.addInput;
  }());

  return reminderObj;
}




var objCounter = 0;

window.onload = function() {
  let arrayOfObj = [];

  var btn = document.getElementById("addReminder");

  btn.onclick = function() {
    //Create a new reminder object
    var reminder = new Reminder();
    //Increment the object counter
    objCounter += 1;
    arrayOfObj.push(reminder);
    //module.exports.reminderObject = arrayOfObj;
  }


}
