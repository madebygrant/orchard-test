import { select, selectAll } from './modules/selectors';
import lightboxHandlers from './modules/lightboxHandlers';
import inView from './modules/inView';

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Detect which section is in the browser viewport
     */

    inView(selectAll('.section'));
    
    /**
     * 'Answer your body's needs' gallery & lightbox modal
     */

    // Initialise the lightbox, create and append the modal before the </body> tag
    lightboxHandlers.init();
    
    // Get and loop the links in the gallery
    const galleryLinks = selectAll(".aybn-gallery__link");
    for (const link of galleryLinks) {
        link.classList.add('lightbox-ready'); // Add a class to the link to indicate it uses the lightbox modal
        lightboxHandlers.onClick(link); // Activates the lightbox when the link has been clicked on
    };

    // Hides the lightbox when it's been clicked on
    select(".lightbox").addEventListener('click', () => {
        if (document.body.classList.contains('lightbox-is-active')){
            lightboxHandlers.hide();
        }
    })

    /**
     * Capture anchor link clicks and report them to the console
     */
    const anchorLinks = selectAll('a');
    for (const link of anchorLinks) {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('Anchor Link Click', event.currentTarget);
        })
    };

});