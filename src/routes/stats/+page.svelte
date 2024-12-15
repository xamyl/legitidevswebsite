
<script>
    import { onMount } from "svelte";
    let container;
    let worldname = $state()
    onMount(async () => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon")
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