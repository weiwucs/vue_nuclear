<template>
    <div class="main">
        <v-card
                elevation="3"
                height="40vh"
                width="30vw"
                light
                class="ma-4"
        >
            <v-toolbar
                    color="primary"
                    dark
                    style="font-size: 2vh"
            >
                Vuetify
            </v-toolbar>
            <v-card-text class="pa-1">
                <v-row class="ma-3">
                    <v-col
                            cols="12"
                            md="12"
                    >
                        <v-btn
                                block
                        >button1
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn
                >{{$t('promptInfo.info')}}
                </v-btn>
                <v-btn
                        color="primary"
                >{{$t('promptInfo.warning')}}
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card
                elevation="3"
                height="40vh"
                width="30vw"
                light
                class="ma-4"
        >
            <el-radio-group v-model="labelPosition" size="small">
                <el-radio-button label="left">左对齐</el-radio-button>
                <el-radio-button label="right">右对齐</el-radio-button>
                <el-radio-button label="top">顶部对齐</el-radio-button>
            </el-radio-group>
            <div style="margin: 20px;"></div>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="名称">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
            </el-form>
            <el-row>
                <el-button>默认按钮</el-button>
                <el-button type="primary">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="info">信息按钮</el-button>
                <el-button type="warning">警告按钮</el-button>
                <el-button type="danger">危险按钮</el-button>
            </el-row>
        </v-card>
    </div>
</template>

<script>
    /* eslint-disable */

    export default {
        name: 'Main',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                }
            }
        },
        created: function () {
            // console.log(document.documentElement.style);
            document.documentElement.style.fontSize = "2vh";
        },
        mounted: function () {
            console.log("Main");
            this.currentMode = "MAIN";
            this.showDeviceInfo();
            // dark theme
            this.$vuetify.theme.themes.dark.primary = '#00205B'
            // this.$i18n.locale = 'en';
            // var dateDate = new Date();
            // console.log(dateDate.toLocaleString('en'));
            var that = this;
            this.$axios.get("static/conf.json", {}).then(res => {
                console.log(res.data);
                that.$store.state.server_url = res.data.server_url;
                that.showContext = true;
                // that.$store.commit('changeStatus', "ProjectLanding");

            });
        },
        methods: {
            showDeviceInfo: function () {
                // console.log(window);
                // console.log(HomeLessFunction.getBrowser());
                console.log("devicePixelRatio:" + window.devicePixelRatio);
                console.log("window.innerWidth:" + window.innerWidth);
                console.log("window.innerHeight:" + window.innerHeight);
                //;
            }
        },
        computed: {
            currentMode: {
                get() {
                    return this.$store.state.uiController.currentNavigationMode;
                },
                set(val) {
                    this.$store.state.uiController.currentNavigationMode = val;
                }
            },
        },
        components: {}
    }
</script>

<style>
    .v-label {
        font-size: 2vh !important;
    }

    .v-input {
        font-size: 2vh !important;
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main {
        /* background-color: aliceblue; */
        height: 100vh;
        width: 100vw;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0px;
    }

    a {
        color: #42b983;
    }
</style>