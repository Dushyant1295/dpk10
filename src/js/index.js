import "../css/style.scss";
import "swiper/css/bundle";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { isMobile } from "./Module/Helper";

import { lenis, lenisScroll } from "./Module/lenis/lenis";
const lss = new lenisScroll();

if (!isMobile()) lss.initLenis();
