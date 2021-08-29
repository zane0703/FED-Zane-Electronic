
"use strict";
//word count
document.getElementById("message").addEventListener("keydown", function () {
   setTimeout(() => {
      if (this.value.length > 0) {
         document.getElementById("word").textContent = this.value.split(/\s+/).length;
      } else { document.getElementById("word").textContent = 0 }
   }, 1)
})
// The "onload" handler. Run after the page is fully loaded.
// Attach "onsubmit" handler
document.getElementById("theForm").onsubmit = validateForm;
// Attach "onclick" handler to "reset" button
document.getElementById("reset").onclick = clearDisplay;
// Set initial focus
document.getElementById("Firstnameinput").focus();

function validateForm() {
   let massage = [], Valid = true, foc;
   isAlphabetic("Firstnameinput", "Please enter your first name!");
   isAlphabetic("Lastnameinput", "Please enter your last name!");
   isValidEmail("emailinput", "Please enter a valid email!");
   isEmpty("phoneinput", "Please enter a valid phone number!");
   isSelected("Categoryinput", "Please make a selection!");
   isNotEmpty("message", "Place leave a message!");
   if (!Valid) { displaymassage() }
   return Valid

   // Return true if the input value contains only digits (at least one)
   function isNumeric(inputId, errorMsg) {
      var inputElement = document.getElementById(inputId);
      var inputValue = inputElement.value.trim();
      var isValid = (inputValue.search(/^[0-9]+$/) !== -1);
      showMessage(isValid, inputElement, errorMsg);
   }
   // Return true if the input value is not empty
   function isNotEmpty(inputId, errorMsg) {
      var inputElement = document.getElementById(inputId);
      var inputValue = inputElement.value.trim();
      var isValid = (inputValue.length !== 0);  // boolean
      showMessage(isValid, inputElement, errorMsg);
   }
   // Return true if the input value is empty
   function isEmpty(inputId, errorMsg) {
      var inputElement = document.getElementById(inputId);
      var inputValue = inputElement.value.trim();
      var isValid = (inputValue.length == 0);  // boolean
      if (isValid) {
         inputElement.classList.remove("border-danger");
         inputElement.classList.add("border-success");
      } else {
         isNumeric(inputId, errorMsg)
         isLengthMinMax(inputId, errorMsg, 8, 11)
      }
   }

   function displaymassage() {
      let AlartMsg = ""
      for (let i = -1; i < massage.length - 1;) {
         if (massage[i] !== massage[++i])
            AlartMsg += massage[i] + "\n"
      }
      navigator.vibrate(100)
      foc.focus()
      setTimeout(() => { alert(AlartMsg) }, 85)
   }

   function showMessage(isValid, inputElement, errorMsg) {

      if (!isValid) {

         massage.push(errorMsg)
         if (Valid) { foc = inputElement; Valid = false }
         // Change "class" of inputElement, so that CSS displays differently
         if (inputElement !== null) {
            inputElement.classList.add("border-danger");
            inputElement.classList.remove("border-success");
            // inputElement.focus();
         }
      } else {// Reset to normal display
         if (inputElement !== null) {
            inputElement.classList.remove("border-danger");
            inputElement.classList.add("border-success");

         }

      }

   }


   // Return true if the input value contains only letters (at least one)
   function isAlphabetic(inputId, errorMsg) {
      var inputElement = document.getElementById(inputId);
      var inputValue = inputElement.value.trim();
      var isValid = inputValue.match(/[a-zA-Z]+$/) !== null;


      showMessage(isValid, inputElement, errorMsg);
   }

   // Return true if the input length is between minLength and maxLength
   function isLengthMinMax(inputId, errorMsg, minLength, maxLength) {
      var inputElement = document.getElementById(inputId);
      var inputValue = inputElement.value.trim();
      var isValid = (inputValue.length >= minLength) && (inputValue.length <= maxLength);
      showMessage(isValid, inputElement, errorMsg);
   }

   // Return true if the input value is a valid email address
   // (For illustration only. Should use regexe in production.)
   function isValidEmail(inputId, errorMsg) {
      var inputElement = document.getElementById(inputId);
      var inputValue = inputElement.value;
      var atPos = inputValue.indexOf("@");
      var dotPos = inputValue.lastIndexOf(".");
      var isValid = (atPos > 0) && (dotPos > atPos + 1) && (inputValue.length > dotPos + 2);
      showMessage(isValid, inputElement, errorMsg);
   }

   // Return true if selection is made (not default of "") in <select> input
   function isSelected(inputId, errorMsg) {
      var inputElement = document.getElementById(inputId);
      var inputValue = inputElement.value;
      // You need to set the default value of <select>'s <option> to "".
      var isValid = inputValue !== "";
      showMessage(isValid, inputElement, errorMsg);
   }
}

// The "onclick" handler for the "reset" button to clear the display
function clearDisplay() {
   document.querySelectorAll(".border-danger").forEach(function (v) {
      v.classList.remove("border-danger")
   })
   document.querySelectorAll(".border-success").forEach(function (v) {
      v.classList.remove("border-success")
   })

   // Set initial focus
   document.getElementById("Firstnameinput").focus();
}