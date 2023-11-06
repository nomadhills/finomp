import type {IncomeStatement} from "$lib/finapp/IncomeStatement";
import type {BalanceSheet} from "$lib/finapp/BalanceSheet";
import type {CashFlowStatement} from "$lib/finapp/CashFlowStatement";

export class Ratios {

    incomeStatement?: IncomeStatement;
    balanceSheet?: BalanceSheet;
    cashFlowStatement?: CashFlowStatement;

    constructor(incomeStatement?: IncomeStatement, balanceSheet?: BalanceSheet, cashFlowStatement?: CashFlowStatement) {
        this.incomeStatement = incomeStatement;
        this.balanceSheet = balanceSheet;
        this.cashFlowStatement = cashFlowStatement;
    }

    private getIncomeStatementProperty(propertyName: string): number {
        let v = this.incomeStatement?.GetProperty(propertyName)?.rawDataValue
        if (v === undefined) {
            return 0;
        }
        if (typeof v === "string") {
            return Number(v);
        }
        return v;
    }

    private getBalanceSheetProperty(propertyName: string): number {
        let v = this.balanceSheet?.GetProperty(propertyName)?.rawDataValue
        if (v === undefined) {
            return 0;
        }
        if (typeof v === "string") {
            return Number(v);
        }
        return v;
    }

    private getCashFlowStatementProperty(propertyName: string): number {
        let v = this.cashFlowStatement?.GetProperty(propertyName)?.rawDataValue
        if (v === undefined) {
            return 0;
        }
        if (typeof v === "string") {
            return Number(v);
        }
        return v;
    }

    // Assuming the existence of a GetProperty method on the statements which extracts the value.
    public liquidityRatios() {
        const currentRatio = (): number => {
            const totalCurrentAssets = this.getBalanceSheetProperty("totalCurrentAssets");
            const totalCurrentLiabilities = this.getBalanceSheetProperty("totalCurrentLiabilities");
            return totalCurrentAssets / totalCurrentLiabilities;
        }

        const quickRatio = (): number => {
            const quickAssets = this.getBalanceSheetProperty("totalCurrentAssets") - this.getBalanceSheetProperty("inventory");
            const totalCurrentLiabilities = this.getBalanceSheetProperty("totalCurrentLiabilities");
            return quickAssets / totalCurrentLiabilities;
        }

        const netWorkingCapital = (): number => {
            const totalCurrentAssets = this.getBalanceSheetProperty("totalCurrentAssets");
            const totalCurrentLiabilities = this.getBalanceSheetProperty("totalCurrentLiabilities");
            return totalCurrentAssets - totalCurrentLiabilities;
        }

        return { currentRatio, quickRatio, netWorkingCapital };
    }

    public profitabilityRatios() {

        const profitMargin = (): number => {
            const netIncome = this.getIncomeStatementProperty("netIncome");
            const revenue = this.getIncomeStatementProperty("revenue");
            return netIncome / revenue;
        }

        const basicEarningPower = (): number => {
            const earningsBeforeTaxes = this.getIncomeStatementProperty("ebitda");
            const totalAssets = this.getBalanceSheetProperty("totalAssets");
            return earningsBeforeTaxes / totalAssets;
        }

        const returnOnAssets = (): number => {
            const netIncome = this.getIncomeStatementProperty("netIncome");
            const totalAssets = this.getBalanceSheetProperty("totalAssets");
            return netIncome / totalAssets;
        }

        const returnOnEquity = (): number => {
            const netIncome = this.getIncomeStatementProperty("netIncome");
            const totalShareholderEquity = this.getBalanceSheetProperty("totalStockholdersEquity");
            return netIncome / totalShareholderEquity;
        }



        const grossMarginRatio = (): number => {
            const grossProfit = this.getIncomeStatementProperty("grossProfit");
            const revenue = this.getIncomeStatementProperty("revenue");
            return grossProfit / revenue;
        }

        const operatingMarginRatio = (): number => {
            const operatingIncome = this.getIncomeStatementProperty("operatingIncome");
            const revenue = this.getIncomeStatementProperty("revenue");
            return operatingIncome / revenue;
        }

        return {profitMargin, basicEarningPower, returnOnAssets, returnOnEquity,grossMarginRatio, operatingMarginRatio };
    }

