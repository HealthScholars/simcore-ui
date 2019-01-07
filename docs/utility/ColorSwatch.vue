<template lang="html">
  <div class="color-swatch" tabindex="0">
    <button class="sim-button sim-button--link">
      <span class="fa fa-info-circle fa-lg"></span>
    </button>
    <span class="color-swatch--example" :class="textColorClass" :style="{'background': colorCode }"></span>
    <span class="color-swatch--name bg--lightest text--dark">
      <b>{{ colorVariable }}</b>
      <small>{{ colorCode }}</small>
      <small>{{ rgbColorCode }}</small>
    </span>
  </div>    
</template>

<script>
  export default {
    name: 'guide-color-swatch',
    props: ['hex-code', 'opacity', 'color-variable'],
    computed: {
      brightness () {
        const r = parseInt(this.hexCode.slice(1, 3), 16)
        const g = parseInt(this.hexCode.slice(3, 5), 16)
        const b = parseInt(this.hexCode.slice(5, 7), 16)
        return (r * 299 + g * 587 + b * 114) / 1000
      },
      textColorClass () {
        return this.brightness > 165 ? 'text--dark' : 'text--light'
      },
      colorCode() {
        return this.opacity ? this.generateRGBAFromHexAndOpacity() : this.hexCode
      },
      rgbColorCode() {
        if(this.hexCode) {
          const rgbObject = this.hex2rgb(this.hexCode)
          return `rgb(${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b})`
        } else {
          return 'Missing HEX color code!'
        }
      },
    },
    methods: {
      hex2rgb(hex) {
       if(hex) {
         hex = hex.replace('#', '')
         var r = (parseInt(hex.substring(0, 2), 16)|0)
         var g = (parseInt(hex.substring(2, 4), 16)|0)
         var b = (parseInt(hex.substring(4, 6), 16)|0)
          return {r:r, g:g, b:b}
        }
      },
      generateRGBAFromHexAndOpacity() {
        if(this.opacity && this.hexCode) {
          const rgbObject = this.hex2rgb(this.hexCode)
          console.log(rgbObject)
          return `rgba(${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b}, ${this.opacity})`
        }
      },
    }
  }
</script>

<style lang="scss">
  @import '../../docs/assets/sass/color-swatch';
  @import '../../docs/assets/sass/brand-logo';
</style>

