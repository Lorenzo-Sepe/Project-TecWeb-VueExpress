<template>
    <v-toolbar :elevation="8" color="#0b1a29">
        <RouterLink to="/" class="links">
            <img
                style="padding: 1rem"
                src="../assets/images/svg/Companylogo.svg"
                alt="logo"
                width="100"
                height="100"
            />
        </RouterLink>
        <RouterLink to="/" class="links">
            <v-toolbar-title>
                <h2 style="color: #f9b63c">Hivemind</h2>
            </v-toolbar-title>
        </RouterLink>

        <v-spacer></v-spacer>

        <v-btn color="#f9b63c" icon variant="tonal" class="icone">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <RouterLink to="/about" class="links"
            ><v-btn color="#f9b63c" icon variant="tonal" class="icone">
                <v-icon>mdi-information-outline</v-icon>
            </v-btn></RouterLink
        >

        <v-btn color="#f9b63c" icon variant="tonal" class="icone">
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script setup lang="ts"></script>

<style>
.links {
    text-decoration: none;
    color: inherit;
}
.icone {
    margin: 3px;
}
</style>
