<script>
	import { SITE_CONFIG } from '$lib/config.js';
	import { onMount } from 'svelte';
	import WorldCard from '../../browse/WorldCard.svelte';
	import { rehyphenateUUID } from '$lib/utils';

    const { data } = $props();
    const IS_ME = data.player_uuid === rehyphenateUUID(data.profile_data.id)

    let worlds = $state([])

    onMount(async () => {
        const res = await fetch(`${SITE_CONFIG.API_ROOT}owner/${data.player_uuid}`)
        worlds = await res.json()
    })
</script>

<div class="main-container">
    <h1>{data.player_name}'s Profile</h1>
    {#if IS_ME}
        <p>you own this profile</p>
    {/if}
    <h2>Owned Worlds:</h2>
    {#each worlds as world}
        <WorldCard
            world_uuid={world.world_uuid} 
            icon={world.icon} 
            raw_name={world.raw_name}
            owner_uuid={world.owner_uuid}
            votes={world.votes}
            visits={world.visits}
            resource_pack_url={world.resource_pack_url}
            locked={world.locked}
            player_count={world.player_count}
            enforce_whitelist={world.enforce_whitelist}
        />
    {/each}
</div>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
		background-color: light-dark(var(--main-light), var(--main-dark));
		min-height: 100vmin;
        max-width: 100vw;
		align-items: center;
    }
</style>