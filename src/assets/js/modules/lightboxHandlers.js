import { select, selectAll } from "./selectors";

/**
 * Toggle the aria-hidden attribute values of elements assigned with it
 * 
 * @returns void
 */
const ariaHiddenToggle = () => {
    const ariaHiddenElements = selectAll('[aria-hidden]');

    for (const item of ariaHiddenElements) {
        item.setAttribute('aria-hidden', item.getAttribute('aria-hidden') == 'true' ? false : true);
    }
}

const lightboxHandlers = {

    /**
     * Create and append the modal before the </body> tag
     * 
     * @returns void
     */
    init: () => {
        let lightbox = document.createElement('div'),
            lightboxInner = document.createElement('div');

        lightbox.classList.add('lightbox');
        lightbox.setAttribute('aria-hidden', true);
        lightboxInner.classList.add('lightbox__inner');

        lightbox.append(lightboxInner);
        document.body.append(lightbox);
    },

    /**
     * Trigger and activate the lightbox modal, finds an image within the item when it is been clicked on
     * 
     * @param {*} item 
     * 
     * @returns void
     */
    onClick: (item) => {

        item.addEventListener('click', (event) => {
            event.preventDefault();

            const galleryItem = event.currentTarget;
            const galleryItemImage = select('img', galleryItem);
            const lightbox = select('.lightbox');
            const lightboxInner = select('.lightbox__inner', lightbox);

            // Add the 'active' class to the gallery item
            galleryItem.classList.add('lightbox-ready--active');
            
            // Create the lightbox image element
            let lightboxFigure = document.createElement('figure');
            let lightboxImage = document.createElement('img');
            lightboxFigure.classList.add('lightbox__image');
            lightboxImage.src = galleryItemImage.getAttribute('data-modal-src');
            lightboxImage.alt = galleryItemImage.alt;
            lightboxFigure.append(lightboxImage);

            document.body.classList.add('lightbox-is-active'); // Add a class to the <body> tag when the lightbox modal is active
            lightboxInner.innerHTML = ""; // Clear the lightbox
            lightboxInner.append(lightboxFigure); // Append the image into the lightbox
            lightbox.classList.add('lightbox--active', 'lightbox--transition-appear'); // Add classes to indicate the lightbox is active and in transition
            ariaHiddenToggle(); // Accessibility, toggle the aria-hidden attribute values of elements assigned with it

            setTimeout(() => {
                lightbox.classList.remove('lightbox--transition-appear'); // Remove the transition class after the length of the transition
            }, 750)
        });
    },

    /**
     * Hide the lightbox modal, has a transition period
     * 
     * @returns void
     */
    hide: () => {
        const lightbox = select('.lightbox');

        if (!lightbox.classList.contains('lightbox--transition-appear') ){

            lightbox.classList.add('lightbox--transition-hide'); // Apply transition class
            ariaHiddenToggle(); // Accessibility, toggle the aria-hidden attribute values of elements assigned with it

            setTimeout(() => {
                document.body.classList.remove('lightbox-is-active'); // Remove the class to the <body> tag when the lightbox modal isn't active
                lightbox.classList.remove('lightbox--active', 'lightbox--transition-hide'); // Remove the classes applied previously
                select('.lightbox-ready--active').classList.remove('lightbox-ready--active'); // Remove 'active' class from the gallery item
            }, 500)
        }
        
    }
}

export default lightboxHandlers;