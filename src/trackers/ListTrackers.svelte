<script>
  import { fade, fly } from "svelte/transition";
  import { db } from "../firebase";
  import Timer from "./TrackerTimer.svelte";
  import Counter from "./TrackerCounter.svelte";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  export let uid;
  const collectionName = `trackers-${uid}`;
  // Query requires an index, see screenshot below
  const query = db.collection(collectionName).orderBy("dateCreated", "desc");
  const trackers = collectionData(query, "id").pipe(startWith([]));

  function updateTracker(event) {
    console.log("event=", event.detail);
    const { id, newStatus } = event.detail;
    db.collection(collectionName)
      .doc(event.detail.id)
      .update(event.detail);
  }

  function removeTracker(event) {
    const { id } = event.detail;
    db.collection(collectionName)
      .doc(id)
      .delete();
  }
</script>

<div out:fade in:fly={{ x: 0, y: -300 }}>
  {#each $trackers as tracker (tracker.id)}
    {#if tracker.type === 'time'}
      <Timer on:remove={removeTracker} on:update={updateTracker} {tracker} />
    {:else if tracker.type === 'count'}
      <Counter on:remove={removeTracker} on:update={updateTracker} {tracker} />
    {/if}
  {/each}
</div>
