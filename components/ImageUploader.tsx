import React, { useRef, useCallback, useState } from 'react';

type Language = 'en' | 'ml';

interface ImageUploaderProps {
  onImageUpload: (file: File, dataUrl: string) => void;
  existingImage?: string;
  onClear?: () => void;
  language: Language;
}

const locales = {
  en: {
    uploadTitle: 'Upload Textbook Page',
    uploadSubtitle: 'Drag and drop or click to select',
    uploadButton: 'Choose File',
    changeImage: 'Change Image',
    clearImage: 'Remove Image',
    dragActive: 'Drop your image here',
    imagePreview: 'Image Preview',
  },
  ml: {
    uploadTitle: 'പാഠപുസ്തക പേജ് അപ്‌ലോഡ് ചെയ്യുക',
    uploadSubtitle: 'വലിച്ചിടുക അല്ലെങ്കിൽ തിരഞ്ഞെടുക്കാൻ ക്ലിക്ക് ചെയ്യുക',
    uploadButton: 'ഫയൽ തിരഞ്ഞെടുക്കുക',
    changeImage: 'ചിത്രം മാറ്റുക',
    clearImage: 'ചിത്രം നീക്കം ചെയ്യുക',
    dragActive: 'നിങ്ങളുടെ ചിത്രം ഇവിടെ ഇടുക',
    imagePreview: 'ചിത്ര പ്രിവ്യൂ',
  }
};

const UploadIcon: React.FC = () => (
  <svg className="w-16 h-16 mx-auto text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const CloudUploadIcon: React.FC = () => (
  <svg className="w-20 h-20 mx-auto text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
  </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, existingImage, onClear, language }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentLocale = locales[language];
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageUpload(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };
  
  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageUpload(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  if (existingImage && onClear) {
    return (
      <div className="space-y-4">
        {/* Preview Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 rounded-lg p-1.5">
              <svg className="w-5 h-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{currentLocale.imagePreview}</h3>
              <p className="text-xs text-slate-500">Image uploaded successfully</p>
            </div>
          </div>
        </div>

        {/* Image Preview */}
        <div className="relative rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-50 shadow-md">
          <img 
            src={existingImage} 
            alt="Textbook page" 
            className="w-full h-auto max-h-[500px] object-contain" 
          />
        </div>

        {/* Action Buttons - Always Visible */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            {currentLocale.changeImage}
          </button>
          
          <button
            onClick={onClear}
            className="bg-white border-2 border-red-200 text-red-600 font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-xl hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            {currentLocale.clearImage}
          </button>
        </div>

        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      </div>
    );
  }

  return (
    <div 
      className={`relative border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
        isDragActive 
          ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
          : 'border-slate-300 bg-gradient-to-br from-slate-50 to-white hover:border-blue-400 hover:shadow-lg'
      }`}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      
      <div className={`transform transition-all duration-300 ${isDragActive ? 'scale-110' : 'scale-100'}`}>
        {isDragActive ? <CloudUploadIcon /> : <UploadIcon />}
      </div>

      {isDragActive ? (
        <div className="mt-6 animate-pulse">
          <h3 className="text-xl font-bold text-blue-600">{currentLocale.dragActive}</h3>
        </div>
      ) : (
        <>
          <h3 className="mt-6 text-xl font-bold text-slate-800">{currentLocale.uploadTitle}</h3>
          <p className="mt-2 text-sm text-slate-500">{currentLocale.uploadSubtitle}</p>
          <button className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            {currentLocale.uploadButton}
          </button>
          
          <div className="mt-8 flex items-center justify-center gap-8 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>JPG, PNG, WebP</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <span>Max 10MB</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Demo Component
export default function App() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [language, setLanguage] = useState<Language>('en');

  const handleImageUpload = (file: File, dataUrl: string) => {
    setImage(dataUrl);
  };

  const handleClear = () => {
    setImage(undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">Image Uploader Demo</h1>
          <button
            onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {language === 'en' ? 'മലയാളം' : 'English'}
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <ImageUploader
            onImageUpload={handleImageUpload}
            existingImage={image}
            onClear={handleClear}
            language={language}
          />
        </div>
      </div>
    </div>
  );
}