<template>
    <div id="page">
        <img width="210" height="70" src="http://placehold.jp/65/ffffff/666666/210x70.png?text=ProLab" alt="prolag">
        <!-- <img alt="Prolab Logo" src="../assets/logo.png"> -->
        <h1>プロフィール編集ページ</h1>
        <b id="uname">user: prolab_user</b>
        <form>
            <input type="checkbox" name="profile_publish" id="checkbox" value="enabled">
            プロフィールを公開する<br>
            <b>表示名</b><br>
            <input type="text" name="display_name" value="user"><br>
            <b>本名</b><br>
            <input type="text" name="real_name" value="Real User"><br>
            <b>学年</b><br>
            <input type="text" name="grade" value="2"><br>
            <b>学科</b><br>
            <input type="text" name="department" value="S"><br>
            <b>Twitter ID</b><br>
            <input type="text" name="Twitter" value="@TwitterUser"><br>
            <b>Github Name</b><br>
            <input type="text" name="Github" value="GithubUser"><br>
            <input type="submit" value="保存する">
        </form>
    </div>
</template>

<style scoped>
    #a{
        margin-left: 10vw;
        margin-right: 10vw;
        color:#666666;
    }
    b#uname{
        font-size: 25px;
    }
</style>
