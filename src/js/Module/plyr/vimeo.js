import { isMobile, select } from "../Helper";

import "./vimeo.scss";
import Player from "@vimeo/player";

var vid1;


var isDom1Clicked = false; // STATE
const dom1to3 = select(".dom-1-3");


function playPause(vid, control) {
  vid
    .getPaused()
    .then(function (paused) {
      if (paused) {
        control.className = "pause";
        vid.play();
      } else {
        control.className = "play";
        vid.pause();
      }
    })
    .catch(function (error) {
      console.log("unable to pause");
    });
}

function getTitle(vid) { 
  vid.getVideoTitle().then(function (title) {
      return title;
    })
    .catch(function (error) {
      console.log("error while fetching title");
    });  
}


function DomIntro(intoEle){
  console.log("intro reached");
  intoEle.classList.add("active")
  setTimeout(() => {
    intoEle.classList.remove("active")
  }, 3000);
}


function domEvent(vid, seek) {
  isDom1Clicked = true;
  dom1to3.classList.remove("active");
  vid.setCurrentTime(seek);
}




function seekBar(vid,sldr,sec,min,dur) {
 
  vid.on("play", function (data) {
    dur.innerHTML =  sldr.max = parseInt(data.duration);
  });

  vid.on("timeupdate", function (data) {
    let progress = data.seconds;
    sldr.value = parseInt(progress);

    let hours = Math.floor(progress / 3600);
    let minutes = Math.floor((progress - hours * 3600) / 60);
    let seconds = progress - hours * 3600 - minutes * 60;
    seconds = parseInt(seconds);

    sec.innerHTML = seconds < 10 ? "0" + seconds : seconds;
    min.innerHTML = minutes < 10 ? "0" + minutes : minutes;
  });

  sldr.addEventListener("input", function () {
    vid.setCurrentTime(this.value);
  });
  
}





function playVimeo() {
  vid1 = new Player("vid1", {
    id: 755056479,
    autoplay: true,
    loop: true,
    controls: false,
  });

  vid1.setVolume(0);


  var controlBtn = document.getElementById("play-pause");
  controlBtn.addEventListener("click", function () {
    playPause(vid1, controlBtn)
  });



  vid1.on("play", function () {
    controlBtn.className = "pause";
    console.log("played the video!");
  });




  // DOM1
  const dom1 = select(".dom-1");
  dom1.addEventListener("click", function () {
    domEvent(vid1,29)
  })
 

  // DOM2
  const dom2 = select(".dom-2");
  dom2.addEventListener("click", function () {
    domEvent(vid1, 35)
  })


  // DOM3
  const dom3 = select(".dom-3");
  dom3.addEventListener("click", function () {
    domEvent(vid1,44)
  })



  // Get Title
  const vidtitle = select(".vidtitle");
  vidtitle.innerHTML = getTitle(vid1);



  const intro1 = select(".intro-1");
  const intro2 = select(".intro-2");
  const intro3 = select(".intro-3");



  vid1.on("timeupdate", function (data) {

    // HERE WA ARE  SHOWING DOM 1-3
    if (data.seconds >= 1.00 && data.seconds <= 1.50) {
      dom1to3.classList.add("active");
      isDom1Clicked = false;
    }

    // LOOPING IF USER DON'T  CLICK ANY BUTTON
    if (data.seconds >= 6.50 && data.seconds <= 7.00) {
      if (!isDom1Clicked) {
        vid1.setCurrentTime(0.00);
      }
    }


    if (data.seconds >= 29.01 && data.seconds <= 29.300) DomIntro(intro1);
    if (data.seconds >= 35.01 && data.seconds <= 35.300) DomIntro(intro2);
    if (data.seconds >= 44.01 && data.seconds <= 44.300) DomIntro(intro3);





  });







// SeekBar

const slider = select("#slider");
const secDom = select("#seconds");
const minDom = select("#minuts");
const duration = select("#duration");

seekBar(vid1,slider,secDom,minDom,duration)


}












const vimeoView = {
  namespace: "Plyr",
  afterEnter() {
    playVimeo();
  },
};

export { vimeoView };

































// export default class vimeoPlayer {

//   /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                            Constructor 🥼
//   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//   constructor(option = {}) {

//     this.option = {
//       id: option.id || 755056479,
//       autoplay: option.autoplay || false,
//       loop: option.loop || false,
//       controls: option.controls || false,
//     };

//     this.vid = null;
//     this.init();
//   }





//   /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                         Init the Player 💡
//   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//   init() {
//     this.vid = new Player("vid1", {
//       id: this.option.id,
//       autoplay: this.option.autoplay,
//       loop: this.option.loop,
//       controls: this.option.controls
//     });
//   }

  
  
// /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                      Play Pause Button
//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


//   playPause(control) {
//     this.vid.getPaused().then(function (paused) {
//       if (paused) {
//         control.className = "pause";
//         this.vid.play();
//       } else {
//         control.className = "play";
//         this.vid.pause();
//       }
//     }).catch(function (error) {
//       console.log("unable to pause");
//     });
//   }








//   /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                 Destroy the Video  🚮
//   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//   destroy() {
//     this.vid.destroy();
//   }



// }
