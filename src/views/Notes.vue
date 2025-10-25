<template>
  <div class="max-w-4xl mx-auto">
    <div class="mt-6 bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">Notes</h3>
        <form @submit.prevent="addNote" class="mb-4 flex gap-2">
          <input v-model="noteInput" type="text" placeholder="Add a note..." class="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
          <button type="submit" :disabled="!noteInput.trim()" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">Add</button>
        </form>
        <div v-if="notes.length" class="mb-2">
          <ul class="list-disc pl-5">
            <li v-for="(note, idx) in notes" :key="idx">{{ note }}</li>
          </ul>
        </div>
        <div v-else class="text-gray-400 text-sm">No notes yet.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const notes = ref<string[]>([])
const noteInput = ref('')
const apiUrl = '/notes' // à adapter si besoin

const fetchNotes = async () => {
  try {
    const res = await fetch(apiUrl)
    if (res.ok) {
      notes.value = await res.json()
    }
  } catch (e) {
    // ignore
  }
}

const addNote = async () => {
  if (noteInput.value.trim()) {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: noteInput.value.trim() })
    })
    if (res.ok) {
      await fetchNotes()
      noteInput.value = ''
    }
  }
}

onMounted(fetchNotes)
</script>
