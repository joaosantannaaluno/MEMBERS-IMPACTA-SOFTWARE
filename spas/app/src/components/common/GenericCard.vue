<template>
  <q-card flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar :color="'secondary'" size="xl" rounded>
          <q-icon :name="props.icon" size="md" :color="props.color" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ props.title }}</q-item-label>
        <q-item-label caption class="ellipsis">
          {{ props.subtitle }}
          <q-tooltip>{{ props.subtitle }}</q-tooltip>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <div class="full-width" style="min-height: 80px">
      <slot />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import type { NamedColor } from 'quasar';

interface Props {
  title: string;
  subtitle: string;
  icon: string;
  color: NamedColor;
}

const props = defineProps<Props>();
</script>
