<script>
	import { onMount } from 'svelte';
	import WorldCard from './WorldCard.svelte';

    // These stores all the worlds we fetched
    let worlds = $state([])
    let searchedWorlds = $state([])

    // Variables for searching
    let searchQuery = $state('');
    let isSearching = $state(false)
    
    // Variables for loading more pages
    let pageIndex = $state(0)
    let isLoading = $state(false)
    let observer
    let sentinel = $state();

    async function fetchPage() {
        isLoading = true
        const res = await fetch(`https://api.omrih.me/page/${pageIndex}`)
        const newWorlds = await res.json()
        worlds = [...worlds, ...newWorlds]
        pageIndex++
        isLoading = false
    }
    
    async function fetchSearchedWorlds(query) {
        searchedWorlds = [];
        if (query === '') {
            isSearching = false;
            return;
        }

        isLoading = true
        isSearching = true
        const res = await fetch(`https://api.omrih.me/search/${query}`)
        const worldsMatched = await res.json()
        searchedWorlds = worldsMatched;
        isLoading = false
    }

    let debounceTimeout
    function searchWorlds() {
        if (searchQuery === '') {
            isSearching = false;
            searchedWorlds = [];
            return;
        }
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => { 
            await fetchSearchedWorlds(searchQuery) 
            console.log(debounceTimeout)
        }, 600);
    }

    function observeSentinel() {
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
    }

    onMount(async () => { await fetchPage(pageIndex) });
    onMount(() => observeSentinel)

</script>

<div class="main-container">
    <div class="search-container">
        <input 
            type="text"
            placeholder="search" 
            bind:value={searchQuery} 
            oninput={searchWorlds}
        />
    </div>
    <div class="main-wrapper">
        {#if !isSearching}
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
        {:else}
            {#each searchedWorlds as world}
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
        {/if}
    </div>
    {#if !isSearching}
        <button bind:this={sentinel} class="sentinel" onclick={async () => { await fetchPage() }} onloadcapture={observeSentinel}>
            {#if isLoading}
                <img src="/img/reefloading.gif" alt="Loading Icon" class="loading-icon">
            {:else}
                ...Load more...
            {/if}
        </button>
    {:else}
        {#if isLoading}
            <img src="/img/reefloading.gif" alt="Loading Icon" class="loading-icon">
        {/if}
    {/if}
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
    }

    .loading-icon {
        height: auto;
        width: 300px;
        image-rendering: pixelated;
        opacity: 0.5;
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