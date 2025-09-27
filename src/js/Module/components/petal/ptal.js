import "./petal.scss";
import gsap from "gsap";

import { lerp } from '../../Helper'

const petals = document.querySelectorAll('.petal')
let color = 0
const mouse = {
    x: 1,
    y: 1
}

const handleMouse = (e) => {
    const x = e.clientX || e.touches[0].clientX
    const y = e.clientY || e.touches[0].clientY
    mouse.x = x / window.innerWidth
    mouse.y = y / window.innerHeight
}
['mousemove', 'touchstart', 'touchmove'].forEach(e => window.addEventListener(e, handleMouse))



const animate = () => {
    petals.forEach((b, ind) => {
        const i = ind / petals.length
        const x = Math.sin(i * Math.PI * 2) * 48
        const y = -Math.cos(i * Math.PI * 2) * 48
        color = lerp(color, mouse.y * 360, .004)
        const style = {
            transform: `translate(${x}px, ${y}px) rotate(${i * 360 + mouse.y * 360}deg) scale(${0.5 + mouse.x * 0.5})`,
            borderRadius: `${50 + mouse.y * 50}% 0 ${50 + mouse.x * 50}% 50%`
        }
        Object.assign(b.style, style)
        b.style.setProperty('--color', `hsl(${Math.floor(color)}, 60%, 50%)`)
    })
}

gsap.ticker.add(animate);



export { animate }





/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                Dom 👉        

       <section data-scroll-section class="banner min-vh-100 bg-black">


                <div class="petal"></div>
                <div class="petal"></div>
                <div class="petal"></div>
                <div class="petal"></div>
                <div class="petal"></div>
                <div class="petal"></div>
                <div class="petal"></div>
                <div class="petal"></div>

            </section>

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



