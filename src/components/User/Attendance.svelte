<script>
  // timeSpent: object, key - date, value - amount of minutes in building
  // calendar: calendar table
  import { onMount } from "svelte";
  import {
    fillDays,
    diffMins,
    diffDays,
    showTip,
    Calendar
  } from "./attendance";

  export let attendance;
  const timeSpent = (attendance.attendance) ? fillDays(attendance.attendance) : {};
  let calendarTable;
  let calendar;

  onMount(() => {
    calendar = new Calendar("divCal", calendarTable, timeSpent);
    calendar.showcurr();
  });
</script>

<style>
  .calendar-wrapper {
    width: 100%;
    margin: 0em auto;
  }

  #btnPrev {
    float: left;
    margin-bottom: 20px;
  }
  #btnNext {
    float: right;
    margin-bottom: 20px;
  }
  #btnPrev,
  #btnNext {
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: #c0c0c0;
    cursor: pointer;
    font-family: "Roboto Condensed", sans-serif;
    text-transform: uppercase;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  #btnPrev:hover,
  #btnNext:hover {
    color: #28283b;
    font-weight: bold;
  }

</style>

<div class="block ba-01 box-shadow">
  <h3 class="chapter-header">Attendance</h3>
  <div id="divCal" bind:this={calendarTable}></div>
  <div class="calendar-wrapper">
    <button
      id="btnPrev"
      type="button"
      on:click={() => {
        calendar.previousMonth();
      }}>
      Prev
    </button>
    <button
      id="btnNext"
      type="button"
      on:click={() => {
        calendar.nextMonth();
      }}>
      Next
    </button>
  </div>
</div>
