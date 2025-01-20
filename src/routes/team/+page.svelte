<div class="main-container">
    <div class="title-container">
        <h1>Meet the team!</h1>
    </div>
</div>
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