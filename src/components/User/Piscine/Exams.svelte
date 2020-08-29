<script>
  import { customFetch } from "../../../tools/auth";
  import config from "../../../tools/config";
  import { onMount } from "svelte";

  export let exams;
  export let events = [];

  const examNames = ["Exam 01", "Exam 02", "Exam 03", "Final Exam"];
  let exerciseNames = {};
  let examEvents = {};

  onMount(async () => {
    const resp = await customFetch(`${config.API_URL}/exercises`);
    const data = await resp.json();
    exerciseNames = data.exercises;

    const eventPromises = events.map(event =>
      customFetch(`${config.API_URL}/event/${event}`).then(data => data.json())
    );
    const eventResponses = await Promise.all(eventPromises);
    console.log(eventResponses);
    examEvents = Object.fromEntries(
      eventResponses.map(resp => {
        const key = resp.id;
        const value = {
          name: resp.event.object.name,
          transactions: exams.filter(exam => exam.attrs.eventId === key)
        };
        return [key, value];
      })
    );
  });
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
  <h2>Exams</h2>
  <div class="scrollable">
    <table>
      <thead>
        <tr>
          <td>level</td>
          <td>exercise</td>
          <td>xp</td>
        </tr>
      </thead>
      {#each Object.entries(examEvents) as [key, value], i (key)}
        <tr>
          <td colspan="3" style="font-weight: 700; padding: 1rem;">
            {value.name}
          </td>
        </tr>
        {#each value.transactions as transaction, index (transaction)}
          <tr>
            <td>{index + 1}</td>
            <td>{exerciseNames[transaction.attrs.objectId]}</td>
            <td>{transaction.amount}</td>
          </tr>
        {/each}
      {/each}
    </table>
  </div>
</div>