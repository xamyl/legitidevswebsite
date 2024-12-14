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

    const PICKED_ERROR_MESSAGE = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]
</script>

<div class="main-container">
    <img src="/img/evilreefgif.webp" alt="evilreefgif">
    <h1>Oh no! <code>{$page.status} {$page.error.message}</code></h1>
    <h2>{PICKED_ERROR_MESSAGE}</h2>
</div>

<style>
    h1, h2 {
        max-width: 80vw;
    }

    img {
        height: auto;
        width: 200px;
    }

    .main-container {
        display: flex;
		flex-direction: column;
		background-color: light-dark(var(--main-light), var(--main-dark));
		min-height: 100vmin;
		align-items: center;
        justify-content: center;
    }
</style>