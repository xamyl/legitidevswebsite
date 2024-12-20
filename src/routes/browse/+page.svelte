<script>
	import { onMount } from 'svelte';
	import WorldCard from './WorldCard.svelte';

    let worlds = $state([])
    let pageIndex = $state(0)
    let isLoading = $state(false)
    let observer
    let sentinel

    async function fetchPage() {
        isLoading = true
        const res = await fetch(`https://api.omrih.me/page/${pageIndex}`)
        const newWorlds = await res.json()
        worlds = [...worlds, ...newWorlds]
        pageIndex++
        isLoading = false
    }

    onMount(async () => { await fetchPage(pageIndex) });

    onMount(() => {
        observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting && !isLoading) {
                await fetchPage(pageIndex)
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        });

        if (sentinel) observer.observe(sentinel)

        return () => {
            if (sentinel) observer.unobserve(sentinel);
        };
    })

</script>

<div class="main-container">
    <div class="main-wrapper">
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
        <button bind:this={sentinel} class="sentinel" onclick={async () => { await fetchPage() }}>
            {#if isLoading}
                Loading more worlds...
            {:else}
                Load more worlds
            {/if}
        </button>
    </div>
</div>

<style>
    .main-container {
        display: flex;
		background-color: light-dark(var(--main-light), var(--main-dark));
		min-height: 100vmin;
        width: 100vw;
		align-items: center;
    }

    .sentinel {
        font-family: inherit;
        text-decoration: none;
        font-size: 1.5em;
        text-align: center;
        background-color: var(--accent);
        color: var(--text-main-dark);
        padding-block: 8px;
        padding-inline: 15px;
        border: 3px solid var(--outline);
        border-radius: 100px;
        cursor: pointer;
        transition: scale 0.2s ease;
        max-width: 100%;
    }

    .sentinel:hover, .sentinel:focus {
        scale: 1.05;
        background-color: var(--outline);
        border: 3px solid var(--accent);
    }

    .sentinel:active {
        scale: 1.05;
        background-color: var(--accent);
        border: 3px solid var(--accent);
    }

    .main-wrapper {
        width: 100%;
        margin: 20px;
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    }
</style>