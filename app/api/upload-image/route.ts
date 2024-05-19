import { connectDb } from "@/lib/db.config";
import { imageGallaryModel } from "@/lib/imageModel";
import { UploadImage } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export const GET = async(req:NextRequest)=>{
    const Image = await imageGallaryModel.find({});

    return NextResponse.json ({image:Image , total : Image.length},{status:200})
}

export async function POST(req:NextRequest){
    const formData = await req.formData();
    const image = formData.get("image") as unknown as File;
    const data:any  = await UploadImage(image,"nextjs-imagegallery");

     await imageGallaryModel.create({
        image_url: data?.secure_url,
        public_id: data?.public_id,
    })

    return NextResponse.json({msg:data},{status:200});
};