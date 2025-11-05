/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               Check Mobile Device
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const isMobile = () => {
  return !!(
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  );
};

const isMobile = () => {
  const userAgent = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|Windows Phone/i.test(userAgent);
};

*/

const isMobile = () => { 
  
    const userAgent = navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i;
    const isMobile = mobileRegex.test(userAgent);
  
    const isTouchDevice = 'ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch);  
    const isSmallScreen = window.innerWidth <= 1024; // Adjust the screen size threshold as needed
    const isLaptopWithTouchScreen = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    return isMobile || (isTouchDevice && (isSmallScreen || isLaptopWithTouchScreen));
  }
  


function isTouch() {
  if('ontouchstart' in window || navigator.msMaxTouchPoints){
      return true;
  }else{
      return false;
  }
}



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Map number x from range [a, b] to [c, d]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            Linear interpolation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const lerp = (a, b, n) => (1 - n) * a + n * b;
const clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num);

const MathUtils = {
  lerp: (a, b, n) => (1 - n) * a + n * b,
  distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            Gets the mouse position
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const getMousePos = (e) => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
  }
  return { x: posx, y: posy };
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           Generate Random Float
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const getRandomFloat = (min, max) =>
  (Math.random() * (max - min) + min).toFixed(2);


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           Call Full Screen
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const fullScreen = (invoker) => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (invoker.requestFullscreen) {
      invoker.requestFullscreen();
    } else if (invoker.webkitRequestFullscreen) {
      invoker.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
             document.queryselector()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

let select = (e) => document.querySelector(e);

const getDirection = () => {
  let windowWidth = window.innerWidth;
  let direction = window.innerWidth <= 760 ? "horizontal" : "vertical";
  return direction;
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                           My Signature
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function signature() {
  const sign = [
    // "background-image: url(../img/icon.svg#dpk)",
    "background-repeat: no-repeat",
    "background-size: 3em",
    "background-position: 85% center",
    "margin: 2em 0",
    "font-size: 12px",
    "background-color: #000",
    "color: white",
    "padding: 1.5em 5em 1.5em 5em",
  ].join(";");
  console.clear();
  console.info("%c Crafted by Đpk 🤍 ", sign);
  // console.log(`
  //              †иɐ⅄нsnĐ  ʎꓭ   pǝpoϽ   sᴉ   ǝʇᴉS  sᴉɥꓕ
  //                    🤍  https://dushyant.dev/ 🤍
  //     `);
}





function getOffset(el) {
  const box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft,
    height: box.height,
    width: box.width
  };
}


export {
  isMobile,
  isTouch,
  map,
  lerp,
  clamp,
  MathUtils,
  getMousePos,
  getRandomFloat,
  fullScreen,
  select,
  signature,
  getDirection,
  getOffset
};
