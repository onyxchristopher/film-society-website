//// carousel transition function is loosely adapted from w3schools' "How To Create a Slideshow" guide
/* animated transitions are inspired by w3schools, but used differently: their carousel was an instant transition followed
by an animation, but here, we have a slow transition using animations */

slideIndex = 0 // iterator variable
const image_list = document.getElementsByClassName("carousel-image"); // get all the images in our carousel
setTimeout(imageTransition, 1500) // on page load, wait only 1.5s before starting image transition

function imageTransition(){
    image_list[slideIndex].style.animation = "fade 1s linear 0s 1 normal forwards"; // fade away current image
    slideIndex++ // increment slide index
    if (slideIndex == image_list.length) { // if slide index is incremented beyond the length of image_list
        slideIndex = 0; // then reset it back to 0 (this happens during the transition from last to first image)
    }
    image_list[slideIndex].style.animation = "unfade 1s linear 0s 1 normal forwards"; // unfade (fade in) next image
    setTimeout(imageTransition, 3000); // wait 3s before transitioning again
}

/* note that the carousel images' CSS is set so that the opacity of the first image is 1 on pageload, while all others
have an opacity of 0; this function overrides that with the animations */