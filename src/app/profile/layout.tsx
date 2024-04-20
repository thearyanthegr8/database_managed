"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";


export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter(); 
    return(
        <main className="w-full justify-stretch py-[6rem]">
            <div className="w-[20%] justify-stretch p-[1rem] px-[2rem]">
            <Button variant="default" onClick={() => router.push("/profile")}>Profile</Button>
            </div>
            <div className="w-[20%] justify-stretch p-[1rem] px-[2rem]">
            <Button variant="default" onClick={() => router.push("/profile/orders")}>Orders</Button>
            </div>
            <div className="w-[20%] justify-stretch p-[1rem] px-[2rem]">
            <Button variant="default" onClick={() => router.push("/profile/products")}>Products</Button>
            </div>
            <div className="w-[20%] justify-stretch p-[1rem] px-[2rem]">
            <Button variant="default" onClick={() => router.push("/profile/warehouses")}>Warehouses</Button>
            </div>
            <div className="w-[80%]">
                {children}
            </div>
        </main>
    )
}