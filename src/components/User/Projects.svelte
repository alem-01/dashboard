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
  }

</style>

<div class="block ba-01 box-shadow">
  <h3 class="chapter-header">Projects</h3>
    
  <div class="projects">
    {#each projects.reverse() as project (project.object.name)}
    <div class="project columns ba-01">
      <div class="column">
        <p>{project.object.name}</p>
      </div>
      <div class="column is-2">
        <p class="dark-green" style="float: right;">PASS</p>
      </div>
    </div>
    {/each}
  </div>
</div>
