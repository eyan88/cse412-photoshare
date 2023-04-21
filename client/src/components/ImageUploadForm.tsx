import { useState } from 'react';

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [postTitle, setPostTitle] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileInputChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleTitleChange = (e: any) => {
    setPostTitle(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsUploading(true);

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('caption', postTitle);
    formData.append('date_of_photo', Date());
    formData.append('image', selectedFile);

    fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    }).then(response => response.json())
    .then(response => {
      console.log(response);
      setIsUploading(false);
    });
  }

  return (
    <div className='max-w-md mx-auto'>
      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>

        <label className='block text-gray-700 font-bold mb-2'>Title your post</label>
        <input type='text' onChange={handleTitleChange} className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>

        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2' htmlFor='image'>
            Choose an image to upload:
          </label>
          <input type='file' id='image' onChange={handleFileInputChange} className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>

        <div className='flex items-center justify-between'>
          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-100' disabled={!selectedFile || isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default ImageUploadForm;