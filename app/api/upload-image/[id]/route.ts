import { connectDb } from "@/lib/db.config";
import { imageGallaryModel } from "@/lib/imageModel";
import { DeleteImage, UploadImage } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export const DELETE = async(req:NextRequest,ctx:{params:{id:string}})=>{

    const imagePublicId = `nextjs-imagegallery/` + ctx.params.id;

    const result_delete = await DeleteImage(imagePublicId);
    await imageGallaryModel.findOneAndDelete({public_id:imagePublicId})


    return NextResponse.json ({msg:result_delete},{status:200});
};

