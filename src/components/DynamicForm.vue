<template>
  <div>
    <input v-model="searchQuery.value" placeholder="Search..." @input="highlightFields" />

    <form @submit.prevent>
      <div v-for="(field, index) in fields" :key="field.id">
        <input
            v-model="field.value"
            @input="updateVowelCount(index)"
            :placeholder="`Field ${index + 1}`"
            :class="{ highlight: field.highlight }"
        />
        <span>Vowels: {{ field.vowelCount }}</span>
        <button type="button" @click="removeField(index)" v-if="fields.length > 1">Remove</button>
      </div>

      <button type="button" @click="addField" :disabled="fields.length >= 10">Add Field</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { Field } from './interfaces';

export default defineComponent({
  name: 'DynamicForm',
  setup() {
    const fields = reactive<Field[]>([
      { id: 1, value: '', vowelCount: 0, highlight: false }
    ]);
    const searchQuery = reactive({ value: '' });

    const addField = () => {
      if (fields.length < 10) {
        fields.push({ id: Date.now(), value: '', vowelCount: 0, highlight: false });
      }
    };

    const removeField = (index: number) => {
      if (fields.length > 1) {
        fields.splice(index, 1);
      }
    };

    const updateVowelCount = (index: number) => {
      const vowels = 'aeiouAEIOU';
      fields[index].vowelCount = fields[index].value.split('').filter(char => vowels.includes(char)).length;
      highlightFields();
    };

    const highlightFields = () => {
      if (!searchQuery.value) {
        fields.forEach(field => {
          field.highlight = false
        });
        return
      }
      fields.forEach(field => {
        field.highlight = field.value.includes(searchQuery.value);
      });
    };

    return {
      fields,
      searchQuery,
      addField,
      removeField,
      updateVowelCount,
      highlightFields
    };
  }
});
</script>

<style>
* {
  padding: 5px;
}

html {
  background: #22223b;
}

.highlight {
  background-color: green;
}

input {
  border-radius: 5px;
  background: #4a4e69;
}

button {
  border-radius: 7px;
  background: #6d4581;
  margin-top: 10px;
}

input, button {
  padding: 5px;
  border: none;
}
</style>
