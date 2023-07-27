<script>
    export let form;
    
    let showPassword = false;
    let showConfirm = false;
    
    let password = '';
    let confirm = '';

    let email;

    $:{if(email && form?.error) email.focus()}
    $:passError = (password?.length && confirm?.length)? (password !== confirm)? true: false : false;


</script>
    
    <h1>Create!</h1>
    <div class="create-wrapper">
        <div class="create-content">
    
    <div class='logo-wrapper'>
        <img class="logo" src="/ConsultingNinjaSmallNoBg.png"  alt="consulting ninja logo"/>
    </div>

    
    <form  method="post" action="?/create">
        <div class="form-item">
            <label for="firstname" >Firstname<sup><small>*</small></sup></label>
            <input value={form?.firstname?? ''} id="firstname" type="text" name="firstname" required />
        </div>
    
        <div class="form-item">
          <label for="lastname" >Lastname<sup><small>*</small></sup></label>
          <input value={form?.lastname?? ''} id="lastname" type="text" name="lastname" required />
      </div>
    
      <div class="form-item">
          <label for="email" >Email<sup><small>*</small></sup></label>
          <input bind:this={email} on:keydown={()=> {form.error = false; form.message = '';}}  class:fieldError={form?.error} value={form?.email?? ''} id="email" type="email" name="email" required />
      </div>
    
        <div class="form-item">
            <label for="password">Password<sup><small>*</small></sup></label>
            <div class="visibility-wrapper">
            {#if !showPassword}
                <button class="btn-visiblity" type="button" on:click={() => showPassword = true}>
                    <span class="material-symbols-outlined">
                    visibility_off
                    </span>
                </button>
                <input bind:value={password} class:fieldError={form?.weakPassword || passError} type='password' id="password" name="password" required />
            {:else}
                <button class="btn-visiblity" type="button" on:click={() => showPassword = false}>
                    <span class="material-symbols-outlined">
                        visibility
                    </span>
                </button>
                <input bind:value={password} class:fieldError={form?.weakPassword || passError} type='text' id="password" name="password" required />
            {/if}
    
            </div>  
        </div>
    
        <div class="form-item">
            <label for="confirmPassword">Confirm Password<sup><small>*</small></sup></label>
            <div class="visibility-wrapper">
            {#if !showConfirm}
                <button class="btn-visiblity" type="button" on:click={() => showConfirm = true}>
                    <span class="material-symbols-outlined">
                    visibility_off
                    </span>
                </button>
                <input bind:value={confirm} class:fieldError={form?.weakPassword || passError} type='password' id="confirmPassword" name="confirmPassword" required />
            {:else}
                <button class="btn-visiblity" type="button" on:click={() => showConfirm = false}>
                    <span class="material-symbols-outlined">
                        visibility
                    </span>
                </button>
                <input bind:value={confirm} class:fieldError={form?.weakPassword || passError} type='text'  id="confirmPassword" name="confirmPassword" required />
            {/if}
    
        </div>
        </div>

    
        <div class="form-item">
        {#if passError}
        <small>Passwords do not match!</small>
        {/if}
    
        {#if form?.error}
        <small>{form?.message}</small>
        {/if}
        </div>
    
        <div class="form-item">
            <button disabled={passError} type="submit" class="btn btn-primary">Sign Up</button>
        </div>
    
    </form>
    </div>
    </div>
    
    <style>
        div{
            color: #FFF;
            margin-bottom: .5em;
            text-shadow: 0 0 2px #000000;
        }
        label{
            padding-right: .5em;
        }
        small{
            padding-left: .5em;
            color: #ff0000;
        }
        button{
            width: 100%;
            background-color: #FFF;
            transition: all 0.3s ease-in;
        }
        button:hover{
            cursor: pointer;
            text-decoration: underline;
            color: #FFF;
            background-color: #4d4c4c;
            transition: all 0.3s ease-in;
        }
        span{
            color: #ffffff;
            border-radius: 115px;
        }
        span:hover{
            color: rgba(255, 255, 255, 0.7);
        }
        input{
            min-width: 175px;
        }
        .create-wrapper{
            margin-top:2.5em;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            height: 100vh;
            width:100%;
            
        }
        .create-content{
            max-width: 400px;
            background-color: rgba(0, 0, 0, 0.4);
            padding:1em;
            border-radius: 5px;
        }
        .form-item{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .fieldError{
            outline: 2px solid #ff0000;
        }
        .create-wrapper{
            height: 100vh;
        }
        .btn-visiblity{
            border-radius: 9999999px;
            background-color: rgba(0, 0, 0, 0);
            border: 0;
        }
        .btn-visiblity:hover{
            background-color: rgba(0, 0, 0, 0);
        }
        .visibility-wrapper{
            display: flex;
            flex-direction: row;
        }
        .logo-wrapper{
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

        }
        .logo{
            display: block;
            width: 120px;
            height: auto;

        }



    </style>