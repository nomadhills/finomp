<script lang="ts">
    import type {Portfolio} from "$lib/finapp/Portfolio";
    import Card from "./Card.svelte";
    import CardTitle from "./CardTitle.svelte";
    let portfolio : Portfolio; export {portfolio};

</script>

{#if portfolio}
    <Card class="flex flex-col gap-2">
        <CardTitle class="mb-2">{portfolio.name}</CardTitle>
        <!--{#each portfolio.GetTickers() as tickersInputValue}
            <div class="flex flex-row justify-between">
                <div>{tickersInputValue.name}</div>
            </div>
        {/each}-->
    </Card>
{/if}