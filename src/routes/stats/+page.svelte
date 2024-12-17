
<script>
    import { onMount } from "svelte";
    import { apiData, drinkNames } from '/scripts/store.js';
    let container;
    let worldname = $state()
    onMount(async () => {
        fetch("https://api.omrih.me/top/1")
        .then(response => response.json())
        .then(data => {
		console.log(data);
        apiData.set(data);
    }).catch(error => {
        console.log(error);
        return [];
    });
});
</script>

<div class="main-container">
    <h1>Legitimoose Stats</h1>
    <h2>Top 10 Worlds</h2>
    <div id="top10">
        
    </div>
</div>