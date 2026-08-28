import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import youtubesearchapi from "youtube-search-api";

const YT_REGEX =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})(?:[?&].*)?$/;

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string(),
});

export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());

        // Validate YouTube URL
        const isYT = YT_REGEX.test(data.url);

        if (!isYT) {
            return NextResponse.json(
                {
                    message: "Wrong URL format",
                },
                {
                    status: 400,
                }
            );
        }

        // Extract YouTube video ID
        const extractedId = data.url.includes("youtu.be")
            ? data.url.split("youtu.be/")[1].split("?")[0]
            : data.url.split("v=")[1].split("&")[0];

        // Get YouTube video details
        const res = await youtubesearchapi.GetVideoDetails(extractedId);

        const thumbnails = res.thumbnail?.thumbnails ?? [];

        // Sort thumbnails by width
        thumbnails.sort(
            (a: { width: number }, b: { width: number }) =>
                a.width - b.width
        );

        const smallImg =
            thumbnails.length > 1
                ? thumbnails[thumbnails.length - 2].url
                : thumbnails[0]?.url ?? "";

        const bigImg =
            thumbnails[thumbnails.length - 1]?.url ?? "";

        // Create stream
        const stream = await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedID: extractedId,
                type: "Youtube",
                title: res.title ?? "Can't find video",
                smallImg,
                bigImg,
            },
        });

        return NextResponse.json({
            message: "Stream added successfully",
            stream,
        });
    } catch (e) {
        console.error(e);

        return NextResponse.json(
            {
                message: "Error while adding a stream",
            },
            {
                status: 500,
            }
        );
    }
}
// import { prismaClient } from "@/app/lib/db";
// import {NextRequest, NextResponse} from "next/server"
// import {z} from "zod"
// import youtubesearchapi from "youtube-search-api";

// const YT_REGEX =
//   /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})(?:[?&].*)?$/;

// const CreateStreamSchema=z.object({
//     creatorId:z.string(),
//     url:z.string()
// })

// export async function POST(req:NextRequest){
//     try{
//         const data= CreateStreamSchema.parse(await req.json());
//         const isYT=YT_REGEX.test(data.url);
//         if(!isYT){
//             return NextResponse.json({
//                 message:"wrong url format"
//             },{
//                 status:411
//             })
//         }
//         const extractedId=data.url.split("?v=")[1];
//         const res=await youtubesearchapi.GetVideoDetails(extractedId);
//         console.log(res);
//         const thumbnails=res.thumbnail.thumbnails;
//         thumbnails.sort((a:{width:number},b:{width:number})=>a.width<b.width ?-1:1 );

//         const stream=await prismaClient.stream.create({
//             data:{
//                 userId:data.creatorId,
//                 url:data.url,
//                 extractedID:extractedId,
//                 type:"Youtube",
//                 title:res.title??"cant find video",
//                 smallImg:(thumbnails.length >1 ? thumbnails[thumbnails.length-2].url:thumbnails[thumbnails.length-1].url )
//                 ?? "https://imgs.search.brave.com/D0i2KzQSr-sHFMbR11X5xghbGFvnriV-Ecfa8H2bFCg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9uby12aWRl/by1yZWNvcmQtMzYx/ODc2NC0zMDUwNjI2/LnBuZz9mPXdlYnAm/dz0xMjg"
//                 ,
//                 bigImg:thumbnails[thumbnails.length-1].url ?? "https://imgs.search.brave.com/D0i2KzQSr-sHFMbR11X5xghbGFvnriV-Ecfa8H2bFCg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9uby12aWRl/by1yZWNvcmQtMzYx/ODc2NC0zMDUwNjI2/LnBuZz9mPXdlYnAm/dz0xMjg"
//             } 
//         })
//         return NextResponse.json({
//             message:"successfully created the stream "
//         },{
//             status:200
//         })
//     }
//     catch(e){
//         return NextResponse.json({
//             message:"error while adding a stream"
//         },{
//             status:500
//         })
//     }
// }