import { IEvents } from '../ base/Events';
import { Form } from './Form';


export interface IOrderContactsForm {
	email: string; 
	phone: string; 
}


export class ContactsForm extends Form<IOrderContactsForm> {
	
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}
