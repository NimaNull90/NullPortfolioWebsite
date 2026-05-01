(function () {
    const createModal = () => {
        const existingModal = document.querySelector('.gif-modal');
        if (existingModal) {
            return existingModal;
        }

        const modal = document.createElement('div');
        modal.className = 'gif-modal';
        modal.id = 'gif-modal';
        modal.setAttribute('aria-hidden', 'true');

        const content = document.createElement('div');
        content.className = 'gif-modal-content';
        content.setAttribute('role', 'dialog');
        content.setAttribute('aria-modal', 'true');
        content.setAttribute('aria-label', 'Zoomed image viewer');

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'gif-modal-close';
        closeButton.setAttribute('aria-label', 'Close zoomed image');
        closeButton.textContent = '×';

        const image = document.createElement('img');
        image.className = 'gif-modal-image';
        image.src = '';
        image.alt = 'Zoomed image';

        content.appendChild(closeButton);
        content.appendChild(image);
        modal.appendChild(content);
        document.body.appendChild(modal);

        return modal;
    };

    const modal = createModal();
    const modalImage = modal.querySelector('.gif-modal-image');
    const modalClose = modal.querySelector('.gif-modal-close');

    const openModal = (src, altText) => {
        if (!src) return;
        modalImage.src = src;
        modalImage.alt = altText || 'Zoomed image';
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        modalImage.src = '';
    };

    const isVideoItem = card => Boolean(card.querySelector('video.work-video'));

    const attachZoomToCard = card => {
        if (isVideoItem(card)) return;

        const image = card.querySelector('img.work-image');
        if (!image) return;

        const src = image.dataset.src || image.src || '';
        if (!src) return;

        card.style.cursor = 'zoom-in';
        card.addEventListener('click', event => {
            if (event.target.closest('a') || event.target.closest('video')) return;
            openModal(src, image.alt || 'Zoomed image');
        });
    };

    document.querySelectorAll('.work-item.swoop-in').forEach(attachZoomToCard);

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
})();
