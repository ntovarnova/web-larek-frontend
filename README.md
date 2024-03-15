# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом + класс Presenter
- src/components/models/ - папка с используемыми классами Model
- src/components/views/ - папка с используемыми классами View

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения и реализация класса Presenter
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура

Приложение реализовано по MVP архитектуре и состоит из компонентов:

<table>
    <thead>
        <tr>
            <th>№</th>
            <th>Компонент</th>
            <th>Описание</th>
            <th>Базовый класс</th>
            <th>Связанный класс</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Model</td>
            <td>Модель данных</td>
            <td>Model</td>
            <td>
                <ul>
                    <li>AppData</li>
                    <li>CardItem</li>
                    <li>Order</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>View</td>
            <td>Модель отображения</td>
            <td>Component</td>
            <td>
                <ul>
                    <li>Page</li>
                    <li>Modal</li>
                    <li>Basket</li>
                    <li>Card</li>
                    <li>BasketItem</li>
                    <li>Form</li>
                    <li>ContactsForm</li>
                    <li>DeliveryForm</li>
                    <li>Success</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>3</td>
            <td>Presenter</td>
            <td>Модель связи</td>
            <td>-</td>
            <td>
                Реализуется в файле index.ts
            </td>
        </tr>
    </tbody>
</table>

В приложении используется событийно-ориентированный подход. В качестве инструмента, который обеспечивает данных подход, выступает EventEmitter.

## Базовый код

### 1. Класс `Api`

Базовый класс доступа к веб-серверу, который реализует 2 типа основных операций: безопасные (GET) и небезопасные (POST, DELETE)
- `baseUrl: string(readonly)`- Конструктор принимает базовый URL и опции
- `options: RequestInit;`- Опции для fetch

Методы:
- `handleResponse(Response): Promise<object>`
- `get(String): Promise<object>`
- `post(String, object, ApiPostMethods): Promise<object>`
- `ApiPostMethods = 'POST' | 'PUT' | 'DELETE'`- Поддерживаемые методы у API
### 2. Класс `Component<T>`
Абстрактный базовый класс, предназначенным для создания компонентов пользовательского интерфейса. Класс обеспечивает инструментарий для управления DOM элементами и поведением компонента. Наследуется всеми классами представления(View)

`constructor(container: HTMLElement)` - принимает элемент контейнера, в который будет помещен компонент.

Методы:
  - `toggleClass` - переключается класс для переданного элемента.
  - `setText` - устанавливает текстовое содержимое для переданного элемента.
  - `setImage` - устанавливает изображения и альтернативный текст для изоображения(опционально) для переданного элемента типа HTMLImageElement
  - `setDisabled` - изменяет статус блокировки для переданного элемента.
  - `setHidden`, `setVisible` - скрывает,отоброжает переданный элемент.
  - `render` - рендерит компонент, используя переданные данные. Метод должен быть переназначен в дочерних классах.

### 3. Класс `EventEmitter`

Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков
о наступлении события.

`constructor(_events: Map<EventName, Set<Subscriber>>)`

Методы:
  - `on (EventName,Callback):void` -  подписка на событие
  - `off(EventName,Callback):void` - отписки от события 
  - `emit (String, T):void` — уведомления подписчиков о наступлении события.
  
Дополнительно реализованы методы:
  - `onAll (Callback):void` — для подписки на все события 
  - `offAll ():void` - сброса всех подписчиков.
  - `trigger (String Partial<T>)Callback: ` - коллбек триггер, генерирующий событие при вызове


### 4. Класс `Model<T>`
Абстрактный
базовый класс для компонентов модели данных. Позволяем связать переданный данные со свойствами объекта (реализуется в конструкторе) и инициализировать вызов именованных событий через метод `emitChanges`.

`constructor(events: IEvents)`

Метод:
- `emitChanges(event: string, payload?: object):void`

## Компоненты модели данных (бизнес-логика)

### 1. Класс `AppState<IAppState>`

Класс данных всего приложения. Позволяет отслеживать состояние всего приложения. Содержит внутри себя свойство:

- `catalog` - для отслеживания списка доступных лотов - установка данного свойства вызывает событие `catalog:changed`
- `basket` - отслеживание лотов, которые находятся в корзине.
- `order` - отслеживает состояние заказа
- `preview` - отслеживает лот, который используется для подробного изучения в модальном окне

Также реализует дополнительные методы для доступа к методам перечисленных выше свойств
Методы:
- `set/get catalog`
- `get basket`
- `get order`
- `set/get preview`
- `isLotInBasket(item: ICardItem): boolean`- Проверяем, что лот находится в каталоге
- `clearBasket(): void` - Очищаем корзину
- `getTotalAmount(): number` - Получить общую стоимость товаров в корзине
- `getBasketIds(): string[]` - Получить список индексов в корзине
- `getBasketLength(): number`- Получить количество товаров в корзине
- `initOrder(): void`- Инициализируем объект заказа

