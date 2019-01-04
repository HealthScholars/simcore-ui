<template>
  <div class="file-uploader">
    <label v-if="file.id < 0" for="file-upload">Upload a file</label>
    <input v-if="file.id < 0" @change="uploadFile" id="file-upload" type="file" />
    <div v-else class="uploaded-file">
      <span>{{name}}</span>
      <IconText
        class="sim-autofinder--remove-item"
        @click.native.prevent="clear"
        icon="#icon--control--x" icon-type="svg"
      />
      <p v-if="isError" class="error">There was an error uploading this file.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import IconText from './IconText'

export default {
  components: {
    IconText,
  },
  data() {
    return {
      isUploading: false,
      isError: false,
      uploadUrl: 'https://okparu9xxl.execute-api.us-east-2.amazonaws.com/default/fileUpload',
    }
  },
  props: {
    file: Object,
  },
  computed: {
    name() {
      const segments = this.file.location.split('/')
      return segments[segments.length - 1].split('-').splice(1).join('')
    },
  },
  methods: {
    clear() {
      this.$emit('clear')
    },
    doneUploading(file) {
      this.isUploading = false
      this.$emit('doneUploading', file.data.location)
    },
    uploading() {
      this.isUploading = true
      this.isError = false
      this.$emit('uploading')
    },
    async uploadFile(event) {
      this.uploading()
      const encodedFile = await this.base64Encode(event.target.files[0])
      axios.post(this.uploadUrl, { file: encodedFile, name: event.target.files[0].name })
        .then(this.doneUploading)
        .catch(error => this.setError)
    },
    setError(error) {
      this.isError = false
    },
    base64Encode(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
  },
}
</script>

<style lang="scss">
  .file-uploader {
    padding: 0 0.5em;
    input {
      position: static;
      opacity: 1;
      background-color: #333;
      padding: 0.25rem;
      height: auto;
      width: 100%;
    }
    .uploaded-file {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
    .error {
      color: red;
    }
  }
</style>
