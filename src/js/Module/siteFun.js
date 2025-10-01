import "venobox/dist/venobox.css";
import VenoBox from "venobox/dist/venobox";

function venoboxInit() {
    new VenoBox({
        selector: ".veno-box",
        onPostOpen: function () {
            const venoBoxOverlay = document.querySelector(".vbox-overlay");
            if (venoBoxOverlay) {
            }
        },
    });

    
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    data-autoplay="true" data-vbtype="video"
    data-vbtype="iframe" for map
    data-vbtype="inline" title="..." href="#mform"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


}




export { venoboxInit }