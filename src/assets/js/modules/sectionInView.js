import { selectAll } from "./selectors";
/**
 * Detect if the section is wihin the browser viewport
 * 
 * @returns void
 */

const sectionInView = () => {
    const config = { root: null, threshold: 0.3 };
    const sections = selectAll('.section');

    if (!sections) {
        return false;
    }

    // Add an identifier to each section
    sections.forEach((section, index) => {
        section.setAttribute('data-section', index);
    });

    const callback = (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                const inViewSection = entry.target;

                // Get the delay value (ms) before being classified as been viewed
                const getViewedDelay = +inViewSection.getAttribute('data-viewed-delay');
                const viewedDelay = getViewedDelay !== 0 && getViewedDelay !== NaN ? getViewedDelay : 500;

                // Add 'data-section-inview' attribute to the body tag, indicating which section is in view
                document.body.setAttribute('data-section-inview', inViewSection.getAttribute('data-section'));

                // Clear and add class to the active section in view
                sections.forEach((section) => {
                    section.classList.remove('in-view');
                });

                // When in view
                inViewSection.classList.add('in-view');

                // Add a class to indicate the section has been viewed
                setTimeout(() => {
                    inViewSection.classList.add('been-viewed');
                }, viewedDelay)
            }

        })

    };

    // Observe the sections
    const observer = new IntersectionObserver(callback, config);
    selectAll('.section').forEach((section) => {
        observer.observe(section);
    });

}

export default sectionInView;