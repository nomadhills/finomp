<script lang="ts">
    import { enhance } from '$app/forms';
    import {browser} from "$app/environment";
    let useSubmit = false; export { useSubmit };
    let onUpload = (value:any) => {}; export { onUpload };
    let authorizedExtensions: string[] = []; export { authorizedExtensions };

    // This function is triggered when the user selects a file
    async function handleFileChange(event: any) {
        const file = event.target.files[0];
        if (file && browser) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                if (!text) return;
                if (typeof text !== 'string') return;
                let jsonData = JSON.parse(text);
                onUpload(jsonData)
            };
            reader.readAsText(file);
        }
    }

</script>

<form method="post" use:enhance enctype="multipart/form-data">
    <div class="group">
        <label for="file">Upload your file</label>
        <input
                type="file"
                id="file"
                name="fileToUpload"
                accept={authorizedExtensions.join(',')}
                on:change={handleFileChange}
                required
        />
    </div>
    {#if useSubmit}
        <input type="submit" id="submit" />
    {/if}
</form>