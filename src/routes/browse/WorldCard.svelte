<script>
	import { getItemIcon, getOwnerName } from "$lib/utils.js";
	import ItemIcon from "./ItemIcon.svelte";

    let { world_uuid, icon, raw_name, owner_uuid, votes, visits, resource_pack_url, locked, player_count, enforce_whitelist } = $props();
    const isScreenSmall = window.innerWidth <= 680;
</script>

<a class="world-card" href="/browse/{world_uuid}">
    <div class="top">
        <div class="title-container">
            <div class="icon-wrapper">
                <ItemIcon item_id={icon} player_uuid={owner_uuid} />
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
            {#if enforce_whitelist}
                <p class="info warning">Whitelisted!</p>
            {/if}
        </div>
    </div>
    <div class="bottom">
        <p class="info">{votes} votes</p>
        <p class="info">{visits} visits</p>
        {#if resource_pack_url !== ""}
            <p class="info special">{isScreenSmall ? "Has RP" : "Has resource pack"}</p>
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

        @media screen and (max-width: 680px) {
            max-width: 100vw;
        }
    }

    .top, .bottom {
        display: flex;
        flex-direction: row;
    }

    @media screen and (max-width: 680px){
        .top{
            flex-direction: column;
        }
    }

    .bottom {
        align-items: center;
    }

    .bottom > p {
        margin-right: 10px;
    }

    .title-container {
        display: flex;
        flex-direction: row;
        max-width: 70%;

        @media screen and (max-width: 680px) {
            max-width: 100%;
        }
    }

    .title-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 100%;
        margin-left: 10px;
    }

    .icon-wrapper {
        display: flex;
        height: auto;
        width: 100px;
    }

    .status-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1; 
        justify-content: center;
        align-items: end;

        > p {
            margin: 0;
            &:not(:first-child) {
                margin-top: 10px;
            } 
        }

        @media screen and (max-width: 680px) {
            align-items: start;
            justify-content: left;
            align-items: center;
            flex-direction: row;
            > p:first-child { margin-top: 10px; margin-right: 10px; }
        }
    }

    .name {
        font-size: 2em;
        margin: 0;
        paint-order: stroke fill;
        -webkit-text-stroke: black 5px;
    }

    .owner-name {
        color: light-dark(rgb(0, 0, 0, 0.5), rgb(255, 255, 255, 0.5));
        font-style: italic;
        margin: 0;
        font-size: 1.5em;
    }

    .info {
        padding: 7px;
        padding-top: 0px;
        font-size: 1.6em;
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