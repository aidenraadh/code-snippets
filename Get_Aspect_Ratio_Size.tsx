/**
 * Both functions below are useful when you want to set an image's width/height with
 * specific number, but you want to auto calculate the other dimension so that 
 * the image's ratio is still preserved 
 * 
 * Both targetH and targetW is a number with any CSS unit you desire. E.g. you set targetH=3
 * with respect to rem unit.
 * Then the function return {w: 5, h: 3}, meaning the width is 5rem and height is 3rem
 */

/**
 * This function is best use when you have multiple image with different size
 * placed horizontally. You want to make all images the same height but also
 * want to set the width according to the individual image's ratio
 * 
 * @param w - Image's original width (in pixels)
 * @param h - Image's original height (in pixels)
 * @param targetH - The desired fixed height of the image
 * @returns 
 */

export const getSizeFixedH = (w: number, h: number, targetH: number) => {
    const ratio = (w > h ? {w: w/h, h: 1} : {w: 1, h: h/w})
    return {
        w: Math.round(ratio.w / ratio.h) * targetH,
        h: targetH
    }
}

/**
 * This function is best use when you have multiple image with different size
 * placed vetically. You want to make all images the same width but also
 * want to set the height according to the individual image's ratio
 * 
 * @param w - Image's original width (in pixels)
 * @param h - Image's original height (in pixels)
 * @param targetW - The desired fixed width of the image
 */

export const getSizeFixedW = (w: number, h: number, targetW: number) => {
    const ratio = (w > h ? {w: w/h, h: 1} : {w: 1, h: h/w})
    return {
        w: targetW,
        h: Math.round(ratio.h / ratio.w * targetW)
    }
}