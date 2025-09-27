import Splitting from "splitting";
const { gsap } = require("gsap/dist/gsap");
import { select } from "../Helper";

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                Falling Text Effect 
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function fallingText() {
  const target = select("#target");
  const results = Splitting({ target: target, by: "liness" });

  gsap.set("#target", { opacity:1, perspective: 400 });


 gsap.from('.char', {duration:2, y: 50, rotate: 5, opacity: 0, ease:"elastic.out" ,stagger:0.03 });


}



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 Export The effects
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export { fallingText };
