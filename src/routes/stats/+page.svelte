
<script>
    import { json } from "@sveltejs/kit";
    import { onMount } from "svelte";
    
    onMount(() => {
        function fetchtop10(num) {
            fetch('https://api.omrih.me/top/${num}')
            .then((response) => {
                return response.json()
            })
            .then ((data) => {
                let top = data

                let top_processed = '${top.name}'
                return top_processed
            })
        }

        for(var numrn = 1; numrn < 11; numrn++) {
            try {
                console.log(fetchtop10(numrn))
            } catch {
                console.log("THIS ISN'T WORKING I WANT TO CONNECT A FORK TO A FUCKING WALL SOCKET")
            }
            
        }
    })
</script>

<div class="main-container">
    <h1>Legitimoose Stats</h1>
    <h2>Top 10 Worlds</h2>
    <ul id="top10">
        
    </ul>
</div>