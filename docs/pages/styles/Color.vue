<template lang="html">
  <article>

    <h2 class="library--section-title">{{ msg }}</h2>

    <demobox :open="true">

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">          
          <section class="module-section">
            <h3 id="brand-colors" class="module-label">Brand Colors</h3>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">                
                <ColorSwatch :hexCode="brandGreenHex" :color-variable="brandGreen"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="brandTealHex" :color-variable="brandTeal"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="brandPurpleHex" :color-variable="brandPurple"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="brandGreyHex" :color-variable="brandGrey"></ColorSwatch>
              </div>              
            </div>
            <div class="module module--demo module--demo--branding">
              <div class="module--demo--item">
                <div class="color-swatch brand-gradient" tabindex="0">
                  <span class="color-swatch--example"></span>
                  <span class="color-swatch--name bg--lightest text--dark">
                    <b>{{ brandGradient }}</b>
                    <small>{{ brandGradientValue }}</small>
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section class="module-section">
            <h3 id="base-colors" class="module-label">Base Colors</h3>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <ColorSwatch :hexCode="darkestHex" :color-variable="darkest"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="darkerHex" :color-variable="darker"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="darkHex" :color-variable="dark"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="darkGreyHex" :color-variable="darkGrey"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="greyHex" :color-variable="grey"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="mediumGreyHex" :color-variable="mediumGrey"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="lightGreyHex" :color-variable="lightGrey"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="lighterGreyHex" :color-variable="lighterGrey"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="lightHex" :color-variable="light"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="lighterHex" :color-variable="lighter"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="lightestHex" :color-variable="lightest" class="bg--lightest"></ColorSwatch>
              </div>
            </div>
          </section>
          <section class="module-section">
            <h3 id="app-colors" class="module-label">Application Colors</h3>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <ColorSwatch :hexCode="blueHex" :color-variable="blue"></ColorSwatch>
              </div>              
              <div class="module--demo--item">
                <ColorSwatch :hexCode="redHex" :color-variable="red"></ColorSwatch>
              </div>                           
              <div class="module--demo--item">
                <ColorSwatch :hexCode="orangeHex" :color-variable="orange"></ColorSwatch>
              </div>              
              <div class="module--demo--item">
                <ColorSwatch :hexCode="yellowHex" :color-variable="yellow"></ColorSwatch>
              </div>              
              <div class="module--demo--item">
                <ColorSwatch :hexCode="greenHex" :color-variable="green"></ColorSwatch>
              </div>              
              <div class="module--demo--item">
                <ColorSwatch :hexCode="aquaHex" :color-variable="aqua"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="purpleHex" :color-variable="purple"></ColorSwatch>
              </div>
            </div>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <ColorSwatch :hexCode="blueFilmHex" :color-variable="blueFilm" :opacity="blueFilmHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="blueFilmHeavyHex" :color-variable="blueFilmHeavy" :opacity="blueFilmHeavyHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="redFilmHex" :color-variable="redFilm"  :opacity="redFilmHexAlpha"></ColorSwatch>
              </div> 
              <div class="module--demo--item">
                <ColorSwatch :hexCode="orangeFilmHex" :color-variable="orangeFilm"  :opacity="orangeFilmHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="yellowFilmHex" :color-variable="yellowFilm"  :opacity="yellowFilmHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="greenFilmHex" :color-variable="greenFilm"  :opacity="greenFilmHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="aquaFilmHex" :color-variable="aquaFilm"  :opacity="aquaFilmHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="purpleFilmHex" :color-variable="purpleFilm"  :opacity="purpleFilmHexAlpha"></ColorSwatch>
              </div>
            </div>
          </section>
          <section class="module-section">
            <h3 id="state-colors" class="module-label">State Colors</h3>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <ColorSwatch :hexCode="actionHex" :color-variable="action"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="activeHex" :color-variable="active" :opacity="activeHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="focusHex" :color-variable="focus"></ColorSwatch>
              </div>
            </div>
          </section>
          <section class="module-section">
            <h3 id="feedback-colors" class="module-label">Feedback Colors</h3>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <ColorSwatch :hexCode="successHex" :color-variable="success"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="dangerHex" :color-variable="danger"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="warningHex" :color-variable="warning"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="alertHex" :color-variable="alert"></ColorSwatch>
              </div>
            </div>
          </section>
          <section class="module-section">
            <h3 id="accent-colors" class="module-label">Accent Colors</h3>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <ColorSwatch :hexCode="accentHex" :color-variable="accent"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="royalHex" :color-variable="royal"></ColorSwatch>
              </div>
            </div>
          </section>
          <section class="module-section">
            <h3 id="utility-colors" class="module-label">Utility Colors</h3>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <ColorSwatch :hexCode="shadowHex" :color-variable="shadow" :opacity="shadowHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="twilightHex" :color-variable="twilight" :opacity="twilightHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="shadowHex" :color-variable="shadow" :opacity="shadowHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="twilightHex" :color-variable="twilight" :opacity="twilightHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="duskHex" :color-variable="dusk" :opacity="duskHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="shadowHex" :color-variable="shadow" :opacity="shadowHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="shadeHex" :color-variable="shade" :opacity="shadeHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="dustHex" :color-variable="dust" :opacity="dustHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="edgeHex" :color-variable="edge" :opacity="edgeHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="lineHex" :color-variable="line" :opacity="lineHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="ghostHex" :color-variable="ghost" :opacity="ghostHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="frostHex" :color-variable="frost" :opacity="frostHexAlpha"  class="bg--lightest"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="fogHex" :color-variable="fog" :opacity="fogHexAlpha"  class="bg--lightest"></ColorSwatch>
              </div>              
              <div class="module--demo--item">
                <ColorSwatch :hexCode="mistHex" :color-variable="mist" :opacity="mistHexAlpha"  class="bg--lightest"></ColorSwatch>
              </div>
            </div>
          </section>
        </template>

        <template slot="js">
          <pre v-highlightjs><code class="javascript"></code></pre>
        </template>

      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimIconText from '../../../components/IconText'
  import ColorSwatch from '../../utility/ColorSwatch'
  
