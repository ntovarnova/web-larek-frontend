 export type ILotCategory =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';


  export enum Events {
    LOAD_LOTS = 'catalog:changed' }

export interface ILotItem {
  id: string;
  description: string;
  title: string;
  image: string;
  category: ILotCategory;
  price:number | null;
}


export interface ILarek {
	isOrdered: boolean; // признак включения в заказ
	placeInBasket: () => void; // добавляем лот в корзину
	removeFromBasket: () => void; // удаляем лот из корзины
}

//export type IOrderForm = IOrderDeliveryForm & IOrderContactsForm;

//export interface IOrderAPI extends IOrderForm {
	//items: string[]; // индексы покупаемых лотов
	//total: number; // общая стоимость заказа
//}

export type IPaymentType = 'card' | 'cash';
//export type IFormErrors = Partial<Record<keyof IOrderForm, string>>;

export type CatalogChangeEvent = {
	catalog: ICardItem[];
};

export type ICardItem  = ILotItem ;// ILarek;

export interface IAppState {
	catalog: ICardItem[]; // доступные лоты
	basket: ICardItem[]; // лоты в корзине
	//order: IOrder; // заказ
	preview: ICardItem; // лот для модального окна
	isLotInBasket(item: ICardItem): boolean; // проверка находится ли лот в корзине
	clearBasket(): void; // очищаем корзину
	getTotalAmount(): number; // получить стоимость корзины
	getBasketIds(): number; // получить список индексов в корзине
	getBasketLength(): number; // получить количество товаров в корзине
	//initOrder(): IOrder; // инициализируем объект заказа
}