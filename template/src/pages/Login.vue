<template>
  <div :class="$style.content">
    <el-form :model="loginAttr" label-position="right" label-width="20px" ref="loginForm" @keyup.enter="click" :class="[$style.form, $style.loginForm]">
      <el-form-item label="帳號" style="margin-bottom: 0px" label-width="95px">
      </el-form-item>
      <el-form-item label="" style="margin-bottom: 15px">
        <el-input v-model="loginAttr.account"></el-input>
      </el-form-item>
      <el-form-item label="密碼" style="margin-bottom: 0px" label-width="95px">
      </el-form-item>
      <el-form-item label="" style="margin-bottom: 15px">
        <el-input v-model="loginAttr.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="" label-width="0px" style="text-align: center;margin-top: 30px">
        <el-button :class="$style['btn-A']" @click="click" id="loading">登　入</el-button>
      </el-form-item>
    </el-form>
    <date-range-picker v-model:endDate="endDate" v-model:startDate="startDate" title="日期範圍："></date-range-picker>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
import { getPrototype } from '@/utils'
import DateRangePicker from '@/components/Query/DateRangePicker.vue'

export default {
  components: { DateRangePicker },
  setup() {
    const { info, api, validator} = getPrototype()

    const loading = ref(false)
    const loginAttr = reactive({
      account: null,
      password: null
    })

    const startDate = ref(new Date().toString('-'))
    const endDate = ref(new Date().toString('-'))

    const click = async () => {
      const message = validator.login(loginAttr)
      if(message !== 'success') {
        info.alert(message)
        return
      }
      try {
        const res = await api.login(loginAttr)
        if(res) {
          const { data } = res
          if(data.item1.isSuccess) {
            storeUserInfo(data.item2)
            info.success(data.item1.successMessage)
          }
          else info.error(data.item1.exceptionMessage)
        }
      }
      catch(err) {
        info.error(err)
      }
    }

    const storeUserInfo = () => {
      this.$store.commit('setUserInfo', data)
      this.$router.push('/')
    }

    const test = () => {
      info.success('test')
    }

    const test1 = () => {
      info.success('test1')
    }

    return { loading, loginAttr, click, test, test1, startDate, endDate }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .content {
    display: flex;
    align-items: center;
    @include block-size-setting(calc(100vw - 40px), 100vh, center, unset, unset, -60px 0 0 0);
    @include background-image-setting(unset, calc(100vw - 40px), calc(100vh + 20px), 0);

    & img {
      margin-right: calc((100vw - 300px - 306.8px) / 2 * -1);
      margin-left: calc((100vw - 300px - 306.8px - 100px) / 2);
    }
  }

  .loginForm {
    @include block-size-setting(300px, 200px, unset, inherit, unset, 0 auto);
    @extend %form-shared;
    margin-top: -50px;

    :global {
      .el-form-item__label {
        font-size: 24px;
      }

      .el-input {
        height: 40px;
        line-height: 80px;
        font-size: 18px;
        background-color: $white-color;
        color: $font-color-7;
        --el-input-focus-border-color: none;
      }

      .el-input__wrapper {
        border: 1px solid $border-color;
        box-shadow: none;
        border-radius: 40px;
      }

      .el-input__wrapper .is-focus, .el-input__wrapper:hover, .el-input__wrapper:focus {
        box-shadow: none;
      }

      .el-input .el-input__clear {
        color: $font-color-7;
      }
    }

    & .btn-A {
      @include font-setting(24px, bold, unset, unset);
      width: 280px;
      margin-left: 20px;
      border-radius: 23px;
    }
  }

  .logo {
    position: absolute;
    top: 120px;
    left: calc((100vw - 411px - 500px) / 2 * -1);
  }
</style>