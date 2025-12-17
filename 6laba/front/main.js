import MainPage from './pages/people-main/index.js';
import PersonPage from './pages/person/index.js';
import AddPersonPage from './pages/add-person/index.js';

class App {
    constructor() {
        this.root = document.getElementById('app');
        this.currentPage = null;
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    }

    handleRoute() {
        const hash = window.location.hash;
        if (hash === '' || hash === '#people') {
            this.showMainPage();
        } else if (hash.startsWith('#person/')) {
            this.showPersonPage();
        } else if (hash === '#add-person') {
            this.showAddPersonPage();
        } else {
            this.showMainPage();
        }
    }

    showMainPage() {
        this.currentPage?.destroy?.();
        this.currentPage = new MainPage(this.root);
        this.currentPage.render();
    }

    showPersonPage() {
        this.currentPage?.destroy?.();
        this.currentPage = new PersonPage(this.root);
        this.currentPage.render();
    }

    showAddPersonPage() {
        this.currentPage?.destroy?.();
        this.currentPage = new AddPersonPage(this.root);
        this.currentPage.render();
    }
}

new App();
