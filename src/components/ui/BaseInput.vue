<template>
  <div class="form-group">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500" aria-hidden="true">*</span>
    </label>

    <div class="relative">
      <input
        :id="inputId"
        :type="type"
        :name="name"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        :step="step"
        :maxlength="maxlength"
        :pattern="pattern"
        :inputmode="resolvedInputmode"
        :autocomplete="autocomplete"
        :aria-invalid="!!error"
        :aria-describedby="ariaDescribedBy"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <div v-if="$slots.icon" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <slot name="icon" />
      </div>
    </div>

    <!-- Fehlermeldung — role="alert" sorgt dafür, dass Screenreader sie sofort vorlesen -->
    <p
      v-if="error"
      :id="`${inputId}-error`"
      class="mt-1 text-sm text-red-600"
      role="alert"
    >
      {{ error }}
    </p>

    <!-- Hilfetext / optionaler Hinweis -->
    <p
      v-else-if="helperText"
      :id="`${inputId}-hint`"
      class="mt-1 text-sm text-gray-500"
    >
      {{ helperText }}
    </p>
  </div>
</template>

<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  // "helper-text" im Template wird von Vue automatisch zu "helperText" gemappt
  helperText: {
    type: String,
    default: ''
  },
  min: {
    type: [String, Number],
    default: undefined
  },
  max: {
    type: [String, Number],
    default: undefined
  },
  step: {
    type: [String, Number],
    default: undefined
  },
  maxlength: {
    type: [String, Number],
    default: undefined
  },
  pattern: {
    type: String,
    default: undefined
  },
  inputmode: {
    type: String,
    default: undefined
  },
  autocomplete: {
    type: String,
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const inputId = useId()

// inputmode: explizit übergebener Wert hat Vorrang; date-Felder bekommen standardmäßig "numeric"
const resolvedInputmode = computed(() => {
  if (props.inputmode) return props.inputmode
  if (props.type === 'date') return 'numeric'
  return undefined
})

// aria-describedby verknüpft das Input mit Fehlermeldung ODER Hilfetext —
// beide nie gleichzeitig sichtbar, daher reicht ein einziger Pointer
const ariaDescribedBy = computed(() => {
  if (props.error)      return `${inputId}-error`
  if (props.helperText) return `${inputId}-hint`
  return undefined
})

const inputClasses = computed(() => {
  const base = 'block w-full px-3 py-3 border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed bg-white text-gray-900 text-base'
  const state = props.error
    ? 'border-red-300 text-red-900 placeholder-red-300'
    : 'border-gray-300 text-gray-900 placeholder-gray-400'
  return `${base} ${state}`
})

const handleInput = (event) => emit('update:modelValue', event.target.value)
const handleBlur  = (event) => emit('blur', event)
const handleFocus = (event) => emit('focus', event)
</script>
