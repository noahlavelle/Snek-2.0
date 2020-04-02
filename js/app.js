let theme = getCookie('theme');
let particlesState = getCookie('particlesState');

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#89cff0"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 4,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 0,
        "duration": 2,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});


$.fn.toggleAttr = function (attr, attr1, attr2) {
  return this.each(function () {
    var self = $(this);
    if (self.attr(attr) == attr1)
      self.attr(attr, attr2);
    else
      self.attr(attr, attr1);
  });
};

function transition(pageFrom, pageTo) {
  $('#' + pageFrom).fadeOut(130, function () {
    $('#' + pageTo).fadeIn(130);
  });

}

function onload() {
  $('#options').hide();
  $('#patchnotes').hide();
  $('#singleplayer-options').hide();
  $('#game-container').hide();
  const theme = getCookie('theme');
  const particlesState = getCookie('particlesState');
  particlesTrigger(false);
  $('html').attr('data-theme', theme);
  updateParticles()
}

function particlesTrigger(focus) {
  if (particlesState == focus) {
    cancelRequestAnimFrame(pJSDom[0].pJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(pJSDom[0].pJS.fn.drawAnimFrame);
    pJSDom[0].pJS.fn.particlesEmpty();
    pJSDom[0].pJS.fn.canvasClear();
    particlesState = false;
    setCookie('particlesState', particlesState);
  } else {
    pJSDom[0].pJS.fn.vendors.start();
    particlesState = true;
    setCookie('particlesState', particlesState);
  }
}


function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;'
}

$("#theme-select").change(function () {
  const theme = ($('#theme-select').val());
  $('html').toggleAttr('data-theme', theme, "");
  setCookie('theme', theme);
  if (particlesState) {
    updateParticles()
  }
});

function updateParticles() {
  if (particlesState) {
    switch ($('html').attr("data-theme")) {
      case 'Light':
        pJSDom[0].pJS.particles.color.value = '#b19cd9'
        pJSDom[0].pJS.fn.particlesRefresh()
        break
      case 'Snek Dark':
        pJSDom[0].pJS.particles.color.value = '#89cff0'
        pJSDom[0].pJS.fn.particlesRefresh()
        break
      case 'OLED Dark':
        pJSDom[0].pJS.particles.color.value = '#666666'
        pJSDom[0].pJS.fn.particlesRefresh()
        break
      case 'Banana':
        pJSDom[0].pJS.particles.color.value = '#FFBD07'
        pJSDom[0].pJS.fn.particlesRefresh()
        break
    }
  }
}

let tablelength = $('#patchtable tr').length;
$('#totalpatch').html(tablelength - 2);

function createGame(mode) {
  switch (mode) {
    case "single":
      const startingLength = $('#opt-startinglength').val();
      const incrementalSpeed = ! document.getElementById("opt-incrementalspeed").checked
      const speed = $('#opt-speed').val();
      const tailCollision = $( "#tail-collision option:selected" ).text();
      const barriersKill = $( "#barriers-select option:selected" ).text();
      const gridSize = $('#opt-gridsize').val();
      const damageAmount = $('#opt-damage').val();
      const game = new Game(startingLength, incrementalSpeed, speed, tailCollision, barriersKill, gridSize, damageAmount);
    break
  }
}