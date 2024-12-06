document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const caption = document.querySelector('.caption p');
    const images = document.querySelectorAll('.slider img');

    slider.addEventListener('scroll', () => {
        images.forEach((img) => {
            const rect = img.getBoundingClientRect();
            if (rect.left >= 0 && rect.right <= window.innerWidth) {
                caption.textContent = img.getAttribute('data-caption');
            }
        });
    });
});
