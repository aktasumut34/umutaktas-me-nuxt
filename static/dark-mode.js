if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  window._MODE = 'dark'
  document.documentElement.classList.add('dark')
} else {
  window._MODE = 'light'
  document.documentElement.classList.remove('dark')
}
