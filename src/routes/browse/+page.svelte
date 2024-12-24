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
    </div>
    <button bind:this={sentinel} class="sentinel" onclick={async () => { await fetchPage() }}>
        {#if isLoading}
            <img src="/img/reefloading.gif" alt="Loading Icon">
        {:else}
            ...Load more...
        {/if}
    </button>
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

    .sentinel {
        font-family: 'Crafted', 'Poppins', Arial, Helvetica, sans-serif;
        text-decoration: none;
        font-size: 3em;
        text-align: center;
        background-color: unset;
        color: light-dark(rgb(0, 0, 0, 0.5), rgb(255, 255, 255, 0.5));
        padding: 8px;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-block: 20px;
        animation: pulse 2s ease infinite forwards;

        > img {
            height: auto;
            width: 300px;
            image-rendering: pixelated;
            opacity: 0.5;
        }
    }

    .sentinel:hover, .sentinel:focus, .sentinel:active {
        scale: 1.05;
    }

    .main-wrapper {
        max-width: 100%;
        margin: 20px;
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
        @media screen and (max-width: 680px) {
            grid-template-columns: 100%;
        }
    }

    @keyframes pulse {
        0% {
            opacity: 0.5;
            scale: 0.8;
        }
        50% {
            opacity: 1;
            scale: 1;
        }
        100% {
            opacity: 0.5;
            scale: 0.8;
        }
    }
</style>