<script lang="ts">
    // Assuming incomeStatement is an object of type IncomeStatement as defined before
    import type {IncomeStatement} from "$lib/finapi/IncomeStatement";

    export let incomeStatement : IncomeStatement;

    // Group definitions
    const revenueGroup = ['revenue'];
    const cogsGroup = ['costOfRevenue'];
    const grossProfitGroup = ['grossProfit', 'grossProfitRatio'];
    const operatingExpensesGroup = [
        'researchAndDevelopmentExpenses',
        'generalAndAdministrativeExpenses',
        'sellingAndMarketingExpenses',
        'sellingGeneralAndAdministrativeExpenses',
        'otherExpenses',
        'operatingExpenses'
    ];
    const incomeGroup = [
        'operatingIncome',
        'operatingIncomeRatio',
        'totalOtherIncomeExpensesNet',
        'incomeBeforeTax',
        'incomeBeforeTaxRatio',
        'incomeTaxExpense',
        'netIncome',
        'netIncomeRatio'
    ];
    const earningsPerShareGroup = ['eps', 'epsdiluted'];
    const additionalInfoGroup = ['weightedAverageShsOut', 'weightedAverageShsOutDil'];

    // Helper function to get the display name for each field
    function displayName(field) {
        // You could create a mapping of field names to display names if needed
        return field.charAt(0).toUpperCase() + field.slice(1);
    }
</script>

<!-- Now let's create groups in the HTML template -->
<div>
    <!-- Revenue Group -->
    <div class="group">
        <p>
            <span class="text-2xl font-semibold">Revenue</span>
            <span class="text-sm text-gray-500">({incomeStatement.calendarYear})</span>
        </p>
        <div class="pl-2">
            {#each revenueGroup as field}
                <div class="flex gap-2">
                    <p class="text-lg font-semibold">{displayName(field)}</p>
                    <p>{incomeStatement[field]}</p>
                </div>
            {/each}
        </div>

    </div>

    <!-- COGS Group -->
    <div class="group">
        <p>
            <span class="text-2xl font-semibold">Cost of Revenue</span>
            <span class="text-sm text-gray-500">({incomeStatement.calendarYear})</span>
        </p>
        <div class="pl-2">
            {#each cogsGroup as field}
                <div class="flex gap-2">
                    <p class="text-lg font-semibold">{displayName(field)}</p>
                    <p>{incomeStatement[field]}</p>
                </div>
            {/each}
        </div>
    </div>

    <!-- Gross Profit Group -->
    <div class="group">
        <p>
            <span class="text-2xl font-semibold">Gross Profit</span>
            <span class="text-sm text-gray-500">({incomeStatement.calendarYear})</span>
        </p>
        <div class="pl-2">
            {#each grossProfitGroup as field}
                <div class="flex gap-2">
                    <p class="text-lg font-semibold">{displayName(field)}</p>
                    <p>{incomeStatement[field]}</p>
                </div>
            {/each}
        </div>

    </div>

    <!-- Operating Expenses Group -->
    <div class="group">
        <p>
            <span class="text-2xl font-semibold">Operating Expenses</span>
            <span class="text-sm text-gray-500">({incomeStatement.calendarYear})</span>
        </p>
        <div class="pl-2">
            {#each operatingExpensesGroup as field}
                <div class="flex gap-2">
                    <p class="text-lg font-semibold">{displayName(field)}</p>
                    <p>{incomeStatement[field]}</p>
                </div>
            {/each}
        </div>

    </div>

    <!-- Income Group -->
    <div class="group">
        <p>
            <span class="text-2xl font-semibold">Income</span>
            <span class="text-sm text-gray-500">({incomeStatement.calendarYear})</span>
        </p>
        <div class="pl-2">
            {#each incomeGroup as field}
                <div class="flex gap-2">
                    <p class="text-lg font-semibold">{displayName(field)}</p>
                    <p>{incomeStatement[field]}</p>
                </div>
            {/each}
        </div>

    </div>

    <!-- Earnings Per Share Group -->
    <div class="group">
        <p>
            <span class="text-2xl font-semibold">Earnings Per Share</span>
            <span class="text-sm text-gray-500">({incomeStatement.calendarYear})</span>
        </p>
        <div class="pl-2">
            {#each earningsPerShareGroup as field}
                <div class="flex gap-2">
                    <p class="text-lg font-semibold">{displayName(field)}</p>
                    <p>{incomeStatement[field]}</p>
                </div>
            {/each}
        </div>

    </div>

    <!-- Additional Info Group -->
    <div class="group">
        <p>
            <span class="text-2xl font-semibold">Additional Info</span>
            <span class="text-sm text-gray-500">({incomeStatement.calendarYear})</span>
        </p>
        <div class="pl-2">
            {#each additionalInfoGroup as field}
                <div class="flex gap-2">
                    <p class="text-lg font-semibold">{displayName(field)}</p>
                    <p>{incomeStatement[field]}</p>
                </div>
            {/each}
        </div>

    </div>

    <!-- And so on for other groups -->
</div>
