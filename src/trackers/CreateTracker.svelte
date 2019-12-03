<script>
  import { createSlug, createUid } from "../utils";

  import { db } from "../firebase";

  export let uid;

  let newRecordTitle = "";
  let newRecordType = "";
  let formValid = false;
  let closed = true;
  let loading = true;

  $: if (newRecordTitle.trim().length > 0 && newRecordType) {
    formValid = true;
  }

  function createTracker() {
    if (!formValid) return;
    const trackerId = `${createSlug(newRecordTitle)}-${createUid()}`;
    db.collection(`trackers`)
      .doc(trackerId)
      .set({
        id: trackerId,
        uid,
        type: newRecordType,
        title: newRecordTitle,
        dateCreated: new Date(),
        currentValue: 0,
        previousValues: []
      })
      .then(res => {
        // console.log("DONE=", res);
      })
      .catch(err => {
        // console.log("ERR=", err);
      });

    newRecordTitle = "";
    newRecordType = "";
    formValid = false;
    closed = true;
  }
</script>

{#if closed}
  <button on:click={() => (closed = false)} class="btn-block">
    Create Tracker
  </button>
{:else}
  <!-- CREATE A RECORD -->
  <div class="card margin-bottom-large">
    <div class="card-header">
      Create Tracker
      <span style="float: right" on:click={() => (closed = true)}>✖️</span>
    </div>
    <div class="card-body">
      <div class="form-group">
        <input
          class="input-block"
          bind:value={newRecordTitle}
          type="text"
          placeholder="Title"
          id="paperInputs1" />
      </div>
      <fieldset class="form-group">
        <legend>Type</legend>
        <label for="record_type_count" class="paper-radio">
          <input
            type="radio"
            name="record_type"
            id="record_type_count"
            bind:group={newRecordType}
            value="count" />
          <span>
            Counter
            <span />
          </span>
        </label>
        <label for="record_type_time" class="paper-radio">
          <input
            type="radio"
            name="record_type"
            id="record_type_time"
            bind:group={newRecordType}
            value="time" />
          <span>
            Time Taken
            <span />
          </span>
        </label>
      </fieldset>
      <button
        class:disabled={!formValid}
        on:click={() => createTracker()}
        class="btn-block">
        + Add
      </button>
    </div>
  </div>
{/if}
