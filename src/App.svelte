<script>
  import CreateTracker from "./trackers/CreateTracker.svelte";
  import ListTrackers from "./trackers/ListTrackers.svelte";
  import Loader from "./Loader.svelte";

  import { auth, googleProvider } from "./firebase";
  import { authState } from "rxfire/auth";

  let user;
  let loading = true;

  const unsubscribe = authState(auth).subscribe(u => {
    user = u;
    loading = false;
  });

  function login() {
    auth.signInWithPopup(googleProvider);
  }
</script>

<style>
  .main-container {
    background: url(/img/bg.jpg);
    min-height: 100vh;
  }

  .main {
    max-width: 25em;
    padding: 1em;
    margin: 0 auto;
  }

  .homepage {
    height: 100vh;
    max-width: 30rem;
    background: white;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
  .homepage-heading {
    font-size: 2rem;
  }
  .homepage-card {
    border: none;
    box-shadow: none;
  }
  .homepage-login-button {
    display: flex;
    align-items: center;
    margin-top: 30px;
  }
  .google-logo {
    height: 40px;
  }
</style>

<section>

  {#if loading}
    <Loader />
  {:else if user}
    <div class="main-container">
      <div class="main">
        <div class="margin-bottom-small">
          <CreateTracker uid={user.uid} />
        </div>
        <ListTrackers uid={user.uid} />
      </div>
    </div>
  {:else}
    <div class="homepage">

      <div class="card homepage-card">
        <img src="/img/logo.jpg" alt="Track Yo'self logo" />

        <div class="card-body">
          <h1 class="homepage-heading card-title">Track Yo'Self!</h1>
          <h5 class="card-subtitle">
            The easiest way to track all your activity in one place.
          </h5>
          <p class="card-text" />
          <button class="homepage-login-button" on:click={login}>
            <img class="google-logo" src="/img/google.png" alt="Google Logo" />
            Signin with Google
          </button>
        </div>
      </div>

    </div>
  {/if}

</section>
