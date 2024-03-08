<script setup>
import { ref, onMounted, computed } from "vue";
import { auth } from "@/firebase.js";
import { onAuthStateChanged} from "firebase/auth";
import LoginPage from "./pages/LoginPage.vue";
import HomePage from "./pages/HomePage.vue";
import NavBar from "./components/NavBar.vue";
import AddPublication from "./pages/AddPublication.vue";

const isUserAuthenticated = computed(() => user.value !== null);
const user = ref(null);

const pageShown = ref("home-page");

function changePage(page){
  pageShown.value = page;
}
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });
});
</script>


<template>
    <LoginPage @hide-login="isLoginShown= false" v-if="isUserAuthenticated === false"/>
    <!--Contenido del sitio-->
    <div v-else>
        <NavBar @change-page="changePage" @hide-login="isLoginShown === true"/>
        <!--Paginas-->
        <HomePage v-if="pageShown=== 'home-page'" />
        <AddPublication v-if="pageShown=== 'add-publications'" />
    </div>
</template>
