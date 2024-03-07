import { Component } from "../component";
import {cloneTemplate, createElement, ensureElement} from "../../../utils/utils";
import {EventEmitter} from "../ base/events";
import { formatSinaps } from "../../../utils/utils";
interface IBasketView {
    items: HTMLElement[];
    total: number;
    valid: boolean;
}

 export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
     protected _total: HTMLElement;
    protected _button: HTMLElement;

     constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

       this._list = ensureElement<HTMLElement>('.basket__list', this.container);
         this._total = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');

        if (this._button) {
             this._button.addEventListener('click', () => {
                 events.emit('order:open');
             });
        }

        this.items = [];
    }

     set items(items: HTMLElement[]) {
        if (items.length) {
             this._list.replaceChildren(...items);
         } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set total(total: number) { 		this.setText(this._total, formatSinaps(total));
 	}
    set valid(value: boolean){
		this.setDisabled(this._button, !value);
	}
}