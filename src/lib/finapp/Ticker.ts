import GetIncomeStatement from "$lib/finapi/IncomeStatement";
import {GetBalanceSheet} from "$lib/finapi/BalanceSheet";
import {GetCashFlowStatement} from "$lib/finapi/CashflowStatement";
import {IncomeStatement} from "$lib/finapp/IncomeStatement";
import {CashFlowStatement} from "$lib/finapp/CashFlowStatement";
import {Type} from 'class-transformer';
import 'reflect-metadata';
import 'es6-shim';
import {BalanceSheet} from "$lib/finapp/BalanceSheet";
import {KeyMetrics} from "$lib/finapp/KeyMetrics";
import {DefinedRatios} from "$lib/finapp/DefinedRatios";


export class Ticker {
    name: string = "";
    tickerSym: string = "";
    // @ts-ignore
    @Type(() => IncomeStatement)
    incomeStatements: Array<IncomeStatement> = [];
    // @ts-ignore
    @Type(() => BalanceSheet)
    balanceSheets: Array<BalanceSheet> = [];
    // @ts-ignore
    @Type(() => CashFlowStatement)
    cashFlowStatements: Array<CashFlowStatement> = [];
    // @ts-ignore
    @Type(() => KeyMetrics)
    keyMetrics: Array<KeyMetrics> = [];
    // @ts-ignore
    @Type(() => DefinedRatios)
    definedRatios: Array<DefinedRatios> = [];

    public static async GetTicker(tickerSym: string): Promise<Ticker> {

        // New tickersInputValue
        const ticker = new Ticker();
        ticker.Initalize(tickerSym, tickerSym);

        // Get income statement
        const incomeStatementResult = GetIncomeStatement(tickerSym).then((incomeStatement) => {
            console.log(incomeStatement);
            for (let i = 0; i < incomeStatement.length; i++) {
                let newIc = new IncomeStatement()
                newIc.Load(incomeStatement[i])
                ticker.incomeStatements.push(newIc);
            }
        })

        // Get balance sheet
        const balanceSheetResult = GetBalanceSheet(tickerSym).then((balanceSheet) => {
            console.log(balanceSheet);
            for (let i = 0; i < balanceSheet.length; i++) {
                let newBs = new BalanceSheet()
                newBs.Load(balanceSheet[i])
                ticker.balanceSheets.push(newBs);
            }
        })

        // Get cash flow
        const cashFlowResults = GetCashFlowStatement(tickerSym).then((cashFlow) => {
            console.log(cashFlow);
            for (let i = 0; i < cashFlow.length; i++) {
                let newCf = new CashFlowStatement()
                newCf.Load(cashFlow[i])
                ticker.cashFlowStatements.push(newCf);
            }
        })

        // Get key metrics
        const keyMetricsResults = Ticker.getKeyMetrics(tickerSym).then((keyMetrics) => {
            console.log(keyMetrics);
            for (let i = 0; i < keyMetrics.length; i++) {
                let newKm = new KeyMetrics()
                newKm.Load(keyMetrics[i])
                ticker.keyMetrics.push(newKm);
            }
        })

        // Get defined ratios
        const definedRatiosResults = Ticker.getDefinedRatios(tickerSym).then((definedRatios) => {
            console.log(definedRatios);
            for (let i = 0; i < definedRatios.length; i++) {
                let newDr = new DefinedRatios()
                newDr.Load(definedRatios[i])
                ticker.definedRatios.push(newDr);
            }
        })

        // Wait for all results
        return Promise.all([incomeStatementResult, balanceSheetResult, cashFlowResults, keyMetricsResults,definedRatiosResults]).then(() => {
            console.log(ticker);
            return ticker;
        });

    }

