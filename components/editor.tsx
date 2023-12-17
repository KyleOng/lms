"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (content: string) => void;
  value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {
  // import ReactQuill only on client side
  // because "use client" is not enough to prevent server side rendering
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};
