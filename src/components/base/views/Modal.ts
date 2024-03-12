import { Component } from "../ base/Component";
import {ensureElement} from "../../../utils/utils";
import {IEvents} from "../ base/Events";
import { Events } from "../../../types";

interface IModalData {
    content: HTMLElement;
}

export class Modal extends Component<IModalData> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container,events);

        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        
		[this._closeButton, this.container].forEach((element) => {
			element.addEventListener('click', () => {
				this.close();
				this.events.emit(Events.CLOSE_MODAL);
			});
		});
		this._content.addEventListener('click', (event) => event.stopPropagation());
        
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open(): void {
		this.toggleClass(this.container, 'modal_active', true);
		this.events.emit(Events.OPEN_MODAL);
	}
    
    close(): void {
		this.toggleClass(this.container, 'modal_active', false);
		this.content = null;
		this.events.emit(Events.CLOSE_MODAL);
	}
    

    render(data: IModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}