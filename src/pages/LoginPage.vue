<script setup>
import { ref } from "vue";
import { auth } from "@/firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const emits= defineEmits(["hideLogin"]);

const email = ref();
const password = ref();

async function login() {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    emits("hideLogin");
  } catch (e) {
    alert("Error al iniciar sesión");
  }
}

async function signup() {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    alert("Cuenta creada exitosamente");
    emits("hideLogin");
  } catch (e) {
    //alert("Error al crear la cuenta");
    console.log(e)
  }
}
</script>


<template>
    <div class="login-container w-[517px] h-[637px] my-[100px] mx-auto p-[65px] bg-white rounded-3xl shadow-2xl">
        <div>
            <img src="@/assets/img/logo-insta.png" alt="InstagramLogo" class="block bg-aliceblue px-100 mx-auto">
        </div>
        <form @submit.prevent="null" class="font-medium">
            <div>
                <label for="email">Email:</label>
                <input v-model="email" type="text" name="email" class="block mt-[5px] mb-[10px] w-full py-[12px] px-[10px] h-[55px] rounded-md bg-[#D9D9D9]">
            </div>
            <div>
                <label for="password">Contraseña:</label>
                <input v-model="password" type="text" name="password" class="block mt-[5px] mb-[10px] w-full py-[12px] px-[10px] h-[55px] rounded-md bg-[#D9D9D9]">
            </div>
            <button type="sumbit" @click="login" class="mx-auto mb-auto mt-[40px] w-[380px] text-white block cursor-pointer border-0 py-2 px-50 bg-pink-button font-semibold text-xl rounded-full">Iniciar Sesión</button>
            <button type="submit" @click="signup" class="mx-auto mb-auto mt-[40px] w-[380px] block cursor-pointer border-0 py-2 px-50 bg-yellow-button font-semibold text-xl rounded-full">Crear una cuenta</button>
        </form>
    </div>
</template>
