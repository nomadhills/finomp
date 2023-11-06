
export type CashFlowStatement = {
    date: string;
    symbol: string;
    reportedCurrency: string;
    cik: string;
    fillingDate: string;
    acceptedDate: string;
    calendarYear: string;
    period: string;
    netIncome: number;
    depreciationAndAmortization: number;
    deferredIncomeTax: number;
    stockBasedCompensation: number;
    changeInWorkingCapital: number;
    accountsReceivables: number;
    inventory: number;
    accountsPayables: number;
    otherWorkingCapital: number;
    otherNonCashItems: number;
    netCashProvidedByOperatingActivities: number;
    investmentsInPropertyPlantAndEquipment: number;
    acquisitionsNet: number;
    purchasesOfInvestments: number;
    salesMaturitiesOfInvestments: number;
    otherInvestingActivites: number;
    netCashUsedForInvestingActivites: number;
    debtRepayment: number;
    commonStockIssued: number;
    commonStockRepurchased: number;
    dividendsPaid: number;
    otherFinancingActivites: number;
    netCashUsedProvidedByFinancingActivities: number;
    effectOfForexChangesOnCash: number;
    netChangeInCash: number;
    cashAtEndOfPeriod: number;
    cashAtBeginningOfPeriod: number;
    operatingCashFlow: number;
    capitalExpenditure: number;
    freeCashFlow: number;
    link: string;
    finalLink: string;
};


export const GetCashFlowStatement = (tickerSym:string) :Promise<CashFlowStatement[]> => {

    const options = {
        hostname: 'financialmodelingprep.com',
        port: 443,
        path: `https://financialmodelingprep.com/api/v3/cash-flow-statement/${tickerSym}?period=annual&apikey=eGnVUQM0SOlMAeK2I6jmK51Mnp8qm1tJ`,
        method: 'GET'
    }

    const GetCashFlow = fetch(options.path, {
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

    return GetCashFlow
}



