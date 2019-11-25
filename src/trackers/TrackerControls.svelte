<script>
  export let actionName;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  .control-buttons {
    width: 100%;
    display: flex;
  }
</style>

<div class="row">
  <button class="btn-block btn-secondary" on:click={() => dispatch('action')}>
    {actionName}
  </button>
  <div class="control-buttons">
    <button class="btn-small btn-success" on:click={() => dispatch('reset')}>
      ♻︎ Reset
    </button>
    <button class="btn-small btn-danger" on:click={() => dispatch('remove')}>
      ✖️ Delete
    </button>
  </div>
</div>
