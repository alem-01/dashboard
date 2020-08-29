<script>
    export let progress
    $: projects = progress.progresses.reverse()
</script>

<style>
  .projects {
    overflow-y: scroll;
    height: 600px;
  }

  .project {
    margin: 1rem 0;
    padding: 1rem;
  }

</style>

<div class="block ba-01 box-shadow">
  <h3 class="chapter-header">Projects</h3>
    
  <div class="projects">
    {#each projects as project (project.object.name)}
    <div class="project ba-01">


      <div class="level is-mobile">
        <!-- Left side -->
        <div class="level-left">
          <p class="level-item">{project.object.name}</p>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item dark-green">PASS</p>
        </div>
      </div>
    </div>
    {/each}
  </div>
</div>
