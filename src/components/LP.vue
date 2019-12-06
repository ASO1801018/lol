<template>
  <div class="lp">
    こちらはLPページです。
    情報をお求めの方は、下記よりメールアドレスをご登録ください。
    <div>
      メールアドレス:<input v-model="email" placeholder="email@email.com">
      <input type="submit" value="登録">
    </div>
    <div>
      <span v-show="!validation.email">メールアドレスの形式が不正です</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'email': ''
    }
  },
  computed: {
    validation () {
      return {
        email: this.email === '' || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)
      }
    }
  }
}
</script>
