
<script lang="ts">
    import type {Ticker} from "$lib/finapp/Ticker";
    import type {KeyMetrics} from "$lib/finapp/KeyMetrics";
    let tickers : Ticker[]; export {tickers}



    let headers : string[];
    $: headers = [];

    let data : number[][];
    $: data = getTableData();

    function getTableData() {
        let data: number[][] = [];
        let years = tickers.findLast(ticker => true)?.DefinedRatiosAnalysis().yearsAvailable();
        console.log("getTableData for ratio table",years);
        for (let ticker of tickers) {
            for (let year of years ?? []) {
                let keyMetrics = ticker.DefinedRatiosAnalysis().year(year);
                headers = Object.keys(keyMetrics?.rawData);
                let row: number[] = [];
                for (let header of headers) {
                    row.push(keyMetrics?.rawData[header]);
                }
                data.push(row);
            }
        }

        return data;
    }
</script>

<div>
    <!--{JSON.stringify(ticker.KeyMetricsAnalysis().year(2022))}-->
    <table class="table table-striped table-hover">
        <thead>
        <tr>
            {#each headers as key}
                <th class="text-center">
                    {key}
                </th>
            {/each}
        </tr>
        </thead>
        <tbody>
        {#each data as row}
            <tr>
                {#each row as cell}
                    <td class="text-center">
                        {cell}
                    </td>
                {/each}
            </tr>
        {/each}
        </tbody>
    </table>
</div>