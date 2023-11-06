<script lang="ts">
    import { page } from '$app/stores';
    import {onDestroy, onMount} from 'svelte';
    import {PortfoliosStore} from "$lib/finapp/stores";
    import {Portfolio} from "$lib/finapp/Portfolio";
    import {Ticker} from "$lib/finapp/Ticker";

    export let id = ''
    export let ticker = '';
    const unsubscribe = page.subscribe(($page) => {
        ticker = $page.params.ticker;
        id = $page.params.id;
    });

    let p : Portfolio = new Portfolio();
    $: p

    let t: Ticker= {} as Ticker;
    $: t

    onMount(async () => {
        PortfoliosStore.subscribe((ps) => {

            let portfolioValue = ps.GetPortfolioById(id)
            

            console.log('portfolioValue', portfolioValue)

            if (portfolioValue) {
                p = portfolioValue
                t = portfolioValue.GetTicker(ticker) || new Ticker()
            }

        })
    })

    // Make sure to unsubscribe when the component is destroyed
    onDestroy(unsubscribe);

</script>


<div>
    
</div>