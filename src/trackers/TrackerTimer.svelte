<script>
  import { createEventDispatcher, onMount } from "svelte";
  import TrackerControls from "./TrackerControls.svelte";

  const dispatch = createEventDispatcher();

  export let tracker;

  let timeStarted = null;
  let timerRunning = false;
  let timeProcessed = null;
  let timerInterval = null;

  onMount(() => {
    if (tracker.timeStarted) {
      timerRunning = true;
      timeStarted = tracker.timeStarted.toDate();
      startInterval();
    }
  });

  function toggleTimer() {
    if (timerRunning) {
      stopTimer(tracker);
    } else {
      startTimer(tracker);
    }
  }

  function startTimer() {
    if (timerRunning) return;
    tracker.timeStarted = new Date();
    timeStarted = tracker.timeStarted;
    timeProcessed = timeDiff(null);
    startInterval();
    update();
  }

  function startInterval() {
    timerRunning = true;
    timerInterval = setInterval(() => {
      timeProcessed = timeDiff(timeStarted, new Date());
    }, 1000);
  }

  function stopTimer() {
    let timeStopped = new Date();
    let timeElapsed = Math.abs(timeStarted - timeStopped) / 1000;
    tracker.previousValues.push({
      timeStarted: timeStarted,
      timeStopped,
      timeElapsed
    });
    tracker.currentValue = tracker.previousValues.reduce(
      (total, pv) => (total += pv.timeElapsed),
      0
    );
    update();
    clearInterval(timerInterval);
    timerRunning = false;
    timeProcessed = null;
  }

  function diffToString(diff) {
    if (!diff) return `0 hrs: 0 min: 0 sec`;
    diff = Math.abs(Math.floor(diff));

    var days = Math.floor(diff / (24 * 60 * 60));
    var leftSec = diff - days * 24 * 60 * 60;

    var hrs = Math.floor(leftSec / (60 * 60));
    var leftSec = leftSec - hrs * 60 * 60;

    var min = Math.floor(leftSec / 60);
    var leftSec = leftSec - min * 60;

    return `${hrs} hrs: ${min} min: ${leftSec} sec`;
  }

  function timeDiff(date1, date2) {
    var diff = (date2 - date1) / 1000;
    return diffToString(diff);
  }

  function reset() {
    tracker.currentValue = 0;
    tracker.previousValues.push({
      value: tracker.currentValue,
      dateCreated: new Date()
    });
    update();
  }

  function remove() {
    dispatch("remove", { id: tracker.id });
  }

  function update() {
    dispatch("update", {
      id: tracker.id,
      currentValue: tracker.currentValue,
      timeStarted: tracker.timeStarted,
      previousValues: []
    });
  }
</script>

<div class="card margin-bottom-small">
  <div class="card-header">{tracker.title}</div>
  <div class="card-body">

    {#if timeProcessed}
      <h5 class="card-title">{timeProcessed}</h5>
    {/if}
    <h5 class="card-title">
      Time Taken:
      <br />
      {diffToString(tracker.currentValue)}
    </h5>

    <TrackerControls
      actionName={`⏱ ${timerRunning ? 'Stop' : 'Start'}`}
      on:action={toggleTimer}
      on:reset={reset}
      on:remove={remove} />
  </div>

</div>
