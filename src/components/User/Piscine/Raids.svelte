<script>
    export let raids

    const raidNames = ["Raid 01", "Raid 02", "Raid 03"]
    const raidNotes = raids
</script>

<style>
  .raid {
    margin-top: 1rem;
  }
</style>

<div class="block ba-01 box-shadow">
  {#if raidNotes}
    <h2>Raid</h2>
    {#each raidNotes as raidNote, index}
      {#if raidNote.attrs.assignedReviewerId != null}
        <p class="raid">
          {raidNames[index]}
          reviewer: {raidNote.attrs.assignedReviewerId}
        </p>
        {#if 'note' in raidNote.attrs}
          <div class="block ba-01 box-shadow">
            {@html raidNote.attrs.note.replace(/\n/g, '<br />')}
          </div>
        {/if}
      {/if}
    {/each}
  {/if}
</div>
