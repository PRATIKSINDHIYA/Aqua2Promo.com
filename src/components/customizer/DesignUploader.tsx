import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface DesignUploaderProps {
  onFrontDesignUpload: (file: File) => void;
  onBackDesignUpload: (file: File) => void;
}

const DesignUploader = ({ onFrontDesignUpload, onBackDesignUpload }: DesignUploaderProps) => {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);

  const handleFrontFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFrontFile(e.target.files[0]);
    }
  };

  const handleBackFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackFile(e.target.files[0]);
    }
  };

  const handleFrontDesignApply = () => {
    if (frontFile) {
      onFrontDesignUpload(frontFile);
    }
  };

  const handleBackDesignApply = () => {
    if (backFile) {
      onBackDesignUpload(backFile);
    }
  };

  return (
    <div className="design-uploader-container space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Front Design Upload</h3>
        <div className="flex-1 flex flex-col">
          <input 
            id="front-design-upload"
            type="file"
            accept="image/*"
            onChange={handleFrontFileChange}
            className="mb-2"
          />
          <label htmlFor="front-design-upload" className="filepicker-label cursor-pointer">
            Choose Front Design
          </label>
          <p className="mt-2 text-gray-500 text-xs truncate">
            {frontFile === null ? "No file selected" : frontFile.name}
          </p>
        </div>
        <Button 
          onClick={handleFrontDesignApply}
          className="text-xs mt-3"
          disabled={!frontFile}
        >
          Apply Front Design
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Back Design Upload</h3>
        <div className="flex-1 flex flex-col">
          <input 
            id="back-design-upload"
            type="file"
            accept="image/*"
            onChange={handleBackFileChange}
            className="mb-2"
          />
          <label htmlFor="back-design-upload" className="filepicker-label cursor-pointer">
            Choose Back Design
          </label>
          <p className="mt-2 text-gray-500 text-xs truncate">
            {backFile === null ? "No file selected" : backFile.name}
          </p>
        </div>
        <Button 
          variant="outline"
          onClick={handleBackDesignApply}
          className="text-xs mt-3"
          disabled={!backFile}
        >
          Apply Back Design
        </Button>
      </div>
    </div>
  )
}

export default DesignUploader