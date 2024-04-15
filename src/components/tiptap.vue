<script lang="ts" setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import AButton  from './AButton.vue'

const editorRef = useEditor({
  content: '<h1 style="text-align: center">I’m running Tiptap with Vue.js. 🎉</h1><p style="text-align: center"><a target="_blank" rel="noopener noreferrer" href="https://google.ca">link</a></p><p style="text-align: center"></p><p>Left text </p><p></p><p style="text-align: right">right text</p><p style="text-align: center"><img src="https://www.google.ca/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"></p>',
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none border-2 border-gray-300 rounded-md w-full max-w-98dvw',
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
    <div
      v-if="editorRef"
      class="flex justify-center items-center gap-4 mb-4"
    >
      <AButton
        :disabled="!editorRef.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editorRef.isActive('bold') }"
        @click="editorRef.chain().focus().toggleBold().run()"
      >
        bold
      </AButton>
      <AButton
        :disabled="!editorRef.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editorRef.isActive('italic') }"
        @click="editorRef.chain().focus().toggleItalic().run()"
      >
        italic
      </AButton>
      <AButton
        :disabled="!editorRef.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editorRef.isActive('strike') }"
        @click="editorRef.chain().focus().toggleStrike().run()"
      >
        strike
      </AButton>
      <AButton
        :disabled="!editorRef.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editorRef.isActive('code') }"
        @click="editorRef.chain().focus().toggleCode().run()"
      >
        code
      </AButton>
      <AButton @click="editorRef.chain().focus().unsetAllMarks().run()">
        clear marks
      </AButton>
      <AButton @click="editorRef.chain().focus().clearNodes().run()">
        clear nodes
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive('paragraph') }"
        @click="editorRef.chain().focus().setParagraph().run()"
      >
        paragraph
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive('heading', { level: 1 }) }"
        @click="editorRef.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        h1
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive('heading', { level: 2 }) }"
        @click="editorRef.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        h2
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive('heading', { level: 3 }) }"
        @click="editorRef.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        h3
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive('heading', { level: 4 }) }"
        @click="editorRef.chain().focus().toggleHeading({ level: 4 }).run()"
      >
        h4
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive('heading', { level: 5 }) }"
        @click="editorRef.chain().focus().toggleHeading({ level: 5 }).run()"
      >
        h5
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive('heading', { level: 6 }) }"
        @click="editorRef.chain().focus().toggleHeading({ level: 6 }).run()"
      >
        h6
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive('bulletList') }"
        @click="editorRef.chain().focus().toggleBulletList().run()"
      >
        bullet list
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive('orderedList') }"
        @click="editorRef.chain().focus().toggleOrderedList().run()"
      >
        ordered list
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive('codeBlock') }"
        @click="editorRef.chain().focus().toggleCodeBlock().run()"
      >
        code block
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive('blockquote') }"
        @click="editorRef.chain().focus().toggleBlockquote().run()"
      >
        blockquote
      </AButton>
      <AButton

        @click="editorRef.chain().focus().setHorizontalRule().run()"
      >
        horizontal rule
      </AButton>
      <AButton

        @click="editorRef.chain().focus().setHardBreak().run()"
      >
        hard break
      </AButton>
      <AButton

        :disabled="!editorRef.can().chain().focus().undo().run()"
        @click="editorRef.chain().focus().undo().run()"
      >
        undo
      </AButton>
      <AButton

        :disabled="!editorRef.can().chain().focus().redo().run()"
        @click="editorRef.chain().focus().redo().run()"
      >
        redo
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive({ textAlign: 'left' }) }"
        @click="editorRef.chain().focus().setTextAlign('left').run()"
      >
        left
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive({ textAlign: 'center' }) }"
        @click="editorRef.chain().focus().setTextAlign('center').run()"
      >
        center
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive({ textAlign: 'right' }) }"
        @click="editorRef.chain().focus().setTextAlign('right').run()"
      >
        right
      </AButton>
      <AButton

        :class="{ 'is-active': editorRef.isActive('link') }"
        @click="setLink"
      >
        setLink
      </AButton>
      <AButton

        @click="addImage"
      >
        addImage
      </AButton>
    </div>
  </div>
  <EditorContent
    class="min-h-48"
    :editor="editorRef"
  />
  <div>
    <h2 class="text-4xl">
      HTML as string
    </h2>
    <pre>{{ editorRef?.getHTML() }}</pre>
  </div>
  <div class="mt-10 flex items-center justify-center">
    <h2 class="text-4xl ">
      Rendered html (same as editor more or less)
    </h2>
  </div>
  <div
    class="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none w-full max-w-98dvw border-2 border-slate-900 rounded-md m-5"
    style="width: 100%;"
    v-html="editorRef?.getHTML()"
  />
</template>
