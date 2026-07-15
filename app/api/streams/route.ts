import { NextRequest, NextResponse } from "next/server";
import {z} from "zod"
import { prismaClient } from "@/app/lib/db";
const YT_REGEX=new RegExp("^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]{11}$");

const CreateStreamSchema=z.object({
    creatorId:z.string(),
    url:z.string(),
    extractedId:z.string()
})
// any normal user can create a stream(video in a room)
export async function Post(req:NextRequest){
    try{
        const data=CreateStreamSchema.parse(await req.json());
        const isYt=YT_REGEX.test(data.url);
        if(!isYt){
            return NextResponse.json({
                message:"Wrong url format"
            },{
                status:411
            })
        }
        const extractedId:string=data.url.split("?v=")[1];
        await prismaClient.stream.create({
            data:{
                userId:data.creatorId,
                url:data.url,
                extractedId:extractedId,
                type:"Youtube"
            }

        })

    }
    catch(e){
        console.log(e);
        return NextResponse.json({
            message:"error while adding the stream"
        },{
            status:411
        })
    }

}