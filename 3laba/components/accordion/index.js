// components/accordion/index.js

export class AccordionComponent {
    constructor(parent, items, onItemClick) {
        this.parent = parent;
        this.items = items;
        this.onItemClick = onItemClick;
    }

    render() {
        const itemsHTML = this.items.map(item => `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading-${item.id}">
                    <button class="accordion-button collapsed" type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#collapse-${item.id}" 
                        aria-expanded="false" 
                        aria-controls="collapse-${item.id}">
                        ${item.title}
                    </button>
                </h2>
                <div id="collapse-${item.id}" class="accordion-collapse collapse" aria-labelledby="heading-${item.id}">
                    <div class="accordion-body">
                        ${item.content}
                    </div>
                </div>
            </div>
        `).join('');

        // Вставляем в родительский контейнер
        this.parent.innerHTML = `
            <div class="accordion" id="dogAccordion">
                ${itemsHTML}
            </div>
        `;

        // Навешиваем обработчики на кнопки "Подробнее"
        this.parent.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                if (this.onItemClick) {
                    this.onItemClick(id);
                }
            });
        });
    }
}
