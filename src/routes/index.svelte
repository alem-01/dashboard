<script>
  import config from "../tools/config";
</script>

<style>
  a {
    font-size: inherit;
    font-family: inherit;
    color: white;
    background-color: hsl(260, 100%, 70%);
    border-width: 0px;
    font-size: 0.7rem;
    padding: 20px;
    width: 225px;
  }
  a:hover {
    color: white;
  }
</style>

<svelte:head>
  <title>dashboard | alem</title>
</svelte:head>

<section class="hero is-fullheight-with-navbar">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h2 class="subtitle">
        <a
          class="button"
          href="https://git.01.alem.school/login/oauth/authorize/?client_id={config.CLIENT_ID}&redirect_uri={config.API_URL}/auth/git&response_type=code">
          SIGN IN
        </a>
      </h2>
    </div>
  </div>
</section>
