<script>
    const { status_data } = $props()
    let status = $state("good")
    let description = $state("")
    switch (status_data?.status ?? 0) {
        case 0:
            status = "good"
            description = "Working as intended."
            break;
        case 1:
            status = "warning"
            description = "Might have some a bit of delay."
            break;
        case 2:
            status = "bad"
            description = "Might be on maintenance, being updated, or crashed. Check the discord for any maintenance or update announcements. If there are no announcements, please report immediately."
            break;
    }
    // TODO: ADD INFO BOX FOR ^
</script>

<span class="status-box {status}">
    <span></span>
</span>
<style>
    .status-box {
        display: flex;
        min-width: 15px;
        height: 100px;
        margin-right: 5px;
        border-radius: 10px;

        align-items: center;
        justify-content: center;

        &:last-child { margin-right: 0; }

        &.good { background-color: #70ff44; }
        &.warning { background-color: #fdce34; }
        &.bad { background-color: #ff4444; }
    }
</style>