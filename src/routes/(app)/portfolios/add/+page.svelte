<script lang="ts">
    import Card from "../../(ux)/Card.svelte";
    import CardTitle from "../../(ux)/CardTitle.svelte";
    import Input from "../../(ux)/Input.svelte";
    import Button from "../../(ux)/Button.svelte";
    import {Portfolio} from "$lib/finapp/Portfolio";
    import {PortfoliosStore} from "$lib/finapp/stores";
    import {goto} from "$app/navigation";

    let portfolioName : string
    $: portfolioName

    let tickersInputValue : string
    $: tickersInputValue

    let fullPortfolio : Portfolio
    $: fullPortfolio

    function submit () {
        // remove leading and trailing spaces from the portfolioName string
        portfolioName = portfolioName.trim()
        // remove invalid characters from the portfolioName string (only allow letters, numbers, spaces, and dashes)
        portfolioName = portfolioName.replace(/[^a-zA-Z0-9\s-]/g, "")
        // check if the portfolioName is empty
        if (!portfolioName || portfolioName.length < 1 || portfolioName === "") {
            alert("Please enter a portfolio name")
        }
        // remove invalid characters from the tickersInputValue string
        tickersInputValue = tickersInputValue.replace(/[^a-zA-Z0-9,]/g, "")
        // remove all spaces
        tickersInputValue = tickersInputValue.replace(/\s/g, "")
        // check if the tickersInputValue is empty
        if (!tickersInputValue || tickersInputValue.length < 1 || tickersInputValue === "") {
            alert("Please enter a tickersInputValue")
        }else {
            // split the tickersInputValue by comma into an array of strings
            let tickersStringArray = tickersInputValue.split(",")
            // create and download a new portfolio
            Portfolio.DownloadPortfolio(portfolioName, tickersStringArray).then(p => {
                fullPortfolio = p
                // add the portfolio to the list of portfolios
                PortfoliosStore.addPortfolio(fullPortfolio)
                // Save the portfolios to file
                p.SaveToFile()
                // reset the input fields
                tickersInputValue = ""
                portfolioName = ""
                // go to the portfolio page
                goto(`/portfolios/${p.id}`)
            })
        }
    }

</script>

<Card class="flex flex-col gap-2">
    <CardTitle class="mb-2">Create a new portfolio</CardTitle>
    <div class="flex flex-col gap-4">
        <Input name="name" label="Portfolio Name" placeholder="enter the name here" bind:value={portfolioName}></Input>
        <Input name="ticker" label="Stock Market Ticker" placeholder="enter the ticker(s) here" bind:value={tickersInputValue}></Input>
        <Button text="Create" onClick={submit}/>
    </div>
</Card>