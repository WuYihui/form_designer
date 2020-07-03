<template>
  <div class="price-container">
    <div class="price-wrp">
      <div class="price-header">用户登录</div>
      <el-row type="flex" justify="center">
        <el-form ref="user" :model="user" :rules="rules" label-width="80px" label-position="left">
          <el-alert v-if="error" :title="errorMsg" type="error" :closable="true"></el-alert>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-upload" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getStore, setStore } from "../util/storage";
import {
  login,
  userInfo,
  githubLogin,
  qqLogin,
  weiboLogin,
  getJWT,
  sendSms,
  smsLogin
} from "@/api/index";
export default {
  methods: {
    showErrorMsg(msg) {
      this.error = true;
      this.errorMsg = msg;
    },
    login() {
      this.$refs.user.validate(valid => {
        if (valid) {
          this.loading = true;
          login({
            username: this.user.username,
            password: this.user.password,
            saveLogin: "ture"
          }).then(res => {
            if (res.success == true) {
              setStore("accessToken", res.result);
              // 获取用户信息
              // userInfo().then(res => {
              //     if (res.success == true) {
              //         // 避免超过大小限制
              //         delete res.result.permissions;
              //         let roles = [];
              //         res.result.roles.forEach(e => {
              //             roles.push(e.name);
              //         });
              //         setStore("roles", roles);
              //         setStore("saveLogin", this.saveLogin);
              //         setStore("userInfo", res.result);
              //         this.$store.commit("setAvatarPath", res.result.avatar);
              //         // 加载菜单
              //         util.initRouter(this);
              //         this.$router.push({
              //             name: "home_index"
              //         });
              //     } else {
              //         this.loading = false;
              //     }
              // });
              this.$router.push({ path: "/formlist" });
            } else {
              this.loading = false;
              this.error = true;
            }
          });
        }
      });
    }
  },
  data() {
    return {
      error: false,
      errorMsg: "",
      loading: false,
      user: { name: "", password: "" },
      rules: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
</script>
<style lang="scss"  scoped>
.price-container {
  padding: 20px;
  .price-wrp {
    width: 1000px;
    margin: 0 auto;
    background: #fff;
    padding: 30px;

    .price-header {
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
    }

    .price-description {
      margin: 10px 0;
    }

    .price-table {
      width: 100%;
      margin-top: 20px;
      border-spacing: 0;
      border-collapse: collapse;

      th {
        width: 33%;
        color: #fff;
        border: 1px solid #ccc;
        padding: 10px 20px;
      }

      td {
        border: 1px solid #ccc;
        padding: 10px 20px;

        .price {
          color: red;

          i {
            text-decoration: line-through;
            margin-left: 10px;
            color: #999;
          }
        }
      }
    }

    .price-footer {
      margin: 30px 0;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
