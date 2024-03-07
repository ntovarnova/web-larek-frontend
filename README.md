# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
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
/////

## Описание данных

1. interface IProductItem
Интерфейс служит для типизации карточки товара, которая хранит id карточки, описание товара - description, изображение товара - image, название товара - title, категорию товара - category, цену товара - price.

2. interface IProductList
Интерфейст служит для типизации списка карточек и содержит общее количество карточек, и массив этих карточек

3. interface IError
Интерфейс служит для типизации объекта, который хранит ошибку, возникающую, если карточка не найдена на сервере

4. interface IAddressForm
Интерфейс служит для типизации данных покупателя и хранит вводимый при оформлении заказа адрес и выбранный способ оплаты

5. interface IContactsForm
Интерфейс служит для типизации данных покупателя и хранит вводимые при оформлении заказа адрес электронной почты и телефон

6. interface IOrderRequest
Интерфейс включает в себя параметры интерфейсов IAddressForm, IContactsForm, а также хранит сумму заказа и список заказанных товаров. Служит для типизации данных, отправляемых на сервер при оформлении заказа

7. interface IOrderResult
Интерфейс служит для типизации объекта, который  хранит id заказа и общую сумму заказа

8. type ContactsFormErrors
Тип служит для типизации объекта, хранящего данные об ошибке заполнения контактных данных

9. type AddressFormErrors
Тип служит для типизации объекта, хранящего данные об ошибке заполнения адреса доставки

## Модели данных

1. interface IBasketModel
Интерфес служит для типизации класса BasketModel
Класс BasketModel служит для хранения карточек купленных товаров и работы с ними:

    items: Set<string> - массив карточек купленных товаров
    add(id: string): void - добавляет карточку в массив при нажатии кнопки купить на карточке
    remove(id: string): void - удаляет карточку из массива при нажатии кнопки удаления товара в корзине

2. interface IOrderModel
Интерфейс служит для типизации класса OrderModel
Класс OrderModel служит для хранения данных покупателя

    addAddress(address: string): void - добавляет адрес доставки в данные опокупателе
    addPhone(phone: string): void - добавляет телефон в данные опокупателе
    addEmail(email: string): void - добавляет email в данные опокупателе
    addPayment(payment: 'online' | 'upon receipt'): void - добавляет выбранный способ оплаты в данные опокупателе


## Компоненты представления

1. interface ICardComponent 
Интерфейс служит для типизации класса CardComponent.
На основании данных карточки IProductItem и необходимого темплейта с помощью метода createCard класс будет возвращать необходимую разметку карточки

     openModal(): void - при нажатии на карточку будет открывать модальное оконо этой карточки

2. interface IModalComponent
Интерфейc, содержащий общие методы для всех модальных окон
    close(): void - закрывает модальное окно
    submit(): void - отправляет данные о пользователе 

Служит для типизации класса CardPopupComponent

3. interface IBasketComponent
Интерфейс для типизации класса BasketComponent

   remove(id: string): void - удаляет выбранную карточку из корзины

4. interface IAddressComponent
Интерфейс служит для типизации класса AddressComponent

    toggle(payment: 'online' | 'upon receipt'): void - переключает способ оплаты
    errors: AddressFormErrors - выводит ошибку, если поле адреса не заполнено; делает кнопку Далее активной, если поле заполнено
    checkAddress(address: string): void - проверяет правильность заполнения адреса

5. interface IContactsComponent
Интерфейс служит для типизации класса ContactsComponentextends
    errors: ContactsFormErrors - выводит ошибку, если поля email и телефон не заполнены; делает кнопку Оплатить активной, если поле заполнено
    checkEmail(email: string): void - проверяет правильность заполнения поля email
    checkPhone(phone: string): void - проверяет правильность заполнения поля Телефон

6. interface ISucсessComponent
Интерфейст служит для типизации класса SucсessComponent
    close(): void - закрывает модальное окно при нажатии на кнопку  За новыми покупками
 