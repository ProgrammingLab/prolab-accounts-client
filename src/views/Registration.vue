<template>
    <div class="container">
        <div class="box">
            <form action='post'>
                <label for="username">User Name</label>
                <input required type="text" v-model="name"><input>
                <label for="full_name">Full Name</label>
                <input required type="text" v-model="full_name"></input>
                <label for="password"></label>
                <input required type="password" v-model="password"></input>
                <button type="submit">Register</button>
                <ErrorMessage :error="registrationError"/>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
    name: 'registration',
    data() {
        return {
            name: '',
            full_name: '',
            password: '',
            registration_token: '',
        };
    },
    computed: {
        ...mapState('user', [
            'registrationError'
        ]),
    },
    mounted() {
        this.registration_token = this.$route.params.token
    },
    methods: {
        ...mapActions('user', [
            'register',
        ]),
        async onRegister() {
            await this.register({
                name: this.name,
                full_name: this.full_name,
                password: this.password,
                registration_token: this.registration_token,
            });
            if (! this.registrationError) {
                this.$router.push({name: 'login'});
            }
        },
    },
};
</script>