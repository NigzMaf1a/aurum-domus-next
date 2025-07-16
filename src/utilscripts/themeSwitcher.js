// Array of themes with full-screen background image settings
const themes = [
  { id: 'Site', image: 'url(/aurum1.jpg)', color: 'rgba(30, 60, 90, 0.1)', label: 'Deep Blue' },
  { id: 'Mains', image: 'url(/aurum2.jpg)', color: 'rgba(30, 60, 90, 0.1)', label: 'Deep Blue' },
  { id: 'Remotz', image: 'url(/aurum3.jpg)', color: 'rgba(40, 80, 120, 0.1)', label: 'Ocean Blue' },
  { id: 'Tranz', image: 'url(/aurum4.jpg)', color: 'rgba(50, 100, 150, 0.1)', label: 'Sky Blue' },
  { id: 'Trapz', image: 'url(/aurum5.jpg)', color: 'rgba(60, 120, 180, 0.1)', label: 'Azure Blue' },
  { id: 'Chenj', image: 'url(/aurum6.jpg)', color: 'rgba(70, 140, 210, 0.1)', label: 'Cerulean Blue' },
  { id: 'Paton', image: 'url(/aurum7.jpg)', color: 'rgba(80, 160, 240, 0.1)', label: 'Electric Blue' },
  { id: 'Kepo', image: 'url(/aurum8.jpg)', color: 'rgba(90, 180, 255, 0.1)', label: 'Neon Blue' },
  { id: 'Mai', image: 'url(/aurum9.jpg)', color: 'rgba(100, 160, 230, 0.1)', label: 'Cyan Blue' },
  { id: 'Horror', image: 'url(/aurum10.jpg)', color: 'rgba(110, 140, 200, 0.1)', label: 'Indigo Blue' },
  { id: 'More1', image: 'url(/aurum11.jpg)', color: 'rgba(120, 130, 170, 0.1)', label: 'Stormy Blue' },
  { id: 'More2', image: 'url(/aurum12.jpg)', color: 'rgba(130, 120, 150, 0.1)', label: 'Steel Blue' }
];

let currentIndex = 0;

export function startThemeCycle() {
  const body = document.body;
  const sidebar = document.getElementById('sidebar');

  if (!body) return;

  // Set initial styles for smooth full-screen background handling
  body.style.backgroundRepeat = 'no-repeat';
  body.style.backgroundSize = 'cover';
  body.style.backgroundPosition = 'center';
  body.style.transition = 'background-image 1s ease-in-out';

  if (sidebar) {
    sidebar.style.backgroundRepeat = 'no-repeat';
    sidebar.style.backgroundSize = 'cover';
    sidebar.style.backgroundPosition = 'center';
    sidebar.style.transition = 'background-image 1s ease-in-out';
  }

  function updateTheme() {
    currentIndex = (currentIndex + 1) % themes.length;
    const { id, image, color } = themes[currentIndex];

    body.id = id;
    body.style.backgroundImage = `linear-gradient(${color}, ${color}), ${image}`;

    if (sidebar) {
      sidebar.style.backgroundImage = `linear-gradient(${color}, ${color}), ${image}`;
    }

    const topStrip = document.querySelector('.top-strip');
    if (topStrip) {
      topStrip.style.transition = 'background-color 1s ease-in-out';
      topStrip.style.backgroundColor = color;
    }
  }

  // Init first render
  updateTheme();

  // Cycle every 20 seconds
  setInterval(updateTheme, 20000);
}