    private static getIncomeStatement(tickerSym: string): Promise<any[]> {
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
    private static getBalanceSheet(tickerSym: string): Promise<any[]> {
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
    private static getCashFlow(tickerSym: string): Promise<any[]> {
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
    private static getKeyMetrics(tickerSym: string): Promise<any[]> {
        const options = {
            hostname: 'financialmodelingprep.com',
            port: 443,
            path: `https://financialmodelingprep.com/api/v3/key-metrics/${tickerSym}?period=annual&apikey=eGnVUQM0SOlMAeK2I6jmK51Mnp8qm1tJ`,
            method: 'GET'
        }

        const GetKeyMetrics = fetch(options.path, {
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

        return GetKeyMetrics
    }
    private static getDefinedRatios(tickerSym: string): Promise<any[]> {
        const options = {
            hostname: 'financialmodelingprep.com',
            port: 443,
            path: `https://financialmodelingprep.com/api/v3/ratios/${tickerSym}?period=annual&apikey=eGnVUQM0SOlMAeK2I6jmK51Mnp8qm1tJ`,
            method: 'GET'
        }

        const GetRatios = fetch(options.path, {
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

        return GetRatios
    }

    public IncomeStatementAnalysis() {
        const yearsAvailable = () => {
            let years:number[] = [];

            // for each
            this.incomeStatements.forEach((incomeStatement) => {
                console.log(incomeStatement);
                let year = incomeStatement.GetProperty("calendarYear").rawDataValue;
                if (year != undefined){
                    // check if year is number
                    if (typeof year == "string"){
                        year = parseInt(year);
                    }
                    years.push(year);
                }
            });

            return years;
        }

        const year = (year:number) => {
            let incomeStatement:IncomeStatement | undefined = this.incomeStatements.find((incomeStatement) => {
                let y = incomeStatement.GetProperty("calendarYear").rawDataValue;
                if (y != undefined){
                    return y == year;
                }
            })
            return incomeStatement;
        };

        return {yearsAvailable, year};
    }
    public BalanceSheetAnalysis() {
        const yearsAvailable = () => {
            let years:number[] = [];

            // for each
            this.balanceSheets.forEach((item) => {
                console.log(item);
                let year = item.GetProperty("calendarYear").rawDataValue;
                if (year != undefined){
                    // check if year is number
                    if (typeof year == "string"){
                        year = parseInt(year);
                    }
                    years.push(year);
                }
            });

            return years;
        }

        const year = (year:number) => {
            let item = this.balanceSheets.find((_item) => {
                let y = _item.GetProperty("calendarYear").rawDataValue;
                if (y != undefined){
                    return y == year;
                }
            })
            return item;
        };

        return {yearsAvailable, year};
    }
    public CashFlowStatementAnalysis() {
        const yearsAvailable = () => {
            let years:number[] = [];

            // for each
            this.cashFlowStatements.forEach((item) => {
                console.log(item);
                let year = item.GetProperty("calendarYear").rawDataValue;
                if (year != undefined){
                    // check if year is number
                    if (typeof year == "string"){
                        year = parseInt(year);
                    }
                    years.push(year);
                }
            });

            return years;
        }

        const year = (year:number) => {
            let item = this.cashFlowStatements.find((_item) => {
                let y = _item.GetProperty("calendarYear").rawDataValue;
                if (y != undefined){
                    return y == year;
                }
            })
            return item;
        };

        return {yearsAvailable, year};
    }
    public KeyMetricsAnalysis() {
        const yearsAvailable = () => {
            let years:number[] = [];

            // for each
            this.keyMetrics.forEach((item) => {
                console.log(item);
                let year = item.GetProperty("calendarYear");
                if (year != undefined){
                    // check if year is number
                    if (typeof year == "string"){
                        year = parseInt(year);
                    }
                    years.push(year);
                }
            });

            return years;
        }

        const year = (year:number) => {
            let item = this.keyMetrics.find((_item) => {
                let y = _item.GetProperty("calendarYear");
                if (y != undefined){
                    return y == year;
                }
            })
            return item;
        };

        const getViewOfAllYears = () => {
            let allYears: [number, KeyMetrics][] = [];
            yearsAvailable().forEach((yearNumber) => {
                let metrics = year(yearNumber);
                if (metrics != undefined){
                    allYears.push([yearNumber, metrics]);
                }
            });
            return allYears;
        }

        return {yearsAvailable, year, getViewOfAllYears};
    }
    public DefinedRatiosAnalysis() {
        const yearsAvailable = () => {
            let years:number[] = [];

            // for each
            this.definedRatios.forEach((item) => {
                console.log(item);
                let year = item.GetProperty("calendarYear");
                if (year != undefined){
                    // check if year is number
                    if (typeof year == "string"){
                        year = parseInt(year);
                    }
                    years.push(year);
                }
            });

            return years;
        }

        const year = (year:number) => {
            let item = this.definedRatios.find((_item) => {
                let y = _item.GetProperty("calendarYear");
                if (y != undefined){
                    return y == year;
                }
            })
            return item;
        };

        const getViewOfAllYears = () => {
            let allYears: [number, DefinedRatios][] = [];
            yearsAvailable().forEach((yearNumber) => {
                let metrics = year(yearNumber);
                if (metrics != undefined){
                    allYears.push([yearNumber, metrics]);
                }
            });
            return allYears;
        }

        return {yearsAvailable, year, getViewOfAllYears};
    }

    public SaveToFile(fileNameInput: string) {

        let filename:string = ""
        // remove leading and trailing spaces
        fileNameInput = fileNameInput.trim();
        // remove leading and trailing slashes
        fileNameInput = fileNameInput.replace(/^\/|\/$/g, '');
        // replace any spaces with underscores
        fileNameInput = fileNameInput.replace(/\s+/g, '_');
        if (fileNameInput == "") {
            filename = this.tickerSym + ".finapp";
        }else{
            filename = fileNameInput + ".finapp";
        }

        console.log("Downloading data for " + this.name + " (" + this.tickerSym + ")");

        // Create a filename
        const exportName = filename;

        // Create a new Blob with the JSON data
        const blob = new Blob([JSON.stringify(this, null, 2)], {
            type: 'application/json',
        });

        // Create a link element
        const link = document.createElement('a');

        // Set the download attribute to the filename
        link.download = exportName;

        // Create a URL for the blob
        link.href = window.URL.createObjectURL(blob);

        // Append the link to the body (required for Firefox)
        document.body.appendChild(link);

        // Simulate a click on the link
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
    }
    private Initalize(tickerName: string, tickerSym: string) {
        this.name = tickerName;
        this.tickerSym = tickerSym;
    }
}