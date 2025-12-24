document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel-testimonials');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.carousel-item');
    const minPerSlide = 3;

    items.forEach((el) => {
        let next = el.nextElementSibling;
        for (let i = 1; i < minPerSlide; i++) {
            if (!next) {
                // wrap carousel by using first child
                next = items[0];
            }

            // Clone the card from the next item
            const card = next.querySelector('.card');
            if (card) {
                let clone = card.cloneNode(true);

                // Add responsive classes to hide on mobile
                // Note: The first card (original) is always visible.
                // The cloned ones (2nd and 3rd) should be hidden on mobile.
                clone.classList.add('d-none', 'd-md-block');

                el.appendChild(clone);
            }

            next = next.nextElementSibling;
        }
    });
});
