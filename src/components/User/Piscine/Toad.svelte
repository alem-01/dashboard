<script>
    export let toad
</script>

<div class="block ba-01 box-shadow">
  <h2>Toad</h2>
  {#if 'attempts' in toad}
    <p>⏳ attempts = {toad.attempts.length + 1}</p>
  {/if}
  <p>💾 memory = {toad.games[0].results.length}</p>
  <p>🕹 zzle = {toad.games[1].results.length}</p>
</div>
