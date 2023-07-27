<script>
    export let data;

    let selectedUser;


</script>

<h1>Delete!</h1>
<div class="delete-wrapper">
    <div class="delete-content">
        <ol>
            {#each data?.users as user,index}
            <li> <input id={`job-checkbox-${index}`} checked={selectedUser?.id === user.id} type="checkbox" value={JSON.stringify(user)} on:click={()=> selectedUser = (selectedUser?.id !== user.id)? user  : undefined}/>{`User Id: ${user.id}   Firstname: ${user.firstname}, Lastname: ${user.lastname}, Email: ${user.email}`}</li>
            {/each}
        </ol>
        {#if selectedUser}
            <form method="post" action="?/delete">
                <h3>Are you sure you want to delete {`${selectedUser.firstname},${selectedUser.lastname}`}</h3>
                <input id="id" name="id" type="hidden" value={selectedUser.id} />
                <button type="submit">Yes</button>
                <button type='button' on:click={()=> selectedUser = null}>No</button>

            </form>
        {/if}
    </div>

</div>


<style>
    .delete-wrapper{
        margin-top:2.5em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100vh;
        width:100%;    
    }
    .delete-content{
        background-color: rgba(0, 0, 0, 0.4);
        padding:1em;
        border-radius: 5px;
    }
    form{
        margin-top: .5em;
        display: flex;
        flex-direction: column;
    }
    form input{
        margin:.5em;
    }
</style>