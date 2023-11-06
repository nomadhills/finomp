<script lang="ts">
import Card from "../(ux)/Card.svelte";
import CardTitle from "../(ux)/CardTitle.svelte";
import FileUpload from "../(ux)/FileUpload.svelte";
import {PortfoliosStore} from "$lib/finapp/stores";

let rawData : any
$: rawData

function handleUpload(data : any) {
    rawData = data
    console.log(data)
    PortfoliosStore.addPortfolio(data)
}

</script>

<Card class="flex flex-col gap-2">
    <CardTitle class="mb-2">Open a portfolio</CardTitle>
    <div class="flex flex-col gap-4">
        <FileUpload authorizedExtensions={[".finapp"]} onUpload={data => handleUpload(data)} />
    </div>
</Card>

<pre>
    {JSON.stringify($PortfoliosStore, null, 2)}
</pre>