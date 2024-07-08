<template>
    <div>
        <section v-if="editor" class="areaButtons">
            <div class="GruppoBottoni FomattazioneEDecorazioni">
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleBold().run()"
                    :disabled="!editor.can().chain().focus().toggleBold().run()"
                    :class="{ 'is-active': editor.isActive('bold') }"
                >
                    <BoldIcon title="Bold" />
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleItalic().run()"
                    :disabled="!editor.can().chain().focus().toggleItalic().run()"
                    :class="{ 'is-active': editor.isActive('italic') }"
                >
                    <ItalicIcon />
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleStrike().run()"
                    :disabled="!editor.can().chain().focus().toggleStrike().run()"
                    :class="{ 'is-active': editor.isActive('strike') }"
                >
                    <StrikeIcon />
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleUnderline().run()"
                    :disabled="!editor.can().chain().focus().toggleUnderline().run()"
                    :class="{ 'is-active': editor.isActive('underline') }"
                >
                    <UnderlineIcon />
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleHighlight().run()"
                    :class="{ 'is-active': editor.isActive('highlight') }"
                >
                    <HighlightIcon />
                </button>
            </div>

            <div class="GruppoBottoni FontSize">
              <!--TODO MEttere nel punto giusto -->

                <div 
                  @update="editor.chain().focus().setFontSize(convertToFontSize( [fontsizeNumber]  )).run()"
                  :class="{'active': editor.isActive('textStyle', {fontSize: convertToFontSize(   [fontsizeNumber]   ) })}"
                ><input type="number" v-model="fontsizeNumber"  min="8" max="96" class="tagButton"/>
              </div> 

                
            </div>

            <div class="GruppoBottoni OrganizazioneTesto">
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ 'is-active': editor.isActive('bulletList') }"
                >
                    <BulletListIcon />
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleOrderedList().run()"
                    :class="{ 'is-active': editor.isActive('orderedList') }"
                >
                    <OrderedListIcon />
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().toggleCode().run()"
                    :disabled="!editor.can().chain().focus().toggleCode().run()"
                    :class="{ 'is-active': editor.isActive('code') }"
                >
                    <CodeIcon />
                </button>
                <button @click="addImage" class="tagButton" >
                  <SetImage/>
                </button>
                <button class="tagButton" @click="editor.chain().focus().setHorizontalRule().run()">
                    <HorizontalRuleIcon />
                </button>
            </div>

            <div class="GruppoBottoni allinieamento">
                <button
                    class="tagButton"
                    @click="editor.chain().focus().setTextAlign('left').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
                >
                    <TextAlignLeftIcon />
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().setTextAlign('center').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
                >
                    <TextAlignCenterIcon />
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().setTextAlign('right').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
                >
                    <TextAlignRightIcon />
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().setTextAlign('justify').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
                >
                    <TextAlignJustifyIcon />
                </button>
            </div>

            <div class="GruppoBottoni navigazioneStoriaTesto">
                <button
                    class="tagButton"
                    @click="editor.chain().focus().undo().run()"
                    :disabled="!editor.can().chain().focus().undo().run()"
                >
                    <UndoIcon />
                </button>
                <button
                    class="tagButton"
                    @click="editor.chain().focus().redo().run()"
                    :disabled="!editor.can().chain().focus().redo().run()"
                >
                    <RedoIcon />
                </button>
            </div>
        </section>
        <editor-content :editor="editor" />
    </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import {ref} from 'vue';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import ImageRule from '@tiptap/extension-image';
import FontSize from 'tiptap-extension-font-size'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'

import BoldIcon from 'vue-material-design-icons/FormatBold.vue';
import ItalicIcon from 'vue-material-design-icons/FormatItalic.vue';
import StrikeIcon from 'vue-material-design-icons/FormatStrikethroughVariant.vue';
import UnderlineIcon from 'vue-material-design-icons/FormatUnderline.vue';
import CodeIcon from 'vue-material-design-icons/CodeTags.vue';
import BulletListIcon from 'vue-material-design-icons/FormatListBulleted.vue';
import OrderedListIcon from 'vue-material-design-icons/FormatListNumbered.vue';
import HighlightIcon from 'vue-material-design-icons/formatcolorhighlight.vue';
import TextAlignLeftIcon from 'vue-material-design-icons/FormatAlignLeft.vue';
import TextAlignCenterIcon from 'vue-material-design-icons/FormatAlignCenter.vue';
import TextAlignRightIcon from 'vue-material-design-icons/FormatAlignRight.vue';
import TextAlignJustifyIcon from 'vue-material-design-icons/FormatAlignJustify.vue';
import UndoIcon from 'vue-material-design-icons/Undo.vue';
import RedoIcon from 'vue-material-design-icons/Redo.vue';
import HorizontalRuleIcon from 'vue-material-design-icons/minus.vue';
import SetImage from 'vue-material-design-icons/ImagePlusOutline.vue';
import 'vue-material-design-icons/styles.css';

const fontsizeNumber=ref(12);

const props = defineProps({
    modelValue: String
});
const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
    content: props.modelValue,
    extensions: [StarterKit, Underline, HorizontalRule,ImageRule,FontSize,TextStyle,FontFamily],
    onUpdate: ({ editor }) => {
        console.log(editor.getHTML());
        emit('update:modelValue', editor.getHTML());
    }
});

function convertToFontSize(fontSize: number) {
    return fontSize + 'pt';
}

function addImage(){
  const url=window.prompt('URL')
  if(url){
    editor.chain().focus().setImage({src:url}).run()
  }
}

</script>

<style>
.areaButtons {
    display: flex;
    flex-wrap: wrap;
    border-top: 2px solid #f9b63c;
    border-left: 2px solid #f9b63c;
    border-right: 2px solid #f9b63c;
    justify-content: left;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 0;
}
input.tagButton {
    width: 4.5rem;
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
.tiptap {
    border: 2px solid #f9b63c;
    min-height: 12rem;
    max-height: 12rem;
    padding: auto;
    overflow-y: auto;
    margin-left: 1rem;
    margin-right: 1rem;
    outline: none;
}
.tiptap hr {
    border: 0.5px solid #f9b63c;
    margin: 0.5rem;
}
.submit {
    margin-top: 2rem;
}
</style>
