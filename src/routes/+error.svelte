<script>
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
    
    const ERROR_MESSAGES = [
        "Error!",
        "UwU -Skye",
        "i'm 90% sure that this is not my fault and its yours probably i think.",
        "what did you do this time",
        "NobleSkye was here",
        ">:3",
        "Neat domain right?... right?!! >:3",
        "actually maybe its our fault? idk.",
        "fakekdeer is here",
        "\"we all know koori did this\" - max",
        "can you suggest more messages here?",
        "if we were moe UwU then this wouldn't have happened",
        "Alright who used chatgpt... again",
        "i has meeted the team"
    ]

    let PICKED_ERROR_ICON = $state("")
    let PICKED_ERROR_MESSAGE = $state("")
    async function getBackgroundImages() {
        const images = await import.meta.glob("/static/img/error/*");
        const paths = Object.keys(images)
        const path = paths[Math.floor(Math.random() * paths.length)]
        PICKED_ERROR_ICON = `${path}?url`.replace("/static","")
    }

    let loaded = $state(false)
    onMount(async () => {
        PICKED_ERROR_MESSAGE = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]
        await getBackgroundImages()
        loaded = true
    })


</script>

<div class="main-container">
    {#if loaded}
        <div class="main-wrapper" transition:fade={{duration:200}}>
            <img src="{PICKED_ERROR_ICON}" alt="error icon">
            <h1>{$page.status}</h1>
            <code>{$page.error.message}</code>
            <h2>{PICKED_ERROR_MESSAGE}</h2>
        </div>
    {/if}
</div>

<style>
    h1 {
        font-size: 5em;
        margin: 0;

        &::after {
            all: unset;
        }
    }

    code {
        margin: 0;
        font-size: 2em;
    }

    h1, h2 {
        max-width: 90vw;
        text-align: center;
    }

    img {
        height: auto;
        image-rendering: pixelated;
        width: 150px;
    }

    .main-container {
        display: flex;
		flex-direction: column;
		background-color: light-dark(var(--main-light), var(--main-dark));
		height: 100vh;
		align-items: center;
        justify-content: center;
    }

    .main-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>