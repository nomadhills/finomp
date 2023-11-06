<script lang="ts">
    import type {Ticker} from "$lib/finapp/Ticker";

    let classValue: string; export {classValue as class };
    let ticker: Ticker; export {ticker};
    let year: number; export {year};
    let property: string; export {property};

    $: ticker
    $: year
    $: property

    let propertyObj = ticker.IncomeStatementAnalysis().year(year)?.GetProperty(property)
    $: propertyObj

    // Helper function to format as currency
    function formatAsCurrency(value:string | number | undefined) {

        // If the value is not a number, return it as is
        if (isNaN(Number(value))) {
            return value;
        }

        let num = Number(value);

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(num);
    }

</script>

{#if propertyObj == undefined}
    <div>Property not found</div>
{:else}
    <div class="{classValue}">
        <div class="font-semibold">{propertyObj.name}:</div>
        <div>{formatAsCurrency(
            propertyObj.rawDataValue
        )}</div>
    </div>
{/if}