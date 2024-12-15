<script>
	import { getItemIcon, getOwnerName } from "$lib/utils.js";

    let { world_uuid, icon, raw_name, owner_uuid, votes, visits, resource_pack_url, locked, player_count, whitelisted } = $props();
</script>

<a class="world-card" href="/browse/{world_uuid}">
    <div class="top">
        <div class="title-container">
            <div class="icon-wrapper">
                {#await getItemIcon(icon)}
                    <img src="/img/error/unknown_icon.png" alt="World Icon" class="icon">
                {:then url} 
                    <img src="{url}" alt="World Icon" class="icon">
                {:catch}
                    <img src="/img/error/unknown_icon.png" alt="World Icon" class="icon">
                {/await}
            </div>
            
            <div class="title-wrapper">
                <minecraft-text class="name">{raw_name}</minecraft-text>
                {#await getOwnerName(owner_uuid)}
                    <p class="owner-name">By ...</p>  
                {:then name}
                    <p class="owner-name">By {name}</p> 
                {:catch}
                    <p class="owner-name">We couldn't find the owner of this world.</p>
                {/await}
            </div>
        </div>
        <div class="status-container">
            {#if !locked}
                <p class="info hidden">Offline</p>
            {:else}
                <p class="info on">{player_count} players online</p>
            {/if}
            {#if whitelisted}
                <p class="info warning">Whitelisted!</p>
            {/if}
        </div>
    </div>
    <div class="bottom">
        <p class="info">{votes} votes</p>
        <p class="info">{visits} visits</p>
        {#if resource_pack_url !== ""}
            <p class="info special">Has resource pack</p>
        {/if}
    </div>
</a>

<style>
    .world-card, .world-card:visited, .world-card:active {
        display: flex;
        text-decoration: none;
        flex-direction: column;
        background-color: light-dark(#f1f0f5, #2b2b2f);
        padding-inline: 20px;
        padding-block: 10px;
        box-shadow: 0px 10px light-dark(#9FA0AD, #111113);
        font-family: "Crafted", "Poppins", Arial, Helvetica, sans-serif;
        transition: all 0.1s ease;
        cursor: pointer;

        &:hover {
            scale: 1.02;
            outline: light-dark(rgb(0, 0, 0, 0.5), rgb(255, 255, 255, 0.5)) 2px solid;
        }
    }

    .top, .bottom {
        display: flex;
        flex-direction: row;
    }

    .bottom > p {
        margin-right: 10px;
    }

    .title-container {
        display: flex;
        flex-direction: row;
        max-width: 70%;
    }

    .title-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 100%;
        margin-left: 10px;
    }

    .icon-wrapper {
        aspect-ratio: 1/1;
        width: 100px;
    }

    .status-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1; 
        align-items: end;
    }

    .icon {
        aspect-ratio: 1/1;
        width: 100%;
        image-rendering: pixelated;
        object-fit: contain;
        object-position: center;
    }

    .name {
        font-size: 2em;
        margin: 0;
        margin-bottom: 10px;
        paint-order: stroke fill;
        -webkit-text-stroke: black 5px;
    }

    .owner-name {
        color: light-dark(rgb(0, 0, 0, 0.5), rgb(255, 255, 255, 0.5));
        font-style: italic;
        margin: 0;
        font-size: 1.2em;
    }

    .info {
        padding: 7px;
        font-size: 1.25em;
        color: black;
        background-color: #61a8f8;
        box-shadow: 0px 5px #4056e2;
        
        &.on {
            background-color: #70ff44;
            box-shadow: 0px 5px #1eaf2f;
        }

        &.hidden {
            background-color: #96959d;
            box-shadow: 0px 5px #535168;
        }

        &.warning {
            background-color: #ff4444;
            box-shadow: 0px 5px #bb2222;
        }

        &.special {
            background-color: #fdce34;
            box-shadow: 0px 5px #f2882a;
        }
    }
</style>