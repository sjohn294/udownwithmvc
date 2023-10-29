document.addEventListener("DOMContentLoaded", function() {
    // Functionality to run when the DOM is fully loaded

    // Example: Alert when clicking a button with the id "myButton"
    var myButton = document.getElementById("myButton");
    if (myButton) {
        myButton.addEventListener("click", function() {
            alert("Button was clicked!");
        });
    }
});
