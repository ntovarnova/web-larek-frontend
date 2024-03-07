import { ApiListResponse,Api } from "./ base/api";
import { ICardItem} from "../../types";

export interface ILarekAPI {
    getCardList: () => Promise<ICardItem[]>;
    getLotItem: (id: string) => Promise<ICardItem>;
   // orderLots: (order: IOrderAPI) => Promise<IOrderResult>;
}


export interface IOrderResult {
	id: string;
	total: number;
}

export class LarekAPI extends Api implements ILarekAPI {
    private readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getCardList(): Promise<ICardItem[]> {
        return this.get('/product/').then((data: ApiListResponse<ICardItem>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }
    getLotItem(id: string): Promise<ICardItem> {
        return this.get(`/product/$ {id}`).then(
            (item: ICardItem) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    //orderLots(order: IOrderAPI): Promise<IOrderResult> {
       // return this.post('/order', order).then(
           // (data: IOrderResult) => data
       // );
   // }

}