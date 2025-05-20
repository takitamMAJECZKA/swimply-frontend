import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useContext } from "react"
import { DataContext } from "@/components/DataProvider"


export default function AccountInfo() {
    const { workoutsData, workoutsLoading, accountData, accountLoading } = useContext(DataContext)
    
    return (
            <div className="p-6 grid grid-cols-1 rounded-xl fancy-shadow bg-(--dominant)">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-(--light-aqua)">Dane konta</h2>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <Avatar className='w-10 h-10'>
                            <AvatarImage src="https://github.com/.png" />
                            <AvatarFallback className='text-(--dominant)'>{accountData.username.substring(0,2)[0].toUpperCase()+accountData.username.substring(0,2)[1]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <h3 className="text-sm font-semibold text-(--light-aqua)">{accountData.username}</h3>
                            <p className="text-xs text-(--aqua)"></p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 grid-cols-1 gap-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-(--aqua)">Nazwa użytkownika</p>
                        <p className="text-sm font-semibold text-(--light-aqua)">{accountData.username}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-(--aqua)">Hasło</p>
                        <p className="text-sm font-semibold text-(--light-aqua)">********</p>
                    </div>
            </div>
        </div>
    )
}