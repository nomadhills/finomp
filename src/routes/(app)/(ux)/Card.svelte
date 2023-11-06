<script lang="ts">

    let classVal = "" ; export { classVal as class }
    let onClick = () => {} ; export { onClick }

    let divClass = `
        flex
        flex-col
        text-black
        bg-gray-50
        border-2 border-gray-200
        rounded-xl
        shadow-lg
        p-4 lg:p-6
        m-4
    `

</script>

<div class="{divClass} {classVal}" on:click={onClick}>
    <slot></slot>
</div>