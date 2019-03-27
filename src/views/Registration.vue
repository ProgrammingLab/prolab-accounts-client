<template>
    <div class="container">
        <div class="box">
            <form action='post'>
                <label for="username">User Name</label>
                <input required type="text" v-model="name"><input>
                <label for="full_name">Full Name</label>
                <input required type="text" v-model="full_name"></input>
                <label for="password"></label>
                <input required type="password" v-model=""></input>
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
</template>
