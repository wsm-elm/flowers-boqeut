# Flowers Bouquet — A Letter

A small interactive "letter" web page: open an envelope to read a note, browse 3D
flower bouquets with a day/night toggle, recolor the envelope, and unwrap a
surprise gift box with fireworks. Built as a static site using
[`<model-viewer>`](https://modelviewer.dev/) for the 3D models.

## Running

It's a static site — no build step. Because it uses ES modules and loads `.glb`
models over HTTP, open it through a local web server (not `file://`):

```bash
# from the project root
python -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
index.html              Page markup and layout
css/
  style.css             All styles
js/
  main.js               Entry point — imports every feature module
  colorPicker.js        🎨 Envelope color palette
  letter.js             Envelope open/close + full letter overlay
  flowerViewer.js       💐 3D flower overlay, navigation, garden categories
  dayNight.js           ☀️/🌙 Day/night toggle (sun/moon swap, stars)
  countdown.js          Countdown timer
  giftBox.js            🎁 Gift box unwrap animation + reveal
  fireworks.js          Canvas fireworks engine (used by giftBox)
assets/
  models/               Active 3D models (.glb)
  env/                  Environment maps (.hdr)
archive/                Legacy / unused files, kept for reference
  salam.html            Earlier single-file version of the page
  backup/               Old index.html + style.css
  Birthday/             Separate, unrelated 2019 mini-project
  unused-models/        Models/HDRs not referenced by the current page
```

## How the JavaScript is organized

Each feature is a self-contained ES module that wires up its own DOM elements on
import. `main.js` simply imports them in order. The only cross-module dependency
is `giftBox.js` importing `startFireworks()` from `fireworks.js`.
