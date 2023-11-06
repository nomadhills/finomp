<script lang="ts">
    let classVal = "" ; export { classVal as class }

    let pClass = `
    text-2xl
    font-semibold
    text-gray-800
    `

</script>

<div class="{classVal}">
    <p class={ pClass }>
        <slot/>
    </p>
</div>