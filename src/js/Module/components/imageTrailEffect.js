import "./image-trail.scss"
import { MathUtils} from '../Helper';
import gsap from "gsap";


function initTrail(element) {
    element.classList.add("trailElement");
    const trailElement = document.querySelector(".trailElement");
    trailElement.removeEventListener("mousemove", _listener, true);

    const getPos = (ev) => {
        let posx = 0;
        let posy = 0;
        if (!ev) ev = window.event;    
        posx = ev.clientX;
        posy = ev.clientY - trailElement.getBoundingClientRect().top;
        return { x: posx, y: posy };
     }

   
    let cacheMousePos , lastMousePos;
    let mousePos = lastMousePos = cacheMousePos = {x: 0, y: 0};

    var _listener = (ev) => (mousePos = getPos(ev));
    trailElement.addEventListener("mousemove", _listener, true);

    const getMouseDistance = () =>
        MathUtils.distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);


    class Image {
        constructor(el) {
            this.DOM = { el: el };

            // image deafult styles
            this.defaultStyle = {
                scale: 1,
                x: 0,
                y: 0,
                opacity: 0,
            };

            // get sizes/position
            this.getRect();

            // init/bind events
            this.initEvents();
        }

        initEvents() {
            // on resize get updated sizes/position
            window.addEventListener("resize", () => this.resize());
        }

        resize() {
            // reset styles
            gsap.set(this.DOM.el, this.defaultStyle);
            // get sizes/position
            this.getRect();
        }

        getRect() {
            this.rect = this.DOM.el.getBoundingClientRect();
        }
        isActive() {
            // check if image is animating or if it's visible
            return gsap.isTweening(this.DOM.el) || this.DOM.el.style.opacity != 0;
        }
    }

    class ImageTrail {
        constructor() {
            this.DOM = { content: trailElement };
            this.images = [];
            [...this.DOM.content.querySelectorAll(".content__img")].forEach((img) =>
                this.images.push(new Image(img))
            );
            this.imagesTotal = this.images.length;
            this.imgPosition = 0;
            this.zIndexVal = 1;

            // mouse distance required to show the next image
            this.threshold = 100;

            this.raf();
        }

        render() {
            let distance = getMouseDistance();

            cacheMousePos.x = MathUtils.lerp(
                cacheMousePos.x || mousePos.x,
                mousePos.x,
                0.1
            );
            cacheMousePos.y = MathUtils.lerp(
                cacheMousePos.y || mousePos.y,
                mousePos.y,
                0.1
            );

            if (distance > this.threshold) {
                this.showNextImage();
                ++this.zIndexVal;
                this.imgPosition =
                    this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
                lastMousePos = mousePos;
            }

            let isIdle = true;
            for (let img of this.images) {
                if (img.isActive()) {
                    isIdle = false;
                    break;
                }
            }

            if (isIdle && this.zIndexVal !== 1) {
                this.zIndexVal = 1;
            }

            this.raf();
        }

        raf() {
            this.rAF = requestAnimationFrame(() => this.render());
        }

        cancel() {
            window.cancelAnimationFrame(this.rAF);
        }

        showNextImage() {
            const img = this.images[this.imgPosition];
            gsap.killTweensOf(img.DOM.el);

            var tl = gsap.timeline();

            tl.set(img.DOM.el, {
                startAt: { opacity: 0, scale: 1 }, opacity: 1, scale: 1, zIndex: this.zIndexVal,
                x: cacheMousePos.x - img.rect.width / 2, y: cacheMousePos.y - img.rect.height / 2,
            }, 0)

                // animate position
                .to(img.DOM.el, {
                    duration: 1, ease: "expo.out",
                    x: mousePos.x - img.rect.width / 2, y: mousePos.y - img.rect.height / 2,
                }, 0)

                // then make it disappear        
                .to(img.DOM.el, { duration: 1, ease: "power1.out", opacity: 0, }, 0.4)

                // scale down the image
                .to(img.DOM.el, { duration: 1, ease: "power4.out", scale: 0.2 }, 0.4);


                // .to(img.DOM.el, { duration: 1, ease: "power4.out", scale:0,  y:'200%' }, 0.4);



                
        }
    }
    
    let imagetrail = new ImageTrail();
}






/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        5.         Call on Barba Views
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const imageTrailView = {
    namespace: "image-trail",
  
    afterEnter() {
        const trailElement = document.getElementById("trails");
        trailElement && initTrail(trailElement);
    },
  
    beforeLeave() {
      
    },
  };
  
  
  export { imageTrailView };
  



