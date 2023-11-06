<script lang="ts">

    //Ticker symbol we are interested in
    import GetIncomeStatement from "$lib/finapi/IncomeStatement";
    import {
        DownloadBalanceSheetCsv,
        DownloadIncomeStatementCsv,
        DownloadObjectAsJsonFile
    } from "$lib/DownloadObjectAsJsonFIle";
    import {GetBalanceSheet} from "$lib/finapi/BalanceSheet";
    import {GetCashFlowStatement} from "$lib/finapi/CashflowStatement";
    import {FinancialData} from "$lib/finapi/FinancialData";
    import {browser} from "$app/environment";
    import IncomeStatement from "../(lib)/IncomeStatement.svelte";

    let ticker = "";
    $: ticker;

    // Tailwind CSS class for a centered div with a width of 1/2 the screen, flex is used to center the form vertically
    //also has a nice shadow and rounded corners and a nice padding
    let divClass = "flex flex-col items-center justify-center bg-gray-100";
    divClass += " lg:p-6";

    // Tailwind CSS class for a nice form
    let formClass = "flex flex-col bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 gap-4";
    // on a large screen, the form will have a minimum width of 45% of the screen
    formClass += " md:min-w-[65%]";

    // Tailwind CSS class for a nice form
    let cardClass = "flex flex-col bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 gap-4";
    // on a large screen, the form will have a minimum width of 45% of the screen
    cardClass += " md:min-w-[65%]";

    // Tailwind CSS class for a nice input box
    let inputClass = "border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent";

    // Tailwind CSS class for a nice button
    let buttonClass = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

    let full: FinancialData;
    $: full;

    let jsonData : any;
    $: if (jsonData) {
        console.log(jsonData);
    }
    $: jsonData

    //Function to get the tickersInputValue symbol from the form
    function getTicker() {

        full = new FinancialData(ticker);

        let res1 = GetIncomeStatement(ticker).then((data) => {
            //console.log(data);
            //console.log(JSON.stringify(data));
            full.IncomeStatement = data;
        });

        let res2 = GetBalanceSheet(ticker).then((data) => {
            //console.log(data);
            //console.log(JSON.stringify(data));
            full.BalanceSheet = data;
        });

        let res3 = GetCashFlowStatement(ticker).then((data) => {
            //console.log(data);
            //console.log(JSON.stringify(data));
            full.CashFlowStatement = data;
        });

        Promise.all([res1, res2, res3]).then(() => {
            console.log(full);
            full.download();
        });

    }

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
                full = FinancialData.Open(text)
            };
            reader.readAsText(file);
        }
    }

    // Helper function to format as currency
    function formatAsCurrency(value:string | number) {

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

<div class="{divClass} flex-grow">

    <!--Form to get the tickersInputValue we are interested in. Form will call a function in svelte-->
    <form class="{formClass}" on:submit|preventDefault={getTicker}>
        <div>
            <p>
                Enter a ticker symbol to get the Income Statement
            </p>
        </div>
        <input class="{inputClass}" type="text" bind:value={ticker} placeholder="Enter a ticker symbol" />
        <button class="{buttonClass}" type="submit">Save</button>
    </form>

    <div class="{formClass}">
        {#if browser}
            <p>Open</p>
            <input class="{inputClass}" type="file" accept=".finomp" on:change={handleFileChange} />
        {/if}
    </div>

    <div class="{cardClass}">

        {#if full}
            <div>
                <p class="text-3xl font-extrabold">
                    {full.getTicker()? full.getTicker() : "No Ticker"}
                </p>
            </div>

            <div>
                <p class="text-3xl font-extrabold">
                    {"Income Statement"} {"2022"}
                </p>

                <!--<div>
                    {#each Object.entries(full.getIncomeStatementYear("2022")) as [key, value]}
                        <div class="flex gap-2">
                            <p class="text-lg font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</p>
                            &lt;!&ndash;format this value as $&ndash;&gt;
                            <p class="text-lg">{formatAsCurrency(value)}</p>
                        </div>
                    {/each}
                </div>-->

                <IncomeStatement incomeStatement={full.getIncomeStatementYear("2022")} />

            </div>

            <div>
                {#each full.IncomeStatement as item}
                    <p>
                        {item.calendarYear}
                    </p>
                {/each}
            </div>

            <div>
                {#each full.BalanceSheet as item}
                    <p>
                        {item.calendarYear}
                    </p>
                {/each}
            </div>

            <div>
                {#each full.CashFlowStatement as item}
                    <p>
                        {item.calendarYear}
                    </p>
                {/each}
            </div>
        {/if}

        {#if full != null && full.ticker != null}
            <div>
                <p>
                    {JSON.stringify(full.calculateRatios())}
                </p>
            </div>
        {/if}

    </div>



</div>



