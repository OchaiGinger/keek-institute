'use client'

import { EditorContent, useEditor,  } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Menubar } from './Menubar'
import TextAlign from '@tiptap/extension-text-align'

const RichTextEditor = ({field}:{field: any}) => {
  const editor = useEditor({
    extensions: [StarterKit, TextAlign.configure({
      types: ['heading', 'paragraph'], 
    })],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'min-h-[300px] p-4 focus:outline-none prose prose-sm lg:prose-lg xl:pros-xl dark:prose-invert !max-w-full !w-full',
      },
    },

    onUpdate: ({editor}) => {
      const html = editor.getJSON()
      field.onChange(JSON.stringify(html))
    },

    content: field.value ? JSON.parse(field.value) : '<p>Hello World</p>',
  })


  
  return <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
    <Menubar editor={editor} />
    <EditorContent editor={editor} />
  </div>
}

export default RichTextEditor




