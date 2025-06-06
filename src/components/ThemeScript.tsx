export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var shouldBeDark = theme === 'dark' || (!theme && prefersDark);

              if (shouldBeDark) {
                document.documentElement.classList.add('dark');
                document.body.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
                document.body.classList.remove('dark');
              }
            } catch (e) {
              // Fallback for browsers that don't support localStorage or matchMedia
            }
          })();
        `,
      }}
    />
  );
}