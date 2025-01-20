<script>
	import StatusDisplay from "./StatusDisplay.svelte";

    let { uptime_data, title, description } = $props()
    let statusMessage = $state("Operational")
    let statusMessageStatus = $state("good")
    
    switch (uptime_data[uptime_data.length - 1]?.status ?? 0) {
        case 0:
            statusMessage = "Operational"
            statusMessageStatus = "good"
            break;
        case 1:
            statusMessage = "Warning"
            statusMessageStatus = "warning"
            break;
        case 2:
            statusMessage = "Down"
            statusMessageStatus = "bad"
            break;
    }
</script>

<div class="main-container">
    <div class="title-container">
        <div class="title-wrapper">
            <p class="title">{title}</p>
            <div class="info-hover-container" data-text={description}>
                <p class="info-hover">?</p>
            </div>
        </div>
        <p class="status-message {statusMessageStatus}">{statusMessage}</p>
    </div>
    <div class="status-container">
        {#each uptime_data.reverse() as status}
            <StatusDisplay status_data={status}></StatusDisplay>
        {/each}
    </div>
</div>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
        color: light-dark(var(--text-main-light), var(--text-main-dark));
        outline: 2px solid rgb(0, 0, 0, 0.5);
        border-radius: 5px;
        padding: 10px;
        margin: 0;
        margin-bottom: 10px;
        width: 800px;
    }

    .title-container {
        display: flex;
        flex-direction: row;
    }

    .title-wrapper {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
    }

    .info-hover-container {
        display: flex;
        position: relative;
        width: 15px;
        height: 15px;
        margin-left: 5px;
        background-color: light-dark(var(--main-dark), var(--main-light));
        color: light-dark(var(--text-main-dark), var(--text-main-light));
        font-size: 0.8em;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        cursor: default;
    }

    .info-hover-container:hover::before {
        content: attr(data-text);
        position: absolute;
        background-color: light-dark(var(--main-dark), var(--main-light));
        color: light-dark(var(--text-main-dark), var(--text-main-light));
        outline: 2px solid rgb(0, 0, 0, 0.5);
        border-radius: 2px;
        font-size: 1.2em;
        padding: 10px;
        width: 300px;
        bottom: 30px;
    }

    .status-container {
        display: inline-flex;
        flex-direction: row;
        overflow-x: scroll;
    }

    .status-message {
        paint-order: stroke fill;
        -webkit-text-stroke: black 3px;

        &.good { color: #70ff44; }
        &.warning { color: #fdce34; }
        &.bad { color: #ff4444; }
    }
</style>