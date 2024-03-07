
import { Model } from "./Model";
import {ILotCategory,ICardItem, IAppState ,Events} from  "../../types";
import { IEvents } from "./ base/events";
export type CatalogChangeEvent = {
    catalog: CardItem[]
};

export class CardItem extends Model<ICardItem> {
    description: string;
    id: string;
    image: string;
    title: string;
    category: ILotCategory;
    price: number | null;
    isOrdered: boolean;
}
   

export class AppState extends Model<IAppState> {
    private _catalog: ICardItem[];
	//private _order: IOrder;
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

}
    