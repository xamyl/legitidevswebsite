<script>
	import { getItemIcon, getOwnerName } from "$lib/utils.js";
	import ItemIcon from "../ItemIcon.svelte";

    let { data } = $props();
    const worldCommand = `/world ${data.world.world_uuid}`
</script>

<div class="main-container">
    <div class="main-wrapper">
        <a class="back-button" href="/browse">&lt; Go back</a>
        <div class="center-flex-wrapper">
            <div class="header-container">
                <div class="title-container">
                    <div class="icon-wrapper">
                        <ItemIcon item_id={data.world.icon} player_uuid={data.world.owner_uuid} />
                    </div>
                    <div class="title-wrapper">
                        <minecraft-text class="title">{data.world.raw_name}</minecraft-text>
                        <minecraft-text class="description">{data.world.raw_description}</minecraft-text>
                        {#await getOwnerName(data.world.owner_uuid)}
                            <p class="owner-name">By ...</p>  
                        {:then name}
                            <p class="owner-name">By {name}</p> 
                        {:catch}
                            <p class="owner-name">We couldn't find the owner of this world.</p>
                        {/await}
                    </div>
                </div>
                <div class="status-container">
                    {#if !data.world.locked}
                        <p class="info hidden">Offline</p>
                    {:else}
                        <p class="info on">{data.world.player_count} players online</p>
                    {/if}
                    {#if data.world.enforce_whitelist}
                        <p class="info warning">Whitelisted!</p>
                    {/if}
                </div>
            </div>
        </div>
        <div class="center-flex-wrapper">
            <div class="info-container">
                <p class="info">{data.world.votes} votes</p>
                <p class="info">{data.world.visits} visits</p>
                {#if data.world.resource_pack_url !== ""}
                    <p class="info special">Has resource pack</p>
                {/if}
            </div>
        </div>
        <div class="center-flex-wrapper">
            <div class="button-container">
                <button class="button" onclick={ async () => { await navigator.clipboard.writeText(worldCommand) } }>Copy /world command</button>
                {#if data.world.resource_pack_url !== ""}
                    <a class="button" href="{data.world.resource_pack_url}" target="_blank">Download resource pack</a>
                {/if}
            </div>
        </div>
        <div class="hidden-info-container">
            <p>World UUID: {data.world.world_uuid}</p>
            <p>Version: {data.world.version}</p>
            <p>Created on {data.world.creation_date} PST</p>
            <p>This data was last scraped on {new Intl.DateTimeFormat('en-US', { timeStyle: "short" }).format(data.world.last_scraped)}</p>
        </div>
    </div>
</div>

<style>
    .main-container {
        display: flex;
		flex-direction: column;
		background-color: light-dark(var(--main-light), var(--main-dark));
		min-height: 100vmin;
        font-family: "Crafted", "Poppins", Arial, Helvetica, sans-serif;
    }

    .main-wrapper {
        margin-top: 15px;
        align-self: center;
    }

    .center-flex-wrapper{
        @media screen and (max-width: 576px){
            display: flex;
            justify-content: center;
        }
    }

    .header-container {
        display: flex;
        flex-direction: row;

        @media screen and (max-width: 576px){
            flex-direction: column;
        }

        margin-top: 20px;
        width: 90vw;
        background-color: light-dark(#f1f0f5, #2b2b2f);
        padding-inline: 20px;

        @media screen and (max-width: 576px){
            padding-inline: 0px;
        }

        padding-block: 10px;
        align-items: center;
        box-shadow: 0px 10px light-dark(#9FA0AD, #111113);
    }

    .info-container, .button-container {
        display: flex;
        flex-direction: row;

        > * {
            margin-right: 10px;
            margin-bottom: 20px;
        }
    }

    .button {
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
    }

    .button:hover, .button:focus {
        scale: 1.05;
        background-color: var(--outline);
        border: 3px solid var(--accent);
    }

    .button:active {
        scale: 1.05;
        background-color: var(--accent);
        border: 3px solid var(--accent);
    }

    .title-container {
        display: flex;
        flex-direction: row;

        @media screen and (max-width: 576px){
            flex-direction: column;
        }

        align-items: center;
        width: 70%;
    }

    .icon-wrapper {
        display: flex;
        height: auto;
        width: 125px;
        margin-right: 20px;
    }

    .status-container {
        display: flex;
        flex-direction: column;
        align-items: end;
        text-align: right;
        flex-grow: 1;
    }
    

    .hidden-info-container {
        display: inline-flex;
        flex-direction: column;
        padding-block: 10px;
        padding-inline: 20px;
        background-color: light-dark(#f1f0f5, #2b2b2f);
        box-shadow: 0px 5px light-dark(#9FA0AD, #111113);
        font-size: 1.2em;
        color: light-dark(rgb(0, 0, 0, 0.5), rgb(255, 255, 255, 0.5));

        > p {
            margin: 0;
            margin-block: 10px;
        }
    }

    .title-wrapper {
        display: flex;
        flex-direction: column;
        > minecraft-text {
            margin: 0px;
            margin-bottom: 10px;
        }
    }

    .title {
        font-size: 3.5em;
        margin: 0;
        margin-bottom: 20px;
        paint-order: stroke fill;
        -webkit-text-stroke: black 10px;
    }

    .description {
        font-size: 1.75em;
        margin: 0;
        paint-order: stroke fill;
        -webkit-text-stroke: black 5px;
    }

    .owner-name {
        color: light-dark(rgb(0, 0, 0, 0.5), rgb(255, 255, 255, 0.5));
        font-style: italic;
        margin: 0;
        font-size: 1.2em;
    }

    .back-button, .back-button:visited {
        text-decoration: none;
        color: light-dark(rgb(0, 0, 0, 0.5), rgb(255, 255, 255, 0.5));
        font-style: italic;
        font-size: 1.2em;
        cursor: pointer;
    }

    .back-button:hover, .back-button:focus {
        color: light-dark(rgb(0, 0, 0, 0.8), rgb(255, 255, 255, 0.8));
    }

    .info {
        padding: 8px;
        font-size: 1.5em;
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