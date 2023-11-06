<script lang="ts">
    let name : string ; export { name };
    let label:string = ""; export { label };
    let placeholder = ""; export { placeholder };
    let value = ""; export { value };

    let divClass = `
    flex
    flex-col
    gap-2
    `

    let inputClass = `
    border-2 border-gray-300
    rounded-md
    shadow-sm
    focus:ring-indigo-500
    focus:border-indigo-500
    block
    w-auto
    h-10
    px-2
    sm:text-sm
    lg:text-base`

    let labelClass = `
    block
    text-sm
    font-semibold
    text-gray-600
    `

</script>

<div class={divClass}>
    {#if label !== ""}
        <label
                for={name}
                class={labelClass}>
            {label}
        </label>
    {/if}
    <input
            name={name}
            type="text"
            placeholder={placeholder}
            class={inputClass}
            bind:value={value}
    />
</div>