    public efficiencyRatios() {

        const inventoryTurnoverRatio = (): number => {
            const revenue = this.getIncomeStatementProperty("revenue");
            const averageInventory = this.getBalanceSheetProperty("inventory");
            // Assuming average inventory; otherwise, you'd need to calculate it from two periods.
            return revenue / averageInventory;
        }

        const averageCollectionPeriod = (): number => {
            const averageAccountsReceivable = this.getBalanceSheetProperty("netReceivables");
            const revenue = this.getIncomeStatementProperty("revenue") / 365;
            // Assuming average accounts receivable; otherwise, you'd need to calculate it from two periods.
            return averageAccountsReceivable / revenue;
        }

        const fixedAssetTurnoverRatio = (): number => {
            const revenue = this.getIncomeStatementProperty("revenue");
            const totalNonCurrentAssets = this.getBalanceSheetProperty("totalNonCurrentAssets");
            // Assuming average fixed assets; otherwise, you'd need to calculate it from two periods.
            return revenue / totalNonCurrentAssets;
        }

        const totalAssetTurnoverRatio = (): number => {
            const revenue = this.getIncomeStatementProperty("revenue");
            const totalAssets = this.getBalanceSheetProperty("totalAssets");
            // Assuming average fixed assets; otherwise, you'd need to calculate it from two periods.
            return revenue / totalAssets;
        }

        const receivablesTurnoverRatio = (): number => {
            const netCreditSales = this.getIncomeStatementProperty("revenue"); // Assuming all sales are on credit.
            const averageNetReceivables = this.getBalanceSheetProperty("netReceivables");
            return netCreditSales / averageNetReceivables;
        }

        return {inventoryTurnoverRatio, averageCollectionPeriod, fixedAssetTurnoverRatio, totalAssetTurnoverRatio, receivablesTurnoverRatio };
    }

    public leverageRatios() {

        const debtRatio = (): number => {
            const totalLiabilities = this.getBalanceSheetProperty("totalLiabilities");
            const totalAssets = this.getBalanceSheetProperty("totalAssets");
            return totalLiabilities / totalAssets;
        }

        const timesInterestEarnedRatio = (): number => {
            const operatingIncome = this.getIncomeStatementProperty("ebitda");
            const interestExpense = this.getIncomeStatementProperty("interestExpense");
            return operatingIncome / interestExpense;
        }

        const fixedChargeCoverageRatio = (): number => {
            const operatingIncome = this.getIncomeStatementProperty("ebitda");
            const interestExpense = this.getIncomeStatementProperty("interestExpense");
            const interestIncome = this.getIncomeStatementProperty("interestIncome");
            return (operatingIncome + interestExpense) / (interestExpense + interestIncome);
        }

        const debtToEquityRatio = (): number => {
            const totalLiabilities = this.getBalanceSheetProperty("totalLiabilities");
            const totalShareholderEquity = this.getBalanceSheetProperty("totalShareholdersEquity");
            return totalLiabilities / totalShareholderEquity;
        }

        const interestCoverageRatio = (): number => {
            const operatingIncome = this.getIncomeStatementProperty("operatingIncome");
            const interestExpense = this.getIncomeStatementProperty("interestExpense");
            return operatingIncome / interestExpense;
        }

        return {debtRatio, timesInterestEarnedRatio, fixedChargeCoverageRatio, debtToEquityRatio, interestCoverageRatio };
    }

    public marketValueRatios() {


        const earningsPerShare = (): number => {
            return this.getIncomeStatementProperty("eps");
            const netIncome = this.getIncomeStatementProperty("netIncome");
            const weightedAverageSharesOutstanding = this.getIncomeStatementProperty("weightedAverageShsOut");
            return netIncome / weightedAverageSharesOutstanding;
        }

        const priceToEarningsRatio = (getMarketPricePerShare: () => number): number => {
            const earningsPerShareValue = earningsPerShare(); // Can call the method within the same class
            return getMarketPricePerShare() / earningsPerShareValue;
        }

        const dividendPayoutRatio = (getDividendsPerShare: () => number): number => {
            const earningsPerShareValue = earningsPerShare(); // Can call the method within the same class
            return getDividendsPerShare() / earningsPerShareValue;
        }

        return { earningsPerShare, priceToEarningsRatio, dividendPayoutRatio };
    }
}
