import type {IncomeStatement} from "$lib/finapi/IncomeStatement";
import type {BalanceSheet} from "$lib/finapi/BalanceSheet";

export type Ratios = {
    returnOnEquity: number | null;
    debtToCapitalRatio: number | null;
    assetTurnoverRatio: number | null;
};

export function CalculateFinancialRatios(incomeStatement: IncomeStatement, balanceSheet: BalanceSheet): Ratios {
    const returnOnEquity = (incomeStatement.netIncome / balanceSheet.totalStockholdersEquity) || null;
    const debtToCapitalRatio = (balanceSheet.totalDebt / (balanceSheet.totalDebt + balanceSheet.totalStockholdersEquity)) || null;
    const assetTurnoverRatio = (balanceSheet.deferredRevenue / balanceSheet.totalAssets) || null;

    const res = {
        returnOnEquity: null,
        debtToCapitalRatio: null,
        totalAssetTurnoverRatio: null,
    } as Ratios;

    if (returnOnEquity){
        res.returnOnEquity = isFinite(returnOnEquity) ? returnOnEquity : null;
    }

    if (debtToCapitalRatio){
        res.debtToCapitalRatio = isFinite(debtToCapitalRatio) ? debtToCapitalRatio : null;
    }

    if (assetTurnoverRatio){
        res.assetTurnoverRatio = isFinite(assetTurnoverRatio) ? assetTurnoverRatio : null;
    }

    return res;
}