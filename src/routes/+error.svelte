<script>
	import { page } from "$app/stores";
    
    const ERROR_MESSAGES = [
        "Error!",
        "i'm 90% sure that this is not my fault and its yours probably i think.",
        "what did you do this time",
        "actually maybe its our fault? idk.",
        "fakekdeer is here",
        "\"we all know koori did this\" - max",
        "can you suggest more messages here?",
    ]

    const ERROR_ICONS = [
        "/img/error/evilreefgif.webp",
        "/img/error/reefsob.webp",
        "/img/error/unknown_icon.png",
    ]

    const PICKED_ERROR_MESSAGE = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]
    const PICKED_ERROR_ICON = ERROR_ICONS[Math.floor(Math.random() * ERROR_ICONS.length)]
</script>

<div class="main-container">
    <img src="{PICKED_ERROR_ICON}" alt="evilreefgif">
    <h1>{$page.status}</h1>
    <code> {$page.error.message}</code>
    <h2>{PICKED_ERROR_MESSAGE}</h2>
</div>

<style>
    h1 {
        font-size: 10em;
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
        max-width: 80vw;
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
		min-height: 80vmin;
		align-items: center;
        justify-content: center;
    }
</style>