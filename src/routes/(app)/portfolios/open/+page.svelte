<script lang="ts">
import Card from "../../(ux)/Card.svelte";
import CardTitle from "../../(ux)/CardTitle.svelte";
import FileUpload from "../../(ux)/FileUpload.svelte";
import {PortfoliosStore} from "$lib/finapp/stores.js";
import {goto} from "$app/navigation";

function handleUpload(data : any) {
    PortfoliosStore.addPortfolio(data)
    goto("/portfolios")
}
</script>

<Card class="flex flex-col gap-2">
    <CardTitle class="mb-2">Open a portfolio</CardTitle>
    <div class="flex flex-col gap-4">
        <FileUpload authorizedExtensions={[".finapp"]} onUpload={data => handleUpload(data)} />
    </div>
</Card>