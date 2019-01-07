<template>
  <fieldset class="event-scheduler-attachments">
    <h4>Attachments</h4>
    <ul>
      <li v-for="(attachment, index) in attachments">
        <FileUploader
          :file="attachment"
          @uploading=""
          @doneUploading="setAttachment(index, ...arguments)"
          @clear="clearAttachment(attachment)"
        />
      </li>
      <li>
        <IconText
          class="control--add-item"
          icon="#icon--control--add"
          icon-type="svg"
          @click.native="addAttachment"
        />
      </li>
    </ul>
  </fieldset>
</template>

<script>
import IconText from './IconText'
import FileUploader from './FileUploader'
import { deepClone } from '../utilities/deep-clone'

export default {
  components: {
    IconText,
    FileUploader,
  },
  props: {
    attachments: Array,
  },
  methods: {
    clearAttachment(attachmentToClear) {
      const filteredAttachments = this.attachments
        .filter(attachment => attachment !== attachmentToClear)
      this.$emit("update", filteredAttachments)
    },
    addAttachment(){
      const attachments = deepClone(this.attachments)
      attachments.push({id: -1})
      this.$emit("update", attachments)
    },
    setAttachment(index, url){
      const attachments = deepClone(this.attachments)
      attachments[index] = {
        id: 1,
        location: url,
      }
      this.$emit("update", attachments)
    },
  },
}
</script>

<style lang="scss">
  .event-scheduler-attachments {
    .file-uploader {
      input {
        position: static;
        opacity: 1;
        padding: 0.25rem;
        height: auto;
        width: 100%;
        background-color: #333;
      }
    }
  }
</style>

