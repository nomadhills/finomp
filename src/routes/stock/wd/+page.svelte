<script lang="ts">

    import {onMount} from "svelte";
    import GetIncomeStatement from "$lib/finapi/IncomeStatement";

    let IncomeStatementObj : object
    $: IncomeStatementObj

    onMount(() => {
        console.log("Hello World");

        /*GetIncomeStatement.then((data) => {
            IncomeStatementObj = data
            console.log(IncomeStatementObj);
        })*/

    });

</script>

<div class="
p-6
flex flex-col
gap-4
">
    <div>
        <h1 class="text-3xl font-bold">
            Walt Disney Company
        </h1>
    </div>

    <div>
        <h2 class="text-2xl font-bold">
            Disney's History
        </h2>
    </div>

    <div>
        <h2 class="text-2xl font-bold">
            Disney's Income Statement
        </h2>
    </div>

    <div>
        <h2 class="text-2xl font-bold">
            Disney's Balance Sheet
        </h2>
    </div>

    <div>
        <h2 class="text-2xl font-bold ">
            Disney's Cash Flow Statement
        </h2>
    </div>

    {#if IncomeStatementObj}
        <div>
            <h2 class="text-2xl font-bold ">
                {JSON.stringify(IncomeStatementObj)}
            </h2>
        </div>
    {/if}
</div>
