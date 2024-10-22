const navDialog = document.getElementById('nav-dialog');
function handleMenu() {
  navDialog.classList.toggle('hidden');
}


// scrolling transition when click on nav-links

document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent the default anchor click behavior

      // Close the menu if it's open
      if (!navDialog.classList.contains('hidden')) {
        handleMenu();
    }

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth' // Enable smooth scrolling
          });
      }
  });
});


const initialTranslateLTR = -48 * 4;
const initialTranslateRTL = -8 * 4;



function setupIntersectionObserver(element, isLTR, speed) {
  const intersectionCallback = (entries) => {
    const isIntersecting = entries[0].isIntersecting;
    if (isIntersecting) {
      document.addEventListener('scroll', scrollHandler);
    } else {
      document.removeEventListener('scroll', scrollHandler);
    }
  };
  const intersectionObserver = new IntersectionObserver(intersectionCallback);

  intersectionObserver.observe(element);

  function scrollHandler() {
    const translateX = (window.innerHeight - element.getBoundingClientRect().top) * speed;
    let totalTranslate = 0;
    if (isLTR) {
      totalTranslate = translateX + initialTranslateLTR;

    } else {

      totalTranslate = -(translateX + initialTranslateRTL);

    }
    element.style.transform = `translateX(${totalTranslate}px)`;
  }
}

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const line4 = document.getElementById('line4');


setupIntersectionObserver(line1, true, 0.15);
setupIntersectionObserver(line2, false, 0.15);
setupIntersectionObserver(line3, true, 0.15);
setupIntersectionObserver(line4, true, 0.6);

const dtElements = document.querySelectorAll('dt');
dtElements.forEach(element => {
  element.addEventListener('click', () => {
    const ddId = element.getAttribute('aria-controls');
    const ddElement = document.getElementById(ddId);
    const dtarrowIcon = element.querySelectorAll('i')[0];

    ddElement.classList.toggle('hidden');
    dtarrowIcon.classList.toggle('-rotate-180');
  })
})