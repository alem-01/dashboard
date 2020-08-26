<script>
    export let progress
    const projects = progress.progresses
</script>

<style>
  .projects table {
  clear: both;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 3px;
  border-collapse: collapse;
  color: #444;
}
.projects td {
  text-align: left;
  padding: 3px 1rem;
  vertical-align: middle;
  border-right: 1px solid #ddd;
  border-top: 1px solid #ddd;
}
</style>

<div class="projects">
  <h2>Projects</h2>
  <div class="calendar-wrapper" style="height:25rem; overflow:auto;">
    <table>
      {#each projects as project (project.object.name)}
        <tr>
          <td>{project.object.name}</td>
        </tr>
      {/each}
    </table>
  </div>
</div>
