<template>
  <footer class="event-scheduler-footer">
    <button class="save-draft" @click="$emit('saveDraft')">Save Event</button>
    <input type="submit" @click="$emit('saveDraft')" value="Save Event" />
  </footer>
</template>

<style lang="scss">
  .event-scheduler-footer {
    display: flex;
    justify-content: space-between;
    .save-draft {
      visibility: hidden;
      padding: 1rem;
      border-radius: 4px;
      background-color: #ccc;
      color: #999;
    }
    input[type=submit] {
      padding: 1rem;
      background-color: orange;
      color: white;
      border-radius: 4px;
    }
  }
</style>

