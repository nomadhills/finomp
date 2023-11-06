<script lang="ts">

    let center = `
        justify-center
        items-center
        text-center
    `

    let divClass = `
        flex
        flex-col
        text-black
        bg-gray-100
        rounded-lg
        p-4
        m-4
    `
</script>

<div class="{divClass} flex-grow">
    <slot/>
</div>