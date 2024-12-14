
<script>
    import { onMount } from "svelte";
    let container;
    let worldname = $state()
    console.log("Stats opened")
    async function addnewtop(num){
        const response = await("https://api.omrih.me/top/${num}")
        name = await response.json("name")
        return(name)
    }
    onMount(() => {
        for (top =1; top < 11; top++) {
            const child = document.createElement('span');
		    child.textContent = 'child';
		    container.appendChild(child);
        }  
    })
</script>

<div class="main-container">
    <h1>Legitimoose Stats</h1>
    <h2>Top 10 Worlds</h2>
    <div name+>

    </div>
</div>