import type {BalanceSheet} from "$lib/finapi/BalanceSheet";
import type {IncomeStatement} from "$lib/finapi/IncomeStatement";
import type {CashFlowStatement} from "$lib/finapi/CashflowStatement";
import {CalculateFinancialRatios} from "$lib/finapi/Ratios";


export class FinancialData {

    ticker: string;
    BalanceSheet: BalanceSheet[];
    IncomeStatement: IncomeStatement[];
    CashFlowStatement: CashFlowStatement[];

    constructor(
        ticker: string,
        BalanceSheet: BalanceSheet[] = [],
        IncomeStatement: IncomeStatement[] = [],
        CashFlowStatement: CashFlowStatement[] = [],
    ) {
        this.ticker = ticker;
        this.BalanceSheet = BalanceSheet;
        this.IncomeStatement = IncomeStatement;
        this.CashFlowStatement = CashFlowStatement;
    }

    public static Open(json: string): FinancialData {
        const obj = JSON.parse(json);
        return new FinancialData(
            obj.ticker,
            obj.BalanceSheet,
            obj.IncomeStatement,
            obj.CashFlowStatement,
        );
    }

    public getTicker(): string {
        return this.ticker;
    }

    public getBalanceSheetYear(year: string): BalanceSheet | undefined {
        return this.BalanceSheet.find(balanceSheet => balanceSheet.calendarYear === year);
    }

    public getIncomeStatementYear(year: string): IncomeStatement {
        let res = this.IncomeStatement.find(incomeStatement => incomeStatement.calendarYear === year)
        if (res) return res;
        return {} as IncomeStatement;
    }

    public getCashFlowStatementYear(year: string): CashFlowStatement | undefined {
        return this.CashFlowStatement.find(cashFlowStatement => cashFlowStatement.calendarYear === year);
    }

    public download(){
        DownloadObjectAsJsonFile(this, this.ticker);
        GetAsCsv(this.ticker, "BalanceSheet", this.BalanceSheet);
        GetAsCsv(this.ticker, "IncomeStatement", this.IncomeStatement);
        GetAsCsv(this.ticker, "CashFlowStatement", this.CashFlowStatement);
    }

    public calculateRatios() {
        // Calculate ratios for each item in the array for each statement
        const ratios = this.BalanceSheet.map((balanceSheet, index) => {
            const incomeStatement = this.IncomeStatement[index];
            if (!incomeStatement) return null;
            if (incomeStatement.calendarYear !== balanceSheet.calendarYear) return null;
            return CalculateFinancialRatios(incomeStatement, balanceSheet);
        });

        // Remove any null values from the array
        const filteredRatios = ratios.filter(ratio => ratio !== null);

        // Return the array of ratios
        return filteredRatios;
    }

}

export function GetAsCsv(ticker:string, type:string, objs: object[]) {
    //current date and time
    const today = new Date();

    // Start with an array to hold all CSV lines
    const csvRows = [];

    // Add the header row with column titles
    if (objs.length > 0) {
        csvRows.push(Object.keys(objs[0]).join(','));
    }

    // Add each income statement as a row
    objs.forEach(ob => {
        const values = Object.values(ob).map((value) =>
            typeof value === 'string' && value.includes(',') ? `"${value}"` : String(value)
        );
        csvRows.push(values.join(','));
    });

    // Combine all rows into a single string with new lines
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    // Set the download filename for the CSV
    link.setAttribute('href', url);
    link.setAttribute('download', `${ticker}-${type}-${today.toISOString().slice(0,10)}.csv`);

    // Trigger the download
    document.body.appendChild(link); // Required for Firefox
    link.click();

    // Clean up the DOM
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Free up memory by releasing the object URL
}

export const DownloadObjectAsJsonFile = (exportObj: any, exportName: string) => {
    // Create a new Blob with the JSON data
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], {
        type: 'application/json'
    });

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute to the filename
    link.download = exportName + '.finomp';

    // Create a URL for the blob
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Simulate a click on the link
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
}