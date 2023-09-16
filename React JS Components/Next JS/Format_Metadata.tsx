/**
 * Add default value for essential meta tag in Next JS metada
 */

type PageMetaType = {
    title?: string, // Page's title
    description?: string, // Page's description
    image?: string, // Page's OG image
    type?: string, // Page's type
    publishedTime?: string, // Page's published time, useful for post
    section?: string // Page's section
}
export default function formatMetadata(pageMeta: PageMetaType){
    // The prefix of your page's title. E.g. your page's title is "Home"
    // and the titlePrefix is " | Nasa". Your page's whole title will be
    // "Home | Nasa"
    const titlePrefix = '| YOUR_SITE_NAME' // 

    const metadata: any = {
        // Prevent user to zoom in when they tap on form on mobile
        // Can remove this if you want        
        viewport: {
            width: 'device-width',
            initialScale: 1,
            maximumScale: 1,
        },        
        title: (pageMeta.title || '') + `${titlePrefix}`,
        openGraph: {
            title: (pageMeta.title || '') +  `${titlePrefix}`,
            siteName: 'YOUR_SITE_NAME',
            images: [
                // Make sure you have default OG image for all your the pages
                // if the current page's OG image is not set
                {
                    url: pageMeta.image || 'path_to_your_default_og_image',
                    width: 1200,
                    height: 627,
                }
            ],
            locale: 'en_US',
            type: pageMeta.type || 'website',
        },
    }
    if(pageMeta.description){
        metadata.description = pageMeta.description
        metadata.openGraph.description = pageMeta.description
    }
    if(pageMeta.publishedTime){
        metadata.openGraph.publishedTime = pageMeta.publishedTime
    }    
    if(pageMeta.section){
        metadata.openGraph.section = pageMeta.section
    }       
    return metadata
}