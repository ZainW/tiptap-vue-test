import { defineConfig, presetUno, presetTypography } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'


export default defineConfig({
    presets: [
        presetUno(),
        presetTypography()
    ],
    transformers: [
        transformerDirectives(),
    ],
})