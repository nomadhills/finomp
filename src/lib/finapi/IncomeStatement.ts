
export type IncomeStatementRaw = {
    date: string;
    symbol: string;
    reportedCurrency: string;
    cik: string;
    fillingDate: string;
    acceptedDate: string;
    calendarYear: string;
    period: string;
    revenue: number;
    costOfRevenue: number;
    grossProfit: number;
    grossProfitRatio: number;
    researchAndDevelopmentExpenses: number;
    generalAndAdministrativeExpenses: number;
    sellingAndMarketingExpenses: number;
    sellingGeneralAndAdministrativeExpenses: number;
    otherExpenses: number;
    operatingExpenses: number;
    costAndExpenses: number;
    interestIncome: number;
    interestExpense: number;
    depreciationAndAmortization: number;
    ebitda: number;
    ebitdaratio: number;
    operatingIncome: number;
    operatingIncomeRatio: number;
    totalOtherIncomeExpensesNet: number;
    incomeBeforeTax: number;
    incomeBeforeTaxRatio: number;
    incomeTaxExpense: number;
    netIncome: number;
    netIncomeRatio: number;
    eps: number;
    epsdiluted: number;
    weightedAverageShsOut: number;
    weightedAverageShsOutDil: number;
    link: string;
    finalLink: string;
};

export class IncomeStatementProperty {
    name: string;
    group: string;
    rawDataName: string;
    rawDataValue: number;
    constructor(name: string, group: string, rawDataName: string, rawDataValue: number) {
        this.name = name;
        this.group = group;
        this.rawDataName = rawDataName;
        this.rawDataValue = rawDataValue;
    }
}


const GetIncomeStatement = (tickerSym:string) :Promise<any[]> => {

    const options = {
        hostname: 'financialmodelingprep.com',
        port: 443,
        path: `https://financialmodelingprep.com/api/v3/income-statement/${tickerSym}?period=annual&apikey=eGnVUQM0SOlMAeK2I6jmK51Mnp8qm1tJ`,
        method: 'GET'
    }

    const GetIncomeStatement = fetch(options.path, {
        method: options.method,
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Something went wrong')
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            console.log('finally')
        })

    return GetIncomeStatement
}



export default GetIncomeStatement

