<template>
  <div class="max-w-lg mx-auto py-12">
    <h2 class="text-2xl font-bold mb-6">Apply for {{ job?.title }}</h2>
    <form @submit.prevent="submitApplication" enctype="multipart/form-data">
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Cover Letter (optional)</label>
        <textarea v-model="cover_letter" class="w-full border rounded p-2" rows="5"></textarea>
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Upload CV (PDF/DOC, max 2MB, optional)</label>
        <input type="file" @change="onFileChange" accept=".pdf,.doc,.docx" class="w-full" />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Submit Application</button>
      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
      <div v-if="success" class="text-green-600 mt-2">{{ success }}</div>
    </form>
  </div>
</template>

<script>
import api from "../api/index.js";
export default {
  data() {
    return {
      job: null,
      cover_letter: "",
      cv: null,
      error: "",
      success: ""
    };
  },
  async created() {
    // Ambil job berdasarkan id dari route
    const id = this.$route.params.id;
    try {
      const res = await api.get(`/job-listings/${id}`);
      if (res.data.status === 200) {
        this.job = res.data.data;
      } else {
        this.error = "Gagal mengambil data pekerjaan.";
      }
    } catch (e) {
      this.error = "Gagal mengambil data pekerjaan.";
    }
  },
  methods: {
    onFileChange(e) {
      this.cv = e.target.files[0];
    },
    async submitApplication() {
        this.error = "";
        this.success = "";
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!this.job) {
            this.error = "Data pekerjaan tidak ditemukan.";
            return;
        }

        // Cek apakah user sudah pernah melamar job ini
        const appliedJobs = JSON.parse(localStorage.getItem("applied_jobs") || "[]");
        const alreadyApplied = appliedJobs.some(application => 
            application.user_id === user.id && application.job_id === this.job.id
        );

        if (alreadyApplied) {
            this.error = "Anda sudah pernah melamar pekerjaan ini.";
            return;
        }

        const formData = new FormData();
        formData.append("job_listing_id", this.job.id);
        formData.append("user_id", user.id);
        if (this.cover_letter) formData.append("cover_letter", this.cover_letter);
        if (this.cv) formData.append("cv", this.cv);

        try {
            const res = await api.post("/applications", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            
            if (res.data.status === 200) {
                // Struktur baru: simpan dengan user_id dan job_id
                let applied = JSON.parse(localStorage.getItem("applied_jobs") || "[]");
                applied.push({
                    user_id: user.id,
                    job_id: this.job.id,
                    applied_at: new Date().toISOString() // Optional: timestamp kapan apply
                });
                localStorage.setItem("applied_jobs", JSON.stringify(applied));
                
                this.success = "Lamaran berhasil dikirim!";
                setTimeout(() => {
                    this.$router.push("/");
                }, 1500); // Delay sedikit untuk menampilkan success message
            } else {
                this.error = res.data.message || "Gagal mengirim lamaran.";
            }
        } catch (e) {
            this.error = "Gagal mengirim lamaran.";
        }
    }
  }
};
</script>