import { browser} from "$app/environment";
import  {Portfolio} from "$lib/finapp/Portfolio";
import type {Invalidator, Subscriber, Unsubscriber, Updater, Writable} from "svelte/store";
import {writable} from "svelte/store";
import {Type, serialize, deserialize} from 'class-transformer';
import 'reflect-metadata';
import 'es6-shim';

export class Portfolios {

    // @ts-ignore
    @Type(() => Portfolio)
    data:Portfolio[] = [] as Portfolio[];

    public HasPortfolios(): boolean {
        return Object.keys(this.data).length > 0;
    }
    public GetPortfolios(): Portfolio[] {
        let portfolios: Portfolio[] = [];
        for (let key in this.data) {
            portfolios.push(new Portfolio().deserialize(this.data[key]));
            // portfolios.push(this.data[key]);
        }
        return portfolios;
    }
    public GetPortfolio(name: string): Portfolio | undefined {
        this.data.forEach((portfolio) => {
            if (portfolio.name === name) {
                return portfolio;
            }
        })
        return undefined;
    }
    public AddPortfolio(portfolio: Portfolio) {
        let existingPortfolio = this.GetPortfolio(portfolio.name);
        if (existingPortfolio !== undefined) {
            console.log("Portfolio already exists")
            return
        }
        this.data.push(portfolio)
    }
    public GetPortfolioById(id: string) : Portfolio {
        console.log("Getting portfolio by id: " + id)
        let os = this.GetPortfolios()
        let foundPortfolio : Portfolio = new Portfolio()
        os.forEach((portfolio) => {
            if (portfolio.id == id) {
                console.log("Found portfolio by id: " + id)
                foundPortfolio = portfolio
                return
            }
        })
        return foundPortfolio
    }
}

export class PortfoliosWritable implements Writable<Portfolios> {

    _writable = writable(new Portfolios())

    set(value: Portfolios): void {
        this._writable.set(value)
    }

    subscribe(run: Subscriber<Portfolios>, invalidate?: Invalidator<Portfolios>): Unsubscriber {
        return this._writable.subscribe(run, invalidate)
    }

    update(updater: Updater<Portfolios>): void {
        this._writable.update(updater)
    }

    addPortfolio(portfolio: Portfolio) {
        this._writable.update((portfolios) => {
            portfolios.AddPortfolio(portfolio)
            return portfolios
        })
    }

}

export const PortfoliosStore = new PortfoliosWritable()

if (browser) {
    let val = localStorage.getItem('portfolios')
    let portfoliosValue : Portfolios = new Portfolios()
    console.log("Portfolios from local storage: " + val)
    if (val !== null) {
        console.log("Val is not null")
        portfoliosValue = deserialize(Portfolios, val)
    }
    console.log("Portfolios from local storage: ",portfoliosValue)
    PortfoliosStore.set(portfoliosValue)
    localStorage.setItem('portfolios', serialize(portfoliosValue))
    PortfoliosStore.subscribe((value) => {
        let jsonValue : string = serialize(value)
        if (jsonValue !== "{}" && jsonValue !== "null" && jsonValue !== "undefined") {
            localStorage.setItem('portfolios', jsonValue)
            return
        }
    })
}






