<script>
    import { json } from "@sveltejs/kit";


    import { onMount } from "svelte";

</script>
<head>
    <script lang="js">
        function fetchtop10(num) {
            fetch("https://api.omrih.dev/top/{num}")
                .then((response) => {
                    return response.json()
                })
                .then ((data) => {
                    let top = data

                    
                })
        }
        onMount(() => {
            
        })
    </script>
</head>

<div class="main-container">
    <h1>Legitimoose Stats</h1>
    <h2>Top 10 Worlds</h2>
    <div id="top10">
        
    </div>
</div>