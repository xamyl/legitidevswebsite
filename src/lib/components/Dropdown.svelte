<script>
	import { fly } from "svelte/transition";

    const { img, options } = $props();
    let isOpen = $state(false);
</script>

<div class="dropdown">
    <button onclick={() => { isOpen = !isOpen }}>
        <img src={img} alt="Dropdown Icon">
    </button>
    {#if isOpen}
        <div class="options" transition:fly={{x:10, duration: 200}}>
            {#each options as option}
                <a href={option.link} data-sveltekit-reload={option?.reload} onclick={() => { isOpen = !isOpen }}>{option.label}</a>
            {/each}
        </div>
    {/if}
</div>

<style>
    button {
        border: none;
        outline: none;
        background: none;
        margin: 0;
        padding: 0;
    }

    img {
        height: auto;
        width: 100%;
    }

    .dropdown {
        position: relative;
    }

    .options {
        position: absolute;
        right: 0;
        display: flex;
        min-width: 150px;
        flex-direction: column;
        align-items: end;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

        > * {
            width: 100%;
            padding: 10px;
            background-color: light-dark(var(--secondary-light), var(--secondary-dark));
            text-decoration: none;
            color: light-dark(var(--text-main-light), var(--text-main-dark));
            transition: all 0.1s ease;

            &:hover {
                width: 110%;
                outline: 1px solid light-dark(black, white);
                z-index: 1;
            }
        }

        > :nth-of-type(even) {
            background-color: color-mix(in srgb, light-dark(var(--secondary-light), var(--secondary-dark)) 80%, black 20%);
        }
    }
</style>