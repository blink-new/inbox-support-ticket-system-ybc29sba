
import { useState, useRef } from 'react'
import { Button } from './ui/button'
import { Paperclip, X, FileIcon } from 'lucide-react'
import { useToast } from '../hooks/use-toast'

interface FileUploadInputProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  maxSizeMB?: number
  acceptedFileTypes?: string
}

export function FileUploadInput({
  onFilesSelected,
  maxFiles = 5,
  maxSizeMB = 10,
  acceptedFileTypes = '*',
}: FileUploadInputProps) {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    
    // Check if adding these files would exceed the max number
    if (files.length + selectedFiles.length > maxFiles) {
      toast({
        title: 'Too many files',
        description: `You can only upload a maximum of ${maxFiles} files.`,
        variant: 'destructive',
      })
      return
    }
    
    // Check file sizes
    const oversizedFiles = selectedFiles.filter(file => file.size > maxSizeMB * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      toast({
        title: 'Files too large',
        description: `Some files exceed the ${maxSizeMB}MB limit.`,
        variant: 'destructive',
      })
      return
    }
    
    const newFiles = [...files, ...selectedFiles]
    setFiles(newFiles)
    onFilesSelected(newFiles)
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    onFilesSelected(newFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    else return (bytes / 1048576).toFixed(1) + ' MB'
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept={acceptedFileTypes}
      />
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={files.length >= maxFiles}
        className="gap-2"
      >
        <Paperclip className="h-4 w-4" />
        Attach Files
      </Button>
      
      {files.length > 0 && (
        <div className="space-y-2 mt-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-muted/50 rounded-md p-2 text-sm">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileIcon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{file.name}</span>
                <span className="text-muted-foreground text-xs flex-shrink-0">
                  {formatFileSize(file.size)}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      {files.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {files.length} of {maxFiles} files attached
        </p>
      )}
    </div>
  )
}