### 2. Класс `CardItem<ICardItem> `

Класс данных отдельной карточки. Структура карточки определяется ответом от API - сервера с добавлением свойства и методов, реализующих логику взаимодействия с корзиной через вызов события `lot:changed`
Свойства:
 - `id: string` - идентификатор лота
 - `title: string`- заголовок лота
 - `description: string` - описание лота
 - `image: string` - полный путь до файла картинки лота
 - `category: ILotCategory` - категория лота
 - `price: number` - цена лота
 - `isOrdered: boolean` - признак включения в заказ
 Методы:
 - `placeInBasket: () => void` - добавляем лот в корзину
 - `removeFromBasket: () => void` - удаляем лот из корзины

### 3. Класс `Order<IOrder>`

Класс данных процесса оформления заказа. Содержит свойства, которые отображаются на полях соответствующих форм и реализует простейшую логику валидации свойств на наличие значений. Изменения в любом из свойств вызывают проверку всех полей и генерации события `formErrors:changed`
Свойства:
 - `_payment: IPaymentType` 
 - `_address: string` 
 - `_email: string` 
 - `_phone: string` 
 - `_items: ICardItem[]` 
 - `_formErrors: IFormErrors`

Методы:
- `set/get payment`
- `set/get address`
- `set/get email`
- `set/get phone`
- `set/get items`
- `validateOrder(): void`- Проверка полей формы
- `clearOrder(): void` - Обнуляем поля заказа
- `validatePayment(): void` - Проверяем способ оплаты
- `validateAddress(): void` - Проверяем адрес доставки
- `validateEmail(): void` - Проверяем почту
- `validatePhone(): void` - Проверяем телефон
- `postOrder(): void` - Завершаем заказ


## Компоненты представления

### 1. Класс `Page`

Класс представления всей страницы. Позволяет задать:

- `_counter: HTMLElement`- элемент отображения количества товаров в корзине
- `_gallery: HTMLElement`- элемент отображения всех доступных карточек
- `_wrapper: HTMLElement` - обёртка, позволяющая блокировать прокрутку страницы при открытии модального окна
- `_basket: HTMLButtonElement`- кнопка для отображения корзины. Клик по кнопке вызывает событие `basket:open`

Методы:
- `set counter` - Устанавливаем количество лотов в корзине
- `set gallery` - Обновляем список карточек
- `set locked` - Обрабатываем блокировку страницы

### 2. Класс `Modal`

Класс представления модального окна. Позволяет задать

- `_content: HTMLElement` - для отображения внутреннего содержания модального окна
- `_closeButton: HTMLButtonElement` - для отображения кнопки закрытия модального окна

Привязывает события закрытие модального окна (`modal:close`) к кликам по кнопке закрытия формы и по родительскому контейнеру модального окна

Методы:
- `set content`
- `open(): void`- Показываем модальное окно
- `close(): void`- Закрываем модальное окно
- `render(data: IModalData): HTMLElement`
 

### 3. Класс `Basket`

Класс представления корзины. Позволяет задать:

- `_list: HTMLElement` - список отображаемых элементов в корзине
- `_total: HTMLElement` - общую ценность корзины
- `_button: HTMLElement` - кнопку открытия формы оформления заказа. Вызывает событие `order_payment:open`

Методы:
- `set items`
- `set total`
- `set valid`

### 4. Класс `Card`
- `_title: HTMLElement`
- `_image: HTMLImageElement`
- `_description: HTMLElement`
- `_button: HTMLButtonElement`
- `_price: HTMLElement`
- `_category: HTMLElement`

Методы:
- `set category`
- `set title`
- `set image`
- `set description`
- `set price`
- `set button`


### 5. Класс `BasketItem`

Класс представления элементов корзины. Позволяет задать:

- `_index: HTMLElement` - порядковый номер элемента в корзине
- `_title: HTMLElement` - название элемента в корзине
- `_price: HTMLElement` - стоимость элемента в корзине
- `_deleteBtn: HTMLButtonElement` - кнопка удаления элемента из корзины

Методы:
- `set index`
- `set title`
- `set price`

### 6. Класс `Form<T>`

Класс представления базовой формы. Позволяет задать:

- `_submit: HTMLButtonElement` - кнопку отправки формы
- `_errors: HTMLElement` - блок отображения ошибок в форме

Методы:
- `onInputChange(field: keyof T, value: string):void`-Генерируем событие при изменении в поле ввода
- `set valid`
- `set errors`
- `render(state: Partial<T> & IFormState):HTMLFormElement`
В данном классе на весь контейнер отображение привязываем событие отслеживание input, для вызова событий вида `container.field:change` и событие `container:submit`

