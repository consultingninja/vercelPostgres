<script>
    export let data;

    let selectedUser;


</script>

<h1>Update!</h1>
<div class="update-wrapper">
    <div class="update-content">
        <ol>
            {#each data?.users as user,index}
            <li> <input id={`job-checkbox-${index}`} checked={selectedUser?.id === user.id} type="checkbox" value={JSON.stringify(user)} on:click={()=> selectedUser = (selectedUser?.id !== user.id)? user  : undefined}/>{`User Id: ${user.id}   Firstname: ${user.firstname}, Lastname: ${user.lastname}, Email: ${user.email}`}</li>
            {/each}
        </ol>
        {#if selectedUser}
        <form method="post" action="?/update">
            <label for="firstname">New Firstname</label>
            <input id="firstname" name="firstname" type="text" required value={selectedUser.firstname}/>
            <label for="lastname">New Lastname</label>
            <input id="lastname" name="lastname" type="text" required value={selectedUser.lastname}/>
            <label for="email">New Email</label>
            <input id="email" name="email" type="text" required value={selectedUser.email}/>
            <input id="id" name="id" type="hidden" value={selectedUser.id} />
            <button type="submit">Submit</button>
        </form>
        {/if}
    </div>

</div>


<style>
    .update-wrapper{
        margin-top:2.5em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100vh;
        width:100%;    
    }
    .update-content{
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