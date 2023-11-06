import {Type} from 'class-transformer';
import 'reflect-metadata';
import 'es6-shim';
export class Property {
    name: string;
    group: string;
    rawDataName: string;
    rawDataValue: string | number | undefined;
    rawValueType: "percent" | "currency" | "number" | "string" = "string";
    constructor(
        name: string,
        group: string,
        rawDataName: string,
        rawDataValue: string | number | undefined,
        rawValueType: "percent" | "currency" | "number" | "string" = "string",
    ) {
        this.name = name;
        this.group = group;
        this.rawDataName = rawDataName;
        this.rawDataValue = rawDataValue;
        this.rawValueType = rawValueType;
    }
    public GetValueAsCurrency() : number | string | undefined {

        // If the value is not a number, return it as is
        if (isNaN(Number(this.rawDataValue))) {
            return this.rawDataValue;
        }

        let num = Number(this.rawDataValue);

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(num);
    }
}