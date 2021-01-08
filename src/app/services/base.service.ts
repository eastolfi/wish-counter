import { DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';

export class BaseService {
    protected toClass<T>(fireItem: DocumentChangeAction<T>[] | DocumentSnapshot<T>): T[] | T {
        if (fireItem instanceof Array) {
            return (fireItem as DocumentChangeAction<T>[]).map(this.changeActionToClass);
        } else {
            return this.documentToClass(fireItem as DocumentSnapshot<T>);
        }
    }

    private changeActionToClass<T>({ payload }: DocumentChangeAction<T>): T {
        return {
            id: payload.doc.id,
            ...payload.doc.data()
        } as T;
    }

    private documentToClass<T>(doc: DocumentSnapshot<T>): T {
        return {
            id: doc.id,
            ...doc.data()
        } as T;
    }
}
