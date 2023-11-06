import {Property} from "$lib/finapp/Properties";
import type {ISerializable, Serializable} from "$lib/finapp/Json";
import {Type} from 'class-transformer';
import 'reflect-metadata';
import 'es6-shim';

export class IncomeStatement implements ISerializable<IncomeStatement>{
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
        new Property("Revenue", "Revenue", "revenue", undefined),
        new Property("Cost of Revenue", "Revenue", "costOfRevenue", undefined),
        new Property("Gross Profit", "Revenue", "grossProfit", undefined),
        new Property("Gross Profit Ratio", "Revenue", "grossProfitRatio", undefined),
        new Property("Research and Development Expenses", "Expenses", "researchAndDevelopmentExpenses", undefined),
        new Property("General and Administrative Expenses", "Expenses", "generalAndAdministrativeExpenses", undefined),
        new Property("Selling and Marketing Expenses", "Expenses", "sellingAndMarketingExpenses", undefined),
        new Property("Selling, General and Administrative Expenses", "Expenses", "sellingGeneralAndAdministrativeExpenses", undefined),
        new Property("Other Expenses", "Expenses", "otherExpenses", undefined),
        new Property("Operating Expenses", "Expenses", "operatingExpenses", undefined),
        new Property("Cost and Expenses", "Expenses", "costAndExpenses", undefined),
        new Property("Interest Income", "Income", "interestIncome", undefined),
        new Property("Interest Expense", "Income", "interestExpense", undefined),
        new Property("Depreciation and Amortization", "Income", "depreciationAndAmortization", undefined),
        new Property("EBITDA", "Income", "ebitda", undefined),
        new Property("EBITDA Ratio", "Income", "ebitdaratio", undefined),
        new Property("Operating Income", "Income", "operatingIncome", undefined),
        new Property("Operating Income Ratio", "Income", "operatingIncomeRatio", undefined),
        new Property("Total Other Income Expenses Net", "Income", "totalOtherIncomeExpensesNet", undefined),
        new Property("Income Before Tax", "Income", "incomeBeforeTax", undefined),
        new Property("Income Before Tax Ratio", "Income", "incomeBeforeTaxRatio", undefined),
        new Property("Income Tax Expense", "Income", "incomeTaxExpense", undefined),
        new Property("Net Income", "Income", "netIncome", undefined),
        new Property("Net Income Ratio", "Income", "netIncomeRatio", undefined),
        new Property("EPS", "Income", "eps", undefined),
        new Property("EPS Diluted", "Income", "epsdiluted", undefined),
        new Property("Weighted Average Shares Outstanding", "Income", "weightedAverageShsOut", undefined),
        new Property("Weighted Average Shares Outstanding Diluted", "Income", "weightedAverageShsOutDil", undefined),
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
    public deserialize(input: any): IncomeStatement {
        console.log("IncomeStatement.deserialize()", input);
        let obj = new IncomeStatement();
        obj.properties.forEach(property => {
            property.rawDataValue = (input as IncomeStatement).properties.find(p => p.rawDataName === property.rawDataName)?.rawDataValue;
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
    // GetRevenue()
    public GetRevenue() : Property[] {
        return this.properties.filter(property => property.group === "Revenue");
    }
    // GetExpenses()
    public GetExpenses() : Property[] {
        return this.properties.filter(property => property.group === "Expenses");
    }
    // GetIncome()
    public GetIncome() : Property[] {
        return this.properties.filter(property => property.group === "Income");
    }
    // GetIncomeStatement()
    public GetIncomeStatement() : Property[] {
        return this.properties;
    }
}