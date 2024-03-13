import { Events, ILotCategory, ICardItem } from '../../types';
import { Model } from '../base/Model';

export class CardItem extends Model<ICardItem> {
	description: string;
	id: string;
	image: string;
	title: string;
	category: ILotCategory;
	price: number | null;
	isOrdered: boolean;

	placeInBasket(): void {
		this.isOrdered = true;
		this.emitChanges(Events.CHANGE_LOT_IN_BASKET, {
			isOrdered: this.isOrdered,
		});
	}

	removeFromBasket() {
		this.isOrdered = false;
		this.emitChanges(Events.CHANGE_LOT_IN_BASKET, {
			isOrdered: this.isOrdered,
		});
	}
}
