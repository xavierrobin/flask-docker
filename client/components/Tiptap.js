'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import { useField, useFormikContext } from "formik";
import './Tiptap.css';

export const Tiptap = ({ name }) => {
    const [field] = useField(name);
    const { setFieldValue } = useFormikContext();

    const MenuBar = ({ editor }) => {
        if (!editor) {
          return null
        }
    
    return (
        <div>
        <button
            onClick={(e) => editor.chain().focus().toggleBold().run() && e.preventDefault()}
            disabled={
            !editor.can()
                .chain()
                .toggleBold()
                .run()
            }
            className={(editor.isActive('bold') ? 'btn-outline-primary' : '') + ' btn btn-sm btn-primary'}
        >
                <i className="icon">format_bold</i>
        </button>
        <button
            onClick={(e) => editor.chain().focus().toggleItalic().run() && e.preventDefault()}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={(editor.isActive('italic') ? 'btn-outline-primary' : '') + ' btn btn-sm btn-primary'}
        >
            <i className="icon">format_italic</i>
        </button>
        <button
            onClick={(e) => editor.chain().focus().toggleBulletList().run() && e.preventDefault()}
            className={(editor.isActive('bulletList') ? 'btn-outline-primary' : '') + ' btn btn-sm btn-primary'}
        >
            <i className="icon">format_list_bulleted</i>
        </button>
        <button
            onClick={(e) => editor.chain().focus().toggleOrderedList().run() && e.preventDefault()}
            className={(editor.isActive('orderedList') ? 'btn-outline-primary' : '') + ' btn btn-sm btn-primary'}
        >
            <i className="icon">format_list_numbered</i>
        </button>
        <button
            onClick={(e) => editor.chain().focus().undo().run() && e.preventDefault()}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
            className=" btn btn-sm btn-primary"
        >
            <i className="icon">undo</i>
        </button>
        <button
            onClick={(e) => editor.chain().focus().redo().run() && e.preventDefault()}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
            className=" btn btn-sm btn-primary"
        >
            <i className="icon">redo</i>
        </button>
        </div>
    )
    }

  const editor = useEditor({
    extensions: [
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
          },
        }),
        Placeholder.configure({
            placeholder: 'Start writing here.',
          })
      ],
    content: field.value,
    onUpdate: ({ editor }) => {
        setFieldValue(name, editor.getHTML());
      },
  })

  return (
    <div>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
    </div>
  )
}
