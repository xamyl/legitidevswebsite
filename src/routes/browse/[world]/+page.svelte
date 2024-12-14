<script>
	import { getItemIcon } from "$lib/getItemIcon";

    let { data } = $props();
</script>

<div class="main-container">
    {#await getItemIcon(data.icon)}
        <img src="/img/unknown_icon.png" alt="World Icon" class="icon">
    {:then url} 
        <img src="{url}" alt="World Icon" class="icon">
    {:catch}
        <img src="/img/unknown_icon.png" alt="World Icon" class="icon">
    {/await}
    <h1>{data.name}</h1>
    <h2>{data.description}</h2>
    <p>{data.world_uuid}</p>
</div>

<style>
    .main-container {
        display: flex;
		flex-direction: column;
		background-color: light-dark(var(--main-light), var(--main-dark));
		min-height: 100vmin;
		align-items: center;
    }

    .icon {
        height: auto;
        image-rendering: pixelated;
        width: 200px
    }
</style>