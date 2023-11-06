import {Property} from "$lib/finapp/Properties";
import {Type} from 'class-transformer';
import 'reflect-metadata';
import 'es6-shim';

export class CashFlowStatement {
    // @ts-ignore
    @Type(() => Property)
        // Array of IncomeStatementProperty objects
    properties: Property[] = [
        new Property("Date", "Metadata", "date", undefined),
        new Property("Symbol", "Metadata", "symbol", undefined),
        new Property("Reported Currency", "Metadata", "reportedCurrency", undefined),
        new Property("CIK", "Metadata", "cik", undefined),
        new Property("Filling Date", "Metadata", "fillingDate", undefined),
        new Property("Accepted Date", "Metadata", "acceptedDate", undefined),
        new Property("Calendar Year", "Metadata", "calendarYear", undefined),
        new Property("Period", "Metadata", "period", undefined),
        new Property("Net Income", "Financial", "netIncome", undefined),
        new Property("Depreciation and Amortization", "Financial", "depreciationAndAmortization", undefined),
        new Property("Deferred Income Tax", "Financial", "deferredIncomeTax", undefined),
        new Property("Stock Based Compensation", "Financial", "stockBasedCompensation", undefined),
        new Property("Change In Working Capital", "Financial", "changeInWorkingCapital", undefined),
        new Property("Accounts Receivables", "Financial", "accountsReceivables", undefined),
        new Property("Inventory", "Financial", "inventory", undefined),
        new Property("Accounts Payables", "Financial", "accountsPayables", undefined),
        new Property("Other Working Capital", "Financial", "otherWorkingCapital", undefined),
        new Property("Other Non-Cash Items", "Financial", "otherNonCashItems", undefined),
        new Property("Net Cash Provided by Operating Activities", "Financial", "netCashProvidedByOperatingActivities", undefined),
        new Property("Investments in Property Plant and Equipment", "Financial", "investmentsInPropertyPlantAndEquipment", undefined),
        new Property("Acquisitions Net", "Financial", "acquisitionsNet", undefined),
        new Property("Purchases of Investments", "Financial", "purchasesOfInvestments", undefined),
        new Property("Sales Maturities of Investments", "Financial", "salesMaturitiesOfInvestments", undefined),
        new Property("Other Investing Activities", "Financial", "otherInvestingActivites", undefined),
        new Property("Net Cash Used for Investing Activities", "Financial", "netCashUsedForInvestingActivites", undefined),
        new Property("Debt Repayment", "Financial", "debtRepayment", undefined),
        new Property("Common Stock Issued", "Financial", "commonStockIssued", undefined),
        new Property("Common Stock Repurchased", "Financial", "commonStockRepurchased", undefined),
        new Property("Dividends Paid", "Financial", "dividendsPaid", undefined),
        new Property("Other Financing Activities", "Financial", "otherFinancingActivites", undefined),
        new Property("Net Cash Used/Provided by Financing Activities", "Financial", "netCashUsedProvidedByFinancingActivities", undefined),
        new Property("Effect of Forex Changes on Cash", "Financial", "effectOfForexChangesOnCash", undefined),
        new Property("Net Change in Cash", "Financial", "netChangeInCash", undefined),
        new Property("Cash at End of Period", "Financial", "cashAtEndOfPeriod", undefined),
        new Property("Cash at Beginning of Period", "Financial", "cashAtBeginningOfPeriod", undefined),
        new Property("Operating Cash Flow", "Financial", "operatingCashFlow", undefined),
        new Property("Capital Expenditure", "Financial", "capitalExpenditure", undefined),
        new Property("Free Cash Flow", "Financial", "freeCashFlow", undefined),
        new Property("Link", "Metadata", "link", undefined),
        new Property("Final Link", "Metadata", "finalLink", undefined),
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
    public deserialize(input: any): CashFlowStatement {
        console.log("IncomeStatement.deserialize()", input);
        let obj = new CashFlowStatement();
        obj.properties.forEach(property => {
            property.rawDataValue = (input as CashFlowStatement).properties.find(p => p.rawDataName === property.rawDataName)?.rawDataValue;
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
    // GetFinancial()
    public GetFinancial() : Property[] {
        return this.properties.filter(property => property.group === "Financial");
    }
    // GetIncomeStatement()
    public GetIncomeStatement() : Property[] {
        return this.properties;
    }
}