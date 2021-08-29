"use strict";
var formData = location.search;
if (formData !== "") {
    document.write("<h1>Your form has been submitted</h1>");
    document.write("<p>You entered the following data:</p>");
    formData = formData.substring(1, formData.length);
    while (formData.indexOf("=") !== -1) {
        formData = formData.replace("=", "%20:%20");
    }
    formData = decodeURIComponent(formData);
    let formArray = formData.split("&");
    formArray.forEach(function(v){
        document.write("<p>" + v + "</p>");
    })
}