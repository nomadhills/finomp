export interface ISerializable<T> {
    deserialize(input: Object): T;
}

export class Serializable<T> implements ISerializable<T> {
    deserialize(input: Object): T {
        return Object.assign(this, input ) as T;

        return Object.assign(
            Object.create(
                this,
            ), input ) as T;
    }
}


