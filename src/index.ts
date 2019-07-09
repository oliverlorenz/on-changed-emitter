import { OnUpdatedEmitter, UpdateData } from 'on-updated-emitter';

export class ChangeData extends UpdateData {}

export abstract class OnChangedEmitter extends OnUpdatedEmitter {
    constructor() {
        super();
        this.onUpdated((updateData) =>  {
            const isDataChanged = updateData.previousValue !== updateData.currentValue;
            if (isDataChanged) {
                this.emitChanged();
            }
        })
    }

    protected emitChanged(): void {
        this.emit(
            OnChangedEmitter.EVENT_CHANGED,
            new ChangeData(
                this.currentValue,
                this.previousUpdateValue
            )
        )
    }

    onChanged(callback: (changeData: ChangeData) => void): void {
        this.on(OnChangedEmitter.EVENT_CHANGED, callback);
    }

    onceChanged(callback: (changeData: ChangeData) => void): void {
        this.once(OnChangedEmitter.EVENT_CHANGED, callback);   
    }

    private static get EVENT_CHANGED() {
        return 'event_changed'; 
    }
}
