<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import Modal from "./Modal.vue";

// Form state
const fullname = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Modal state
const isLoading = ref(false);
const isSuccess = ref();
const modalVisible = ref(false); // Added state to control modal visibility
const modalProps = ref({ message: "", status: false });

// Validation State
const errors = ref<{ [key: string]: string }>({});

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const setIsLoading = (value: boolean) => {
  isLoading.value = value;
};

const setModalVisible = (value: boolean) => {
  modalVisible.value = value;
};

const submit = async () => {
  setIsLoading(true);

  // Reset errors
  errors.value = {};

  // Validate inputs
  if (!fullname.value) {
    errors.value.fullname = "Fullname is required.";
  }
  if (!email.value) {
    errors.value.email = "Email is required.";
  } else if (!validateEmail(email.value)) {
    errors.value.email = "Email is not valid.";
  }
  if (!password.value) {
    errors.value.password = "Password is required.";
  }
  if (!confirmPassword.value) {
    errors.value.confirmPassword = "Confirm password is required.";
  } else if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = "Passwords do not match.";
  }

  // If there are any errors, do not proceed
  if (Object.keys(errors.value).length > 0) {
    setIsLoading(false);
    return;
  }

  try {
    const response = await axios.post("http://localhost:3333/register", {
      fullname: fullname.value,
      email: email.value,
      password: password.value,
    });

    console.log(response);

    setTimeout(() => {
      setIsLoading(false);
      // Show modal and redirect to login page
      setModalVisible(true);
      isSuccess.value = true;

      modalProps.value = {
        message: response.data.message,
        status: true,
      };
    }, 4000);
  } catch (error) {
    setTimeout(() => {
      setIsLoading(false);
      // Show modal and redirect to login page
      setModalVisible(true);
      isSuccess.value = false;

      modalProps.value = {
        message: error.response.data.errors[0].message,
        status: false,
      };
    }, 4000);
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const closeModal = () => {
  setModalVisible(false);
  modalProps.value = { message: "", status: false };

  console.log("Modal closed successfully " + " " + modalVisible.value + " " + modalProps.value.toString());
};
</script>

<template>
  <Modal :open="modalVisible" :message="modalProps.message" :status="modalProps.status" @close="closeModal" />

  <div class="w-[400px] h-auto bg-white p-5 rounded-md flex flex-col">
    <h1 class="text-slate-600 text-xl font-bold">Register Now</h1>
    <form @submit.prevent="submit" class="flex flex-col justify-center items-center mt-4 text-black">
      <!-- Fullname -->
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Fullname : </span>
        </div>
        <input v-model="fullname" type="text" placeholder="Your fullname here" class="input input-bordered w-full max-w-xs" name="fullname" />
        <span v-if="errors.fullname" class="text-red-500 text-sm flex mt-2">{{ errors.fullname }}</span>
      </label>
      <!-- Email -->
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Email : </span>
        </div>
        <input v-model="email" type="text" placeholder="Your email here" class="input input-bordered w-full max-w-xs" name="email" />
        <span v-if="errors.email" class="text-red-500 text-sm flex mt-2">{{ errors.email }}</span>
      </label>
      <!-- Password -->
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Password : </span>
        </div>
        <div class="input input-bordered flex items-center gap-2">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Your password here" class="grow" name="password" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-eye text-slate-400"
            @click="togglePasswordVisibility"
            v-if="showPassword"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-eye-off text-slate-400"
            @click="togglePasswordVisibility"
            v-if="!showPassword"
          >
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        </div>
        <span v-if="errors.password" class="text-red-500 text-sm flex mt-2">{{ errors.password }}</span>
      </label>
      <!-- Confirm Password -->
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Confirm Password : </span>
        </div>
        <div class="input input-bordered flex items-center gap-2">
          <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirm your password" class="grow" name="confirmPassword" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-eye text-slate-400"
            @click="toggleConfirmPasswordVisibility"
            v-if="showConfirmPassword"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-eye-off text-slate-400"
            @click="toggleConfirmPasswordVisibility"
            v-if="!showConfirmPassword"
          >
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        </div>
        <span v-if="errors.confirmPassword" class="text-red-500 text-sm flex mt-2">{{ errors.confirmPassword }}</span>
      </label>
      <button type="submit" class="btn btn-primary mt-4 w-full max-w-xs">
        <span v-if="isLoading" class="loading loading-spinner loading-xs"></span>
        <p v-else>Submit</p>
      </button>
    </form>
    <RouterLink to="/" class="text-sm mt-5 underline">Already Have an account?</RouterLink>
  </div>
</template>
