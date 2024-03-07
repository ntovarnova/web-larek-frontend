import { Component } from "./component";
import { IEvents } from "./ base/events";
import { ensureElement } from "../../utils/utils";

interface IPage {
    counter: number;
    galery: HTMLElement[];
    locked: boolean;
}

export class Page extends Component<IPage> {
    protected _counter: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;
    protected _gallery: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._counter = ensureElement<HTMLElement>('.header__basket-counter');
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._basket = ensureElement<HTMLElement>('.header__basket');
        this._gallery = ensureElement<HTMLElement>('.gallery');

        this._basket.addEventListener('click', () => {
            this.events.emit('bids:open');
        });
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set galery(items: HTMLElement[]) {
		this._gallery.replaceChildren(...items);
	}

    set locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	}
}