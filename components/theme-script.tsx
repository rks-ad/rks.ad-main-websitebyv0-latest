export function ThemeScript() {
  const themeScript = `
    (function() {
      const theme = localStorage.getItem('theme') || 'dark';
      const main = document.querySelector('main');
      
      if (theme === 'light') {
        main && main.setAttribute('data-theme', 'light');
      } else {
        main && main.setAttribute('data-theme', 'dark');
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  )
}
