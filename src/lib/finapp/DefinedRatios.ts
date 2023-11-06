import {Property} from "$lib/finapp/Properties";
import {Type} from 'class-transformer';
import 'reflect-metadata';
import 'es6-shim';

export class DefinedRatios {
    // @ts-ignore
    @Type(() => Property)
    properties = {

    }

    rawData: any;
    public Load(rawData: any = null) : void {
        this.rawData = rawData;
    }
    // getProperty()
    public GetProperty(propertyRawName: string) : any{
        return this.rawData[propertyRawName];
    }
    // GetYear()
    public GetYear() : number {
        return this.GetProperty("calendarYear");
    }
}