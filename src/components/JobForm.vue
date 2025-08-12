<template>
  <div class="bg-white p-6 rounded shadow w-full max-w-lg mx-auto">
    <h2 class="text-lg font-semibold mb-4">{{ isEdit ? 'Edit Job' : 'Add Job' }}</h2>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <input v-model="form.title" type="text" placeholder="Job Title" class="border p-2 w-full mb-3" required />
      <input v-model="form.company_name" type="text" placeholder="Company Name" class="border p-2 w-full mb-3" required />
      <input v-model="form.location" type="text" placeholder="Location" class="border p-2 w-full mb-3" required />
      <input v-model="form.salary_range" type="text" placeholder="Salary Range" class="border p-2 w-full mb-3" required />
      <textarea v-model="form.description" placeholder="Description" class="border p-2 w-full mb-3" required></textarea>
      <textarea v-model="form.requirements" placeholder="Requirements" class="border p-2 w-full mb-3" required></textarea>
      <div class="flex items-center mb-3">
        <input
          id="is_active"
          type="checkbox"
          v-model="form.is_active"
          true-value="1"
          false-value="0"
          class="mr-2"
        />
        <label for="is_active">Active</label>
      </div>
      <div class="mb-3">
        <input type="file" @change="onFileChange" accept="image/png, image/jpeg" />
      </div>
      <div class="flex justify-end gap-2">
        <button type="button" @click="$emit('cancel')" class="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["isEdit", "form"],
  emits: ["save-job", "cancel"],
  methods: {
    onFileChange(e) {
      this.$emit("update:image", e.target.files[0]);
      this.form.image = e.target.files[0];
    },
    handleSubmit() {
      // Kirim form sebagai FormData jika ada file
      const formData = new FormData();
      for (const key in this.form) {
        if (this.form[key] !== undefined && this.form[key] !== null) {
          formData.append(key, this.form[key]);
        }
      }
      this.$emit("save-job", formData);
    }
  }
};
</script>