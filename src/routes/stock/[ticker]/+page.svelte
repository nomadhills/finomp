
<script lang="ts">


    import { page } from '$app/stores';
    import {onDestroy, onMount} from 'svelte';
    import {browser} from "$app/environment";
    import {DownloadIncomeStatementCsv} from "$lib/DownloadObjectAsJsonFIle";
    // Get the tickersInputValue value from the URL path using the svelte-kit params
    export let ticker = '';

    const unsubscribe = page.subscribe(($page) => {
        ticker = $page.params.ticker;
    });

    // Make sure to unsubscribe when the component is destroyed
    onDestroy(unsubscribe);

    let jsonData : any;
    $: if (jsonData) {
        console.log(jsonData);
    }
    $: jsonData

    // This function is triggered when the user selects a file
    async function handleFileChange(event: any) {
        const file = event.target.files[0];
        if (file && browser) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                if (!text) return;
                if (typeof text !== 'string') return;
                jsonData = JSON.parse(text);
                console.log(jsonData); // Do something with your JSON data
            };
            reader.readAsText(file);
        }
    }

    // This function will be called when the user clicks a button, for example
    function handleDownload() {
        DownloadIncomeStatementCsv(jsonData);
    }

    // on mount, fetch the data
    onMount(async () => {

    });

</script>

{#if ticker !== 'none'}
    <h1>{ticker}</h1>
{:else}
    {#if browser}
        <h1>Upload a json file</h1>
        <p>Please upload a json file</p>
        <input type="file" accept=".json" on:change={handleFileChange} />
    {/if}
    {#if jsonData}
        <h1>JSON Data</h1>
        <div>
            <button on:click={handleDownload}>Download</button>
        </div>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    {/if}
{/if}


