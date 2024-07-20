<template>
    <footer class="footer">
        <div class="container">
            <div class="content">
                <p>Fatto con <a href="https://vuejs.org/" target="_blank"><v-icon size="large" icon="mdi-vuejs"></v-icon></a> e <a href="https://vuetifyjs.com/" target="_blank"><v-icon size="large" icon="$vuetify"></v-icon></a> da Lorenzo Sepe.</p>
                
                <br>
                <div>
                    <p class="control">
                        <a class="button" href="https://github.com/Lorenzo-Sepe" target="_blank">
                            <v-icon icon="mdi-github"></v-icon> <span>GitHub</span>
                        </a>
                    </p>
                    <p class="control">
                        <a class="button" href="https://twitter.com/LorenzoSepe1" target="_blank">
                            <v-icon icon="mdi-twitter"></v-icon> <span>Twitter</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
   background-color: #0b1a29;
    padding: 2rem 0;
    text-align: center;
    color: #f9b63c ;
    position: sticky;
    bottom: 0;
};

</style>