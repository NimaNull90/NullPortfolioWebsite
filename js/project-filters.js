(function () {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.work-item[data-category]');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.filter;

            filterButtons.forEach(filterButton => {
                const isActive = filterButton === button;
                filterButton.classList.toggle('is-active', isActive);
                filterButton.setAttribute('aria-pressed', String(isActive));
            });

            projectCards.forEach(card => {
                const shouldShow = selectedCategory === 'all' || card.dataset.category === selectedCategory;
                card.classList.toggle('is-hidden', !shouldShow);
            });
        });
    });
})();