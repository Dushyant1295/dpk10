const imagesLoaded = require("imagesloaded");
import { gsap } from "gsap";

function progressLoading() {
    const progressLoader = imagesLoaded(
        "body",
        { background: true },
        function () {
            console.log("all image loaded");
        }
    );

    const totalImgs = progressLoader.images.length;
    let imgCounter = 0;
    let loadingProgress = 0;

    let loadText = document.querySelector(".loaderh");
   


    progressLoader.on("progress", function (instance, image) {
        imgCounter++;
        loadingProgress = ((imgCounter / totalImgs) * 100).toFixed();
        console.log(loadingProgress);

        gsap.to(loadText, {
            textContent: loadingProgress,
            ease: "power1.in",
            snap: { textContent: 1 }           
        });

    });
}

export { progressLoading };
