import {Property} from "$lib/finapp/Properties";
import {Type} from 'class-transformer';
import 'reflect-metadata';
import 'es6-shim';

export class BalanceSheet {
    // @ts-ignore
    @Type(() => Property)
        // Array of IncomeStatementProperty objects
    properties: Property[] = [
        new Property("Date", "Metadata", "date", undefined),
        new Property("Calendar Year", "Metadata", "calendarYear", undefined),
        new Property("Symbol", "Metadata", "symbol", undefined),
        new Property("Reported Currency", "Metadata", "reportedCurrency", undefined),
        new Property("Filling Date", "Metadata", "fillingDate", undefined),
        new Property("Accepted Date", "Metadata", "acceptedDate", undefined),
        new Property("Period", "Metadata", "period", undefined),
        new Property("Cash and Cash Equivalents", "Assets", "cashAndCashEquivalents", undefined),
        new Property("Short-Term Investments", "Assets", "shortTermInvestments", undefined),
        new Property("Cash and Short-Term Investments", "Assets", "cashAndShortTermInvestments", undefined),
        new Property("Net Receivables", "Assets", "netReceivables", undefined),
        new Property("Inventory", "Assets", "inventory", undefined),
        new Property("Other Current Assets", "Assets", "otherCurrentAssets", undefined),
        new Property("Total Current Assets", "Assets", "totalCurrentAssets", undefined),
        new Property("Property, Plant & Equipment Net", "Assets", "propertyPlantEquipmentNet", undefined),
        new Property("Goodwill", "Assets", "goodwill", undefined),
        new Property("Intangible Assets", "Assets", "intangibleAssets", undefined),
        new Property("Goodwill and Intangible Assets", "Assets", "goodwillAndIntangibleAssets", undefined),
        new Property("Long-Term Investments", "Assets", "longTermInvestments", undefined),
        new Property("Tax Assets", "Assets", "taxAssets", undefined),
        new Property("Other Non-Current Assets", "Assets", "otherNonCurrentAssets", undefined),
        new Property("Total Non-Current Assets", "Assets", "totalNonCurrentAssets", undefined),
        new Property("Other Assets", "Assets", "otherAssets", undefined),
        new Property("Total Assets", "Assets", "totalAssets", undefined),
        new Property("Account Payables", "Liabilities", "accountPayables", undefined),
        new Property("Short-Term Debt", "Liabilities", "shortTermDebt", undefined),
        new Property("Tax Payables", "Liabilities", "taxPayables", undefined),
        new Property("Deferred Revenue", "Liabilities", "deferredRevenue", undefined),
        new Property("Other Current Liabilities", "Liabilities", "otherCurrentLiabilities", undefined),
        new Property("Total Current Liabilities", "Liabilities", "totalCurrentLiabilities", undefined),
        new Property("Long-Term Debt", "Liabilities", "longTermDebt", undefined),
        new Property("Deferred Revenue Non-Current", "Liabilities", "deferredRevenueNonCurrent", undefined),
        new Property("Deferred Tax Liabilities Non-Current", "Liabilities", "deferredTaxLiabilitiesNonCurrent", undefined),
        new Property("Other Non-Current Liabilities", "Liabilities", "otherNonCurrentLiabilities", undefined),
        new Property("Total Non-Current Liabilities", "Liabilities", "totalNonCurrentLiabilities", undefined),
        new Property("Other Liabilities", "Liabilities", "otherLiabilities", undefined),
        new Property("Total Liabilities", "Liabilities", "totalLiabilities", undefined),
        new Property("Common Stock", "Shareholders Equity", "commonStock", undefined),
        new Property("Retained Earnings", "Shareholders Equity", "retainedEarnings", undefined),
        new Property("Accumulated Other Comprehensive Income Loss", "Shareholders Equity", "accumulatedOtherComprehensiveIncomeLoss", undefined),
        new Property("Other Total Shareholders Equity", "Shareholders Equity", "otherTotalShareholdersEquity", undefined),
        new Property("Total Shareholders Equity", "Shareholders Equity", "totalShareholdersEquity", undefined),
        new Property("Total Liabilities and Stockholders Equity", "Shareholders Equity", "totalLiabilitiesAndStockholdersEquity", undefined),


    ];
    rawData: any;
    // Constructor
    // constructor(rawData: any) {
    //     if (rawData != undefined) {
    //         this.properties.forEach(property => {
    //             property.rawDataValue = rawData[property.rawDataName];
    //         });
    //     }
    // }
    public Load(rawData: any = null) : void {
        if (rawData == null) {
            rawData = this.rawData;
        }else{
            this.rawData = rawData;
        }
        this.properties.forEach(property => {
            property.rawDataValue = rawData[property.rawDataName];
        });
    }
    // Serialize()
    public deserialize(input: any): BalanceSheet {
        console.log("IncomeStatement.deserialize()", input);
        let obj = new BalanceSheet();
        obj.properties.forEach(property => {
            property.rawDataValue = (input as BalanceSheet).properties.find(p => p.rawDataName === property.rawDataName)?.rawDataValue;
        });

        return obj;
    }

    // getProperty()
    public GetProperty(propertyRawName: string) : Property {
        return this.properties.find(property => property.rawDataName === propertyRawName) ||
            new Property("", "", "", 0);
    }
    // GetYear()
    public GetYear() : number {
        return this.properties.find(property => property.group === "Metadata" && property.rawDataName === "calendarYear")?.rawDataValue as number;
    }
    // GetMetadata()
    public GetMetadata() : Property[] {
        return this.properties.filter(property => property.group === "Metadata");
    }
    // GetAssets()
    public GetAssets() : Property[] {
        return this.properties.filter(property => property.group === "Assets");
    }
    // GetLiabilities()
    public GetLiabilities() : Property[] {
        return this.properties.filter(property => property.group === "Liabilities");
    }
    // GetShareholdersEquity()
    public GetShareholdersEquity() : Property[] {
        return this.properties.filter(property => property.group === "Shareholders Equity");
    }
    // GetTotalAssets()
    public GetTotalAssets() : number {
        return this.GetProperty("totalAssets").rawDataValue as number;
    }
}