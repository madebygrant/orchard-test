/**
 * Detect if the elements are wihin the browser viewport
 * 
 * @param {nodelist} elements The elements to observe
 * @returns void
 */
const inView = (elements) => {
    const config = { root: null, threshold: 0.3 };

    if (!elements) {
        return false;
    }

    // Add an identifier to each section
    elements.forEach((element, index) => {
        element.setAttribute('data-inview-item', index);
    });

    const callback = (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                const inViewEntry = entry.target;

                // Get the delay value (ms) before being classified as been viewed
                const getViewedDelay = +inViewEntry.getAttribute('data-viewed-delay');
                const viewedDelay = getViewedDelay !== 0 && getViewedDelay !== NaN ? getViewedDelay : 500;

                // Add 'data-section-inview' attribute to the body tag, indicating which section is in view
                document.body.setAttribute('data-section-inview', inViewEntry.getAttribute('data-inview-item'));

                // Clear and add class to the active section in view
                elements.forEach((element) => {
                    element.classList.remove('in-view');
                });

                // When in view
                inViewEntry.classList.add('in-view');

                // Add a class to indicate the section has been viewed
                setTimeout(() => {
                    inViewEntry.classList.add('been-viewed');
                }, viewedDelay)
            }

        })

    };

    // Observe the sections
    const observer = new IntersectionObserver(callback, config);
    elements.forEach((element) => {
        observer.observe(element);
    });

}

export default inView;