export default {
  name: 'guide-color',
  components: {
    Demobox,
    SimIconText,
    ColorSwatch,
  },
  data() {
    return {
      msg: 'Color',

      // Base Colors
      darkest: 'var(--darkest)',
      darkestHex: '#000000',
      darker: 'var(--darker)',
      darkerHex: '#222222',
      dark: 'var(--dark)',
      darkHex: '#333333',
      darkGrey: 'var(--dark-grey)',
      darkGreyHex: '#444444',
      grey: 'var(--grey)',
      greyHex: '#565656',
      mediumGrey: 'var(--medium-grey)',
      mediumGreyHex: '#777777',
      lightGrey: 'var(--light-grey)',
      lightGreyHex: '#CCCCCC',
      lighterGrey: 'var(--lighter-grey)',
      lighterGreyHex: '#DDDDDD',
      light: 'var(--light)',
      lightHex: '#EEEEEE',
      lighter: 'var(--lighter)',
      lighterHex: '#FAFAFA',
      lightest: 'var(--lightest)',
      lightestHex: '#FFFFFF',

      // Application Colors
      blue: 'var(--blue)',
      blueHex: '#4A93B9',      
      red: 'var(--red)',
      redHex: '#CA1E34',      
      orange: 'var(--orange)',
      orangeHex: '#FF7042',      
      yellow: 'var(--yellow)',
      yellowHex: '#FFC929',    
      green: 'var(--green)',
      greenHex: '#9CCC66',      
      aqua: 'var(--aqua)',
      aquaHex: '#00C1D9',      
      purple: 'var(--purple)',
      purpleHex: '#AB47BD',
      blueFilm: 'var(--blue-film)',
      blueFilmHex: '#4A93B9',
      blueFilmHexAlpha: 0.5,
      blueFilmHeavy: 'var(--blue-film-heavy)',
      blueFilmHeavyHex: '#0E6796',
      blueFilmHeavyHexAlpha: 0.9,
      redFilm: 'var(--red-film)',
      redFilmHex: '#CA1E34',
      redFilmHexAlpha: 0.5,
      orangeFilm: 'var(--orange-film)',
      orangeFilmHex: '#FF7042',
      orangeFilmHexAlpha: 0.5,
      yellowFilm: 'var(--yellow-film)',
      yellowFilmHex: '#FFC929',
      yellowFilmHexAlpha: 0.5,
      greenFilm: 'var(--green-film)',
      greenFilmHex: '#9CCC66',
      greenFilmHexAlpha: 0.5,
      aquaFilm: 'var(--aqua-film)',
      aquaFilmHex: '#00C1D9',
      aquaFilmHexAlpha: 0.5,
      purpleFilm: 'var(--purple-film)',
      purpleFilmHex: '#AB47BD',
      purpleFilmHexAlpha: 0.5,

      // State Colors
      action: 'var(--action)',
      actionHex: '#4A93B9',
      active: 'var(--active)',
      activeHex: '#0E6796',
      activeHexAlpha: 0.9,
      focus: 'var(--focus)',
      focusHex: '#00C1D9',

      // Feedback Colors
      success: 'var(--success)',
      successHex: '#9CCC66',
      danger: 'var(--danger)',
      dangerHex: '#CA1E34',
      warning: 'var(--warning)',
      warningHex: '#FF7042',
      alert: 'var(--alert)',
      alertHex: '#FFC929',

      // Accent Colors
      accent: 'var(--accent)',
      accentHex: '#777777',
      royal: 'var(--royal)',
      royalHex: '#AB47BD',

      // Utility Colors
      shadow: 'var(--shadow)',
      shadowHex: '#000000',
      shadowHexAlpha: 0.8,
      twilight: 'var(--twilight)',
      twilightHex: '#000000',
      twilightHexAlpha: 0.5,
      dusk: 'var(--dusk)',
      duskHex: '#000000',
      duskHexAlpha: 0.3,
      shade: 'var(--shade)',
      shadeHex: '#000000',
      shadeHexAlpha: 0.05,
      dust: 'var(--dust)',
      dustHex: '#777777',
      dustHexAlpha: 0.05,
      edge: 'var(--edge)',
      edgeHex: '#777777',
      edgeHexAlpha: 0.15,
      line: 'var(--line)',
      lineHex: '#777777',
      lineHexAlpha: 0.5,
      ghost: 'var(--ghost)',
      ghostHex: '#808080',
      ghostHexAlpha: 0.5,
      mist: 'var(--mist)',
      mistHex: '#FFFFFF',
      mistHexAlpha: 0.2,
      fog: 'var(--fog)',
      fogHex: '#FFFFFF',
      fogHexAlpha: 0.5,
      frost: 'var(--frost)',
      frostHex: '#FFFFFF',
      frostHexAlpha: 0.8,

      // Brand Colors
      brandPurple: 'var(--brand-purple)',
      brandPurpleHex: '#553C98',
      brandTeal: 'var(--brand-teal)',
      brandTealHex: '#57B185',
      brandGreen: 'var(--brand-green)',
      brandGreenHex: '#7AC943',
      brandGrey: 'var(--brand-grey)',
      brandGreyHex: '#929497',
      brandGradient: 'var(--brand-gradient)',
      brandGradientValue: 'linear-gradient(to right, var(--brand-green) 20%, var(--brand-teal), 50%, var(--brand-purple) 68%, var(--brand-grey) 85%)',
    }
  },
}
</script>

