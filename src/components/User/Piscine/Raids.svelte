<script>
    export let raids

    const raidNames = ["Raid 01", "Raid 02", "Raid 03"]
    const raidNotes = raids
</script>

<style>
  .raid {
    margin-top: 1rem;
}

.review {
    padding: 15px;
    background-color: rgba(242,243,244, 0.6);
    border: 1px solid #ddd;
    border-radius: 5px;
}
</style>

{#if raidNotes}
  <h2>Raid</h2>
  {#each raidNotes as raidNote, index}
    {#if raidNote.attrs.assignedReviewerId != null}
      <p class="raid">
        <strong>{raidNames[index]}</strong>
        reviewer: {raidNote.attrs.assignedReviewerId}
      </p>
      {#if 'note' in raidNote.attrs}
        <p class="review">
          {@html raidNote.attrs.note.replace(/\n/g, '<br />')}
        </p>
      {/if}
    {/if}
  {/each}
{/if}
