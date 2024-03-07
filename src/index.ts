import './scss/styles.scss';
import { LarekAPI } from './components/base/LarekApi';
import {
	AppState,
	CatalogChangeEvent,
	CardItem,
} from './components/base/AppData';
import { Api } from './components/base/ base/api';
import { CDN_URL, API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/ base/events';
import { Card } from './components/base/common/card';
import { Modal } from './components/base/common/modal';
import { Page } from './components/base/page';
import { Basket } from './components/base/common/basket';
//import { Order } from './components/base/order';
import { Success } from './components/base/Succes';
import { Events } from './types';
//import { IOrderForm } from './types';
const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// Модель данных приложения
const appData = new AppState({}, events);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
//const order = new Order(cloneTemplate(orderTemplate), events);

// Изменились элементы каталога
events.on<CatalogChangeEvent>(Events.LOAD_LOTS, () => {
	page.galery = appData.catalog.map((item) => {
		const card = new Card('card', cloneTemplate(cardCatalogTemplate), events, {
			onClick: () => events.emit('card:open', item),
		});
		return card.render({
			category: item.category,
			title: item.title,
			image: item.image,
			price: item.price,
		});
	});
});

// Отправлена форма заказа
/*events.on('order:submit', () => {
    api.orderLots(appData.order)
        .then((result) => {
            const success = new Success(cloneTemplate(successTemplate), {
                onClick: () => {
                    modal.close();
                    appData.clearBasket();
                    events.emit('auction:changed');
                }
            });

            modal.render({
                content: success.render({})
            });
        })
        .catch(err => {
            console.error(err);
        });
});*/

// Изменилось состояние валидации формы
/*events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { email, phone } = errors;
	order.valid = !email && !phone;
	order.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});*/

/*// Изменилось одно из полей
events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

// Открыть форму заказа
events.on('order:open', () => {
	modal.render({
		content: order.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});
/*
// Открыть лот
events.on('card:select', (item: CardItem) => {
    appData.setPreview(item);
});*/

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

// Получаем лоты с сервера
api
	.getCardList()
	.then((res) => {
		appData.catalog = res;
	})
	.catch((err) => {
		console.error(err);
	});
