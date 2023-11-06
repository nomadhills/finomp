
export type BalanceSheet = {
    date: string;
    symbol: string;
    reportedCurrency: string;
    cik: string;
    fillingDate: string;
    acceptedDate: string;
    calendarYear: string;
    period: string;
    cashAndCashEquivalents: number;
    shortTermInvestments: number;
    cashAndShortTermInvestments: number;
    netReceivables: number;
    inventory: number;
    otherCurrentAssets: number;
    totalCurrentAssets: number;
    propertyPlantEquipmentNet: number;
    goodwill: number;
    intangibleAssets: number;
    goodwillAndIntangibleAssets: number;
    longTermInvestments: number;
    taxAssets: number;
    otherNonCurrentAssets: number;
    totalNonCurrentAssets: number;
    otherAssets: number;
    totalAssets: number;
    accountPayables: number;
    shortTermDebt: number;
    taxPayables: number;
    deferredRevenue: number;
    otherCurrentLiabilities: number;
    totalCurrentLiabilities: number;
    longTermDebt: number;
    deferredRevenueNonCurrent: number;
    deferredTaxLiabilitiesNonCurrent: number;
    otherNonCurrentLiabilities: number;
    totalNonCurrentLiabilities: number;
    otherLiabilities: number;
    capitalLeaseObligations: number;
    totalLiabilities: number;
    preferredStock: number;
    commonStock: number;
    retainedEarnings: number;
    accumulatedOtherComprehensiveIncomeLoss: number;
    othertotalStockholdersEquity: number;
    totalStockholdersEquity: number;
    totalEquity: number;
    totalLiabilitiesAndStockholdersEquity: number;
    minorityInterest: number;
    totalLiabilitiesAndTotalEquity: number;
    totalInvestments: number;
    totalDebt: number;
    netDebt: number;
    link: string;
    finalLink: string;
};


export const GetBalanceSheet = (tickerSym:string) :Promise<BalanceSheet[]> => {

    const options = {
        hostname: 'financialmodelingprep.com',
        port: 443,
        path: `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${tickerSym}?period=annual&apikey=eGnVUQM0SOlMAeK2I6jmK51Mnp8qm1tJ`,
        method: 'GET'
    }

    const GetBalanceSheet = fetch(options.path, {
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

    return GetBalanceSheet
}



