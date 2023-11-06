<script lang="ts">
    import type {CashFlowStatement} from "$lib/finapp/CashFlowStatement";

    let cashFlowStatement :CashFlowStatement; export {cashFlowStatement};

</script>

<div class="py-8">
    <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-800">{cashFlowStatement.GetYear()} Cash Flow Statement</h2>
    </div>

    <div class="space-y-6">
        <div class="p-6 rounded-lg shadow-md bg-white">
            <h3 class="mb-4 text-xl font-semibold text-gray-700">Financials</h3>
            <div class="grid grid-cols-2 gap-4">
                {#each cashFlowStatement.GetFinancial() || [] as _props}
                    <div class="text-gray-600">{_props.name}</div>
                    <div class="font-medium text-gray-900">{_props.GetValueAsCurrency()}</div>
                {/each}
            </div>
        </div>

        <div class="p-6 rounded-lg shadow-md bg-white">
            <h3 class="mb-4 text-xl font-semibold text-gray-700">Cash Flow Statement Details</h3>
            <div class="grid grid-cols-2 gap-4">
                {#if cashFlowStatement.rawData}
                    {#each Object.entries(cashFlowStatement.rawData) as [key, value]}
                        <div class="font-semibold text-gray-700">{key}</div>
                        <div class="text-gray-600">{value}</div>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</div>


<!--<div class="py-4">-->
<!--    <div class="flex flex-row">-->
<!--        <div class="flex flex-col">-->
<!--            <div class="font-bold text-2xl">{cashFlowStatement.GetYear()} Cash Flow Statement</div>-->
<!--        </div>-->
<!--    </div>-->

<!--    <div class="flex flex-col gap-4 mt-4">-->
<!--        <div class="flex flex-col gap-2">-->
<!--            <div>-->
<!--                <div class="font-bold">Financials</div>-->
<!--            </div>-->
<!--            <div class="grid grid-cols-2">-->
<!--                {#each cashFlowStatement.GetFinancial() || [] as _props}-->
<!--                    <div>{_props.name}</div>-->
<!--                    <div>{_props.GetValueAsCurrency()}</div>-->
<!--                {/each}-->
<!--            </div>-->
<!--&lt;!&ndash;            <div>&ndash;&gt;-->
<!--&lt;!&ndash;                {#each cashFlowStatement.properties as _props}&ndash;&gt;-->
<!--&lt;!&ndash;                    <div>{_props.rawDataName}</div>&ndash;&gt;-->
<!--&lt;!&ndash;                {/each}&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->