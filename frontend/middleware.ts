import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
const jwt=require("jsonwebtoken")
export async function middleware(req: NextRequest) {
    const cookiesStore=await cookies()
    const isAdmin=cookiesStore.get("isAdmin")
    const KEY=process.env.NEXT_PUBLIC_SECRET_KEY
    const token=jwt.decode(isAdmin?.value,KEY)
    const path = req.nextUrl.pathname;
    if(path.startsWith("/admin")){
        if(token?.isAdmin!="True"){
            return NextResponse.redirect(new URL("/authentication", req.url));
        }
    }else if(path.startsWith("/table")){
        const id=parseInt(path.split("/")[path.split("/").length-1])
        if(path!="/table/not-found" && !path.endsWith("/orders")){
            console.log(process.env.NEXT_PUBLIC_BACKEND_URL+"/api/v1/checkTable/"+id)
            const res=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/checkTable/`+id)
            if(res.data.table==null){
                return NextResponse.redirect(new URL("/table/not-found", req.url));
            }
        }
    }
}

export const config = {
    matcher: ["/admin(.*)","/table(.*)"],
};
