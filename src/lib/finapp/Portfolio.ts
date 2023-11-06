import {Ticker} from "$lib/finapp/Ticker";
import {Serializable} from "$lib/finapp/Json";
import {Type} from 'class-transformer';
import 'reflect-metadata';
import 'es6-shim';

export class Portfolio extends Serializable<Portfolio>{
    id: string = "";
    name: string = "";
    // @ts-ignore
    @Type(() => Ticker)
    tickers: Ticker[] = [] as Ticker[];
    public static async DownloadPortfolio(name: string, tickers: string[]): Promise<Portfolio> {
        let portfolio = new Portfolio();
        let currentGetCalls: Promise<any>[] = [];
        for (let ticker of tickers) {
            let getCall = Ticker.GetTicker(ticker).then((ticker) => {
                // Add ticker to portfolio
                portfolio.AddTicker(ticker);
            })
            currentGetCalls.push(getCall);
        }
        // Wait for all get calls to finish
        return Promise.all(currentGetCalls).then(() => {
            // set unique id for portfolio
            portfolio.id = Math.random().toString(36).substr(2, 9);
            portfolio.name = name;
            return portfolio;
        });
    }
    public GetTicker(tickerSym: string): Ticker | undefined {
        for (let ticker of this.tickers) {
            if (ticker.tickerSym == tickerSym) {
                return ticker;
            }
        }
        return undefined;
    }
    public AddTicker(ticker: Ticker, overwrite: boolean = false): void {
        if (overwrite) {
            this.RemoveTicker(ticker.tickerSym);
        }
        // Check if ticker already exists
        let existingTicker = this.GetTicker(ticker.tickerSym);
        if (existingTicker === undefined) {
            this.tickers.push(ticker);
        }else{
            console.log("Ticker already exists in portfolio");
        }
    }
    public RemoveTicker(tickerSym: string): void {
        for (let i = 0; i < this.tickers.length; i++) {
            if (this.tickers[i].tickerSym == tickerSym) {
                this.tickers.splice(i, 1);
                break;
            }
        }
    }
    public GetTickers(): Ticker[] {
        /*let tickers: Ticker[] = [];
        if (this.tickers === undefined) {
            return [] as Ticker[];
        }
        for (let ticker of this.tickers) {
            tickers.push(new Ticker().deserialize(ticker));
        }
        return tickers;*/
        return this.tickers;
    }
    public SaveToFile(fileNameInput: string = "") {
        let filename:string = ""
        // remove leading and trailing spaces
        fileNameInput = fileNameInput.trim();
        // remove leading and trailing slashes
        fileNameInput = fileNameInput.replace(/^\/|\/$/g, '');
        // replace any spaces with underscores
        fileNameInput = fileNameInput.replace(/\s+/g, '_');
        if (fileNameInput == "") {
            filename = this.name + ".finapp";
            // remove leading and trailing spaces
            filename = filename.trim();
            // remove leading and trailing slashes
            filename = filename.replace(/^\/|\/$/g, '');
            // replace any spaces with underscores
            filename = filename.replace(/\s+/g, '_');
        }else{
            filename = fileNameInput + ".finapp";
        }

        console.log("Downloading data for " + this.name + " (" + this.id + ")");

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
}