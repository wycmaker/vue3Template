<template>
  <div>
    <div :class="$style.background">
      <div style="width: 20px">
      </div>
      <div v-if="store.state.userInfo !== null">
        <div style="display:inline-block;">
          <span :class="$style['header-user']">Hi,{{ store.state.userInfo.userName }}</span>
          <div :class="$style['header-logout']" @click="logout" id="loading">
            <span>登出</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Common } from '@/composables/common'

export default {
  setup() {
    const self = Common.getProperties()
    /*==========Data and Props==========*/
    /*==========Method==========*/
    /**
     * 登出
     */
    const logout = async () => {
      try {
        const res = await self.$api.logout()
        if(res) {
          const { data } = res
          if(data) {
            self.$store.commit('clearUserInfo')
            self.$router.push('/login')
          } else self.$info.error(data)
        }
      }
      catch(err) {
        self.$info.error(err)
      }
    }

    return { store, logout }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .background {
    display:flex;
    align-items:center;
    justify-content: space-between;
    @include block-size-setting(unset, 60px, unset, unset, 0 15px, unset);
    @include font-setting(18px, bold, $white-color);
  }

  .header {
    &-user {
      @include font-setting(unset, bold, $font-color-3);
      position: relative;
      right: 50px;
    }

    &-logout {
      display:inline-block;
      cursor: pointer;
      margin-left:5px;
      @include font-setting(unset, 700, $font-color-4);
      img:nth-of-type(2):hover {
        opacity: 0;
      }
    }

    &-icon {
      position: absolute;
      height: 25px;
      top: 17px;
      right: 55px;
    }

    &-logo {
      position: relative;
      height: 45px;
      top: 2px;
    }
  }


</style>
