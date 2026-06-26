export function ThemeScript() {
  const themeScript = `
    (function() {
      const theme = localStorage.getItem('theme') || 'dark';
      const main = document.querySelector('main');
      const html = document.documentElement;
      
      if (theme === 'light') {
        html.style.backgroundColor = 'white';
        html.style.color = '#1e293b';
        document.body.style.backgroundColor = 'white';
        document.body.style.color = '#1e293b';
        if (main) {
          main.style.backgroundColor = 'white';
          main.style.color = '#1e293b';
          main.setAttribute('data-theme', 'light');
        }
      } else {
        html.style.backgroundColor = '#0f172a';
        html.style.color = 'white';
        document.body.style.backgroundColor = '#0f172a';
        document.body.style.color = 'white';
        if (main) {
          main.style.backgroundColor = '#0f172a';
          main.style.color = 'white';
          main.setAttribute('data-theme', 'dark');
        }
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
