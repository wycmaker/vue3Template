<template>
  <div :class="$style.content">
    <el-form :model="loginAttr" label-position="right" label-width="20px" ref="loginForm" @keyup.enter="login" :class="[$style.form, $style.loginForm]">
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
        <el-button :class="$style['btn-A']" @click="login" id="loading">登　入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Common } from '@/composables/common'

export default {
  setup() {
    const self = Common.getProperties()

    /*==========Data and Props==========*/
    const loginAttr = Common.reactive({
      account: null,
      password: null
    })

    /*==========Method==========*/
    /**
     * 登入
     */
    const login = async () => {
      const message = self.$validator.login(loginAttr)
      if(message !== 'success') {
        self.$info.alert(message)
        return
      }
      try {
        const res = await self.$api.login(loginAttr)
        if(res) {
          const { data } = res
          if(data.item1.isSuccess) {
            self.$info.success(data.item1.successMessage)
            storeUserInfo(data.item2)
          }
          else self.$info.error(data.item1.exceptionMessage)
        }
      }
      catch(err) {
        self.$info.error(err)
      }
    }

    /**
     * 記錄使用者資訊與頁面跳轉
     * @param {Object} data 使用者資料
     */
    const storeUserInfo = (data) => {
      self.$store.commit('setUserInfo', data)
      self.$router.push('/')
    }

    return { loginAttr, login }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .content {
    display: flex;
    align-items: center;
    @include block-size-setting(calc(100vw - 40px) !important, 100vh, center, unset, unset, -60px 0 0 0);
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