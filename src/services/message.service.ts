export class MessageService {
    private _element: HTMLElement;

    constructor(element: HTMLElement) {
        this._element = element;
    }

    public set(message: string): void {
        this._element.innerText = message;
    }
}
