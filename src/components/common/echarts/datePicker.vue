<template>
  <div>
    <el-date-picker
      v-model="date"
      class="datePicker"
      :type="DateTypeSwitch.type"
      :placeholder="DateTypeSwitch.text"
      :value-format="DateTypeSwitch.valueFormat"
      :format="DateTypeSwitch.Format"
      size="small"
      prefix-icon="none"
      :clearable="false"
      @change="setDateNum"
    />
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      default: 0
    },
    formatDate: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      date: (new Date()).$format('yyyy-MM')
    }
  },
  computed: {
    DateTypeSwitch() {
      const obj = {
        type: '',
        Format: '',
        valueFormat: '',
        text: '',
        date: ''
      }
      switch (this.status) {
        case 0: obj.type = 'month'; obj.text = '选择月份'; obj.Format = 'yyyy-MM'; obj.valueFormat = 'yyyy-MM'; obj.date = (new Date()).$format('yyyy-MM'); break
        case 1: obj.type = 'week'; obj.text = '选择周'; obj.Format = 'yyyy-WW周'; obj.valueFormat = ''; obj.date = new Date(); break
        case 2: obj.type = 'year'; obj.text = '选择年份'; obj.Format = 'yyyy'; obj.valueFormat = 'yyyy'; obj.date = (new Date()).$format('yyyy'); break
      }
      return obj
    }
  },
  watch: {
    status: {
      handler() {
        this.setDateNum(this.DateTypeSwitch.date)
      }
    }
  },
  created() {
    this.setDateNum(this.DateTypeSwitch.date)
  },
  methods: {
    setDateNum(date) {
      this.date = date
      const Date = this.status === 1
        ? this.$moment(date).utcOffset(480).format('yyyy-WW') // type为week时，设置value-format会报错，所以这里将weekDate单独格式化
        : date
      this.$emit('update:formatDate', Date)
      this.$emit('changeDate', Date)
    }
  }
}
</script>

<style lang="scss" scoped>
.datePicker {
  ::v-deep .el-input__inner {
    background-color: var(--bgColor);
    color: var(--fontColor);
  }
}
</style>
