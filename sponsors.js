// Original logo files and measured artwork bounds: [left, top, width, height].
// Crop in the viewport so original artwork remains intact. See assets/sponsors/sources.json.
(() => {
  const sponsors = [
    {
      "name": "Old Friends",
      "url": null,
      "src": "assets/sponsors/fireside-poster-original.png",
      "width": 1248,
      "height": 702,
      "bounds": [41, 100, 130, 112]
    },
    {
      "name": "E&L Team",
      "url": "https://eandlteam.com/",
      "src": "assets/sponsors/el-team.png",
      "width": 1202,
      "height": 1202,
      "bounds": [0, 0, 1202, 1202]
    },
    {
      "name": "The Goddard School",
      "url": "https://www.goddardschool.com/schools/co/louisville/louisville",
      "src": "assets/sponsors/goddard-school.svg",
      "width": 270,
      "height": 26,
      "bounds": [0, 0, 270, 26],
      "maxWidth": 264
    },
    {
      "name": "Got Game Sports",
      "url": "https://gotgamecamp.com/colorado-programs-birthday-parties-and-events/",
      "src": "assets/sponsors/got-game.png",
      "width": 864,
      "height": 579,
      "bounds": [66, 51, 760, 489]
    },
    {
      "name": "MC Homes",
      "url": "https://www.mchomes.co/",
      "src": "assets/sponsors/mc-homes.webp",
      "width": 1500,
      "height": 1807,
      "bounds": [57, 48, 1387, 1721]
    },
    {
      "name": "Ascend Orthodontics",
      "url": "https://www.ascend-orthodontics.com/",
      "src": "assets/sponsors/ascend-orthodontics.png",
      "width": 1912,
      "height": 2017,
      "bounds": [77, 81, 1764, 1893]
    },
    {
      "name": "OptiMindHealth",
      "url": "https://www.optimindhealth.com/",
      "src": "assets/sponsors/optimindhealth.png",
      "width": 520,
      "height": 402,
      "bounds": [11, 25, 498, 345]
    },
    {
      "name": "Paul’s Coffee & Tea",
      "url": "https://www.paulscoffeeandtea.com/",
      "src": "assets/sponsors/pauls-coffee.png",
      "width": 640,
      "height": 400,
      "bounds": [27, 89, 599, 223]
    },
    {
      "name": "The Louisville Underground",
      "url": "https://www.thelouisvilleunderground.com/",
      "src": "assets/sponsors/louisville-underground.png",
      "width": 6784,
      "height": 2400,
      "bounds": [80, 82, 6636, 2300]
    },
    {
      "name": "Art Major",
      "url": "https://artmajorstudio.com/louisville-colorado/",
      "src": "assets/sponsors/art-major.png",
      "width": 567,
      "height": 372,
      "bounds": [0, 0, 567, 372]
    },
    {
      "name": "The Singing Cook",
      "url": "https://www.singingcookstore.com/",
      "src": "assets/sponsors/singing-cook.jpg",
      "width": 2479,
      "height": 1058,
      "bounds": [36, 33, 2407, 992]
    },
    {
      "name": "Relish Food Hall / Pickleball",
      "url": "https://www.visitrelish.com/",
      "src": "assets/sponsors/relish.png",
      "width": 1120,
      "height": 451,
      "bounds": [0, 0, 1120, 451]
    }
  ];
  const section = document.createElement('section');
  section.className = 'fr-sponsors';
  section.setAttribute('aria-labelledby', 'fr-sponsor-title');
  section.innerHTML = '<div class="fr-section-top"><h2 id="fr-sponsor-title">Thank you for supporting Fireside!</h2><a class="fr-secondary fr-desktop-section-action" href="#fundraising/sponsorship">Become a sponsor</a></div><div class="fr-sponsor-window"><div class="fr-sponsor-track"></div></div><div class="fr-mobile-section-action"><a class="fr-secondary" href="#fundraising/sponsorship">Become a sponsor</a></div>';
  const group = document.createElement('ul');
  group.className = 'fr-sponsor-group';
  sponsors.forEach(({name, url, src, width, height, bounds, maxWidth = 184}) => {
    const [x, y, cropWidth, cropHeight] = bounds;
    const scale = Math.min(maxWidth / cropWidth, 88 / cropHeight);
    const item = document.createElement('li');
    const logo = document.createElement('span');
    logo.className = 'fr-sponsor-logo';
    Object.assign(logo.style, {
      width: `${cropWidth * scale}px`,
      aspectRatio: `${cropWidth} / ${cropHeight}`
    });
    const image = document.createElement('img');
    image.src = src;
    image.alt = name;
    image.width = width;
    image.height = height;
    image.decoding = 'async';
    Object.assign(image.style, {
      width: `${width / cropWidth * 100}%`,
      height: `${height / cropHeight * 100}%`,
      left: `${-x / cropWidth * 100}%`,
      top: `${-y / cropHeight * 100}%`
    });
    logo.append(image);
    if (url) {
      const link = document.createElement('a');
      link.className = 'fr-sponsor-link';
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.append(logo);
      item.append(link);
    } else {
      item.append(logo);
    }
    group.append(item);
  });
  const duplicate = group.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  duplicate.querySelectorAll('a').forEach(link => { link.tabIndex = -1; });
  section.querySelector('.fr-sponsor-track').append(group, duplicate);
  document.getElementById('fr-home').append(section);
})();
