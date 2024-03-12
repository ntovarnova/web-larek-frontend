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

Приложение реализовано по MVP архитектуре и состоит из компонентов:

Компонент Описание Базовый класс Связанный класс
1. Model Модель данных Model
   AppData
   Order
   CardItem
2. View Модель отображения Component
   Page
   Modal
   Basket
   Card
   BasketItem
   Form
   ContactsForm
   DeliveryForm
   Success
3. Presenter Модель связи - Реализуется в файле index.ts
   В приложении используется событийно-ориентированный подход. В качестве инструмента, который обеспечивает данных подход, выступает EventEmitter.

Базовый код

1. Класс Api
   Базовый класс доступа к веб-серверу, который реализует 2 типа основных операций: безопасные (GET) и небезопасные (POST, DELETE)

2. Класс Components
   Базовый класс для наследования модели отображения. Реализует базовые элементы работы с элементами, такие как переключение классов, установка текста у элемента и т.д.

3. Класс EventEmitter
   Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события.

Класс имеет методы on, off, emit — для подписки на событие, отписки от события и уведомления подписчиков о наступлении события соответственно.

Дополнительно реализованы методы onAll и offAll — для подписки на все события и сброса всех подписчиков.

4. Класс Model
   Базовый класс для компонентов модели данных. Позволяем связать переданный данные со свойствами объекта (реализуется в конструкторе) и инициализировать вызов именованных событий через метод emitChanges.

Компоненты модели данных (бизнес-логика)

1. Класс AppState
   Класс данных всего приложения. Позволяет отслеживать состояние всего приложения. Содержит внутри себя свойство:

catalog - для отслеживания списка доступных лотов - установка данного свойства вызывает событие catalog:changed
basket - отслеживание лотов, которые находятся в корзине.
order - отслеживает состояние заказа
preview - отслеживает лот, который используется для подробного изучения в модальном окне
Также реализует дополнительные методы для доступа к методам перечисленных выше свойств

2. Класс CardItem
   Класс данных отдельной карточки. Структура карточки определяется ответом от API - сервера с добавлением свойства и методов, реализующих логику взаимодействия с корзиной через вызов события lot:changed

3. Класс Order
   Класс данных процесса оформления заказа. Содержит свойства, которые отображаются на полях соответствующих форм и реализует простейшую логику валидации свойств на наличие значений. Изменения в любом из свойств вызывают проверку всех полей и генерации события formErrors:changed

Компоненты представления

1. Класс Page
   Класс представления всей страницы. Позволяет задать:

counter - элемент отображения количества товаров в корзине
gallery - элемент отображения всех доступных карточек
wrapper - обёртка, позволяющая блокировать прокрутку страницы при открытии модального окна
basket - кнопка для отображения корзины. Клик по кнопке вызывает событие basket:open 2. Класс Modal
Класс представления модального окна. Позволяет задать

content - для отображения внутреннего содержания модального окна
closeButton - для отображения кнопки закрытия модального окна
Привязывает события закрытие модального окна (modal:close) к кликам по кнопке закрытия формы и по родительскому контейнеру модального окна

3. Класс Basket
   Класс представления корзины. Позволяет задать:

list - список отображаемых элементов в корзине
total - общую ценность корзины
button - кнопку открытия формы оформления заказа. Вызывает событие order_payment:open 4. Класс Card 5. Класс BasketItem
Класс представления элементов корзины. Позволяет задать:

index - порядковый номер элемента в корзине
title - название элемента в корзине
price - стоимость элемента в корзине
deleteBtn - кнопка удаления элемента из корзины 6. Класс Form
Класс представления базовой формы. Позволяет задать:

submit - кнопку отправки формы
errors - блок отображения ошибок в форме
В данном классе на весь контейнер отображение привязываем событие отслеживание input, для вызова событий вида container.field:change и событие container:submit

6. Класс DeliveryForm
   Класс представления, наследующийся от класса Form, для отображения формы оформления заказа с информацией об способе оплаты с адресом доставки. Задаются следующие свойства:
payment - способ оплаты
address - адрес доставки 

7. Класс ContactsForm
Класс представления, наследующийся от класса Form, для отображения формы оформления заказа с контактной информацией. Задаются следующие свойства:
email - почта для связи
phone - телефон для связи

 8. Класс Success
Класс представления, определяющий отображение основной информации об оформленном заказе:
total - общая сумма заказа (забираем из ответа сервера)
Внешние связи