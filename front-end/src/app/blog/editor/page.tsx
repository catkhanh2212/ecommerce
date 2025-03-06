'use client'

import { Box, Button, MenuItem, Paper, Select, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from '@tiptap/starter-kit'
import Image from "@tiptap/extension-image"
import { FormatBold, FormatItalic, FormatListBulleted, FormatListNumbered } from '@mui/icons-material'
import { Extension } from "@tiptap/core"
import FontSize from '@tiptap/extension-font-size'
import TextStyle from '@tiptap/extension-text-style'
import axios from 'axios'

function Editor() {
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [description, setDescription] = useState("")
  const [fontSize, setFontSize] = useState<string>("18px")
  const [loading, setLoading] = useState(false)


  const TabExtension = Extension.create({
    name: "tabKey",
    addKeyboardShortcuts() {
      return {
        Tab: () => {
          this.editor.chain().insertContent("    ").run() // Chèn 4 dấu cách
          return true
        },
      }
    },
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontSize.configure({
        types: ['textStyle'],
      }),
      Image,
      TabExtension
    ],
    content: "Viết bài tại đây...",
  })




  const handleAddImage = () => {
    if (editor && imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
    }
  }

  const handleBulletList = () => {
    editor?.chain().focus().toggleBulletList().run();
  }

  const handleOrderedList = () => {
    editor?.chain().focus().toggleOrderedList().run();
  }

  const handleBold = () => {
    editor?.chain().focus().toggleBold().run();
  }

  const handleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  }

  const handleFontSize = (size: string) => {
    setFontSize(size)
    editor?.chain().focus().setFontSize(size).run()
  }

  const handleSavePost = () => {
    if (!title.trim() || !editor?.getHTML().trim()) {
      alert("Vui lòng nhập tiêu đề và nội dung!");
      return;
    }

    setLoading(true)

    const postData = {
      title,
      description,
      content: editor.getHTML(),
      createdAt: new Date().toISOString()
    };

    axios
      .post("http://localhost:3001/blog", postData)
      .then((response) => {
        if (response.status === 201) {
          alert("Bài viết đã được lưu!")
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lưu bài viết:", error);
        alert("Lưu thất bại, thử lại!");
      })

    setLoading(false)
  };

  if (!editor) return null;
  return (
    <Box sx={{ backgroundColor: '#F7F7F7', py: 4, px: 16 }}>
      <Toolbar
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 10,
          py: 2,
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          width: '100%',
          borderRadius: 2,
          mb: 2
        }}
      >
        <TextField
          sx={{ flex: 1 }}
          label="Nhập URL ảnh"
          variant="outlined"
          size="small"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Button sx={{ backgroundColor: '#344CB7', color: 'white' }} onClick={handleAddImage}>Chèn ảnh</Button>

        <Box sx={{ borderRadius: 2, cursor: 'pointer', border: '1px solid #EEEDEB', p: 1 }} onClick={handleBold}>
          <FormatBold />
        </Box>
        <Box sx={{ borderRadius: 2, cursor: 'pointer', border: '1px solid #EEEDEB', p: 1 }} onClick={handleItalic}>
          <FormatItalic />
        </Box>
        <Box sx={{ borderRadius: 2, cursor: 'pointer', border: '1px solid #EEEDEB', p: 1 }} onClick={handleBulletList}>
          <FormatListBulleted />
        </Box>
        <Box sx={{ borderRadius: 2, cursor: 'pointer', border: '1px solid #EEEDEB', p: 1 }} onClick={handleOrderedList}>
          <FormatListNumbered />
        </Box>

        <Select
          value={fontSize}
          onChange={(e) => handleFontSize(e.target.value)}
          sx={{
            borderRadius: 1,
            border: "1px solid #ddd",
            height: 36,
            minWidth: 150,
            display: "flex",
          }}
          displayEmpty
          renderValue={(value) => (value ? `Cỡ chữ: ${value}` : "Cỡ chữ")}
        >
          <MenuItem value="18px">18px</MenuItem>
          <MenuItem value="20px">20px</MenuItem>
          <MenuItem value="24px">24px</MenuItem>
          <MenuItem value="28px">28px</MenuItem>
        </Select>
      </Toolbar>

      <Box sx={{
        backgroundColor: 'white',
        p: 4,
        maxHeight: '80vh',
        overflowY: 'auto',
        borderRadius: 2
      }}>



        <Typography sx={{ fontWeight: "bold", fontSize: '18px' }}>
          Viết bài blog
        </Typography>

        <TextField
          label="Tiêu đề bài viết"
          fullWidth
          variant="outlined"
          sx={{ mb: 2, mt: 2 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Mô tả bài viết */}
        <TextField
          label="Mô tả"
          fullWidth
          multiline
          minRows={4}
          sx={{ mb: 2}}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Trình soạn thảo */}
        <Paper sx={{ p: 2, minHeight: 300, border: "1px solid #ccc" }}>
          <EditorContent editor={editor} />
        </Paper>

        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button variant="contained" sx={{backgroundColor: '#344CB7', color: 'white'}} onClick={handleSavePost} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu bài viết"}
          </Button>
        </Box>

      </Box>
    </Box>


  )
}

export default Editor