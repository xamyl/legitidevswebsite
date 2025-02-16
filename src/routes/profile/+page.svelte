<script>
	import { SITE_CONFIG } from '$lib/config';
	import { onMount } from 'svelte';
	import WorldCard from '../browse/WorldCard.svelte';
	import { rehyphenateUUID } from '$lib/utils';

    const { data } = $props();
    const profile_data = data?.profile_data
    let myWorlds = $state([])


    onMount(async () => {
        if (profile_data) {
            const res = await fetch(`${SITE_CONFIG.API_ROOT}owner/${rehyphenateUUID(profile_data.id)}`)
            myWorlds = await res.json()
        }
    })
</script>

<div class="main-container">
    <h1>Logged in as:</h1>
    <p>{ profile_data?.name ?? "u havent logged in yet" }</p>
    <a href="/profile/login">log in</a>
    <a href="/profile/logout">log out</a>

    <h2>ur worlds:</h2>
    {#each myWorlds as world}
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