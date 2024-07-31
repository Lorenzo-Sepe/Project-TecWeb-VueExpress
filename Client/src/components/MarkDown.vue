<template>
    <div class="p-5">
        <section
            v-if="editor"
            class="areaButtons tw-flex tw-flex-wrap tw-items-center tw-gap-x-4 tw-border-2 tw-border-b-0 tw-border-[#f9b63c] tw-p-2"
        >
            <div class="GruppoBottoni FomattazioneEDecorazioni">
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleBold().run()"
                    :disabled="!editor.can().chain().focus().toggleBold().run()"
                    :class="{ 'is-active': editor.isActive('bold') }"
                >
                    <v-icon size="x-small" style="color: #f9b63c;" icon="mdi-format-bold"></v-icon>
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleItalic().run()"
                    :disabled="!editor.can().chain().focus().toggleItalic().run()"
                    :class="{ 'is-active': editor.isActive('italic') }"
                >
                <v-icon size="x-small" style="color: #f9b63c;" icon="mdi-format-italic"></v-icon>
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleStrike().run()"
                    :disabled="!editor.can().chain().focus().toggleStrike().run()"
                    :class="{ 'is-active': editor.isActive('strike') }"
                >
                <v-icon style="color: #f9b63c;" size="x-small" icon="mdi-format-strikethrough-variant"></v-icon>
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleUnderline().run()"
                    :disabled="!editor.can().chain().focus().toggleUnderline().run()"
                    :class="{ 'is-active': editor.isActive('underline') }"
                >
                <v-icon style="color: #f9b63c;" size="x-small" icon="mdi-format-underline"></v-icon>
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleHighlight().run()"
                    :class="{ 'is-active': editor.isActive('highlight') }"
                >
                <v-icon style="color: #f9b63c;" size="x-small" icon="mdi-format-color-highlight"></v-icon>
                </button>
            </div>

            <div class="GruppoBottoni FontSize" >
                <v-btn color="#005676" :ripple="false" rounded="lg" >
                    <v-icon style="color: #f9b63c;" size="x-large" @click="editor.chain().focus().setFontSize(convertToFontSize(--fontsizeNumber)).run()">mdi-minus</v-icon>
                    <span style="color: #f9b63c;">{{ fontsizeNumber }}</span>
                    <v-icon style="color: #f9b63c;" size="x-large" @click="editor.chain().focus().setFontSize(convertToFontSize(++fontsizeNumber)).run()">mdi-plus</v-icon>
                </v-btn>
            </div>

            <div class="GruppoBottoni OrganizazioneTesto">
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ 'is-active': editor.isActive('bulletList') }"
                >
                    <v-icon style="color: #f9b63c;" size="x-small" icon="mdi-format-list-bulleted-square"></v-icon>
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleOrderedList().run()"
                    :class="{ 'is-active': editor.isActive('orderedList') }"
                >
                    <v-icon style="color: #f9b63c;" size="x-small" icon="mdi-format-list-numbered"></v-icon>   
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleCode().run()"
                    :disabled="!editor.can().chain().focus().toggleCode().run()"
                    :class="{ 'is-active': editor.isActive('code') }"
                >
                    <v-icon style="color: #f9b63c;" size="x-small" icon="mdi-code-tags"></v-icon>
                </button>
                <button @click="addImage" class="tagButton">
                    <v-icon style="color: #f9b63c;" size="x-small" icon="mdi-image-plus"></v-icon>
                </button>
                <button class="tagButton" @click="editor.chain().focus().setHorizontalRule().run()">
                    <span style="color: #f9b63c; font-weight: 500" >---</span>
                </button>
            </div>

            <div class="GruppoBottoni allinieamento">
                <button
                    class="tagButton"
                    @click="editor.chain().focus().setTextAlign('left').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
                >
                    <v-icon style="color: #f9b63c;" size="x-small" icon="mdi-format-align-left"></v-icon>
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().setTextAlign('center').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
                >
                    <v-icon style="color: #f9b63c;" size="x-small" icon="mdi-format-align-center"></v-icon>
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().setTextAlign('right').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
                >
                    <v-icon style="color: #f9b63c;" size="x-small" icon="mdi-format-align-right"></v-icon>
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().setTextAlign('justify').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
                >
                    <v-icon style="color: #f9b63c;" size="x-small" icon="mdi-format-align-justify"></v-icon>
                </button>
            </div>

            <div class="GruppoBottoni navigazioneStoriaTesto">
                <button
                    class="tagButton"
                    @click="editor.chain().focus().undo().run()"
                    :disabled="!editor.can().chain().focus().undo().run()"
                >
                    <v-icon style="color: #f9b63c;" size="x-small" icon="mdi-undo"></v-icon>
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().redo().run()"
                    :disabled="!editor.can().chain().focus().redo().run()"
                >
                    <v-icon style="color: #f9b63c;" size="x-small" icon="mdi-redo"></v-icon>
                </button>
            </div>
        </section>
        <editor-content :editor="editor" />
        
    </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import { ref } from 'vue';

//estensioni tiptap
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import ImageRule from '@tiptap/extension-image';
import FontSize from 'tiptap-extension-font-size';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Dropcursor from '@tiptap/extension-dropcursor';

const fontsizeNumber = ref(12);

const props = defineProps({
    modelValue: String,
});
const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
    editorProps: {
        attributes: {
            class: 'tw-border-2 tw-border-[#f9b63c] tw-p-2 tw-min-h-[12rem] tw-max-h-[12rem] tw-overflow-y-auto tw-outline-none',
        },
    },
    content: props.modelValue,
    extensions: [StarterKit,Image, Dropcursor, Underline, HorizontalRule, ImageRule, FontSize, TextStyle, FontFamily,Highlight,
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    ],
    onUpdate: ({ editor }) => {
        console.log(editor.getHTML());
        emit('update:modelValue', editor.getHTML());
    },
});

function convertToFontSize(fontSize: number) {
    return fontSize + 'pt';
}

function addImage() {
    const url = window.prompt('URL');
    if (url) {
        editor.value?.chain().focus().setImage({ src: url }).run();
    }
}
</script>

<style scoped>
input.tagButton {
    width: 4.5rem;
    background-color: #005676;
    font-weight: bold;
    color: #f9b63c;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    border-radius: 12px;
}

input.fontsizeWindow {
    width: 3rem;
    background-color: #005676;
    font-weight: bold;
    color: #f9b63c;
    padding: 0.25rem 0.5rem;
    margin: 0.5rem 0.1rem;
    text-align: center;
    font-size: 1.3rem;
    text-decoration: none;
}
.fontsize {
    background-color: #005676;
    font-weight: bold;
    color: #f9b63c;
    padding: 0.25rem 0.5rem;
    text-align: center;
    margin: -0.5rem -0.7rem;
    text-decoration: none;
    cursor: pointer;
}

button.tagButton {
    background-color: #005676;
    font-weight: bold;
    color: #f9b63c;
    padding: 0.25rem 0.5rem;
    text-align: center;
    font-size: 1.3rem;
    text-decoration: none;
    margin: 0.5rem 0.1rem;
    cursor: pointer;
    border-radius: 12px;
}
button.is-active {
    outline: 2px #f9b63c;
    outline-offset: -1px;
    outline-style: groove;
}
button:disabled {
    color: #f9b63c;
    opacity: 0.7;
    background-color: #005676;
}
</style>
