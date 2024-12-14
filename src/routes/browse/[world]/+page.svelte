<script>
    let { data } = $props();
</script>

<div class="main-container">
    <h1>{data.name}</h1>
    <h2>{data.description}</h2>
    <p>{data.world_uuid}</p>
</div>

<style>
    .main-container {
        display: flex;
		flex-direction: column;
		background-color: light-dark(var(--main-light), var(--main-dark));
		min-height: 100vmin;
		align-items: center;
    }
</style>