export class ActionService {
    private _action: () => void;

    public static elementTrigger(triggerElement: HTMLElement): ActionService {
        const actioner: ActionService = new ActionService();

        triggerElement.addEventListener('click', () => {
            actioner.trigger();
        });

        return actioner;
    }

    public setAction(action: () => void): void {
        this._action = action;
    }

    public trigger(): void {
        this._action();
    }
}
