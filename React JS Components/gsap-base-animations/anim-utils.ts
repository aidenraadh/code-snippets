
function isHTMLCollectionOfElement(variable: any): variable is HTMLCollectionOf<Element> {
    return variable instanceof HTMLCollection;
}

function isNodeListOfElement(variable: any): variable is NodeListOf<Element> {
    return variable instanceof NodeList;
}

export function animate(
    el: gsap.TweenTarget,
    gsap: typeof globalThis.gsap,
    animInit: gsap.TweenVars,
    anim: gsap.TweenVars,
    scrollTrigger: {
        [key: string]: any
    }
){
    if (isNodeListOfElement(el)) {
        el.forEach(item => {          
            gsap.to(item, animInit)
            gsap.to(item, {...anim, scrollTrigger: {
                ...scrollTrigger, trigger: scrollTrigger.trigger ? scrollTrigger.trigger : item
            }})         
        })
    } else if (isHTMLCollectionOfElement(el)) {
        Array.prototype.forEach.call(el, (item: Element) => {
            gsap.to(item, animInit)
            gsap.to(item, {...anim, scrollTrigger: {
                ...scrollTrigger, trigger: scrollTrigger.trigger ? scrollTrigger.trigger : item
            }})
        });            
    } else {
        gsap.to(el, animInit)
        gsap.to(el, {
            ...anim, scrollTrigger: {
                ...scrollTrigger, trigger: scrollTrigger.trigger ? scrollTrigger.trigger : el
            }
        });  
    }    
}