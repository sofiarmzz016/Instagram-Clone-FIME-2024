<script setup>
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';

const emits = defineEmits(["changePage"]);

async function signout(){
  await signOut(auth);
  alert("Sesión cerrada exitosamente");
}

</script>

<template>
    <nav  class="fixed top-0 left-0 flex flex-col bg-white w-1/5 h-screen border-r border-[#ced4da] ">
        <h2 class="font-bold text-[30px] mt-[35px] pl-[35px]">Instagram</h2>
        <div class="cursor-pointer">
            <div @click="emits('changePage', 'home-page')" class="my-[10px] py-[25px] hover:bg-[#d9d9d9] pl-[35px]">
                <i class="fa-solid fa-house text-2xl mr-[15px]"></i>
                <p class="inline">Inicio</p>
            </div>
            <div  @click="emits('changePage', 'add-publications')" class="my-[10px] py-[25px]  hover:bg-[#d9d9d9] pl-[35px]">
                <i class="fa-regular fa-square-plus text-2xl mr-[15px]"></i>
                <p class="inline">Agregar Publicación</p>
            </div>
            <div @click="emits('changePage', 'profile')" class="my-[10px] py-[25px]  hover:bg-[#d9d9d9] pl-[35px]">
                <i class="fa-solid fa-user text-2xl mr-[15px]"></i>
                <p class="inline">Perfil</p>
            </div>
            <div @click="signout" class="my-[10px] py-[25px]  hover:bg-[#d9d9d9] pl-[35px]">
                <i class="fa-solid fa-arrow-right-to-bracket text-2xl mr-[15px]"></i>
                <p @click="signout" class="inline">Cerrar Sesión</p>
            </div>
        </div>
    </nav>
</template>
