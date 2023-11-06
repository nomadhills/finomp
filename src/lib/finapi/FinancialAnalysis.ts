import type {FinancialData} from "$lib/finapi/FinancialData";

export class FinancialAnalysis{
    data: FinancialData
    constructor(data: FinancialData) {
        this.data = data;
    }

    IncomeStatementAnalysis(forYear: number){

        const incomeStatement = this.data.getIncomeStatementYear(forYear.toString());

        const formattedIncomeStatement = {
            "Revenue": {
                Value: incomeStatement.revenue,
                Group: ""
            }

        }

    }
}