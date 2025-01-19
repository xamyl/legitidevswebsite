<script>
    import { STATUS_CHECKING_CONFIG } from "$lib/config";
    import * as fs from "fs"
	import { onMount } from "svelte";
    let uptime = $state([])

    async function getUptime() {
        const res = await fetch(`/uptime`)
        const json = await res.json()
        uptime = json
    }

    onMount(async () => {
        getUptime
        setInterval(async () => { uptime = await getUptime(); }, STATUS_CHECKING_CONFIG.MILLISECONDS_TIL_NEXT_FETCH + 2000)
    })
</script>

<div class="main-container">
    <h1>Status Page</h1>
    {#each uptime.api as apiStatus}
        <p>API STATUS: {apiStatus.status}</p>
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