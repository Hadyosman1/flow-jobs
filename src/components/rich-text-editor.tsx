"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

const RichTextEditor = forwardRef<object, EditorProps>((props, ref) => {
  return (
    <Editor
      editorClassName={cn(
        "bg-background cursor-text min-h-[150px] rounded-md border border-input px-3 py-1 pr-8 text-base shadow-sm transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        props.editorClassName,
      )}
      toolbar={{
        options: ["inline", "list", "history", "link"],
        inline: {
          options: ["bold", "italic", "underline"],
        },
      }}
      editorRef={(r) => {
        if (typeof ref === "function") {
          ref(r);
        } else if (ref) {
          ref.current = r;
        }
      }}
      {...props}
    />
  );
});

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
