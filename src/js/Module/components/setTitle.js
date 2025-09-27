
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              Blink Title When Page Lost Visibility
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


document.head || (document.head = document.getElementsByTagName("head")[0]);

var hidden, visibilityChange, iconInterval;
var currFavIcon = "Dpk";

if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

function handleVisibilityChange() {
    if (document[hidden]) {
        iconInterval = setInterval(changeFavIcon, 5000);
        setIcon("I'm Here 🤍");
    } else {
        clearInterval(iconInterval);
        if (currFavIcon !== "Dpk") {
            setIcon("Dpk");
        }
    }
}

function changeFavIcon() {
    var newSrc = currFavIcon !== "Dpk" ? "Dpk" : "I'm Here 🤍";
    setIcon(newSrc);
}

function setIcon(src) {
    var newLink = document.createElement("title"),
        oldLink = document.getElementById("dynamic-title");
    newLink.id = "dynamic-title";
    // newLink.rel = "shortcut icon";
    newLink.innerHTML = src;
    currFavIcon = src;

    if (oldLink) {
        document.head.removeChild(oldLink);
    }

    document.head.appendChild(newLink);
}


export default function title() {

    if (
        typeof document.addEventListener !== "undefined" ||
        typeof document[hidden] !== "undefined"
    ) {
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }
}











/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              Title Blink  on Page Leave
  1. Blink page title when user left screen
  2. Stand alone Function
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    import title from "./Module/setTitle";
    title();
*/


