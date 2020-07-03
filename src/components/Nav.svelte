
<script>
	export let segment;
</script>

<style>
 #nav-logo {
	 height: 2rem;
 }
</style>
<!-- <nav>
	<ul>
		<li><a class:selected='{segment === undefined}' href='.'><img alt='alem logo' src='alem.png'/></a></li>
		<li><a class:selected='{segment === "leaderboard"}' href='leaderboard'>leaderboard</a></li>
		<li class="right"><a target="_blank" href='https://blog.alem.school'>blog</a></li>
		<li class="right"><a target="_blank" href='https://navigation.alem.school'>navigation</a></li>
	</ul>
</nav> -->

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img id="nav-logo" src="/alem.png">
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
    	<a class="navbar-item" href="/leaderboard">Leaderboard</a>
    	<a class="navbar-item" href="https://blog.alem.school">Blog</a>
    	<a class="navbar-item" href="https://navigation.alem.school">Navigation</a>
    </div>

  </div>
</nav>