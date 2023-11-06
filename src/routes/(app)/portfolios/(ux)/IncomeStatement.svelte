<script lang="ts">
    import type {IncomeStatement} from "$lib/finapp/IncomeStatement";

    let incomeStatement :IncomeStatement; export {incomeStatement};
    
</script>

<div class="py-8">
    <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-800">{incomeStatement.GetYear()} Income Statement</h2>
    </div>

    <div class="space-y-6">
        <div class="p-6 rounded-lg shadow-md bg-white">
            <h3 class="mb-4 text-xl font-semibold text-gray-700">Revenue</h3>
            <div class="grid grid-cols-2 gap-4">
                {#each incomeStatement.GetRevenue() || [] as _props}
                    <div class="text-gray-600">{_props.name}</div>
                    <div class="font-medium text-gray-900">{_props.GetValueAsCurrency()}</div>
                {/each}
            </div>
        </div>

        <div class="p-6 rounded-lg shadow-md bg-white">
            <h3 class="mb-4 text-xl font-semibold text-gray-700">Expenses</h3>
            <div class="grid grid-cols-2 gap-4">
                {#each incomeStatement.GetExpenses() || [] as _props}
                    <div class="text-gray-600">{_props.name}</div>
                    <div class="font-medium text-gray-900">{_props.GetValueAsCurrency()}</div>
                {/each}
            </div>
        </div>

        <div class="p-6 rounded-lg shadow-md bg-white">
            <h3 class="mb-4 text-xl font-semibold text-gray-700">Income</h3>
            <div class="grid grid-cols-2 gap-4">
                {#each incomeStatement.GetIncome() || [] as _props}
                    <div class="text-gray-600">{_props.name}</div>
                    <div class="font-medium text-gray-900">{_props.GetValueAsCurrency()}</div>
                {/each}
            </div>
        </div>

        <div class="p-6 rounded-lg shadow-md bg-white">
            <h3 class="mb-4 text-xl font-semibold text-gray-700">Income Statement Details</h3>
            <div class="grid grid-cols-2 gap-4">
                {#if incomeStatement.rawData}
                    {#each Object.entries(incomeStatement.rawData) as [key, value]}
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
<!--            <div class="font-bold text-2xl">{incomeStatement.GetYear()} Income Statement</div>-->
<!--        </div>-->
<!--    </div>-->

<!--    <div class="flex flex-col gap-4 mt-4">-->
<!--        <div class="flex flex-col gap-2">-->
<!--            <div>-->
<!--                <div class="font-bold">Revenue</div>-->
<!--            </div>-->
<!--            <div class="grid grid-cols-2">-->
<!--                {#each incomeStatement.GetRevenue() || [] as _props}-->
<!--                    <div>{_props.name}</div>-->
<!--                    <div>{_props.GetValueAsCurrency()}</div>-->
<!--                {/each}-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="flex flex-col gap-2">-->
<!--            <div>-->
<!--                <div class="font-bold">Expenses</div>-->
<!--            </div>-->
<!--            <div class="grid grid-cols-2">-->
<!--                {#each incomeStatement.GetExpenses() || [] as _props}-->
<!--                    <div>{_props.name}</div>-->
<!--                    <div>{_props.GetValueAsCurrency()}</div>-->
<!--                {/each}-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="flex flex-col gap-2">-->
<!--            <div>-->
<!--                <div class="font-bold">Income</div>-->
<!--            </div>-->
<!--            <div class="grid grid-cols-2">-->
<!--                {#each incomeStatement.GetIncome() || [] as _props}-->
<!--                    <div>{_props.name}</div>-->
<!--                    <div>{_props.GetValueAsCurrency()}</div>-->
<!--                {/each}-->
<!--            </div>-->
<!--        </div>-->

<!--        &lt;!&ndash;<div>-->
<!--            {#each incomeStatement.properties as _props}-->
<!--                <div>{_props.rawDataName}</div>-->
<!--            {/each}-->
<!--        </div>&ndash;&gt;-->

<!--    </div>-->
<!--</div>-->