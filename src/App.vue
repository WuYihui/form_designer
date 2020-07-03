<template>
  <div id="app">
    <!-- <div class="fm-header">
      <img class="fm-logo" src="./assets/logo.png" />
      <div class="fm-title" @click="handleHome">表单设计器</div>

      <div class="fm-link">
        <a href="#/formlist">表单列表</a>
        <a href="http://www.xiaoyaoji.cn" target="_blank">小幺鸡接口文档</a>
        <el-dropdown
          style="color: #fff; text-decoration: none; font-size: 14px; line-height: 50px; font-weight: 500; margin-left: 10px; margin-right:10px;"
        >
          <span class="el-dropdown-link">
            欢迎你
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>主页</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div> -->
    <div class="fm-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { getStore, setStore } from "./util/storage";
export default {
  name: "app",
  methods: {
    handleHome() {
      this.$router.push({ path: "/" });
    },
    logout() {
      console.log("/进来了");
      setStore("accessToken", "");
      this.$router.push({ path: "/login" });
    }
  },
  data() {
    return {
      token: getStore("accessToken")
    };
  }
};
</script>

<style lang="scss">
.fm-header {
  height: 50px;
  box-shadow: 0 2px 10px rgba(70, 160, 252, 0.6);
  padding: 0 10px;
  background-image: linear-gradient(to right, #1278f6, #00b4aa);
  position: relative;

  .fm-logo {
    height: 26px;
    vertical-align: middle;
  }
  .fm-title {
    display: inline-block;
    line-height: 50px;
    vertical-align: middle;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    opacity: 0.8;
    margin-left: 6px;
    cursor: pointer;
  }
  .fm-link {
    height: 50px;
    float: right;

    a {
      color: #fff;
      text-decoration: none;
      font-size: 14px;
      line-height: 50px;
      font-weight: 500;
      margin-left: 10px;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
.fm-container {
  height: calc(100% - 50px);
}
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}

.breadcrumb-container {
  float: left;
}

.errLog-container {
  display: inline-block;
  vertical-align: top;
}

.avatar-container {
  margin-right: 30px;

  .avatar-wrapper {
    margin-top: 5px;
    position: relative;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>
