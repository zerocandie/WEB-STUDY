export class AccordionComponent {
    constructor(parent, items, onItemClick) {
        this.parent = parent;
        this.items = items;
        this.onItemClick = onItemClick;
    }
    getHTML(data) {
        return `
            <div class="card mb-3" style="width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.photo_400_orig}" class="img-fluid" alt="картинка">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ✅ Добавьте этот метод!
    render() {
        // Генерируем HTML для всего аккордиона
        const accordionHTML = this.items.map(item => `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading-${item.id}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${item.id}" aria-expanded="false" aria-controls="collapse-${item.id}">
                        ${item.title}
                    </button>
                </h2>
                <div id="collapse-${item.id}" class="accordion-collapse collapse" aria-labelledby="heading-${item.id}" data-bs-parent="#accordion">
                    <div class="accordion-body">
                        ${item.content}
                    </div>
                </div>
            </div>
        `).join('');

        // Оборачиваем в контейнер аккордиона
        this.parent.innerHTML = `
            <div class="accordion" id="accordion">
                ${accordionHTML}
            </div>
        `;

        // Добавляем обработчики на кнопки "Подробнее"
        this.parent.querySelectorAll('.details-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const dogId = e.target.dataset.id;
                if (this.onItemClick) {
                    this.onItemClick(dogId);
                }
            });
        });
    }
}
