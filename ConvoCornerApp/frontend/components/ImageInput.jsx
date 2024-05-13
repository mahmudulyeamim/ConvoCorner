import React, { useEffect } from 'react'

export default function ImageInput({ setImage, imageFlag }) {
    useEffect(() => {
        const inputElement = document.getElementById('fileInput');
        if (inputElement) {
          inputElement.value = '';
        }
    }, [imageFlag]); 
    
  return (

        <input id='fileInput' type='file' className='hidden'
                onChange={(e) => setImage(e.target.files[0])} /> 
  )
}
