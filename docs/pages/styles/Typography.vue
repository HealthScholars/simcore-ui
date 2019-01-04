<template lang="html">
  <article>

    <h2 class="library--section-title">{{ msg }}</h2>

    <demobox :open="true" class="typography-demo">

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">
          <section class="module-section module-section--font-demo module-section--primary-font">
            <h3 class="module-label" id="primary-font">Primary Font</h3>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p class="h2">Montserrat 300</p>
              </div>
              <div class="module--demo--info">
                <p>AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz</p>
                <p>0123456789</p>
                <p>‘​‌?​‌’​‌“​‌!​‌”​‌(​‌%​‌)​‌[​‌#​‌]​‌{​‌@​‌}​‌/​‌&amp;​‌\​‌&lt;​‌-​‌+​‌÷​‌×​‌=​‌&gt;​‌®​‌©​‌$​‌€​‌£​‌¥​‌¢​‌:​‌;​‌,​‌.​‌*</p>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p class="h2">Montserrat 400</p>
              </div>
              <div class="module--demo--info">
                <p>AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz</p>
                <p>0123456789</p>
                <p>‘​‌?​‌’​‌“​‌!​‌”​‌(​‌%​‌)​‌[​‌#​‌]​‌{​‌@​‌}​‌/​‌&amp;​‌\​‌&lt;​‌-​‌+​‌÷​‌×​‌=​‌&gt;​‌®​‌©​‌$​‌€​‌£​‌¥​‌¢​‌:​‌;​‌,​‌.​‌*</p>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p class="h2">Montserrat 500</p>
              </div>
              <div class="module--demo--info">
                <p>AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz</p>
                <p>0123456789</p>
                <p>‘​‌?​‌’​‌“​‌!​‌”​‌(​‌%​‌)​‌[​‌#​‌]​‌{​‌@​‌}​‌/​‌&amp;​‌\​‌&lt;​‌-​‌+​‌÷​‌×​‌=​‌&gt;​‌®​‌©​‌$​‌€​‌£​‌¥​‌¢​‌:​‌;​‌,​‌.​‌*</p>
              </div>
            </div>
          </section>
          <section class="module-section module-section--font-demo module-section--headline-font">
            <h3 class="module-label" id="headline-font">Headline Font</h3>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p class="h2">DIN Condensed Bold</p>
              </div>
              <div class="module--demo--info">
                <p>AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz</p>
                <p>0123456789</p>
                <p>‘​‌?​‌’​‌“​‌!​‌”​‌(​‌%​‌)​‌[​‌#​‌]​‌{​‌@​‌}​‌/​‌&amp;​‌\​‌&lt;​‌-​‌+​‌÷​‌×​‌=​‌&gt;​‌®​‌©​‌$​‌€​‌£​‌¥​‌¢​‌:​‌;​‌,​‌.​‌*</p>
              </div>
            </div>
          </section>
          <section class="module-section module-section--font-demo module-section--base-font">
            <h3 class="module-label" id="base-font-stack">Base Font Stack</h3>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p class="h2">-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif</p>
              </div>
              <div class="module--demo--info">
                <p>AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz</p>
                <p>0123456789</p>
                <p>‘​‌?​‌’​‌“​‌!​‌”​‌(​‌%​‌)​‌[​‌#​‌]​‌{​‌@​‌}​‌/​‌&amp;​‌\​‌&lt;​‌-​‌+​‌÷​‌×​‌=​‌&gt;​‌®​‌©​‌$​‌€​‌£​‌¥​‌¢​‌:​‌;​‌,​‌.​‌*</p>
              </div>
            </div>
          </section>
          <section class="module-section module-section--font-demo module-section--serif-font">
            <h3 class="module-label" id="base-font-stack">Serif Font Stack</h3>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p class="h2">'Garamond', 'Cambria', Georgia, serif</p>
              </div>
              <div class="module--demo--info">
                <p>AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz</p>
                <p>0123456789</p>
                <p>‘​‌?​‌’​‌“​‌!​‌”​‌(​‌%​‌)​‌[​‌#​‌]​‌{​‌@​‌}​‌/​‌&amp;​‌\​‌&lt;​‌-​‌+​‌÷​‌×​‌=​‌&gt;​‌®​‌©​‌$​‌€​‌£​‌¥​‌¢​‌:​‌;​‌,​‌.​‌*</p>
              </div>
            </div>
          </section>
          <section class="module-section module-section--headings">
            <span id="type-headings"></span>
            <h3 class="module-label">Headings</h3>
            <div class="module module--demo">
              <div class="module--demo--item">
                <h1>Heading h1</h1>
              </div>
              <div class="module--demo--info" pre-label="html">
 <pre v-highlightjs><code class="html">&lt;h1>Heading h1&lt;/h1>

&lt;p class="h1">Heading h1&lt;/p></code></pre>
</div>
              <div class="module--demo--info" pre-label="scss">
<pre v-highlightjs><code class="scss">h1,.h1 {
  font-size: 3.25rem;
  font-weight: 700;
}
</code></pre>
              </div>
            </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <h2>Heading h2</h2>
              </div>
              <div class="module--demo--info" pre-label="html">
 <pre v-highlightjs><code class="html">&lt;h2>Heading h2&lt;/h2>

&lt;p class="h2">Heading h2&lt;/p></code></pre>
</div>
              <div class="module--demo--info" pre-label="scss">
<pre v-highlightjs><code class="scss">h2,.h2 {
  font-size: 2.75rem;
  font-weight: 700;
}
</code></pre>
              </div>
            </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <h3>Heading h3</h3>
              </div>
              <div class="module--demo--info" pre-label="html">
 <pre v-highlightjs><code class="html">&lt;h3>Heading h3&lt;/h3>

&lt;p class="h3">Heading h3&lt;/p></code></pre>
</div>
              <div class="module--demo--info" pre-label="scss">
<pre v-highlightjs><code class="scss">h3,.h3 {
  font-size: 2.25rem;
  font-weight: 700;
}
</code></pre>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <h4>Heading h4</h4>
              </div>
              <div class="module--demo--info" pre-label="html">
 <pre v-highlightjs><code class="html">&lt;h4>Heading h4&lt;/h4>

&lt;p class="h4">Heading h4&lt;/p></code></pre>
              </div>
              <div class="module--demo--info" pre-label="scss">
 <pre v-highlightjs><code class="scss">h4,.h4 {
  font-size: 1.5rem;
  font-weight: 500;
}
</code></pre>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <h5>Heading h5</h5>
              </div>
              <div class="module--demo--info" pre-label="html">
 <pre v-highlightjs><code class="html">&lt;h5>Heading h5&lt;/h5>

&lt;p class="h5">Heading h5&lt;/p></code></pre>
              </div>
              <div class="module--demo--info" pre-label="scss">
<pre v-highlightjs><code class="scss">h5,.h5 {
  font-size: 1.25rem;
  font-weight: 500;
}
</code></pre>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <h6>Heading h6</h6>
              </div>
              <div class="module--demo--info" pre-label="html">
 <pre v-highlightjs><code class="html">&lt;h6>Heading h6&lt;/h6>

&lt;p class="h6">Heading h6&lt;/p></code></pre>
</div>
              <div class="module--demo--info" pre-label="scss">
<pre v-highlightjs><code class="scss">h6,.h6 {
  font-size: .875rem;
  font-weight: 500;
}
</code></pre>
              </div>
            </div>
          </section>
          <section class="module-section module-section--copy">
            <h3 class="module-label" id="copy">Copy</h3>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p>This is a paragraph. We use these all over the place.</p>
                <p>The old posters and signs in the traditional Montserrat neighborhood of Buenos Aires inspired Julieta Ulanovsky to design this typeface and rescue the beauty of urban typography that emerged in the first half of the twentieth century. </p>
              </div>
              <div class="module--demo--info" pre-label="html">
 <pre v-highlightjs><code class="html">&lt;p>This is a paragraph. We use these all over the place.&lt;/p></code></pre>
</div>
              <div class="module--demo--info" pre-label="scss">
<pre v-highlightjs><code class="scss">p {

  line-height: 1.6;
  margin-top: 0;
  margin-bottom: 0;

  // if more than one
  & + p {
    margin-top: 1.5rem;
  }

}</code></pre>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p class="drop-caps">This is a paragraph with drop caps applied. We may or may not use this style very often but it can be useful when writing blog posts.</p>
                <div class="module--demo--info" pre-label="html">
 <pre v-highlightjs><code class="html">&lt;p class="drop-caps">This is a paragraph with drop caps applied. We may or may not use this style very often but it can be useful when writing blog posts.&lt;/p></code></pre>
            </div>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p class="drop-caps drop-caps--serif">This is a paragraph with <em>serif</em> drop caps applied. Dignissimos adipisci consequatur architecto fugit perferendis sint assumenda.</p>
                <div class="module--demo--info" pre-label="html">
 <pre v-highlightjs><code class="html">&lt;p class="drop-caps drop-caps--serif">This is a paragraph with serif drop caps applied. We may or may not use this style very often but it can be useful when writing blog posts.&lt;/p></code></pre>
</div>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p><a href="#0">This is a paragraph link</a>.</p>
              </div>
              <div class="module--demo--info" pre-label="html">
                <pre v-highlightjs><code class="html">&lt;p>&lt;a href="#0">This is a paragraph link.&lt;/a>&lt;/p></code></pre>
              </div>
              <div class="module--demo--info" pre-label="scss">
<pre v-highlightjs><code class="scss">a {
  color: var(--action);
}

p a {
  text-decoration: underline;
  text-decoration-skip: ink;
}</code></pre>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p><strong>This line is bold.</strong></p>
              </div>
              <div class="module--demo--info" pre-label="html">
                <pre v-highlightjs><code class="html">&lt;p>&lt;strong>This line is bold.&lt;/strong>&lt;/p&gt;</code></pre>
              </div>
              <div class="module--demo--info" pre-label="scss">
<pre v-highlightjs><code class="scss">strong, b {
  font-weight: bold;
}</code></pre>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p><u>This paragraph tag is underlined</u>.</p>
              </div>
              <div class="module--demo--info" pre-label="html">
                <pre v-highlightjs><code class="html">&lt;p>&lt;u>This paragraph tag is underlined&lt;/u&gt;.&lt;/p&gt;</code></pre>
              </div>
              <div class="module--demo--info" pre-label="scss">
<pre v-highlightjs><code class="scss">u {
  text-decoration: underline;
  text-decoration-skip: ink;
}</code></pre>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p><em>This is italicized to show emphasis</em>.</p>
              </div>
              <div class="module--demo--info" pre-label="html">
                <pre v-highlightjs><code class="html">&lt;p>&lt;em>This is italicized to show emphasis&lt;/em&gt;.&lt;/p&gt;</code></pre>
              </div>
              <div class="module--demo--info" pre-label="scss">
<pre v-highlightjs><code class="scss">em {
  font-style: italic;
}</code></pre>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p>This is an <span class="text-highlight">example of highlighted</span> copy.</p>
              </div>
              <div class="module--demo--info" pre-label="html">
                <pre v-highlightjs><code class="html">&lt;p>This is an &lt;span class="text-highlight">example of highlighted&lt;/span> copy.</code></pre>
              </div>
              <div class="module--demo--info" pre-label="scss">
<pre v-highlightjs><code class="scss">.text-highlight {
  background-color: var(--yellow);
  color: var(--dark);
  padding: .25em;
}</code></pre>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <blockquote>This is a Blockquote. Look out honey, 'cause I'm using technology!</blockquote>
              </div>
              <div class="module--demo--info" pre-label="html">
                <pre v-highlightjs><code class="html">&lt;blockquote>This is a Blockquote. Look out honey, 'cause I'm using technology!&lt;/blockquote&gt;</code></pre>
              </div>
              <div class="module--demo--info" pre-label="scss">
<pre v-highlightjs><code class="scss">blockquote {
  background: var(--lighter);
  border-left: 4px solid var(--red-film);
  font-family: var(--serif-font-family);
  font-style: italic;
  margin-top: 1rem;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 1rem;
  padding: 1rem;
}</code></pre>
              </div>
            </div>
          </section>
        </template>

        <!-- <template slot="html">
          <pre v-highlightjs><code class="html">&lt;h1>Headline h1&lt;/h1>
&lt;h2>Headline h2&lt;/h2>
&lt;h3>Headline h3&lt;/h3></code></pre>
        </template>

        <template slot="scss">
          <pre v-highlightjs><code class="scss">$var-name: #333;</code></pre>
        </template>

        <template slot="js">
          <pre v-highlightjs><code class="javascript"></code></pre>
        </template>-->

      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimIconText from '../../../components/IconText'

export default {
  name: 'guide-typography',
  components: {
    Demobox,
    SimIconText,
  },
  data() {
    return {
      msg: 'Typography',
    }
  },
}
</script>

<style lang="scss">
  @import '../../../docs/assets/sass/typography';
</style>
