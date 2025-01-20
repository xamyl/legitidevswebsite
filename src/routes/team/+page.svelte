<script>
    import { STATUS_CHECKING_CONFIG } from "$lib/config";
    import * as fs from "fs"
	import { onMount } from "svelte";
	import UptimeDisplay from "./UptimeDisplay.svelte";

    let { data } = $props()
    const uptimes = data.uptimes
    let statusMessage = $state("I am GOING To meat the teem")
    let statusMessageStatus = $state("good")

    for (const uptime in uptimes) {
        let currentUptime = uptimes[uptime]
        if (currentUptime[currentUptime.length - 1]?.status ?? 0 == 1) { 
            statusMessage = "Some systems are having issues.";
            statusMessageStatus = "warning" 
            continue
        }
        if (currentUptime[currentUptime.length - 1]?.status ?? 0 == 2) { 
            statusMessage = "Some systems are down";
            statusMessageStatus = "bad" 
            continue 
        }
    }
</script>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
		background-color: light-dark(var(--main-light), var(--main-dark));
		min-height: 100vmin;
        max-width: 100vw;
		align-items: center;
    }

    .title-container {
        display: flex;
        background-color: light-dark(var(--secondary-light), var(--secondary-dark));
        width: 100%;
        height: 300px;
        align-items: center;
        justify-content: center;

        > img {
            height: auto;
            max-width: 50%;
        }
    }

    .status-message {
        color: var(--text-main-light);
        padding: 10px;
        width: 100%;
        &.good {
            background-color: #70ff44;
            box-shadow: 0px 5px #1eaf2f;
        }

        &.warning {
            background-color: #fdce34;
            box-shadow: 0px 5px #f2882a;
        }

        &.bad {
            background-color: #ff4444;
            box-shadow: 0px 5px #bb2222;
        }
    }

    .uptime-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 60vw;
    }
</style>