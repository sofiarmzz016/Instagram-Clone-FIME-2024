<script setup>
import { ref, onMounted } from "vue";
import { auth, storage, firestore } from "@/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { 
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

const user = ref(null);
const name = ref("");
const AddImageUrls = ref([]);
const postImageFiles = ref([]);

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    if (currentUser.displayName) name.value = currentUser.displayName;
    if (currentUser.photoURL) AddImageUrl.value = currentUser.photoURL;
  });
});

function showNewImageOnImgElement(event) {
  postImageFiles.value = Array.from(event.target.files);
  postImageFiles.value.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => AddImageUrls.value.push(e.target.result);
    reader.readAsDataURL(file);
  });
}

async function uploadFileToStorage(imageFile) {
  const imgRef = storageRef(storage, `postPictures/${user.value.uid}/${Date.now()}`);
  await uploadBytes(imgRef, imageFile);
  return await getDownloadURL(imgRef);
}

async function savePost() {
  try {
    const urls = await Promise.all(postImageFiles.value.map(uploadFileToStorage));
    // Save the images in Firestore
    const docRef = await addDoc(collection(firestore, 'posts'), { 
      userId: user.value.uid,
      images: urls,
      description: name.value,
      createdAt: new Date()
    });
    alert("Publicación exitosa");
  } catch (e) {
    alert(e)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-8 h-screen bg-white rounded-lg shadow-md ml-[42%]">
    <h2 class="text-2xl font-semibold mb-4 text-[#7F7F7F] text-center">Detalle de Publicación</h2>
    <div v-for="(imageUrl, index) in AddImageUrls" :key="index" class="relative w-full h-64 mb-4 bg-gray-200 rounded-lg overflow-hidden">
      <img :src="imageUrl" alt="Imagen" class="w-full mb-4 rounded-lg">
    </div>
    <div class="mb-4">
      <p class="font-semibold">{{ user?.email }}</p>
      <input type="file" accept="image/*" @change="showNewImageOnImgElement" class="mt-2" multiple>
      <input
        type="text"
        v-model="name"
        placeholder="Añade una descripción a tu foto"
        class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
    <button class="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 mb-[20px] rounded-md">Cancelar</button>
    <button @click="savePost" class="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md">Crear Publicación</button>
  </div>
</template>

<style scoped>

</style>