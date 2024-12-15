<script>
	import { getItemIcon } from "$lib/getItemIcon";

    let { data } = $props();
    const worldCommand = `/world ${data.world_uuid}`

    const getOwnerName = async (uuid) => {
        const res = await fetch(`https://api.ashcon.app/mojang/v2/user/${data.owner_uuid}`);
        const profile = await res.json()

        return profile.username
    }
</script>

<div class="main-container">
    <div class="main-wrapper">
        <button class="back-button" onclick={history.back()}>&lt; Go back</button>
        <div class="header-container">
            <div class="title-container">
                {#await getItemIcon(data.icon)}
                    <img src="/img/error/unknown_icon.png" alt="World Icon" class="icon">
                {:then url} 
                    <img src="{url}" alt="World Icon" class="icon">
                {:catch}
                    <img src="/img/error/unknown_icon.png" alt="World Icon" class="icon">
                {/await}
                <div class="title-wrapper">
                    <minecraft-text class="title">{data.raw_name}</minecraft-text>
                    <minecraft-text class="description">{data.raw_description}</minecraft-text>
                    {#await getOwnerName(data.owner_uuid)}
                        <p class="owner-name">By ...</p>  
                    {:then name}
                        <p class="owner-name">By {name}</p> 
                    {:catch}
                        <p class="owner-name">We couldn't find the owner of this world.</p>
                    {/await}
                </div>
            </div>
            <div class="status-container">
                {#if !data.locked}
                    <p class="info hidden">Offline</p>
                {:else}
                    <p class="info on">{data.player_count} players online</p>
                {/if}
                {#if data.whitelisted}
                    <p class="info warning">Whitelisted!</p>
                {/if}
            </div>
        </div>
        <div class="info-container">
            <p class="info">{data.votes} votes</p>
            <p class="info">{data.visits} visits</p>
            {#if data.resource_pack_url !== ""}
                <p class="info special">Has resource pack</p>
            {/if}
        </div>
        <div class="button-container">
            <button class="button" onclick={ async () => { await navigator.clipboard.writeText(worldCommand) } }>Copy /world command</button>
            {#if data.resource_pack_url !== ""}
                <a class="button" href="{data.resource_pack_url}" target="_blank">Download resource pack</a>
            {/if}
        </div>
        <div class="hidden-info-container">
            <p>World UUID: {data.world_uuid}</p>
            <p>Version: {data.version}</p>
            <p>Created on {data.creation_date} PST</p>
            <p>This data was last scraped on {new Intl.DateTimeFormat('en-US', { timeStyle: "short" }).format(data.creation_date_unix_seconds)}</p>
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
        align-self: center;
    }

    .header-container {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        width: 90vw;
        background-color: light-dark(#f1f0f5, #2b2b2f);
        padding-inline: 20px;
        padding-block: 10px;
        align-items: center;
        box-shadow: 0px 10px light-dark(#9FA0AD, #111113);
    }

    .info-container, .button-container {
        display: flex;
        flex-direction: row;

        > * {
            margin-right: 10px;
            margin-bottom: 30px;
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
        align-items: center;
        width: 70%;

        > img {
            margin-right: 20px;
        }
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

    .icon {
        image-rendering: pixelated;
        height: auto;
        width: 125px;
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
        /* paint-order: stroke fill;
        -webkit-text-stroke: #000 15px; */
    }

    .description {
        font-size: 1.75em;
        margin: 0;
        /* paint-order: stroke fill;
        -webkit-text-stroke: #000 10px; */
    }

    .owner-name {
        color: light-dark(rgb(0, 0, 0, 0.5), rgb(255, 255, 255, 0.5));
        font-style: italic;
        margin: 0;
        font-size: 1.2em;
    }

    .back-button {
        all: unset;
        margin-top: 15px;
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

        &.off {
            background-color: light-dark(#f1f0f5, #2b2b2f);
            box-shadow: 0px 5px light-dark(#9FA0AD, #111113);
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