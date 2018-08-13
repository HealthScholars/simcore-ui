<template>
  <div>
    <SummaryBlock v-for="summary in this.summaries"
      :index="summary.index"
      :title="summary.title"
      :sections="summary.sections"
      :closeAction="close"
    ></SummaryBlock>
  </div>
</template>

<script>
import SummaryBlock from '../../../components/Summary/SummaryBlock'

export default {
  name: 'summaryblock-doc',
  components: { SummaryBlock },
  data() {
    return {
      summaries: [
        {
          index: 8,
          title: 'Room Advanced',
          sections: [
            {
              title: 'Scenario',
              content: 'Good Stuff Learnings',
            },
            {
              title: 'People',
              content: [
                {
                  count: 1,
                  label: 'Instructor',
                },
                {
                  count: 3,
                  label: 'Standardized Patients',
                },
              ],
            },
            {
              title: 'Equipment',
              content: [
                'Metiman',
                'Monitor Sonsonite',
              ],
            },
          ],
        },
        {
          index: 12,
          title: 'Room Basic',
          sections: [
            {
              title: 'Scenario',
              content: 'Smart Learns',
            },
            {
              title: 'People',
              content: [
                {
                  count: 2,
                  label: 'Instructors',
                },
                {
                  count: 1,
                  label: 'Standardized Patient',
                },
              ],
            },
            {
              title: 'Equipment',
              content: [],
            },
          ],
        },
      ],
    }
  },
  methods: {
    close(element) {
      console.log('Close the summary.', element)
    },
  },
}
</script>
