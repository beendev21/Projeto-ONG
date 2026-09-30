const navigation = document.querySelector('.site-nav');
const navigationToggle = navigation?.querySelector('.nav-toggle');

if (navigation && navigationToggle) {
    const closeNavigation = (returnFocus = false) => {
        navigation.classList.remove('is-open');
        navigationToggle.setAttribute('aria-expanded', 'false');
        navigationToggle.setAttribute('aria-label', 'Abrir menu de navegação');

        if (returnFocus) {
            navigationToggle.focus();
        }
    };

    navigationToggle.addEventListener('click', () => {
        const isOpen = navigationToggle.getAttribute('aria-expanded') === 'true';
        navigation.classList.toggle('is-open', !isOpen);
        navigationToggle.setAttribute('aria-expanded', String(!isOpen));
        navigationToggle.setAttribute(
            'aria-label',
            isOpen ? 'Abrir menu de navegação' : 'Fechar menu de navegação'
        );
    });

    navigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            closeNavigation();
        }
    });

    navigation.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
            closeNavigation(true);
        }
    });

    window.matchMedia('(min-width: 768px)').addEventListener('change', () => {
        closeNavigation();
    });
}