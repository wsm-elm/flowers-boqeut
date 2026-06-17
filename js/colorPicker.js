// Color picker (🎨) — lets the visitor recolor the envelope from a palette of
// purple shades. Builds the swatch list, handles selection, and toggles the panel.

const purpleShades = [
  { name: 'Iris',           colors: { main: '#6f42c1', light: '#8c63d6', lighter: '#a784e8', lightest: '#c7b3f5' } },
  { name: 'Plum',           colors: { main: '#8e4585', light: '#a8689f', lighter: '#c28abb', lightest: '#dfbfd9' } },
  { name: 'Grape',          colors: { main: '#5d3fd3', light: '#7d66e0', lighter: '#9c8dec', lightest: '#c0b6f7' } },
  { name: 'Violet Mist',    colors: { main: '#a29acb', light: '#b9b3dc', lighter: '#d2cdea', lightest: '#e5e0f5' } },
  { name: 'Royal Purple',   colors: { main: '#4b0082', light: '#69269b', lighter: '#8750b4', lightest: '#b389d3' } },
  { name: 'Lilac Smoke',    colors: { main: '#b8a9c9', light: '#d0c3dd', lighter: '#e3d9eb', lightest: '#f3edf7' } },
  { name: 'Moon Purple',    colors: { main: '#9a4dff', light: '#b57aff', lighter: '#d0aaff', lightest: '#e6d4ff' } },
  { name: 'Magenta Bloom',  colors: { main: '#c61aff', light: '#d657ff', lighter: '#e38aff', lightest: '#f0c4ff' } },
  { name: 'Dusty Lavender', colors: { main: '#a991ba', light: '#c0a9cf', lighter: '#d9c6e3', lightest: '#efe4f3' } },
];

const defaultColors = purpleShades[0].colors;

// Elements
const wrapper = document.querySelector('.wrapper');
const lidOne = document.querySelector('.lid.one');
const lidTwo = document.querySelector('.lid.two');
const envelope = document.querySelector('.envelope');
const colorToggle = document.getElementById('colorToggle');
const colorPanel = document.getElementById('colorPanel');
const colorOptions = document.getElementById('colorOptions');
const resetBtn = document.getElementById('resetBtn');

// Apply a palette to the envelope elements.
function applyColors(colors) {
  wrapper.style.backgroundColor = colors.main;
  lidOne.style.borderTopColor = colors.main;
  lidTwo.style.borderTopColor = colors.light;
  envelope.style.borderRightColor = colors.lighter;
  envelope.style.borderBottomColor = colors.lighter;
  envelope.style.borderLeftColor = colors.lightest;
}

// Build a swatch for every shade.
purpleShades.forEach((shade, index) => {
  const option = document.createElement('div');
  option.className = 'color-option';
  option.style.background = `linear-gradient(135deg, ${shade.colors.main}, ${shade.colors.light})`;
  option.dataset.index = index;
  option.title = shade.name;

  if (index === 0) option.classList.add('active');

  option.addEventListener('click', () => {
    document.querySelectorAll('.color-option').forEach((el) => el.classList.remove('active'));
    option.classList.add('active');
    applyColors(shade.colors);
  });

  colorOptions.appendChild(option);
});

// Toggle the panel open/closed.
colorToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  colorPanel.classList.toggle('active');
});

// Close the panel when clicking outside of it.
document.addEventListener('click', (e) => {
  if (!colorPanel.contains(e.target) && e.target !== colorToggle) {
    colorPanel.classList.remove('active');
  }
});

// Keep clicks inside the panel from bubbling up to the close-on-outside handler.
colorPanel.addEventListener('click', (e) => e.stopPropagation());

// Reset to the default shade.
resetBtn.addEventListener('click', () => {
  applyColors(defaultColors);
  document.querySelectorAll('.color-option').forEach((el, i) => {
    el.classList.toggle('active', i === 0);
  });
});
