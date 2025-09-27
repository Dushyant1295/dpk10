
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                
    <link id="dynamic-favicon" rel="icon" 
    type="image/png" sizes="64x64" href="img/fav.png" />

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
document.head || (document.head = document.getElementsByTagName("head")[0]);

var hidden, visibilityChange, iconInterval;
var currFavIcon = "img/fav.png";

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
        iconInterval = setInterval(changeFavIcon, 333);
        setIcon("img/light.png");
    } else {
        clearInterval(iconInterval);
        if (currFavIcon !== "img/fav.png") {
            setIcon("img/fav.png");
        }
    }
}

function changeFavIcon() {
    var newSrc = currFavIcon !== "img/fav.png" ? "img/fav.png" : "img/light.png";
    setIcon(newSrc);
}

function setIcon(src) {
    var newLink = document.createElement("link"),
        oldLink = document.getElementById("dynamic-favicon");
    newLink.id = "dynamic-favicon";
    newLink.rel = "shortcut icon";
    newLink.href = src;
    currFavIcon = src;

    if (oldLink) {
        document.head.removeChild(oldLink);
    }

    document.head.appendChild(newLink);
}


export default function favicon() {

    if (
        typeof document.addEventListener !== "undefined" ||
        typeof document[hidden] !== "undefined"
    ) {
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }
}

