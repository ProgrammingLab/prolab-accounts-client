<template>
    <div id="page">
        <img width="210" height="70" src="http://placehold.jp/65/ffffff/666666/210x70.png?text=ProLab" alt="prolag">
        <!-- <img alt="Prolab Logo" src="../assets/logo.png"> -->
        <h1>プロフィール編集ページ</h1>
        <p id="uname" class="profileItem">user: prolab_user</p>
        <form>
            <input type="checkbox" name="profile_publish" id="checkbox" value="enabled">
            プロフィールを公開する<br>
            <label for="display_name" class="profileItem">表示名</label><br>
            <input type="text" name="display_name" value="user"><br>
            <label for="real_name" class="profileItem">本名</label><br>
            <input type="text" name="real_name" value="Real User"><br>
            <label for="grade" class="profileItem">学年</label><br>
            <input type="text" name="grade" value="2"><br>
            <label for="department" class="profileItem">学科</label><br>
            <input type="text" name="department" value="S"><br>
            <label for="display_name" class="profileItem">Twitter ID</label><br>
            <input type="text" name="Twitter" value="@TwitterUser"><br>
            <label for="display_name" class="profileItem">Github Name</label><br>
            <input type="text" name="Github" value="GithubUser"><br>
            <input type="submit" value="保存する">
        </form>
    </div>
</template>

<style scoped>
    #page{
        margin-left: 10vw;
        margin-right: 10vw;
        color:#666666;
    }
    #uname{
        font-size: 25px;
    }
    .profileItem{
        font-weight: bold;
    }
</style>
