<script lang="ts" setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

const editorRef = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
    }
  },
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Link.configure({
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    }),
    Image.configure({
      inline: true,
      allowBase64: true,
    }),

  ],
})
function addImage() {
  const url = window.prompt('URL')

  if (url)
    editorRef.value?.chain().focus().setImage({ src: url }).run()
}

function setLink() {
  if (!editorRef)
    return

  const previousUrl = editorRef.value?.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null)
    return

  // empty
  if (url === '') {
    editorRef.value
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .unsetLink()
        .run()

    return
  }

  // update link
  editorRef.value
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run()
}
</script>

<template>
  <div>
    <div v-if="editorRef" class="flex gap-4 mb-4">
      <button :disabled="!editorRef.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editorRef.isActive('bold') }" @click="editorRef.chain().focus().toggleBold().run()">
        bold
      </button>
      <button :disabled="!editorRef.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editorRef.isActive('italic') }" @click="editorRef.chain().focus().toggleItalic().run()">
        italic
      </button>
      <button :disabled="!editorRef.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editorRef.isActive('strike') }" @click="editorRef.chain().focus().toggleStrike().run()">
        strike
      </button>
      <button :disabled="!editorRef.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editorRef.isActive('code') }" @click="editorRef.chain().focus().toggleCode().run()">
        code
      </button>
      <button @click="editorRef.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button @click="editorRef.chain().focus().clearNodes().run()">
        clear nodes
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive('paragraph') }" @click="editorRef.chain().focus().setParagraph().run()">
        paragraph
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive('heading', { level: 1 }) }" @click="editorRef.chain().focus().toggleHeading({ level: 1 }).run()">
        h1
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive('heading', { level: 2 }) }" @click="editorRef.chain().focus().toggleHeading({ level: 2 }).run()">
        h2
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive('heading', { level: 3 }) }" @click="editorRef.chain().focus().toggleHeading({ level: 3 }).run()">
        h3
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive('heading', { level: 4 }) }" @click="editorRef.chain().focus().toggleHeading({ level: 4 }).run()">
        h4
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive('heading', { level: 5 }) }" @click="editorRef.chain().focus().toggleHeading({ level: 5 }).run()">
        h5
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive('heading', { level: 6 }) }" @click="editorRef.chain().focus().toggleHeading({ level: 6 }).run()">
        h6
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive('bulletList') }" @click="editorRef.chain().focus().toggleBulletList().run()">
        bullet list
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive('orderedList') }" @click="editorRef.chain().focus().toggleOrderedList().run()">
        ordered list
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive('codeBlock') }" @click="editorRef.chain().focus().toggleCodeBlock().run()">
        code block
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive('blockquote') }" @click="editorRef.chain().focus().toggleBlockquote().run()">
        blockquote
      </button>
      <button type="button" @click="editorRef.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button type="button" @click="editorRef.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button type="button" :disabled="!editorRef.can().chain().focus().undo().run()" @click="editorRef.chain().focus().undo().run()">
        undo
      </button>
      <button type="button" :disabled="!editorRef.can().chain().focus().redo().run()" @click="editorRef.chain().focus().redo().run()">
        redo
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive({ textAlign: 'left' }) }" @click="editorRef.chain().focus().setTextAlign('left').run()">
        left
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive({ textAlign: 'center' }) }" @click="editorRef.chain().focus().setTextAlign('center').run()">
        center
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive({ textAlign: 'right' }) }" @click="editorRef.chain().focus().setTextAlign('right').run()">
        right
      </button>
      <button type="button" :class="{ 'is-active': editorRef.isActive('link') }" @click="setLink">
        setLink
      </button>
      <button type="button" @click="addImage">
        addImage
      </button>
    </div>
  </div>
  <EditorContent class="min-h-48" :editor="editorRef" />
  <div>
    <p>HTML as string</p>
    <pre>{{ editorRef?.getHTML() }}</pre>
  </div>
  <p>rendered html (same as editor basically)</p>
  <div v-html="editorRef?.getHTML()" />
</template>
