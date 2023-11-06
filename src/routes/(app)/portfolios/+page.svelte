<script lang="ts">
    import {PortfoliosStore} from "$lib/finapp/stores";
    import {goto} from "$app/navigation";
    import Card from "../(ux)/Card.svelte";
    import CardTitle from "../(ux)/CardTitle.svelte";
</script>

{#if $PortfoliosStore.HasPortfolios()}
    <div class="flex flex-col">
        <div class="flex flex-row justify-between items-center">
            <h2 class="text-2xl font-bold">Portfolios</h2>
            <div class="flex flex-row gap-2">
                <button class="btn btn-primary" on:click={() => { goto("/portfolios/open") }}>Open</button>
                <button class="btn btn-primary" on:click={() => { goto("/portfolios/add") }}>Add</button>
            </div>
        </div>
        <div class="flex flex-col">
            {#each $PortfoliosStore.GetPortfolios() as portfolio}
                <Card
                    class="flex flex-col gap-2 hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
                    onClick={() => { goto("/portfolios/" + portfolio.id) }}
                >
                    <CardTitle class="mb-2">{portfolio.name}</CardTitle>
                </Card>
            {/each}
        </div>
    </div>
{:else}
    <div class="flex flex-col">
        <div class="flex flex-row justify-between items-center">
            <h2 class="text-2xl font-bold">Portfolios</h2>
            <div class="flex flex-row gap-2">
                <button class="btn btn-primary" on:click={() => { goto("/portfolios/open") }}>Open</button>
                <button class="btn btn-primary" on:click={() => { goto("/portfolios/add") }}>Add</button>
            </div>
        </div>
        <div class="flex flex-col">
            <p class="text-gray-500">No portfolios yet</p>
        </div>
    </div>
{/if}