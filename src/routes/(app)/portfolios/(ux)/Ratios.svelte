<script lang="ts">
    import type {IncomeStatement} from "$lib/finapp/IncomeStatement";
    import type {BalanceSheet} from "$lib/finapp/BalanceSheet";
    import type {CashFlowStatement} from "$lib/finapp/CashFlowStatement";
    import {Ratios} from "$lib/finapp/Ratios";

    let incomeStatement: IncomeStatement; export {incomeStatement};
    let balanceSheet: BalanceSheet; export {balanceSheet};
    let cashFlowStatement: CashFlowStatement; export {cashFlowStatement};

    let r: Ratios = new Ratios(incomeStatement, balanceSheet, cashFlowStatement);
    $: r

    // display as percentage
    function percent(n: number): string {
        return (n * 100).toFixed(2) + "%";
    }

</script>


<div>
    <div class="flex flex-col gap-4">

        <!-- Profitability -->
        <section class="p-6 rounded-lg shadow-md bg-white">
            <h2 class="mb-4 text-xl font-bold text-gray-800">Profitability</h2>
            <div class="grid grid-cols-2 gap-4">
                <!-- Profit Margin -->
                <div class="flex flex-col">
                    <h3 class="mb-2 font-semibold text-gray-700">Profit Margin</h3>
                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">
                        {percent(r.profitabilityRatios().profitMargin())}
                    </div>
                </div>
                <!-- Gross Margin Ratio -->
                <div class="flex flex-col">
                    <h3 class="mb-2 font-semibold text-gray-700">Gross Margin Ratio</h3>
                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">
                        {percent(r.profitabilityRatios().grossMarginRatio())}
                    </div>
                </div>
                <!-- Operating Margin Ratio -->
                <div class="flex flex-col">
                    <h3 class="mb-2 font-semibold text-gray-700">Operating Margin Ratio</h3>
                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">
                        {percent(r.profitabilityRatios().operatingMarginRatio())}
                    </div>
                </div>
                <!-- Return on Assets (ROA) -->
                <div class="flex flex-col">
                    <h3 class="mb-2 font-semibold text-gray-700">Return on Assets (ROA)</h3>
                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">
                        {percent(r.profitabilityRatios().returnOnAssets())}
                    </div>
                </div>
                <!-- Return on Equity (ROE) -->
                <div class="flex flex-col">
                    <h3 class="mb-2 font-semibold text-gray-700">Return on Equity (ROE)</h3>
                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">
                        {percent(r.profitabilityRatios().returnOnEquity())}
                    </div>
                </div>
            </div>
        </section>

        <!-- Liquidity Ratios -->
        <section class="p-6 rounded-lg shadow-md bg-white">
            <h2 class="mb-4 text-xl font-bold text-gray-800">Liquidity Ratios</h2>
            <div class="grid grid-cols-2 gap-4">
                <!-- Current Ratio -->
                <div class="flex flex-col">
                    <h3 class="mb-2 font-semibold text-gray-700">Current Ratio</h3>
                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">
                        {r.liquidityRatios().currentRatio()}
                    </div>
                </div>
                <!-- Quick Ratio -->
                <div class="flex flex-col">
                    <h3 class="mb-2 font-semibold text-gray-700">Quick Ratio</h3>
                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">
                        {r.liquidityRatios().quickRatio()}
                    </div>
                </div>
                <!-- Net Working Capital -->
                <div class="flex flex-col">
                    <h3 class="mb-2 font-semibold text-gray-700">Net Working Capital</h3>
                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">
                        ${r.liquidityRatios().netWorkingCapital()}
                    </div>
                </div>
            </div>
        </section>

        <!-- Efficiency Ratios -->
        <section class="p-6 rounded-lg shadow-md bg-white">
            <h2 class="mb-4 text-xl font-bold text-gray-800">Efficiency Ratios</h2>
            <div class="grid grid-cols-2 gap-4">
                <!-- Asset Turnover Ratio -->
                <div class="flex flex-col">
                    <h3 class="mb-2 font-semibold text-gray-700">Asset Turnover Ratio</h3>
                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">
                        {r.efficiencyRatios().totalAssetTurnoverRatio()}
                    </div>
                </div>
                <!-- Inventory Turnover Ratio -->
                <div class="flex flex-col">
                    <h3 class="mb-2 font-semibold text-gray-700">Inventory Turnover Ratio</h3>
                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">
                        {r.efficiencyRatios().inventoryTurnoverRatio()}
                    </div>
                </div>
            </div>
        </section>

        <!-- Leverage Ratios -->
        <section class="p-6 rounded-lg shadow-md bg-white">
            <h2 class="mb-4 text-xl font-bold text-gray-800">Leverage Ratios</h2>
            <div class="grid grid-cols-2 gap-4">
                <!-- Debt to Equity Ratio -->
                <div class="flex flex-col">
                    <h3 class="mb-2 font-semibold text-gray-700">Debt to Equity Ratio</h3>
                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">
                        {r.leverageRatios().debtToEquityRatio()}
                    </div>
                </div>
                <!-- Interest Coverage Ratio -->
                <div class="flex flex-col">
                    <h3 class="mb-2 font-semibold text-gray-700">Interest Coverage Ratio</h3>
                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">
                        {r.leverageRatios().interestCoverageRatio()}
                    </div>
                </div>
            </div>
        </section>

        <!-- Market Value Ratios -->
        <section class="p-6 rounded-lg shadow-md bg-white">
            <h2 class="mb-4 text-xl font-bold text-gray-800">Market Value Ratios</h2>
            <div class="grid grid-cols-2 gap-4">
                <!-- Earnings Per Share (EPS) -->
                <div class="flex flex-col">
                    <h3 class="mb-2 font-semibold text-gray-700">Earnings Per Share (EPS)</h3>
                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">
                        {r.marketValueRatios().earningsPerShare()}
                    </div>
                </div>
<!--                &lt;!&ndash; Price to Earnings Ratio (P/E) &ndash;&gt;-->
<!--                <div class="flex flex-col">-->
<!--                    <h3 class="mb-2 font-semibold text-gray-700">Price to Earnings Ratio (P/E)</h3>-->
<!--                    <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold hover:shadow-md hover:cursor-pointer">-->
<!--                        {r.marketValueRatios().priceToEarningsRatio()}-->
<!--                    </div>-->
<!--                </div>-->
            </div>
        </section>

    </div>
</div>


