// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')){
    themeIcon.src = 'assets/moon.svg';
  } else {
    themeIcon.src = 'assets/sun.svg';
  }
});
