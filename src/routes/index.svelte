<script>
  import config from "../tools/config";
</script>

<style>
  #logo {
    width: 10rem;
  }

  a {
    z-index: 1;
    position: relative;
    font-size: inherit;
    font-family: inherit;
    color: black;
    padding: 0.5em 1em;
    outline: none;
    border: none;
    border: 4px solid rgb(150, 150, 150);
    background-color: rgb(150, 150, 150);
  }

  a:hover {
    border-color: rgb(150, 150, 150);
    cursor: pointer;
  }

  a::before {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 4px solid rgb(150, 150, 150);
    transform-origin: center;
    transform: scale(1);
  }

  a:hover::before {
    transition: all 0.75s ease-in-out;
    transform-origin: center;
    transform: scale(1.75);
    opacity: 0;
  }
</style>

<svelte:head>
  <title>dashboard | alem</title>
</svelte:head>

<section class="hero is-white is-fullheight-with-navbar">
  <div class="hero-body">
    <div class="container has-text-centered">
      <img id="logo" src="/alem.svg" alt="logo" />
      <h2 class="subtitle">
        <a
          class="button"
          href="https://git.01.alem.school/login/oauth/authorize/?client_id={config.CLIENT_ID}&redirect_uri={config.API_URL}/auth/git&response_type=code">
          sign in
        </a>
      </h2>
    </div>
  </div>
</section>
