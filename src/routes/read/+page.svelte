<script>
    export let data;

</script>

<h1>Read!</h1>
<div class="read-wrapper">
    <div class="read-content">
        {#if data?.users}
        {#each data?.users as user}
            <h1>User # {`${user.id} Name:${user.firstname} ${user.lastname}`}!</h1>
        {/each}
    
    
    {:else}
        <h1>Error getting user</h1>
    {/if}
    </div>
</div>


<style>
    .read-wrapper{
        margin-top:2.5em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100vh;
        width:100%;    
    }
    .read-content{
        max-width: 400px;
        background-color: rgba(0, 0, 0, 0.4);
        padding:1em;
        border-radius: 5px;
    }
</style>