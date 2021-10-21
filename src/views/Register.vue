<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div
        class="
          lg:w-2/6
          md:w-1/2
          bg-gray-100
          rounded-lg
          p-8
          flex flex-col
          md:mx-auto
          w-full
          mt-10
          md:mt-0
        "
      >
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
          Daftar Akun Baru
        </h2>
        <form @submit.prevent="submitRegister">
          <div class="relative mb-4">
            <label for="fullName" class="leading-7 text-sm text-gray-600"
              >Nama Lengkap:</label
            >
            <input
              v-model="fullName"
              type="fullName"
              id="fullName"
              name="fullName"
              class="
                w-full
                bg-white
                rounded
                border border-gray-300
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                text-base
                outline-none
                text-gray-700
                py-1
                px-3
                leading-8
                transition-colors
                duration-200
                ease-in-out
              "
            />
          </div>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600"
              >Email</label
            >
            <input
              v-model="email"
              type="email"
              id="email"
              name="email"
              class="
                w-full
                bg-white
                rounded
                border border-gray-300
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                text-base
                outline-none
                text-gray-700
                py-1
                px-3
                leading-8
                transition-colors
                duration-200
                ease-in-out
              "
            />
          </div>
          <div class="relative mb-4">
            <label for="password" class="leading-7 text-sm text-gray-600"
              >Password:</label
            >
            <input
              v-model="password"
              type="password"
              id="password"
              name="password"
              class="
                w-full
                bg-white
                rounded
                border border-gray-300
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                text-base
                outline-none
                text-gray-700
                py-1
                px-3
                leading-8
                transition-colors
                duration-200
                ease-in-out
              "
            />
          </div>
          <div class="relative mb-4">
            <label for="province" class="leading-7 text-sm text-gray-600"
              >Provinsi:</label
            >
            <select
              id="province"
              name="province"
              @change="selectedProvince($event)"
              class="
                w-full
                rounded
                leading-8
                border
                appearance-none
                border-gray-300
                py-1
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-200
                focus:border-indigo-500
                text-base
                px-3
              "
            >
              <option
                v-for="province in provinceData"
                :key="province.id"
                :value="province.id"
              >
                {{ province.name }}
              </option>
            </select>
          </div>
          <div class="relative mb-4">
            <label for="regencies" class="leading-7 text-sm text-gray-600"
              >Kabupaten:</label
            >
            <select
              id="regencies"
              name="regencies"
              @change="selectedRegencies($event)"
              class="
                w-full
                rounded
                leading-8
                border
                appearance-none
                border-gray-300
                py-1
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-200
                focus:border-indigo-500
                text-base
                px-3
              "
            >
              <option
                v-for="regencies in regenciesData"
                :key="regencies.id"
                :value="regencies.name"
              >
                {{ regencies.name }}
              </option>
            </select>
          </div>
          <button
            class="
              text-white
              bg-indigo-500
              border-0
              py-2
              px-8
              focus:outline-none
              hover:bg-indigo-600
              rounded
              text-lg
              w-full
              font-bold
            "
          >
            <font-awesome-icon :icon="['fa', 'user-plus']" /> Daftar
          </button>
        </form>
        <p class="text-xs text-gray-500 mt-3">
          Sudah punya akun? Silahkan masuk
          <router-link to="/"><b>di sini</b></router-link
          >.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      province: "",
      regencies: "",
      provinceName: "",
    };
  },
  methods: {
    submitRegister() {
      this.$store.state.provinceData.forEach((el) => {
        el.id == this.province ? (this.provinceName = el.name) : "";
      });
      this.$store.dispatch("register", {
        name: this.fullName,
        email: this.email,
        password: this.password,
        provinsi: this.provinceName,
        kabupaten: this.regencies,
      });
    },
    selectedProvince(event) {
      this.province = event.target.value;
      this.$store.dispatch("fetchRegencies", this.province);
    },
    selectedRegencies(event) {
      this.regencies = event.target.value;
    },
  },
  created() {
    this.$store.dispatch("fetchProvince");
  },
  computed: {
    provinceData() {
      return this.$store.state.provinceData;
    },
    regenciesData() {
      return this.$store.state.regenciesData;
    },
  },
};
</script>