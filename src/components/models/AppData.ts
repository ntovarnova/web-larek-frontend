//import _ from 'lodash';
import { Model } from '../base/Model';
import { ICardItem, IAppState, Events, IOrder } from '../../types';
import { IEvents } from '../base/Events';
import { Order } from './Order';
import { CardItem } from './CardItem';

export class AppState extends Model<IAppState> {
	private _catalog: ICardItem[];
	private _order: IOrder;
	private _preview: ICardItem;

	constructor(data: Partial<IAppState>, events: IEvents) {
		super(data, events);
	}

	set catalog(items: ICardItem[]) {
		this._catalog = items.map((item) => new CardItem(item, this.events));
		this.emitChanges(Events.LOAD_LOTS, { catalog: this.catalog });
	}

	get catalog(): ICardItem[] {
		return this._catalog;
	}

	get basket(): ICardItem[] {
		return this._catalog.filter((item) => item.isOrdered);
	}

	get order(): IOrder {
		return this._order;
	}

	get preview(): ICardItem {
		return this._preview;
	}

	set preview(value: ICardItem) {
		this._preview = value;
		this.emitChanges('preview:changed', this.preview);
	}

	isLotInBasket(item: ICardItem): boolean {
		return item.isOrdered;
	}

	clearBasket(): void {
		this.basket.forEach((lot) => lot.removeFromBasket());
	}

	getTotalAmount(): number {
		return this.basket.reduce((a, c) => a + c.price, 0);
	}

	getBasketIds(): string[] {
		return this.basket.map((item) => item.id);
	}

	getBasketLength(): number {
		return this.basket.length;
	}

	initOrder(): IOrder {
		this._order = new Order({}, this.events);
		this.order.clearOrder();
		return this.order;
	}
}
