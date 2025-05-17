"use client"

import { useState, useRef, type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface TagsInputProps {
  id?: string
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
}

export function TagsInput({ id, value, onChange, placeholder = "Add tag...", disabled = false }: TagsInputProps) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()])
      }
      setInputValue("")
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag))
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 p-2 border rounded-md bg-white focus-within:ring-2 focus-within:ring-[#7DD5D8] focus-within:border-[#7DD5D8] border-[#E5E7EB]",
        disabled && "opacity-50 cursor-not-allowed",
      )}
      onClick={handleContainerClick}
    >
      {value.map((tag, index) => (
        <div key={index} className="flex items-center gap-1 px-2 py-1 bg-[#F7F8FA] rounded-md text-sm">
          <span>{tag}</span>
          {!disabled && (
            <button type="button" onClick={() => removeTag(tag)} className="text-gray-500 hover:text-gray-700">
              <X className="w-3 h-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          )}
        </div>
      ))}

      <Input
        ref={inputRef}
        id={id}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        disabled={disabled}
      />
    </div>
  )
}
