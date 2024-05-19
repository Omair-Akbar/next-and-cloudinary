"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'

const page = () => {
  const [loading,setLoading] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [images, setImages] = useState<{ image_url: string, public_id: string, _id: string }[]>([]);
  const OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const fetchAllImage = async () => {
    try {
      const { data: { image } } = await axios.get("/api/upload-image")
      setImages(image)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const OnSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (!image) {
        return
      }
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post("/api/upload-image", formData)
      await fetchAllImage();
      setLoading(false)
    } catch (error: any) {
      console.log("error", error.message)
    }
  }

  const deleteImage = async (e:string)=>{
    try {
      const response = await axios.delete("/api/upload-image/" + e.replace("nextjs-imagegallery/",""))
      await fetchAllImage();
    } catch (error:any) {
      console.log("error",error.message)
    }
  }

  useEffect(() => {
    fetchAllImage();
  }, [])

  return (
    <><form onSubmit={OnSubmitHandler} className='w-1/2 mx-auto py-10'>
      <input onChange={OnChangeHandler} type='file' name='' id='' />
      <button className='bg-black px-4 py-2 rounded-sm text-white'>{loading?"uploading..":"upload"}</button>
    </form>
      <div className="container px-5 py-24 mx-auto  ">
       
      
        <div className="flex flex-wrap -m-4">
         {
          images?.map((cur,i)=>{
            return  <div key={i} className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <a className="block relative h-48 rounded overflow-hidden">
              <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={cur.image_url} />
            </a>
            <div className="mt-4">
             <button onClick={()=>{deleteImage(cur.public_id)}} className="btn bg-black text-white rounded p-2 px-4 hover:bg-zinc-900">Delete</button>
            </div>
          </div>
          })
         }
        </div>
      
      
      </div>
    </>
  )
}

export default page
