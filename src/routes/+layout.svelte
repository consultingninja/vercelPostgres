<script>
    import Navbar from "../lib/Navbar.svelte";
</script>

<Navbar/>
<slot/>

<svelte:head>

    <style>
        body{
            margin:0;
            color: #FFFFFF;
            background-color: #242424;
            min-width: 100vw;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    </style>
    	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

</svelte:head>


