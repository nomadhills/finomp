import {Property} from "$lib/finapp/Properties";
import {Type} from 'class-transformer';
import 'reflect-metadata';
import 'es6-shim';

export class KeyMetrics {
    // @ts-ignore
    @Type(() => Property)

    properties = {
        revenuePerShare : () => {
            return new Property(
                "Revenue Per Share",
                "revenuePerShare",
                "revenuePerShare",
                this.GetProperty("revenuePerShare"),
                "currency"
            );
        },
        netIncomePerShare : () => {
            return new Property(
                "Net Income Per Share",
                "netIncomePerShare",
                "netIncomePerShare",
                this.GetProperty("netIncomePerShare"),
                "currency"
            );
        },
        operatingCashFlowPerShare : () => {
            return new Property(
                "Operating Cash Flow Per Share",
                "operatingCashFlowPerShare",
                "operatingCashFlowPerShare",
                this.GetProperty("operatingCashFlowPerShare"),
                "currency"
            );
        },
        freeCashFlowPerShare : () => {
            return new Property(
                "Free Cash Flow Per Share",
                "freeCashFlowPerShare",
                "freeCashFlowPerShare",
                this.GetProperty("freeCashFlowPerShare"),
                "currency"
            );
        }
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