import { IOrderDeliveryForm } from '../components/base/views/DeliveryForm';
import { IOrderContactsForm } from '../components/base/views/ContactsForm';

export type ILotCategory =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export enum Events {
	LOAD_LOTS = 'catalog:changed', 
	OPEN_LOT = 'card:open', 
	OPEN_BASKET = 'basket:open', 
	CHANGE_LOT_IN_BASKET = 'lot:changed', 
	VALIDATE_ORDER = 'formErrors:changed', 
	OPEN_FIRST_ORDER_PART = 'order_payment:open', 
	FINISH_FIRST_ORDER_PART = 'order:submit', 
	OPEN_SECOND_ORDER_PART = 'order_contacts:open', 
	FINISH_SECOND_ORDER_PART = 'contacts:submit', 
	PLACE_ORDER = 'order:post', 
	SELECT_PAYMENT = 'payment:changed', 
	INPUT_ORDER_ADDRESS = 'order.address:change', 
	INPUT_ORDER_EMAIL = 'contacts.email:change', 
	INPUT_ORDER_PHONE = 'contacts.phone:change', 
	OPEN_MODAL = 'modal:open', 
	CLOSE_MODAL = 'modal:close', 
}

export interface ILotItem {
	id: string;
	description: string;
	title: string;
	image: string;
	category: ILotCategory;
	price: number | null;
}

export interface ILarek {
	isOrdered: boolean; 
	placeInBasket: () => void; 
	removeFromBasket: () => void; 
}

export type ICardItem = ILotItem & ILarek;

export type IPaymentType = 'card' | 'cash';

export type IOrderForm = IOrderDeliveryForm & IOrderContactsForm;

export interface IOrderAPI extends IOrderForm {
	items: string[]; 
	total: number; 
}

export interface IOrder extends IOrderForm {
	items: ICardItem[]; 
	validateOrder(): void; 
	clearOrder(): void; 
	validatePayment(): void; 
	validateAddress(): void; 
	validateEmail(): void; 
	validatePhone(): void; 
	postOrder(): void; 
}

export type IFormErrors = Partial<Record<keyof IOrderForm, string>>;

export type CatalogChangeEvent = {
	catalog: ICardItem[];
};

export type IBasketItem = Pick<ICardItem, 'id' | 'title' | 'price'>;

export interface IAppState {
	catalog: ICardItem[]; 
	basket: ICardItem[]; 
	order: IOrder; 
	preview: ICardItem; 
	isLotInBasket(item: ICardItem): boolean; 
	clearBasket(): void; 
	getTotalAmount(): number; 
	getBasketIds(): number; 
	getBasketLength(): number; 
	initOrder(): IOrder; 
}
