<script lang="ts">
    import { page } from '$app/stores';
    import {onDestroy, onMount} from 'svelte';
    import {PortfoliosStore} from "$lib/finapp/stores";
    import TickerCard from "../(ux)/TickerCard.svelte";
    import {Portfolio} from "$lib/finapp/Portfolio";
    import type {Ticker} from "$lib/finapp/Ticker";
    import KeyMetricsTable from "../(ux)/KeyMetricsTable.svelte";
    import RatiosTable from "../(ux)/RatiosTable.svelte";

    export let id = '';
    const unsubscribe = page.subscribe(($page) => {
        id = $page.params.id;
    });

    let p : Portfolio = new Portfolio();
    $: p

    let tickers: Ticker[] = [] as Ticker[];
    $: tickers

    onMount(async () => {
        PortfoliosStore.subscribe((ps) => {

            let portfolioValue = ps.GetPortfolioById(id)

            console.log('portfolioValue', portfolioValue)

            if (portfolioValue) {
                p = portfolioValue
                tickers = portfolioValue.GetTickers()
            }

        })
    })

    // Make sure to unsubscribe when the component is destroyed
    onDestroy(unsubscribe);

</script>

{#if p}
    <div class="flex flex-col flex-grow gap-6">
        <div class="flex flex-row">
            <div class="flex flex-col gap-1">
                <h1 class="text-3xl font-semibold flex gap-2">
                    {p.name}
                    <div class="border-l-2 border-blue-500 h-auto"></div>
                    <span class="text-gray-500 font-light">Portfolio</span>
                </h1>
                <div class="bg-gray-200 px-2 py-1 rounded-full border border-gray-600 w-fit">
                    <p class="text-sm"><span class="font-semibold">Portfolio id:</span> {p.id}</p>
                </div>
            </div>
        </div>

        <hr/>

        <div class=" grid grid-cols-1 p-4 border-2 border-gray-600 rounded-lg ">
            {#each tickers as t}
                <TickerCard ticker={t} />
            {/each}
        </div>

<!--        <KeyMetricsTable tickers={tickers} />-->

<!--        <RatiosTable tickers={tickers} />-->

    </div>
{/if}



