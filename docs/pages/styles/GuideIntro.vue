<template lang="html">
  <article>
      <h2
        id="development-principles"
        class="library--section-title"
        >{{ msg }}</h2>
      <div class="styleguide-intro">
        <br>
        <h3>Health Scholars strives to be <em>innovative</em> without losing sight of the  <em>purpose</em> and <em>clarity</em> driving our creative design and development decisions – delivering clinical education to improve the lives of patients.</h3>
        <!-- <p><strong>We want medical professionals to continue to improve because becoming better at what they do can result in saving lives.</strong></p> -->
        <p>We believe experiential learning is at the heart of improving healthcare performance. So we’ve developed an enterprise software platform that enables more effective management, delivery and analysis of education programs.</p>
        <p>We commit to better understanding the people using our platform and strive to develop products around their needs.</p>
        <h3 id="good-design">Good Design:</h3>
        <ul>
          <li>Is innovative</li>
          <li>Makes a product useful</li>
          <li>Is aesthetic</li>
          <li>Makes a product understandable</li>
          <li>Is unobtrusive</li>
          <li>Is honest</li>
          <li>Is long-lasting</li>
          <li>Is thorough down to the last detail</li>
          <li>Is environmentally friendly</li>
          <li>Involves as little design as possible</li>
        </ul>
        <p>reference: <a href="//www.vitsoe.com/us/about/good-design/">Dieter Rams—Vistoe</a></p>
        <p>Our highest priority is to <strong>satisfy</strong> the customer through <strong>early</strong> and <strong>continuous delivery</strong> of <strong>valuable</strong> software.</p>
        <p>See <a href="//docs.healthscholars.com/showfile/Development/AgileManifesto.html">Agile Manifesto</a> for details.</p>
        </div>
  </article>
</template>

<script>
export default {
  name: 'guide-intro',
  data() {
    return {
      msg: 'Principles',
    }
  },
}
</script>
