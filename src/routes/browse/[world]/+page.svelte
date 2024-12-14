<script>
	import { getItemIcon } from "$lib/getItemIcon";

    let { data } = $props();
</script>

<div class="main-container">
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
            </div>
        </div>
        <div class="status-container">
            <p class="info green">{data.player_count} players online</p>
        </div>
    </div>
</div>

<style>
    .main-container {
        display: flex;
		flex-direction: column;
		background-color: light-dark(var(--main-light), var(--main-dark));
		min-height: 100vmin;
		align-items: center;
        font-family: "Crafted", "Poppins", Arial, Helvetica, sans-serif;
    }

    .header-container {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        width: 90vw;
        background-color: light-dark(#e4e3eb, #2b2b2f);
        padding-inline: 20px;
        padding-block: 10px;
        align-items: center;
        box-shadow: 0px 10px light-dark(#9FA0AD, #111113);
    }

    .title-container {
        display: flex;
        flex-direction: row;
        align-items: center;

        > img {
            margin-right: 20px;
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

    .status-container {
        display: flex;
        flex-direction: column;
        align-items: end;
        text-align: right;
        flex-grow: 1;
    }

    .info {
        padding: 8px;
        font-size: 1.5em;
        color: black;
        
        &.green {
            background-color: #70ff44;
            box-shadow: 0px 5px #1eaf2f;
        }
    }
</style>