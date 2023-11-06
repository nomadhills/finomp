<script lang="ts">
    import type {Ticker} from "$lib/finapp/Ticker";
    import Card from "../../(ux)/Card.svelte";
    import Property from "./Property.svelte";
    import IncomeStatement from "./IncomeStatement.svelte";
    import {IncomeStatement as IncomeStatementClass} from "$lib/finapp/IncomeStatement";
    import BalanceSheet from "./BalanceSheet.svelte";
    import {BalanceSheet as BalanceSheetClass} from "$lib/finapp/BalanceSheet";
    import {CashFlowStatement as CashFlowStatementClass} from "$lib/finapp/CashFlowStatement";
    import CashFlowStatement from "./CashFlowStatement.svelte";
    import Ratios from "./Ratios.svelte";
    import KeyMetrics from "./KeyMetrics.svelte";

    let ticker: Ticker; export {ticker};
    $: ticker

</script>

<Card class="shadow-none">
    <h1 class="text-2xl font-semibold">{ticker.name}</h1>
    <h2>{ticker.tickerSym}</h2>
    <div>
        {#each ticker.IncomeStatementAnalysis().yearsAvailable() as year}

            <IncomeStatement incomeStatement={ticker.IncomeStatementAnalysis().year(year) || new IncomeStatementClass()} />
            <BalanceSheet balanceSheet={ticker.BalanceSheetAnalysis().year(year) || new BalanceSheetClass()} />
            <CashFlowStatement cashFlowStatement={ticker.CashFlowStatementAnalysis().year(year) || new CashFlowStatementClass()} />

<!--            <Ratios-->
<!--                incomeStatement={ticker.IncomeStatementAnalysis().year(year) || new IncomeStatementClass()}-->
<!--                balanceSheet={ticker.BalanceSheetAnalysis().year(year) || new BalanceSheetClass()}-->
<!--                cashFlowStatement={ticker.CashFlowStatementAnalysis().year(year) || new CashFlowStatementClass()}-->
<!--            ></Ratios>-->

        {/each}
        <KeyMetrics ticker={ticker}></KeyMetrics>
    </div>
</Card>