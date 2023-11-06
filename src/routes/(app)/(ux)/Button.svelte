<script lang="ts">
    let text = ''; export { text };
    let onClick = () => {}; export { onClick };

    let btnClass = `
        border-2
        border-gray-400
        rounded-md
        px-4
        py-2
        text-gray-700
        hover:border-gray-500
        hover:text-gray-500
        hover:bg-gray-100
        focus:outline-none
        focus:bg-gray-100
        focus:border-gray-500
        focus:ring-1
        focus:ring-gray-500
        focus:ring-opacity-50
    `

</script>

<button
        class={btnClass}
        on:click={onClick}
>
    {#if text !== ''}
        {text}
    {:else}
        <slot />
    {/if}
</button>
