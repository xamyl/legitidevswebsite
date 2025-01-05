<script>
	import { page } from "$app/stores";
    
    const ERROR_MESSAGES = [
        "Oopsie daisy! Let's try that again.",
        "Error 404: Sanity not found.",
        "Glitches happen, but so do hugs! <3",
        "I promise, it's not a bug, it's a feature!",
        "Welp, that didn't go as planned.",
        "I'm in ur code, fixing ur bugs.",
        "Keep calm and blame the code.",
        "If at first, you don't succeed, debug, debug again!",
        "An error a day keeps the boredom away.",
        "Well, this is awkward... again.",
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
        "Do you want to build a snowman... instead?",
        "Achievement unlocked: Found the glitch!",
        "Error: Brain.exe has stopped working.",
        "I need a coffee break... and maybe some cookies.",
        "At least the server didn't catch fire this time!",
        "Well, that's one way to test the limits.",
        "I swear it worked yesterday!",
        "This is why we can't have nice things.",
        "Let's pretend that didn't happen.",
        "Please hold, your fix is important to us.",
        "Who set us up the TNT?",
        "Everything's going to plan. No, really, that was supposed to happen.",
        "Uh... Did I do that?",
        "Oops.",
        "Why did you do that?",
        "I feel sad now :(",
        "My bad.",
        "I'm sorry, Dave.",
        "I let you down. Sorry :(",
        "On the bright side, I bought you a teddy bear!",
        "Daisy, daisy...",
        "Oh - I know what I did wrong!",
        "Hey, that tickles! Hehehe!",
        "I blame Dinnerbone.",
        "You should try our sister game, Minceraft!",
        "Don't be sad. I'll do better next time, I promise!",
        "Don't be sad, have a hug! <3",
        "I just don't know what went wrong :(",
        "Shall we play a game?",
        "Quite honestly, I wouldn't worry myself about that.",
        "I bet Cylons wouldn't have this problem.",
        "Sorry :(",
        "Surprise! Haha. Well, this is awkward.",
        "Would you like a cupcake?",
        "Hi. I'm Minecraft, and I'm a crashaholic.",
        "Ooh. Shiny.",
        "This doesn't make any sense!",
        "Why is it breaking :(",
        "Don't do that.",
        "Ouch. That hurt :(",
        "You're mean."
        ]

    const ERROR_ICONS = [
        "/img/error/evilreefgif.webp",
        "/img/error/reefsob.webp",
        "/img/error/unknown_icon.png",
        "/img/loading.gif",
        "/img/reefloading.gif",
    ]

    const PICKED_ERROR_MESSAGE = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]
    const PICKED_ERROR_ICON = ERROR_ICONS[Math.floor(Math.random() * ERROR_ICONS.length)]
</script>

<div class="main-container">
    <img src="{PICKED_ERROR_ICON}" alt="evilreefgif">
    <h1>{$page.status}</h1>
    <code>{$page.error.message}</code>
    <h2>{PICKED_ERROR_MESSAGE}</h2>
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
</style>