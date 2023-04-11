/* Resources used:
-w3schools "HTML DOM Element addEventListener()": for a refresher on listeners
-CSS Tricks "A Complete Guide to Dark Mode on the Web": to check if there was a more efficient way of implementing darkmode
-MDN "Window.localStorage": to learn about usage of localStorage
-MDN "Element: mouseover event": to verify how mouseover and its variants work
-MDN "Window.matchMedia" to learn about matchMedia

Code written is inspired by examples from these pages but is original and was written from scratch.
*/

//// first, we need to define which elements will change with darkmode

// all class names which have a different darkmode style
const class_names_to_toggle = ["navbar", "wrapper", "button-link", "headingless"]

// all tag names which have a different darkmode style
const tag_names_to_toggle = ["body", "main", "section", "footer"]

const darkmode_button = document.getElementById("darkmode"); // gets the Dark Mode button for later use

//// then, we need to check if we need to swap to dark mode upon page load
// we will be using localStorage for this

current_state = localStorage.getItem("current_state"); // gets the current state (null if user is visiting for the first time)

if (current_state == "dark") { // if user has set darkmode as their preference by clicking the button
    darkmodeHelper() // then swap to dark mode on pageload
} 
else if (window.matchMedia("(prefers-color-scheme: dark)").matches
         & current_state != "light") { // without a set preference, checks if the user's OS settings are configured to dark mode
    darkmodeHelper() // if so, swap to dark mode on pageload
}
// else stay in lightmode, but that's the default so no extra code is required


//// Adding a button listener to the darkmode button

darkmode_button.addEventListener("click", toggleLuminanceMode) // call toggling function upon clicking the darkmode button

//// Dark mode toggling function and helpers

function toggleLuminanceMode(){
    current_state = localStorage.getItem("current_state"); // get current state
    if (current_state == "dark") {lightmodeHelper()} // use current state to decide which helper to call
    else {darkmodeHelper()}
}

function darkmodeHelper(){
    document.getElementById("darkmode").firstChild.innerHTML = "Light mode"; // change the button text

    for (i = 0; i < class_names_to_toggle.length; i++) { // iterate through class_names_to_toggle
        to_toggle = document.getElementsByClassName(class_names_to_toggle[i]) // get all elements with the class
        for (j = 0; j < to_toggle.length; j++) { // iterate through all elements with the class
            to_toggle[j].classList.add("dark_mode") // add .dark_mode to that class
        }
    } // altogether, this function adds .dark_mode to all elements with classes in class_names_to_toggle

    for (i = 0; i < tag_names_to_toggle.length; i++) { // iterate through tag_names_to_toggle
        to_toggle = document.getElementsByTagName(tag_names_to_toggle[i]) // get all elements with the tag
        for (j = 0; j < to_toggle.length; j++) { // iterate through all elements with the tag
            to_toggle[j].classList.add("dark_mode") // add .dark_mode to that tag
        }
    } // altogether, this function adds .dark_mode to all elements with tags in tag_names_to_toggle

    localStorage.setItem("current_state", "dark"); // page is now in dark mode
}

function lightmodeHelper(){
    document.getElementById("darkmode").firstChild.innerHTML = "Dark mode"; // change the button text

    for (i = 0; i < class_names_to_toggle.length; i++) { // iterate through class_names_to_toggle
        to_toggle = document.getElementsByClassName(class_names_to_toggle[i]) // get all elements with the class
        for (j = 0; j < to_toggle.length; j++) { // iterate through all elements with the class
            to_toggle[j].classList.remove("dark_mode") // remove .dark_mode from that class
        }
    } // altogether, this function removes .dark_mode from all elements with classes in class_names_to_toggle

    for (i = 0; i < tag_names_to_toggle.length; i++) { // iterate through tag_names_to_toggle
        to_toggle = document.getElementsByTagName(tag_names_to_toggle[i]) // get all elements with the tag
        for (j = 0; j < to_toggle.length; j++) { // iterate through all elements with the tag
            to_toggle[j].classList.remove("dark_mode") // remove .dark_mode from that tag
        }
    } // altogether, this function removes .dark_mode from all elements with tags in tag_names_to_toggle

    localStorage.setItem("current_state", "light"); // page is now in light mode
}

//// Mobile button visibility upon Home hover
/* On lower screen widths, the background-color change on hover for navbar items is full-width on the page. When 'Home' is
hovered over, this obscures the 'Dark/Light mode' text. This can be fixed by changing the text color on mouseover. */

const home_link = document.getElementById("home_link"); // get home button
home_link.addEventListener("mouseenter", toggleLuminanceButtonColor);
home_link.addEventListener("mouseleave", toggleLuminanceButtonColor);

function toggleLuminanceButtonColor(){ // on mouseenter and mouseleave, the text flips color
    if (window.matchMedia("(max-width: 799px").matches) { // checks if viewport is mobile sized (if not, nothing happens)
        if (localStorage.getItem("current_state") == "dark"){ // checks if current state is dark
            darkmode_button.classList.toggle("dark_correction"); // correct by flipping the current color
        }
        else { // if current state is not dark, it's light
            darkmode_button.classList.toggle("light_correction"); // correct by flipping the current color
        }
    }
}