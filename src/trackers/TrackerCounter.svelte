<script>
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import TrackerControls from "./TrackerControls.svelte";

  const dispatch = createEventDispatcher();
  export let tracker;

  function increment() {
    tracker.currentValue += 1;
    tracker.previousValues.push({
      value: tracker.currentValue,
      dateCreated: new Date()
    });

    update();
  }

  function update() {
    dispatch("update", {
      id: tracker.id,
      currentValue: tracker.currentValue,
      previousValues: tracker.previousValues
    });
  }

  function reset() {
    tracker.currentValue = 0;
    tracker.previousValues = [];

    update();
  }

  function remove() {
    dispatch("remove", { id: tracker.id });
  }
</script>

<div class="card margin-bottom-small">
  <div class="card-header">{tracker.title}</div>
  <div class="card-body">
    <h4 class="card-title">Total: {tracker.currentValue}</h4>
    <TrackerControls
      actionName={'➕ Count'}
      on:action={increment}
      on:reset={reset}
      on:remove={remove} />
  </div>
</div>
