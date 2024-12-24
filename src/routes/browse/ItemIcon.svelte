<script>
	import { getItemIcon } from "$lib/utils";

    let { item_id, player_uuid } = $props();
</script>

{#if item_id === "minecraft:player_head"}
    <img src="{`https://mc-heads.net/head/${player_uuid}/left`}" alt="Player Head Icon" class="icon">
{:else}
    <img src="{getItemIcon(item_id)}" alt="Item Icon" class="icon">
{/if}

<style>
    .icon {
        aspect-ratio: 1/1;
        width: 100%;
        image-rendering: pixelated;
        object-fit: contain;
        object-position: center;
    }
</style>