document.addEventListener('DOMContentLoaded', () => {
  // start with a function "setupSlider" to manage the sliders on the website
  function setupSlider(sliderSelector, slidesSelector, prevBtnSelector, nextBtnSelector) {
    const slider = document.querySelector(sliderSelector);
    if (!slider) return;

    const slidesContainer = slider.querySelector(slidesSelector);
    const slides = slidesContainer.children;
    const prevBtn = slider.querySelector(prevBtnSelector);
    const nextBtn = slider.querySelector(nextBtnSelector);

    let slideIndex = 0;

    // Calculate how many slides fit in the container at current width, this prevent from sliding too far and keeps it within the visibility of the last image.
    function getSlidesPerView() {
      const slideStyle = getComputedStyle(slides[0]);
      const slideWidth = slides[0].offsetWidth + parseFloat(slideStyle.marginLeft) + parseFloat(slideStyle.marginRight);
      return Math.floor(slider.offsetWidth / slideWidth);
    }

    function updateSliderPosition() {
      const slideStyle = getComputedStyle(slides[0]);
      const slideWidth = slides[0].offsetWidth + parseFloat(slideStyle.marginLeft) + parseFloat(slideStyle.marginRight);
      const slidesPerView = getSlidesPerView();

      // Clamp "slideIndex" so it does not scroll beyond available slides making it symmetrical and visually pleasing
      const maxIndex = slides.length - slidesPerView;
      if (slideIndex > maxIndex) slideIndex = maxIndex < 0 ? 0 : maxIndex;
      if (slideIndex < 0) slideIndex = 0;

      const transformX = -(slideWidth * slideIndex);
      slidesContainer.style.transform = `translateX(${transformX}px)`;
    }

    if (prevBtn && prevBtn.offsetParent !== null) {
      prevBtn.addEventListener('click', () => {
        slideIndex--;
        updateSliderPosition();
      });
    }

    if (nextBtn && nextBtn.offsetParent !== null) {
      nextBtn.addEventListener('click', () => {
        slideIndex++;
        updateSliderPosition();
      });
    }

    // Update on window resize
    window.addEventListener('resize', () => {
      updateSliderPosition();
    });

    // Initialize position
    updateSliderPosition();
  }

  // code naten para i-initialize both sliders using their classes
  setupSlider('.slider', '.slides', '.prev', '.next');
  setupSlider('.slider2', '.slides2', '.prev2', '.next2');
 
  // code for the theme changer 
  const toggleButton = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  // Apply the saved theme on load
  if (currentTheme === "light") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.add("dark-theme");
  }

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");

    // we do this code to save the current theme that you chose/toggle onto
    const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("theme", theme);
  });
});
