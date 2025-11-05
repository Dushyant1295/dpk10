import "./dpkCursor.scss";
import gsap from "gsap";
import { clamp, getOffset } from "../Helper"

 
export default class dpkCursor {

  constructor(option = {}) {
    this.option = {
      ease: clamp(option.ease, 0.1, 1) || 0.25,
      useGsap: option.useGsap || false,

      //🧲 Options
      x: option.x || 0.3,
      y: option.y || 0.3,
      speed: option.speed || 0.1,
      resetspeed: option.rs || 0.5,
    };
  
    this.magnet = { x: 0, y: 0, height: 0, width: 0 };
    this.animationFrame = null;
    this.mousePos = { x: 0, y: 0 };
    this.cursorPos = { x: 0, y: 0 };
    this.init();
  }




  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                         Create div Element 🔳
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  createCursor() {
    this.cursor = document.createElement("div");
    this.cursor.classList.add("dpkCursor");
    document.body.appendChild(this.cursor);
  }


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  Mouse move Listener on window 🔳
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  getPosition() {
    window.addEventListener("mousemove", (e) => {
      this.mousePos.x = e.x;
      this.mousePos.y = e.y;
    });
  }





  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     Follow Cursor 💨
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  setPosition() {
    this.cursorPos.x += (this.mousePos.x - this.cursorPos.x) * this.option.ease;
    this.cursorPos.y += (this.mousePos.y - this.cursorPos.y) * this.option.ease;
    this.cursor.style.transform = `translate3d(calc(${this.cursorPos.x}px - 50%) ,calc(${this.cursorPos.y}px - 50%), 0)`;
    this.animationFrame = requestAnimationFrame(this.setPosition.bind(this));
  }





  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  Follow Cursor using Gsap 💚 💨
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  setPositionWithGsap() {
    if (typeof gsap !== 'undefined') {
      gsap.set(this.cursor, { xPercent: -50, yPercent: -50 });
      this.xSet = gsap.quickSetter(this.cursor, "x", "px");
      this.ySet = gsap.quickSetter(this.cursor, "y", "px");

      gsap.ticker.add(() => {
       
        const dt = 1.0 - Math.pow(1.0 - this.option.ease, gsap.ticker.deltaRatio());
        this.cursorPos.x += (this.mousePos.x - this.cursorPos.x) * dt;
        this.cursorPos.y += (this.mousePos.y - this.cursorPos.y) * dt;
        this.xSet(this.cursorPos.x);
        this.ySet(this.cursorPos.y);
       
      });
    } else {
      console.warn("gsap is not defined")
      this.setPosition();
    }
  }





  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Reset the Cursor 🏓
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  reset() {
    this.cursor.textContent = "";
    this.cursor.style.background = "";
    this.cursor.className = "dpkCursor"    
  }




  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                   Hover Cursor Effects  ✨
  

  setHover(el) {
    let hoverText = el.getAttribute("data-hover-text");
    let hoverImg = el.getAttribute("data-hover-img");
    let hoverClass = el.getAttribute("data-hover-class");    

    if (hoverText) this.cursor.textContent = hoverText;
    if (hoverImg) this.cursor.style.backgroundImage = `url(${hoverImg})`;
    if (hoverClass) this.cursor.classList.add(hoverClass);
    else this.cursor.classList.add("hover-active");
   

    if (el.hasAttribute("data-hover-magnet")) {
      const ofst = getOffset(el)
      this.magnet.x = ofst.left - window.pageXOffset;
      this.magnet.y = ofst.top - window.pageYOffset;
      this.magnet.width = ofst.width;
      this.magnet.height = ofst.height;
    }
  }
  👇 optimized using
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  setHover(el) {
    const { hoverText, hoverImg, hoverClass } = el.dataset;
    const cursor = this.cursor;
    const magnet = this.magnet;
  
    if (hoverText) cursor.textContent = hoverText;
    if (hoverImg)   cursor.style.backgroundImage = `url(${hoverImg})`;
  
  
    if (hoverClass) {
      cursor.classList.toggle(hoverClass, true);
    } else {
      cursor.classList.toggle("hover-active", true);
    }
  
    if (el.hasAttribute("data-hover-magnet")) {
      const ofst = getOffset(el);
      magnet.x = ofst.left - window.pageXOffset;
      magnet.y = ofst.top - window.pageYOffset;
      magnet.width = ofst.width;
      magnet.height = ofst.height;
    }
  }
  

  move(el, x, y, speed) {
    gsap.to(el, {
      x: x,
      y: y,
      force3D: true,
      overwrite: true,
      duration: speed
    });
  }


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     Listners 🤙
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    effect() {
      const dataHover = document.querySelectorAll("[data-hover-text],[data-hover-class],[data-hover-img],[data-hover-magnet]");

      dataHover.forEach((target) => {
        target.addEventListener("mouseenter", () => this.setHover(target));
        target.addEventListener("mouseleave", () => {
          this.reset();

          if (target.hasAttribute("data-hover-magnet")) {
            this.move(target, 0, 0, this.option.resetspeed);
          }

        });



        if (target.hasAttribute("data-hover-magnet")) {
          target.addEventListener("mousemove", (e) => {
            const x = (e.clientX - this.magnet.x - this.magnet.width / 2) * this.option.x;
            const y = (e.clientY - this.magnet.y - this.magnet.height / 2) * this.option.y;
            this.move(target, x, y, this.option.speed);

            //?  can we use this.mousePos.x instead of client X
          })
        }

      });
    }



  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                          Init the Cursor 💡
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  init() {
    this.createCursor();
    this.getPosition();
    this.option.useGsap ? this.setPositionWithGsap() : this.setPosition();
    // this.effect();  we have to call manually in page changes

  }




  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 WORK IN PROGRESS  Destroy the Cursor  🚮
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  destroy() {
    cancelAnimationFrame(this.animationFrame);
    document.body.removeChild(this.cursor);
  }
}



























/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                       Mesc 💛
         https://codepen.io/GreenSock/pen/WNNNBpo


 target.addEventListener("click", () => this.reset(target));
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
