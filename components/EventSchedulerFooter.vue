<template>
  <footer class="event-scheduler-footer">
    <button class="save-draft" @click="$emit('saveDraft')">Save Draft</button>
    <input type="submit" value="Submit For Approval" />
  </footer>
</template>

<style lang="scss">
  .event-scheduler-footer {
    display: flex;
    justify-content: space-between;
    .save-draft {
      padding: 1rem;
      background-color: orange;
      color: white;
      border-radius: 4px;
    }
    [type=submit] {
      padding: 1rem;
      background-color: #ccc;
      color: #999;
      border-radius: 4px;
    }
  }
</style>

