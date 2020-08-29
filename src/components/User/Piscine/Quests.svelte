<script>
  export let quests;
  const preprocessQuests = toadData => {
    let result = {};
    for (let key in toadData) {
      if (!(key in result)) result[key] = {};
      for (let j = 0; j < toadData[key].length; j++) {
        const objName = toadData[key][j].progress.object.name;
        if (!(objName in result[key]))
          result[key][objName] = {
            done: false,
            attempts: 0
          };
        if (toadData[key][j].grade == 1) result[key][objName].done = true;
        else result[key][objName].attempts++;
      }
    }
    return result;
  };

  quests = preprocessQuests(quests);
</script>

<style>
  .scrollable {
    height: 25rem;
    overflow: auto;
  }

  table {
    clear: both;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 3px;
    border-collapse: collapse;
    color: #444;
  }
  td {
    text-align: center !important;
    vertical-align: middle;
    border-right: 1px solid #ddd;
    border-top: 1px solid #ddd;
    width: 14.28571429%;
  }
</style>

<div class="block ba-01 box-shadow">
  <h2>Quests</h2>
  <div class="scrollable">
    <table>
      <thead>
        <tr>
          <td>success</td>
          <td>exercise</td>
          <td>attempts</td>
        </tr>
      </thead>
      {#each Object.keys(quests) as key (key)}
        <tr>
          <td colspan="3" style="font-weight: 700; padding: 1rem;">
            {key}
          </td>
        </tr>
        {#each Object.keys(quests[key]) as exercise (exercise)}
          <tr>
            <td>{quests[key][exercise].done ? '✅' : '❌'}</td>
            <td>{exercise}</td>
            <td>{quests[key][exercise].attempts + 1}</td>
          </tr>
        {/each}
      {/each}
    </table>
  </div>
</div>