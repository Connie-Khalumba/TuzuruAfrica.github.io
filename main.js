let currentIndex = 0;

        const slides = document.querySelectorAll('.slides img');
        const totalSlides = slides.length;

        function showSlide(index) {
            const slider = document.querySelector('.slides');
            slider.style.transform = `translateX(-${index * 100}%)`;
        }

        document.getElementById('prevBtn').addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalSlides - 1; // Loop to the last slide
            }
            showSlide(currentIndex);
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to the first slide
            }
            showSlide(currentIndex);
        });

        // Initialize the first slide
        showSlide(currentIndex);

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

setInterval(nextSlide, 3000);

/**
 * navbar toggle
 */

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
});

/**
 * toggle the navbar when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}
// Get all elements with the class name "view"
var buttons = document.querySelectorAll('.view');

// Loop through each button and add a click event listener
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    // Get the link associated with the button
    var link = this.getAttribute('data-link');

    // Redirect to the specified link
    window.location.href = link;
  });
});



