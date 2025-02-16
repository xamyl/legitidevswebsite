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