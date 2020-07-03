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
  const timeSpent = fillDays(attendance.attendance);
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
  :global(table.calendar) {
    clear: both;
    width: 100%;
    border: 1px solid #dcdcff;
    border-radius: 3px;
    border-collapse: collapse;
    color: #444;
  }
  :global(.calendar td) {
    height: 48px;
    text-align: center !important;
    vertical-align: middle;
    border-right: 1px solid #dcdcff;
    border-top: 1px solid #dcdcff;
    width: 14.28571429%;
  }
  :global(.calendar td.not-current) {
    color: #c0c0c0;
  }
  :global(td.today) {
    font-weight: 700;
    color: #28283b;
    font-size: 1em;
  }
  :global(.calendar thead td) {
    border: none;
    color: #28283b;
    text-transform: uppercase;
    font-size: 1em;
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
  /* Tooltip container */
  :global(.tooltip) {
    position: relative;
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
  }
  /* Tooltip text */
  :global(.tooltip .tooltiptext) {
    visibility: hidden;
    width: 60px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    bottom: 100%;
    left: 0%;
    margin-left: -10px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
  }
  /* Show the tooltip text when you mouse over the tooltip container */
  :global(.tooltip:hover .tooltiptext) {
    visibility: visible;
  }
  :global(.tooltiptext:hover) {
    visibility: hidden;
  }
</style>

<div>
  <h2>Attendance</h2>
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
    <div id="divCal" bind:this={calendarTable} />
  </div>
</div>
