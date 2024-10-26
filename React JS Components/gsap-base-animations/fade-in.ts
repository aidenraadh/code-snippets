import { animate } from "./anim-utils"

/**
 * Fade in show element
 * 
 * @param el - The target element
 * @param gsap - The GSAP object, make sure it's attached to ScrollTrigger
 * @param opt.delay - The delay of the animation (optional, default 0)
 * @param opt.duration - The duration of the animation (optional, default 0)
 * @param opt.start - The start position of the animation (optional, default "50% bottom")
 * @param opt.trigger - The trigger of the animation (optional, default will be the same as el)
 * @param opt.markers - The trigger animation marker (optional, default false)
 */

export default function fadeIn(
    el: gsap.TweenTarget,
    gsap: typeof globalThis.gsap,
    opt?: {
        delay?: gsap.TweenValue,
        duration?: gsap.TweenValue, 
        start?: string | number | ScrollTrigger.StartEndFunc,
        trigger?: gsap.TweenValue
        markers?: boolean | ScrollTrigger.MarkersVars
    }
){
    if(el !== null){
        const animInit: gsap.TweenVars = {opacity: 0, duration: 0}
        const anim: gsap.TweenVars = {
            opacity: 1,
            delay: opt && opt.delay ? opt.delay : 0,
            duration: opt && opt.duration ? opt.duration : 1,     
        }
        animate(el, gsap, animInit, anim, {
            trigger: opt && opt.trigger ? opt.trigger : el,
            start: opt && opt.start ? opt.start : "50% bottom",
            markers: opt && opt.markers ? opt.markers : false            
        })
    } 
}