### 6. Класс `DeliveryForm`

Класс представления, наследующийся от класса Form, для отображения формы оформления заказа с информацией об способе оплаты с адресом доставки. Задаются следующие свойства:

- payment - способ оплаты
- address - адрес доставки
- `_paymentContainer: HTMLDivElement`   
- `_paymentButtons: HTMLButtonElement[]`

Методы:
- `set payment`
- `set address`
- `setClassPaymentMethod(className: string): void`

### 7. Класс `ContactsForm`

Класс представления, наследующийся от класса Form, для отображения формы оформления заказа с контактной информацией. Задаются следующие свойства:

- email - почта для связи
- phone - телефон для связи

Методы:
- `set phone`
- `set email`

### 8. Класс `Success`

Класс представления, определяющий отображение основной информации об оформленном заказе:

- total - общая сумма заказа (забираем из ответа сервера)
- `_close: HTMLElement`
- `_total: HTMLElement`

Метод:
- `set total`

## Внешние связи

### 1. LarekAPI

Класс взаимодействия с конкретным API-сервером. 
- `cdn: string(readonly)`

Методы:
- `getLotItem(String): Promise<ICardItem>` - для чтения информации по конкретному лоту
- `getCardList(): Promise<ICardItem[]> ` - для чтения информации по всем доступным лотам
- `orderLots(Order): Promise<IOrderResult> ` - оформления заказа через соответствующий запрос на сервер


## Ключевые типы данных

```
// Модель лота
interface CardItem {
	id: string; // идентификатор лота
	title: string; // заголовок лота
	description: string; // описание лота
	image: string; // полный путь до файла картинки лота
	category: ILotCategory; // категория лота
	price: number; // цена лота
	isOrdered: boolean; // признак включения в заказ
	placeInBasket: () => void; // добавляем лот в корзину
	removeFromBasket: () => void; // удаляем лот из корзины
}

// Модель заказа
interface IOrder {  // Модель заказа
	payment: IPaymentType; // способ оплаты
	address: string; // адрес доставки
	email: string; // почта для связи
	phone: string; // телефон для связи
	items: ICardItem[]; // объекты лотов в корзине
   formErrors: IFormErrors;  // массив ошибок у формы
	validateOrder(): void; // проверка полей формы
	clearOrder(): void; // обнуляем поля заказа
	validatePayment(): void; // проверяем способ оплаты
	validateAddress(): void; // проверяем адрес доставки
	validateEmail(): void; // проверяем почту
	validatePhone(): void; // проверяем телефон
	postOrder(): void; // завершаем заказ
}

interface IAppState {  // Модель приложения
   catalog: ICardItem[]; // доступные лоты
	basket: ICardItem[]; // лоты в корзине
	order: IOrder; // заказ
	preview: ICardItem; // лот для модального окна
	isLotInBasket(item: ICardItem): boolean; // проверка находится ли лот в корзине
	clearBasket(): void; // очищаем корзину
	getTotalAmount(): number; // получить стоимость корзины
	getBasketIds(): number; // получить список индексов в корзине
	getBasketLength(): number; // получить количество товаров в корзине
	initOrder(): IOrder; // инициализируем объект заказа}

// Все события в ларьке
enum Events {
	LOAD_LOTS = 'catalog:changed', // подгружаем доступные лоты
	OPEN_LOT = 'card:open', // открываем карточку лота для просмотра
	OPEN_BASKET = 'basket:open', // открываем корзину
	CHANGE_LOT_IN_BASKET = 'lot:changed', // добавляем/удаляем лот из корзины
	VALIDATE_ORDER = 'formErrors:changed', // проверяем форму отправки
	OPEN_FIRST_ORDER_PART = 'order_payment:open', // начинаем оформление заказа
	FINISH_FIRST_ORDER_PART = 'order:submit', // заполнили первую форму
	OPEN_SECOND_ORDER_PART = 'order_contacts:open', // продолжаем оформление заказа
	FINISH_SECOND_ORDER_PART = 'contacts:submit', // заполнили первую форму
	PLACE_ORDER = 'order:post', // завершаем заказ
	SELECT_PAYMENT = 'payment:changed', // выбираем способ оплаты
	INPUT_ORDER_ADDRESS = 'order.address:change', // изменили адрес доставки
	INPUT_ORDER_EMAIL = 'contacts.email:change', // изменили почту для связи
	INPUT_ORDER_PHONE = 'contacts.phone:change', // изменили телефон для связи
	OPEN_MODAL = 'modal:open', // блокировка при открытии модального окна
	CLOSE_MODAL = 'modal:close', // снятие блокировки при закрытии модального окна
}
```

## Cсылка на проект на github
https://github.com/ntovarnova/web-larek-frontend