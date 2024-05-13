import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'; 
import { Button } from './ui/button'; 
import jsPDF from 'jspdf';

export default function FullImageComponent({ src, index }) {
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    if (src.startsWith('data:text/plain;base64,')) {
      const base64Content = src.replace('data:text/plain;base64,', '');
      const decodedContent = atob(base64Content);
      setFileContent(decodedContent);
    }
  }, [src]);

  const handleDownload = () => {
    if (src.startsWith('data:text/plain;base64,')) {
      const base64Content = src.replace('data:text/plain;base64,', '');
      const decodedContent = atob(base64Content);
  
      const doc = new jsPDF();
      doc.text(decodedContent, 10, 10); 
      doc.save('file' + index + '.pdf'); 
    } else {
      
      const link = document.createElement('a');
      link.href = src;
      link.download = 'file' + index + '.jpg'
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  

  return (
    <div>
      <Dialog className="bg-white rounded-2xl">

        <DialogTrigger className='w-full'>  
          {fileContent ? (
            <pre onClick={handleDownload}>file{index}.pdf</pre>
          ) : (
            <img src={src} className='h-42 w-64 rounded-lg p-0 bg-white' />
          )}
        </DialogTrigger>
        { !fileContent && 
            <DialogContent className="max-w-xl p-0 rounded-2xl bg-white text-black">
                <img src="/download.png" className="text-white rounded-full p-2 bg-white w-12 mt-4 absolute top-0 left-0 m-8 cursor-pointer" onClick={handleDownload} />
                {fileContent ? (
                <pre>{fileContent}</pre>
                ) : (
                <img src={src} className='h-full w-full rounded-lg bg-white text-black' />
                )}
            </DialogContent>
        }
      </Dialog>
    </div>
  );
}
